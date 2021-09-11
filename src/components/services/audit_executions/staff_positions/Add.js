import NormalForm from "@/containers/normal_forms/FormGenerator";
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import {ROW_PER_PAGE} from "@/shared/common/config";
import CustomModal from '@/containers/Modal';
import {formatDate} from "../../../../shared/utils";
import StorageService from "@/shared/common/storage.service";

export default {
  components: {NormalForm, CommonIndex, Pagination, CustomModal},
  data() {
    return {
      page_title: this.$t("staff") + " " + this.$t("position"),
      locationName: '',
      scheduleName: '',
      schema: {
        txt_name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("staff") + " " + this.$t("name"),
          vvalidate: "required"
        },
        txt_code: {
          fieldType: "TextInput",
          fieldName: "code",
          label: this.$t("code"),
          vvalidate: "required"
        },
        txt_designation: {
          fieldType: "TextInput",
          fieldName: "designation",
          label: this.$t("designation"),
          vvalidate: "required"
        },
        txt_org_join_date: {
          fieldType: "DateInput",
          fieldName: "organizationJoiningDate",
          label: this.$t("organization") + " " + this.$t("joining") + " " + this.$t("date"),
          vvalidate: "required",
        },
        txt_branch_join_date: {
          fieldType: "DateInput",
          fieldName: "branchJoiningDate",
          label: this.$t("branch") + " " + this.$t("joining") + " " + this.$t("date"),
          vvalidate: "'required'",
        },
        txt_address: {
          fieldType: "TextInput",
          fieldName: "address",
          label: this.$t("address"),
          vvalidate: "required"
        },
        txt_satisfaction_ratio: {
          fieldType: "SelectList",
          fieldName: "satisfactionRatio",
          label: this.$t("satisfaction") + " " + this.$t("ratio"),
          options: {'': "--" + this.$t("select") + "--"},
          vvalidate: "required"
        },
        txt_risk_level: {
          fieldType: "SelectList",
          fieldName: "riskLevel",
          label: this.$t("risk") + " " + this.$t("level"),
          options: {'': "--" + this.$t("select") + "--"},
          vvalidate: "required"
        },
        txt_comment: {
          fieldType: "TextEditor",
          fieldName: "comment",
          label: this.$t("comments"),
          vvalidate: "required",
        },
      },
      is_form_load: false,
      error_message: [],
      form_data: {},
      formErrors: [],
      reset_data: {},
      isMfiAudit: false,
      auditExecutionMastersId: null,
      id: '',
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: "name", label: this.$t('name'), sortable: true},
        {key: "designation", label: this.$t('designation'), sortable: true},
        {
          key: "organizationJoiningDate",
          label: this.$t("organization") + " " + this.$t("joining") + " " + this.$t("date"),
          sortable: true
        },
        {
          key: "branchJoiningDate",
          label: this.$t("branch") + " " + this.$t("joining") + " " + this.$t("date"),
          sortable: true
        },
        {key: "address", label: this.$t("address"), sortable: true},
        {key: "satisfactionRatio", label: this.$t("satisfaction") + ' ' + this.$t("ratio"), sortable: true},
        {key: "riskLevel", label: this.$t("risk") + ' ' + this.$t("level"), sortable: true},
        {key: "html_1", label: this.$t("comment"), sortable: true},
        {key: 'actions', label: this.$t('actions'), sortable: false}
      ],
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "audit_executions/staff_positions/Edit",
      },
      staff_positions: [],
      core_staff_positions: [],
      satisfactionRatios: [
        {
          text: "--" + this.$t("select") + "--",
          value: ''
        },
        {
          text: "Fully done",
          value: 'FULLY_DONE'
        },
        {
          text: "Partially done",
          value: 'PARTIALLY_DONE'
        },
        {
          text: "Not done",
          value: 'NOT_DONE'
        }
      ],
      riskLevels: [{
        text: "--" + this.$t("select") + "--",
        value: ''
      },
        {
          text: "High",
          value: 'HIGH'
        },
        {
          text: "Medium",
          value: 'MEDIUM'
        },
        {
          text: "Low",
          value: 'LOW'
        },
        {
          text: "Not Applicable",
          value: 'NOT_APPLICABLE'
        }],
      valid_star: '',
    }
  },
  mounted() {
    this.schema['txt_satisfaction_ratio']['options'] = this.satisfactionRatios;
    this.schema['txt_risk_level']['options'] = this.riskLevels;
    this.getLocalStorageData();
    this.auditExecutionMastersId = isNaN(this.$route.params.auditExecutionMastersId) ? '' : this.$route.params.auditExecutionMastersId;
    this.loadData(this.pagination.offset);
    const data = StorageService.getGeneralConfig();
    this.isMfiAudit = !!Number(data['is_mfi_audit']);
    if (this.isMfiAudit && this.auditExecutionMastersId) {
      this.is_form_load = false;
      this.isMfiAudit = false;
    } else if (this.isMfiAudit && this.auditExecutionMastersId === '') {
      this.is_form_load = false;
      this.getStaffPositionFromCoreService();
      this.isMfiAudit = true;
    } else {
      this.is_form_load = true;
      this.isMfiAudit = false;
    }
  },
  methods: {
    loadData: function (offset = 0) {
      const page = (offset === 0) ? offset : (offset / ROW_PER_PAGE);
      const param = {
        'size': ROW_PER_PAGE,
        'page': page,
        'sort': 'createdOn,desc',
        'auditExecutionMastersId': this.auditExecutionMastersId
      }
      this.$axios.post("/staff_positions", null, {params: param})
        .then(res => {
          if (res.status === 204) {
            this.staff_positions = [];
            return;
          }
          this.staff_positions = res.data.data.content;
          this.pagination.total_rows = res.data.data['totalElements'];
          this.pagination.offset = res.data.data['pageable']['offset'];
          if (this.staff_positions.length > 0) {
            for (let i = 0; i < this.staff_positions.length; i++) {
              this.staff_positions[i]['name'] = '[' + this.staff_positions[i]['code'] + '] ' + this.staff_positions[i]['name'];
              this.staff_positions[i]['designation'] = this.staff_positions[i]['designation'];
              this.staff_positions[i]['organizationJoiningDate'] = formatDate(this.staff_positions[i]['organizationJoiningDate']);
              this.staff_positions[i]['branchJoiningDate'] = formatDate(this.staff_positions[i]['branchJoiningDate']);
              this.staff_positions[i]['address'] = this.staff_positions[i]['address'];
              this.staff_positions[i]['satisfactionRatio'] = this.getSatisfactionRatioValue(this.staff_positions[i]['satisfactionRatio']);
              this.staff_positions[i]['riskLevel'] = this.staff_positions[i]['riskLevel'];
              this.staff_positions[i]['html_1'] = this.staff_positions[i]['comment'];
              this.staff_positions[i]['edit'] = 1;
              this.staff_positions[i]['delete'] = 1;
            }
          }
        });
    },
    getLocalStorageData: function () {
      this.locationName = localStorage.getItem('location_name');
      this.scheduleName = localStorage.getItem('schedule_name');
      const locationId = localStorage.getItem('location_id');
      const scheduleId = localStorage.getItem('schedule');
      this.form_data['locationId'] = locationId;
      this.form_data['scheduleId'] = scheduleId;
    },
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          let userInfo = this.$store.getters['auth/userInfo'];
          this.form_data["createdBy"] = userInfo['id'];
          const auditExecutionMastersId = this.$route.params.auditExecutionMastersId;
          if (!isNaN(auditExecutionMastersId)) {
            this.form_data['auditExecutionMastersId'] = auditExecutionMastersId;
          }
          let params = new FormData();
          for (let key in this.form_data) {
            params.append(key, this.form_data[key]);
          }
          this.$axios
            .post("/staff_positions/add", params)
            .then(res => {
              const data = res.data.validation_error;
              if (data) {
                const keys = Object.keys(data);
                for (let j = 0; j < keys.length; j++) {
                  let key = keys[j];
                  const value = data[key];
                  if (key === 'staffPosition') {
                    delete data[key]
                    key = key.replace("staffPosition", "branchJoiningDate"); // renaming key
                    data[key] = value; // setting data with new key
                  }
                }
                this.error_message = data;
              } else {
                let status = 'failed';
                if (res.data.statusCode === 200) {
                  this.$router.replace({
                    params: {auditExecutionMastersId: res.data.data.auditExecutionMastersId}
                  });
                  status = 'success';
                  this.loadData(this.pagination.offset);
                  this.handleReset();
                } else if (res.data.statusCode === 202) {
                  status = 'warning';
                }
                this.flashMessage(status, res.data.message);
                if (status === 'success') {
                  this.$emit('close', true);
                }
              }
            });
        }
      }).catch(() => {
        this.$toast.error({title: 'error', message: "Invalid Field"});
      });
    },
    handleReset: function () {
      this.error_message = [];
      this.$set(this.form_data, "name", this.reset_data.name);
      this.$set(this.form_data, "code", this.reset_data.code);
      this.$set(this.form_data, "designation", this.reset_data['designation']);
      this.$set(this.form_data, "organizationJoiningDate", this.reset_data['organizationJoiningDate']);
      this.$set(this.form_data, "branchJoiningDate", this.reset_data['branchJoiningDate']);
      this.$set(this.form_data, "address", this.reset_data['address']);
      this.$set(this.form_data, "satisfactionRatio", this.reset_data['satisfactionRatio']);
      this.$set(this.form_data, "riskLevel", this.reset_data['riskLevel']);
      this.$set(this.form_data, "comment", this.reset_data['comment']);
      this.errors.clear();
      this.$validator.reset();
    },
    clear: function () {
      // this.form_data.txt_location = '';
    },
    handleBack: function () {
      this.$router.push('/audit-execution/staff-positions/index');
    },
    customEdit: function (data) {
      if (data.id) {
        this.modal_info.title = this.$t('edit') + " " + this.$t('staff') + " " + this.$t('position');
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      }
    },
    customDelete(itemData) {
      let delete_data = [{
        url: '/staff_positions/delete',
        field_id: 'id'
      }];
      let id = itemData['id'];
      this.confirmMessage(id, delete_data, false);
      this.loadData(this.pagination.offset);
    },
    closeModal(is_reload = false) {
      this.modal_info.isModalVisible = false;
      if (is_reload === true) {
        this.loadData(this.pagination.offset);
      }
    },
    getSatisfactionRatio: function () {
      this.schema['txt_satisfaction_ratio']['options'] = this.satisfactionRatios;
    },
    getSatisfactionRatioValue: function (ratioName) {
      if (ratioName === 'FULLY_DONE') {
        return 1;
      } else if (ratioName === 'PARTIALLY_DONE') {
        return 0.50;
      } else if (ratioName === 'NOT_DONE') {
        return 0;
      }
    },
    /*getStaffPositionFromCoreService: function () {
      const locationId = localStorage.getItem('api_location_id');
      const auditPeriodFromDate = localStorage.getItem('auditPeriodFromDate');
      const auditPeriodToDate = localStorage.getItem('auditPeriodToDate');
      const url = 'ams_staff_positions/staff_position';
      $http_core_service.post(url, JSON.stringify({
        'locationId': locationId,
        'auditPeriodFromDate': auditPeriodFromDate,
        'auditPeriodToDate': auditPeriodToDate
      }))
        .then((response) => {
          const myData = response.data;
          if (myData.length > 0) {
            for (let i = 0; i < myData.length; i++) {
              this.core_staff_positions.push({
                ...myData[i],
                organizationJoiningDate: formatDate(myData[i]['organizationJoiningDate']),
                branchJoiningDate: formatDate(myData[i]['branchJoiningDate']),
                index: i,
                comment: '',
                riskLevel: '',
                satisfactionRatio: ''
              });
            }
          }
        }).catch(function (error) {
        console.error("error", error);
      });
    },*/
    getStaffPositionFromCoreService: function () {
      const obj = {
        "closing_week": {
          "7": {
            "samities": {
              "count": 18,
              "code": "001-004,001-006,001-007,001-009,001-011,001-031,001-035,001-065,001-066,001-085,001-086,001-087,001-088,001-089,001-091,001-092,001-097,001-106"
            },
            "members": {
              "admission": 382,
              "dropout": 0,
              "detail_admission": "382+0",
              "detail_dropout": "",
              "inactive_members_savings_collection": "0"
            },
            "savings": {
              "cumilative_savings_count": 0,
              "cumilative_opening_deposit_amount": 0,
              "cumilative_deposit_amount": 8151332,
              "cumilative_int_amount": 452202,
              "cumilative_deposit_amount_insurance": 0,
              "cumilative_withdraw_amount": 6215476,
              "cumilative_withdraw_amount_insurance": 0,
              "product_wise": {
                "1": {
                  "sum_savings_count": 0,
                  "sum_opening_deposit_amount": 0,
                  "sum_deposit_amount": 0,
                  "sum_withdraw_amount": 0,
                  "cumilative_withdraw_amount": 4573674,
                  "cumilative_int_amount": 392582,
                  "cumilative_deposit_amount": 6254036
                },
                "2": {
                  "sum_savings_count": 0,
                  "sum_opening_deposit_amount": 0,
                  "sum_deposit_amount": 0,
                  "sum_withdraw_amount": 0,
                  "cumilative_withdraw_amount": 1641802,
                  "cumilative_int_amount": 59620,
                  "cumilative_deposit_amount": 1897296
                }
              }
            },
            "skt": {
              "skt_deposit": 0,
              "skt_withdraw": 0
            },
            "loans": {
              "cumilative_disburse_count": 3770,
              "cumilative_disburse_amount": 61022000,
              "cumilative_fully_paid_count": 3137,
              "cumilative_fully_paid_amount": 47019000,
              "expired_borrower_count": 10,
              "expired_borrower_amount": 358000,
              "current_expired_borrower_count": 10,
              "current_expired_borrower_member": 10,
              "current_expired_borrower_amount": 174590,
              "current_expired_principal_borrower_amount": 153876.51415301568,
              "current_borrower_member": 276,
              "current_borrower_count": 623,
              "current_borrower_amount": 13645000,
              "advance": 1178447,
              "principal_advance": 386319.68566251174,
              "due": 94186,
              "principal_due": 81244.02474458763,
              "recovery": 42169780,
              "principal_recovery": 37768721.58131622,
              "regular_recovery": 40722557,
              "recoverable": 41202456,
              "recoverable_principle": 37319779.434551306,
              "advance_count": 500,
              "due_count": 18,
              "due_count_principle": 0,
              "due_borrower": 47,
              "due_borrower_principle": 0,
              "recovery_count": 1846,
              "regular_recovery_count": 1318,
              "recoverable_count": 1797,
              "rebate": 57653,
              "wf": 0,
              "outstanding": 6816549,
              "principle_outstanding": 6085278.418683777,
              "due_loan_outstanding": 748676,
              "due_loan_outstanding_principle": 664019.8109318453,
              "total_loan_insurance_amount": 438540,
              "total_loan_insurance_premium_amount": 0,
              "total_loan_additinal_fee": 17080,
              "optional_product_current_no_loan": 0,
              "optional_product_expired_no_loan": 0
            }
          },
          "24": {
            "samities": {
              "count": 18,
              "code": "001-015,001-022,001-023,001-024,001-027,001-034,001-039,001-045,001-047,001-060,001-061,001-070,001-076,001-090,001-103,001-121,001-124,001-132"
            },
            "members": {
              "admission": 397,
              "dropout": 0,
              "detail_admission": "397+0",
              "detail_dropout": "",
              "inactive_members_savings_collection": "0"
            },
            "savings": {
              "cumilative_savings_count": 0,
              "cumilative_opening_deposit_amount": 0,
              "cumilative_deposit_amount": 10096284,
              "cumilative_int_amount": 523572,
              "cumilative_deposit_amount_insurance": 0,
              "cumilative_withdraw_amount": 7513623,
              "cumilative_withdraw_amount_insurance": 0,
              "product_wise": {
                "1": {
                  "sum_savings_count": 0,
                  "sum_opening_deposit_amount": 0,
                  "sum_deposit_amount": 0,
                  "sum_withdraw_amount": 0,
                  "cumilative_withdraw_amount": 6171255,
                  "cumilative_int_amount": 456533,
                  "cumilative_deposit_amount": 8580098
                },
                "2": {
                  "sum_savings_count": 0,
                  "sum_opening_deposit_amount": 0,
                  "sum_deposit_amount": 0,
                  "sum_withdraw_amount": 0,
                  "cumilative_withdraw_amount": 1342368,
                  "cumilative_int_amount": 67039,
                  "cumilative_deposit_amount": 1516186
                }
              }
            },
            "skt": {
              "skt_deposit": 0,
              "skt_withdraw": 0
            },
            "loans": {
              "cumilative_disburse_count": 4310,
              "cumilative_disburse_amount": 85274000,
              "cumilative_fully_paid_count": 3683,
              "cumilative_fully_paid_amount": 66815000,
              "expired_borrower_count": 18,
              "expired_borrower_amount": 990000,
              "current_expired_borrower_count": 18,
              "current_expired_borrower_member": 18,
              "current_expired_borrower_amount": 317594,
              "current_expired_principal_borrower_amount": 280298.01376195217,
              "current_borrower_member": 330,
              "current_borrower_count": 609,
              "current_borrower_amount": 17469000,
              "advance": 1745045,
              "principal_advance": 583691.514824884,
              "due": 104000,
              "principal_due": 91737.66676039714,
              "recovery": 64565022,
              "principal_recovery": 57583969.255897805,
              "regular_recovery": 62398383,
              "recoverable": 63081116,
              "recoverable_principle": 58784952.421595275,
              "advance_count": 552,
              "due_count": 19,
              "due_count_principle": 0,
              "due_borrower": 48,
              "due_borrower_principle": 0,
              "recovery_count": 2228,
              "regular_recovery_count": 1639,
              "recoverable_count": 2155,
              "rebate": 160455,
              "wf": 0,
              "outstanding": 10111318,
              "principle_outstanding": 9009030.74410219,
              "due_loan_outstanding": 1184996,
              "due_loan_outstanding_principle": 1045639.3219132945,
              "total_loan_insurance_amount": 665930,
              "total_loan_insurance_premium_amount": 0,
              "total_loan_additinal_fee": 21660,
              "optional_product_current_no_loan": 0,
              "optional_product_expired_no_loan": 0
            }
          },
          "59": {
            "samities": {
              "count": 0,
              "code": ""
            },
            "members": {
              "admission": 0,
              "dropout": 0,
              "detail_admission": "",
              "detail_dropout": "",
              "inactive_members_savings_collection": "0"
            },
            "savings": {
              "cumilative_savings_count": 0,
              "cumilative_opening_deposit_amount": 0,
              "cumilative_deposit_amount": 0,
              "cumilative_int_amount": 0,
              "cumilative_deposit_amount_insurance": 0,
              "cumilative_withdraw_amount": 0,
              "cumilative_withdraw_amount_insurance": 0,
              "product_wise": []
            },
            "skt": {
              "skt_deposit": 0,
              "skt_withdraw": 0
            },
            "loans": {
              "cumilative_disburse_count": 0,
              "cumilative_disburse_amount": 0,
              "cumilative_fully_paid_count": 0,
              "cumilative_fully_paid_amount": 0,
              "expired_borrower_count": 0,
              "expired_borrower_amount": 0,
              "current_expired_borrower_count": 0,
              "current_expired_borrower_member": 0,
              "current_expired_borrower_amount": 0,
              "current_expired_principal_borrower_amount": 0,
              "current_borrower_member": 0,
              "current_borrower_count": 0,
              "current_borrower_amount": 0,
              "advance": 0,
              "principal_advance": 0,
              "due": 0,
              "principal_due": 0,
              "recovery": 0,
              "principal_recovery": 0,
              "regular_recovery": 0,
              "recoverable": 0,
              "recoverable_principle": 0,
              "advance_count": 0,
              "due_count": 0,
              "due_count_principle": 0,
              "due_borrower": 0,
              "due_borrower_principle": 0,
              "recovery_count": 0,
              "regular_recovery_count": 0,
              "recoverable_count": 0,
              "rebate": 0,
              "wf": 0,
              "outstanding": 0,
              "principle_outstanding": 0,
              "due_loan_outstanding": 0,
              "due_loan_outstanding_principle": 0,
              "total_loan_insurance_amount": 0,
              "total_loan_insurance_premium_amount": 0,
              "total_loan_additinal_fee": 0,
              "optional_product_current_no_loan": 0,
              "optional_product_expired_no_loan": 0
            }
          },
          "77": {
            "samities": {
              "count": 0,
              "code": ""
            },
            "members": {
              "admission": 0,
              "dropout": 0,
              "detail_admission": "",
              "detail_dropout": "",
              "inactive_members_savings_collection": "0"
            },
            "savings": {
              "cumilative_savings_count": 0,
              "cumilative_opening_deposit_amount": 0,
              "cumilative_deposit_amount": 0,
              "cumilative_int_amount": 0,
              "cumilative_deposit_amount_insurance": 0,
              "cumilative_withdraw_amount": 0,
              "cumilative_withdraw_amount_insurance": 0,
              "product_wise": []
            },
            "skt": {
              "skt_deposit": 0,
              "skt_withdraw": 0
            },
            "loans": {
              "cumilative_disburse_count": 0,
              "cumilative_disburse_amount": 0,
              "cumilative_fully_paid_count": 0,
              "cumilative_fully_paid_amount": 0,
              "expired_borrower_count": 0,
              "expired_borrower_amount": 0,
              "current_expired_borrower_count": 0,
              "current_expired_borrower_member": 0,
              "current_expired_borrower_amount": 0,
              "current_expired_principal_borrower_amount": 0,
              "current_borrower_member": 0,
              "current_borrower_count": 0,
              "current_borrower_amount": 0,
              "advance": 0,
              "principal_advance": 0,
              "due": 0,
              "principal_due": 0,
              "recovery": 0,
              "principal_recovery": 0,
              "regular_recovery": 0,
              "recoverable": 0,
              "recoverable_principle": 0,
              "advance_count": 0,
              "due_count": 0,
              "due_count_principle": 0,
              "due_borrower": 0,
              "due_borrower_principle": 0,
              "recovery_count": 0,
              "regular_recovery_count": 0,
              "recoverable_count": 0,
              "rebate": 0,
              "wf": 0,
              "outstanding": 0,
              "principle_outstanding": 0,
              "due_loan_outstanding": 0,
              "due_loan_outstanding_principle": 0,
              "total_loan_insurance_amount": 0,
              "total_loan_insurance_premium_amount": 0,
              "total_loan_additinal_fee": 0,
              "optional_product_current_no_loan": 0,
              "optional_product_expired_no_loan": 0
            }
          },
          "85": {
            "samities": {
              "count": 19,
              "code": "001-008,001-010,001-016,001-017,001-044,001-052,001-053,001-054,001-055,001-062,001-068,001-069,001-071,001-078,001-079,001-081,001-084,001-123,001-139"
            },
            "members": {
              "admission": 371,
              "dropout": 0,
              "detail_admission": "371+0",
              "detail_dropout": "",
              "inactive_members_savings_collection": "0"
            },
            "savings": {
              "cumilative_savings_count": 0,
              "cumilative_opening_deposit_amount": 0,
              "cumilative_deposit_amount": 7982838,
              "cumilative_int_amount": 468214,
              "cumilative_deposit_amount_insurance": 0,
              "cumilative_withdraw_amount": 6019423,
              "cumilative_withdraw_amount_insurance": 0,
              "product_wise": {
                "1": {
                  "sum_savings_count": 0,
                  "sum_opening_deposit_amount": 0,
                  "sum_deposit_amount": 0,
                  "sum_withdraw_amount": 0,
                  "cumilative_withdraw_amount": 4823041,
                  "cumilative_int_amount": 420797,
                  "cumilative_deposit_amount": 6595029
                },
                "2": {
                  "sum_savings_count": 0,
                  "sum_opening_deposit_amount": 0,
                  "sum_deposit_amount": 0,
                  "sum_withdraw_amount": 0,
                  "cumilative_withdraw_amount": 1196382,
                  "cumilative_int_amount": 47417,
                  "cumilative_deposit_amount": 1387809
                }
              }
            },
            "skt": {
              "skt_deposit": 0,
              "skt_withdraw": 0
            },
            "loans": {
              "cumilative_disburse_count": 4626,
              "cumilative_disburse_amount": 77158000,
              "cumilative_fully_paid_count": 3954,
              "cumilative_fully_paid_amount": 60358000,
              "expired_borrower_count": 34,
              "expired_borrower_amount": 1306000,
              "current_expired_borrower_count": 34,
              "current_expired_borrower_member": 33,
              "current_expired_borrower_amount": 617976,
              "current_expired_principal_borrower_amount": 549410.6088952844,
              "current_borrower_member": 313,
              "current_borrower_count": 638,
              "current_borrower_amount": 15494000,
              "advance": 882160,
              "principal_advance": 377700.8023224888,
              "due": 150650,
              "principal_due": 132883.54891117598,
              "recovery": 51300996,
              "principal_recovery": 45786374.28185693,
              "regular_recovery": 49650210,
              "recoverable": 51113114,
              "recoverable_principle": 46895349.63734092,
              "advance_count": 456,
              "due_count": 31,
              "due_count_principle": 0,
              "due_borrower": 80,
              "due_borrower_principle": 0,
              "recovery_count": 1946,
              "regular_recovery_count": 1425,
              "recoverable_count": 1914,
              "rebate": 74348,
              "wf": 0,
              "outstanding": 8408686,
              "principle_outstanding": 7572625.718143062,
              "due_loan_outstanding": 1789048,
              "due_loan_outstanding_principle": 1581304.0540791498,
              "total_loan_insurance_amount": 526590,
              "total_loan_insurance_premium_amount": 0,
              "total_loan_additinal_fee": 18120,
              "optional_product_current_no_loan": 0,
              "optional_product_expired_no_loan": 0
            }
          },
          "101": {
            "samities": {
              "count": 17,
              "code": "001-037,001-038,001-048,001-059,001-099,001-105,001-108,001-111,001-112,001-113,001-115,001-116,001-119,001-120,001-122,001-129,001-130"
            },
            "members": {
              "admission": 372,
              "dropout": 0,
              "detail_admission": "372+0",
              "detail_dropout": "",
              "inactive_members_savings_collection": "0"
            },
            "savings": {
              "cumilative_savings_count": 0,
              "cumilative_opening_deposit_amount": 0,
              "cumilative_deposit_amount": 7653667,
              "cumilative_int_amount": 320364,
              "cumilative_deposit_amount_insurance": 0,
              "cumilative_withdraw_amount": 5508767,
              "cumilative_withdraw_amount_insurance": 0,
              "product_wise": {
                "1": {
                  "sum_savings_count": 0,
                  "sum_opening_deposit_amount": 0,
                  "sum_deposit_amount": 0,
                  "sum_withdraw_amount": 0,
                  "cumilative_withdraw_amount": 4510466,
                  "cumilative_int_amount": 281655,
                  "cumilative_deposit_amount": 6517766
                },
                "2": {
                  "sum_savings_count": 0,
                  "sum_opening_deposit_amount": 0,
                  "sum_deposit_amount": 0,
                  "sum_withdraw_amount": 0,
                  "cumilative_withdraw_amount": 998301,
                  "cumilative_int_amount": 38709,
                  "cumilative_deposit_amount": 1135901
                }
              }
            },
            "skt": {
              "skt_deposit": 0,
              "skt_withdraw": 0
            },
            "loans": {
              "cumilative_disburse_count": 2422,
              "cumilative_disburse_amount": 61196000,
              "cumilative_fully_paid_count": 1989,
              "cumilative_fully_paid_amount": 46143000,
              "expired_borrower_count": 19,
              "expired_borrower_amount": 867000,
              "current_expired_borrower_count": 19,
              "current_expired_borrower_member": 19,
              "current_expired_borrower_amount": 314907,
              "current_expired_principal_borrower_amount": 277674.39116827445,
              "current_borrower_member": 303,
              "current_borrower_count": 414,
              "current_borrower_amount": 14186000,
              "advance": 828987,
              "principal_advance": 342703.21570643055,
              "due": 413175,
              "principal_due": 359805.6884896322,
              "recovery": 54133552,
              "principal_recovery": 48135231.844347864,
              "regular_recovery": 52576483,
              "recoverable": 53906684,
              "recoverable_principle": 50461572.70829936,
              "advance_count": 427,
              "due_count": 40,
              "due_count_principle": 0,
              "due_borrower": 79,
              "due_borrower_principle": 0,
              "recovery_count": 1850,
              "regular_recovery_count": 1364,
              "recoverable_count": 1809,
              "rebate": 125963,
              "wf": 0,
              "outstanding": 9217411,
              "principle_outstanding": 8216768.155652132,
              "due_loan_outstanding": 2292837,
              "due_loan_outstanding_principle": 2016218.810170627,
              "total_loan_insurance_amount": 563520,
              "total_loan_insurance_premium_amount": 0,
              "total_loan_additinal_fee": 20600,
              "optional_product_current_no_loan": 0,
              "optional_product_expired_no_loan": 0
            }
          },
          "115": {
            "samities": {
              "count": 20,
              "code": "001-001,001-003,001-020,001-021,001-040,001-041,001-063,001-067,001-072,001-073,001-077,001-102,001-104,001-125,001-126,001-131,001-134,001-135,001-138,001-140"
            },
            "members": {
              "admission": 393,
              "dropout": 0,
              "detail_admission": "393+0",
              "detail_dropout": "",
              "inactive_members_savings_collection": "0"
            },
            "savings": {
              "cumilative_savings_count": 0,
              "cumilative_opening_deposit_amount": 0,
              "cumilative_deposit_amount": 6212558,
              "cumilative_int_amount": 294698,
              "cumilative_deposit_amount_insurance": 0,
              "cumilative_withdraw_amount": 4013488,
              "cumilative_withdraw_amount_insurance": 0,
              "product_wise": {
                "1": {
                  "sum_savings_count": 0,
                  "sum_opening_deposit_amount": 0,
                  "sum_deposit_amount": 0,
                  "sum_withdraw_amount": 0,
                  "cumilative_withdraw_amount": 3321771,
                  "cumilative_int_amount": 265724,
                  "cumilative_deposit_amount": 5365696
                },
                "2": {
                  "sum_savings_count": 0,
                  "sum_opening_deposit_amount": 0,
                  "sum_deposit_amount": 0,
                  "sum_withdraw_amount": 0,
                  "cumilative_withdraw_amount": 691717,
                  "cumilative_int_amount": 28974,
                  "cumilative_deposit_amount": 846862
                }
              }
            },
            "skt": {
              "skt_deposit": 0,
              "skt_withdraw": 0
            },
            "loans": {
              "cumilative_disburse_count": 2913,
              "cumilative_disburse_amount": 56130000,
              "cumilative_fully_paid_count": 2386,
              "cumilative_fully_paid_amount": 40016000,
              "expired_borrower_count": 21,
              "expired_borrower_amount": 634000,
              "current_expired_borrower_count": 21,
              "current_expired_borrower_member": 21,
              "current_expired_borrower_amount": 167385,
              "current_expired_principal_borrower_amount": 149843.47349261842,
              "current_borrower_member": 306,
              "current_borrower_count": 506,
              "current_borrower_amount": 15480000,
              "advance": 904451,
              "principal_advance": 477292.809604148,
              "due": 276150,
              "principal_due": 243469.9050207767,
              "recovery": 39760879,
              "principal_recovery": 35343309.8992071,
              "regular_recovery": 38412893,
              "recoverable": 39224814,
              "recoverable_principle": 37004765.468116365,
              "advance_count": 324,
              "due_count": 45,
              "due_count_principle": 0,
              "due_borrower": 70,
              "due_borrower_principle": 0,
              "recovery_count": 1486,
              "regular_recovery_count": 1096,
              "recoverable_count": 1458,
              "rebate": 75149,
              "wf": 0,
              "outstanding": 9146685,
              "principle_outstanding": 8136690.100792893,
              "due_loan_outstanding": 2393859,
              "due_loan_outstanding_principle": 2112665.6389564225,
              "total_loan_insurance_amount": 434800,
              "total_loan_insurance_premium_amount": 0,
              "total_loan_additinal_fee": 16680,
              "optional_product_current_no_loan": 0,
              "optional_product_expired_no_loan": 0
            }
          },
          "157": {
            "samities": {
              "count": 18,
              "code": "001-002,001-025,001-026,001-046,001-050,001-064,001-082,001-083,001-095,001-096,001-100,001-101,001-109,001-110,001-127,001-133,001-136,001-137"
            },
            "members": {
              "admission": 313,
              "dropout": 0,
              "detail_admission": "313+0",
              "detail_dropout": "",
              "inactive_members_savings_collection": "0"
            },
            "savings": {
              "cumilative_savings_count": 0,
              "cumilative_opening_deposit_amount": 0,
              "cumilative_deposit_amount": 6540230,
              "cumilative_int_amount": 353025,
              "cumilative_deposit_amount_insurance": 0,
              "cumilative_withdraw_amount": 4834127,
              "cumilative_withdraw_amount_insurance": 0,
              "product_wise": {
                "1": {
                  "sum_savings_count": 0,
                  "sum_opening_deposit_amount": 0,
                  "sum_deposit_amount": 0,
                  "sum_withdraw_amount": 0,
                  "cumilative_withdraw_amount": 3888355,
                  "cumilative_int_amount": 311594,
                  "cumilative_deposit_amount": 5436855
                },
                "2": {
                  "sum_savings_count": 0,
                  "sum_opening_deposit_amount": 0,
                  "sum_deposit_amount": 0,
                  "sum_withdraw_amount": 0,
                  "cumilative_withdraw_amount": 945772,
                  "cumilative_int_amount": 41431,
                  "cumilative_deposit_amount": 1103375
                }
              }
            },
            "skt": {
              "skt_deposit": 0,
              "skt_withdraw": 0
            },
            "loans": {
              "cumilative_disburse_count": 3016,
              "cumilative_disburse_amount": 57697000,
              "cumilative_fully_paid_count": 2465,
              "cumilative_fully_paid_amount": 43355000,
              "expired_borrower_count": 25,
              "expired_borrower_amount": 1098000,
              "current_expired_borrower_count": 25,
              "current_expired_borrower_member": 25,
              "current_expired_borrower_amount": 369681,
              "current_expired_principal_borrower_amount": 326312.7353924052,
              "current_borrower_member": 258,
              "current_borrower_count": 526,
              "current_borrower_amount": 13244000,
              "advance": 716025,
              "principal_advance": 355076.9095822786,
              "due": 145800,
              "principal_due": 128816.82132033697,
              "recovery": 44313573,
              "principal_recovery": 39503819.8840346,
              "regular_recovery": 43082067,
              "recoverable": 44033264,
              "recoverable_principle": 40889605.531165056,
              "advance_count": 388,
              "due_count": 20,
              "due_count_principle": 0,
              "due_borrower": 55,
              "due_borrower_principle": 0,
              "recovery_count": 1679,
              "regular_recovery_count": 1246,
              "recoverable_count": 1644,
              "rebate": 79765,
              "wf": 0,
              "outstanding": 6661059,
              "principle_outstanding": 5960180.115965404,
              "due_loan_outstanding": 818965,
              "due_loan_outstanding_principle": 723978.8240605091,
              "total_loan_insurance_amount": 454640,
              "total_loan_insurance_premium_amount": 0,
              "total_loan_additinal_fee": 16020,
              "optional_product_current_no_loan": 0,
              "optional_product_expired_no_loan": 0
            }
          }
        }
      }
      const closing = obj['closing_week'];
      let noOfSamity = 0;
      let memberAdmission = 0;
      let memberCancellation = 0;
      let savingsBalance = 0;
      let dueLoanBalance = 0;
      for (const prop in closing) {
        if (closing.hasOwnProperty(prop)) {
          noOfSamity += parseFloat(closing[prop]['samities']['count']);
          memberAdmission += parseFloat(closing[prop]['members']['admission']);
          memberCancellation += parseFloat(closing[prop]['members']['dropout']);
          savingsBalance += parseFloat(closing[prop]['savings']['cumilative_deposit_amount']);
          dueLoanBalance += parseFloat(closing[prop]['loans']['due']);
        }
      }
      console.log('hello', noOfSamity);
      console.log('memberAdmission', memberAdmission);
      console.log('memberCancellation', memberCancellation);
      console.log('savingsBalance', savingsBalance);
      console.log('dueLoanBalance', dueLoanBalance);
    },
    onChangeSr: function (event, index) {
      this.core_staff_positions[index]['satisfactionRatio'] = event.target.value;
    },
    onChangeRl: function (event, index) {
      this.core_staff_positions[index]['riskLevel'] = event.target.value;
    },
    handleCoreData: function () {
      let userInfo = this.$store.getters['auth/userInfo'];
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          const formData = new FormData();
          for (let i = 0; i < this.core_staff_positions.length; i++) {
            formData.append("staffPositions[" + i + "].code", this.core_staff_positions[i]['code']);
            formData.append("staffPositions[" + i + "].name", this.core_staff_positions[i]['name']);
            if (this.core_staff_positions[i]['organizationJoiningDate']) {
              formData.append("staffPositions[" + i + "].organizationJoiningDate", this.core_staff_positions[i]['organizationJoiningDate']);
            }
            if (this.core_staff_positions[i]['branchJoiningDate']) {
              formData.append("staffPositions[" + i + "].branchJoiningDate", this.core_staff_positions[i]['branchJoiningDate']);
            }
            formData.append("staffPositions[" + i + "].designation", this.core_staff_positions[i]['designation']);
            formData.append("staffPositions[" + i + "].address", this.core_staff_positions[i]['address']);
            formData.append("staffPositions[" + i + "].satisfactionRatio", this.core_staff_positions[i]['satisfactionRatio']);
            formData.append("staffPositions[" + i + "].riskLevel", this.core_staff_positions[i]['riskLevel']);
            formData.append("staffPositions[" + i + "].comment", this.core_staff_positions[i]['comment']);
            formData.append("staffPositions[" + i + "].createdBy", userInfo['id']);
            formData.append("staffPositions[" + i + "].scheduleId", localStorage.getItem('schedule'));
          }
          this.$axios
            .post("/staff_positions/addAll", formData)
            .then(res => {
              if (res.data.validation_error) {
                this.error_message = res.data.validation_error;
              } else {
                let status = 'failed';
                if (res.data.statusCode === 200) {
                  status = 'success';
                  this.loadData(this.pagination.offset);
                  this.handleReset();
                } else if (res.data.statusCode === 202) {
                  status = 'warning';
                }
                this.flashMessage(status, res.data.message);
                if (status === 'success') {
                  this.$emit('close', true);
                }
              }
            });
        }
      }).catch(() => {
        this.$toast.error({title: 'error', message: "Invalid Field"});
      });
    },
  }
}
