import FormGenerator from "@/containers/normal_forms/FormGenerator";
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import CustomModal from '@/containers/Modal';
import {ROW_PER_PAGE} from "@/shared/common/config";
import {$http_core_service} from "@/shared/common/core-service";
import StorageService from "@/shared/common/storage.service";

export default {
  name: "Save",
  components: {
    FormGenerator, CommonIndex, Pagination, CustomModal
  },
  // inject: ['$validator'],
  props: {
    id: null,
    extra_param: Object,
  },
  data() {
    return {
      page_title: this.$t("field") + " " + this.$t("officer") + " " + this.$t("wise") + " " + this.$t("performance") + " " + this.$t("analysis"),
      scheduleName: localStorage.getItem('schedule_name'),
      locationName: localStorage.getItem('location_name'),
      schema: {
        txt_name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("name"),
          vvalidate: "required"
        },
        txt_code: {
          fieldType: "TextInput",
          fieldName: "code",
          label: this.$t("code"),
          vvalidate: "required"
        },
        txt_number_of_samity: {
          fieldType: "NumberInput",
          fieldName: "numberOfSamity",
          label: this.$t("number") + ' ' + this.$t("of") + ' ' + this.$t("samity"),
          vvalidate: "required|min_value:0"
        },
        txt_number_of_member: {
          fieldType: "NumberInput",
          fieldName: "numberOfMember",
          label: this.$t("number") + ' ' + this.$t("of") + ' ' + this.$t("member"),
          vvalidate: "required|min_value:0"
        },
        txt_number_of_loan: {
          fieldType: "NumberInput",
          fieldName: "numberOfLoan",
          label: this.$t("number") + ' ' + this.$t("of") + ' ' + this.$t("loan"),
          vvalidate: "required|min_value:0"
        },
        txt_savings_balance: {
          fieldType: "NumberInput",
          fieldName: "savingsBalance",
          label: this.$t("savings") + ' ' + this.$t("balance"),
          vvalidate: "required|min_value:0"
        },
        txt_loan_balance: {
          fieldType: "NumberInput",
          fieldName: "loanBalance",
          label: this.$t("loan") + ' ' + this.$t("balance"),
          vvalidate: "required|min_value:0"
        },
        txt_current_due_loan: {
          fieldType: "NumberInput",
          fieldName: "currentDueLoan",
          label: this.$t("current") + ' ' + this.$t("due") + ' ' + this.$t("loan"),
          vvalidate: "required|min_value:0"
        },
        txt_total_due_loan: {
          fieldType: "NumberInput",
          fieldName: "totalDueLoan",
          label: this.$t("total") + ' ' + this.$t("due") + ' ' + this.$t("loan"),
          vvalidate: "required|min_value:0"
        },
        txt_current_due_balance: {
          fieldType: "NumberInput",
          fieldName: "currentDueBalance",
          label: this.$t("current") + ' ' + this.$t("due") + ' ' + this.$t("balance"),
          vvalidate: "required|min_value:0"
        },
        txt_total_due_balance: {
          fieldType: "NumberInput",
          fieldName: "totalDueBalance",
          label: this.$t("total") + ' ' + this.$t("due") + ' ' + this.$t("balance"),
          vvalidate: "required|min_value:0"
        },
        txt_satisfaction_ratio: {
          fieldType: "SelectList",
          fieldName: "satisfactionRatio",
          label: this.$t("satisfaction") + " " + this.$t("ratio"),
          options: {'': "--" + this.$t("select") + "--"},
          onChange: true,
          vvalidate: "required"
        },
        txt_risk_level: {
          fieldType: "SelectList",
          fieldName: "riskLevel",
          label: this.$t("risk") + " " + this.$t("level"),
          options: {'': "--" + this.$t("select") + "--"},
          onChange: true,
          vvalidate: "required"
        },
        // txt_comment: {
        //   fieldType: "TextInput",
        //   fieldName: "comment",
        //   label: this.$t("comment"),
        //   vvalidate: "required"
        // },
        txt_comment: {
          fieldType: "TextEditor",
          fieldName: "comment",
          label: this.$t("comments"),
          vvalidate: "required",
        },
      },
      resetData: {},
      is_form_load: false,
      error_message: [],
      form_data: {},
      formErrors: [],
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "audit_executions/field_officer_wise_performance_analysis/Edit",
      },
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: "name", label: this.$t('name'), sortable: true},
        {
          key: "numberOfSamity",
          label: this.$t('number') + ' ' + this.$t('of') + ' ' + this.$t('samity'),
          sortable: true
        },
        {
          key: "numberOfMember",
          label: this.$t('number') + ' ' + this.$t('of') + ' ' + this.$t('member'),
          sortable: true
        },
        {
          key: "numberOfLoan",
          label: this.$t('number') + ' ' + this.$t('of') + ' ' + this.$t('loan'),
          sortable: true
        },
        {key: "savingsBalance", label: this.$t('savings') + ' ' + this.$t('balance'), sortable: true},
        {key: "loanBalance", label: this.$t('loan') + ' ' + this.$t('balance'), sortable: true},
        {
          key: "currentDueLoan",
          label: this.$t('current') + ' ' + this.$t('due') + ' ' + this.$t('loan'),
          sortable: true
        },
        {
          key: "totalDueLoan",
          label: this.$t('total') + ' ' + this.$t('due') + ' ' + this.$t('loan'),
          sortable: true
        },
        {
          key: "currentDueBalance",
          label: this.$t('current') + ' ' + this.$t('due') + ' ' + this.$t('balance'),
          sortable: true
        },
        {
          key: "totalDueBalance",
          label: this.$t('total') + ' ' + this.$t('due') + ' ' + this.$t('balance'),
          sortable: true
        },
        {
          key: "satisfactionRatio",
          label: this.$t('satisfaction') + ' ' + this.$t('ratio'),
        },
        {
          key: "riskLevel",
          label: this.$t('risk') + ' ' + this.$t('level'),
        },
        {
          key: "html_1",
          label: this.$t('comment'),
        },
        {key: 'actions', label: this.$t('actions'), sortable: false}
      ],
      performanceAnalysis: [],
      isMfiAudit: false,
      auditExecutionMastersId: null,
      corePerformanceAnalysis: [],
      riskLevels: [
        {
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
        }
      ],
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
    }
  },
  mounted() {
    this.schema['txt_risk_level']['options'] = this.riskLevels;
    this.schema['txt_satisfaction_ratio']['options'] = this.satisfactionRatios;
    this.loadData(this.pagination.offset);
    this.auditExecutionMastersId = isNaN(this.$route.params.auditExecutionMastersId) ? '' : this.$route.params.auditExecutionMastersId;
    const data = StorageService.getGeneralConfig();
    this.isMfiAudit = !!Number(data['is_mfi_audit']);
    if (this.isMfiAudit && this.auditExecutionMastersId) {
      this.is_form_load = false;
      this.isMfiAudit = false;
    } else if (this.isMfiAudit && this.auditExecutionMastersId === '') {
      this.is_form_load = false;
      this.getFieldOfficerInfoFromCoreService();
      this.isMfiAudit = true;
    } else {
      this.loadData();
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
      this.$axios.post("/field_officer_performance_analysis", null, {params: param})
        .then(res => {
          if (res.status === 204) {
            this.performanceAnalysis = [];
            return;
          }
          this.performanceAnalysis = res.data.data.content;
          this.pagination.total_rows = res.data.data['totalElements'];
          this.pagination.offset = res.data.data['pageable']['offset'];
          if (this.performanceAnalysis.length > 0) {
            for (let i = 0; i < this.performanceAnalysis.length; i++) {
              this.performanceAnalysis[i]['name'] = '[' + this.performanceAnalysis[i]['code'] + ']' + this.performanceAnalysis[i]['name'];
              this.performanceAnalysis[i]['numberOfSamity'] = this.performanceAnalysis[i]['numberOfSamity'];
              this.performanceAnalysis[i]['numberOfMember'] = this.performanceAnalysis[i]['numberOfMember'];
              this.performanceAnalysis[i]['numberOfLoan'] = this.performanceAnalysis[i]['numberOfLoan'];
              this.performanceAnalysis[i]['savingsBalance'] = this.performanceAnalysis[i]['savingsBalance'];
              this.performanceAnalysis[i]['loanBalance'] = this.performanceAnalysis[i]['loanBalance'];
              this.performanceAnalysis[i]['currentDueLoan'] = this.performanceAnalysis[i]['currentDueLoan'];
              this.performanceAnalysis[i]['totalDueLoan'] = this.performanceAnalysis[i]['totalDueLoan'];
              this.performanceAnalysis[i]['currentDueBalance'] = this.performanceAnalysis[i]['currentDueBalance'];
              this.performanceAnalysis[i]['totalDueBalance'] = this.performanceAnalysis[i]['totalDueBalance'];
              this.performanceAnalysis[i]['satisfactionRatio'] = this.getSatisfactionRatioValue(this.performanceAnalysis[i]['satisfactionRatio']);
              this.performanceAnalysis[i]['riskLevel'] = this.performanceAnalysis[i]['riskLevel'];
              this.performanceAnalysis[i]['html_1'] = this.performanceAnalysis[i]['comment'];
              this.performanceAnalysis[i]['edit'] = 1;
              this.performanceAnalysis[i]['delete'] = 1;
            }
          }
        });
    },
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.form_data['scheduleId'] = localStorage.getItem('schedule');
          if (this.auditExecutionMastersId) {
            this.form_data['auditExecutionMastersId'] = this.auditExecutionMastersId;
          }
          let url = '/field_officer_performance_analysis/add';
          let headers = {
            headers: {
              'Content-Type': `application/json`
            }
          }
          this.$axios
            .post(url, JSON.stringify(this.form_data), headers)
            .then(res => {
              if (res.data.validation_error) {
                this.error_message = res.data.validation_error;
              } else {
                let status = 'failed';
                if (res.data.statusCode === 200) {
                  this.$router.replace({
                    params: {auditExecutionMastersId: res.data.data.auditExecutionMastersId}
                  });
                  status = 'success';
                  this.handleReset();
                  this.loadData(this.pagination.offset);
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
    customModal: function (data) {
      if (data.id) {
        this.modal_info.title = this.$t('edit') + " " + this.$t("field") + " " + this.$t("officer") + " " + this.$t("wise") + " " + this.$t("performance") + " " + this.$t("analysis");
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      } else {
        this.modal_info.id = null;
        this.modal_info.title = this.$t('add') + " " + this.$t("field") + " " + this.$t("officer") + " " + this.$t("wise") + " " + this.$t("performance") + " " + this.$t("analysis");
        this.modal_info.isModalVisible = true;
      }
    },
    closeModal(is_reload = false) {
      this.modal_info.isModalVisible = false;
      if (is_reload === true) {
        this.loadData(0);
      }
    },
    customDelete(itemData) {
      let delete_data = [{
        url: '/field_officer_performance_analysis/delete',
        field_id: 'id'
      }];
      let id = itemData['id'];
      this.confirmMessage(id, delete_data, false);
    },
    clear: function () {
      this.search_form_data.name = '';
      this.search_form_data.code = '';
      this.loadData(0);
    },
    customEdit: function (data) {
      if (data.id) {
        this.modal_info.title = this.$t('edit') + " " + this.$t('field') + " " + this.$t('officer') + ' ' + this.$t('wise') + ' ' + this.$t('performance') + ' ' + this.$t('analysis');
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      }
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
    handleBack: function () {
      this.$router.push('/audit-execution/field-officer-wise-performance-analysis/index');
    },
    handleReset: function () {
      this.child_error_message = [];
      this.$set(this.form_data, "name", '');
      this.$set(this.form_data, "code", '');
      this.$set(this.form_data, "numberOfSamity", '');
      this.$set(this.form_data, "numberOfMember", '');
      this.$set(this.form_data, "numberOfLoan", '');
      this.$set(this.form_data, "currentDueLoan", '');
      this.$set(this.form_data, "totalDueLoan", '');
      this.$set(this.form_data, "savingsBalance", '');
      this.$set(this.form_data, "savingsBalance", '');
      this.$set(this.form_data, "loanBalance", '');
      this.$set(this.form_data, "currentDueBalance", '');
      this.$set(this.form_data, "totalDueBalance", '');
      this.$set(this.form_data, "satisfactionRatio", '');
      this.$set(this.form_data, "riskLevel", '');
      this.$set(this.form_data, "comment", '');
      this.errors.clear();
      this.$validator.reset();
    },
    handleCancel: function () {
      this.$emit('close');
    },
/*    const obj = {
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
        }
      }
    }*/
    getFieldOfficerInfoFromCoreService: function () {
      let noOfSamity = 0;
      let memberAdmission = 0;
      let memberCancellation = 0;
      let savingsBalance = 0;
      let dueLoanBalance = 0;

      const locationId = localStorage.getItem('api_location_id');
      const auditPeriodFromDate = localStorage.getItem('auditPeriodFromDate');
      const auditPeriodToDate = localStorage.getItem('auditPeriodToDate');
      const url = 'ams_staff_positions/field_officer_performance_analysis';
      $http_core_service.post(url, JSON.stringify({
        'locationId': locationId,
        "auditPeriodFromDate": auditPeriodFromDate,
        "auditPeriodToDate": auditPeriodToDate
      }))
        .then((response) => {
          const myData = response.data;
          const closing = response.data['closing_week'];
          for (const prop in closing) {
            if (closing.hasOwnProperty(prop)) {
              noOfSamity += parseFloat(closing[prop]['samities']['count']);
              memberAdmission += parseFloat(closing[prop]['members']['admission']);
              memberCancellation += parseFloat(closing[prop]['members']['dropout']);
              savingsBalance += parseFloat(closing[prop]['savings']['cumilative_deposit_amount']);
              dueLoanBalance += parseFloat(closing[prop]['loans']['due']);
            }
          }
          if (myData.length > 0) {
            for (let i = 0; i < myData.length; i++) {
              this.corePerformanceAnalysis.push({
                ...myData[i],
                comment: '',
                riskLevel: '',
                satisfactionRatio: ''
              });
            }
          }
        }).catch(function (error) {
        console.error("error", error);
      });
    },
    onChangeSr: function (event, index) {
      this.corePerformanceAnalysis[index]['satisfactionRatio'] = event.target.value;
    },
    onChangeRl: function (event, index) {
      this.corePerformanceAnalysis[index]['riskLevel'] = event.target.value;
    },
    handleSubmitCoreData: function () {
      let userInfo = this.$store.getters['auth/userInfo'];
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          const myArray = [];
          for (let i = 0; i < this.corePerformanceAnalysis.length; i++) {
            myArray.push({
              ...this.corePerformanceAnalysis[i],
              createdBy: userInfo['id'],
              scheduleId: localStorage.getItem('schedule')
            });
          }
          const config = {headers: {"Content-Type": "application/json"}};
          this.$axios
            .post("/field_officer_performance_analysis/addAll", JSON.stringify(myArray), config)
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
    }
  }
}
