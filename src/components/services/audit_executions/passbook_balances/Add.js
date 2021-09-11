import NormalForm from "@/containers/normal_forms/FormGenerator";
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import {ROW_PER_PAGE} from "@/shared/common/config";
import CustomModal from '@/containers/Modal';
import {$http_core_service} from '@/shared/common/core-service';
import StorageService from "@/shared/common/storage.service";

export default {
  components: {NormalForm, CommonIndex, Pagination, CustomModal},
  data() {
    return {
      page_title: this.$t("passbook") + " " + this.$t("balance"),
      locationName: '',
      scheduleName: '',
      schema: {
        txt_samity_code: {
          fieldType: "TextInput",
          fieldName: "samityCode",
          label: this.$t("samity") + " " + this.$t("code"),
          vvalidate: "required"
        },
        txt_samity_name: {
          fieldType: "TextInput",
          fieldName: "samityName",
          label: this.$t("samity") + ' ' + this.$t("name"),
          vvalidate: "required"
        },
        txt_member_code: {
          fieldType: "TextInput",
          fieldName: "memberCode",
          label: this.$t("member") + ' ' + this.$t("code"),
          vvalidate: "required"
        },
        txt_member_name: {
          fieldType: "TextInput",
          fieldName: "memberName",
          label: this.$t("member") + ' ' + this.$t("name"),
          vvalidate: "required"
        },
        txt_loan_code: {
          fieldType: "TextInput",
          fieldName: "loanCode",
          label: this.$t("loan") + " " + this.$t("code"),
          vvalidate: "required",
        },
        txt_outstanding: {
          fieldType: "NumberInput",
          fieldName: "outstanding",
          label: this.$t("outstanding"),
          vvalidate: "required",
          onChange: true
        },
        txt_passbook_outstanding: {
          fieldType: "NumberInput",
          fieldName: "passbookOutstanding",
          label: this.$t("passbook") + ' ' + this.$t("outstanding"),
          vvalidate: "required",
          onChange: true
        },
        txt_loan_difference: {
          fieldType: "NumberInput",
          fieldName: "loanDifference",
          label: this.$t("loan") + ' ' + this.$t("difference"),
          isDisabled: true,
          vvalidate: "required",
          onChange: true,
        },
        txt_savings_code: {
          fieldType: "TextInput",
          fieldName: "savingsCode",
          label: this.$t("savings") + ' ' + this.$t("code"),
          vvalidate: "required"
        },
        txt_savings: {
          fieldType: "NumberInput",
          fieldName: "savings",
          label: this.$t("savings"),
          vvalidate: "required",
          onChange: true
        },
        txt_passbook_savings: {
          fieldType: "NumberInput",
          fieldName: "passbookSavings",
          label: this.$t("passbook") + ' ' + this.$t("savings"),
          vvalidate: "required",
          onChange: true
        },
        txt_savings_difference: {
          fieldType: "NumberInput",
          fieldName: "savingsDifference",
          label: this.$t("savings") + ' ' + this.$t("difference"),
          isDisabled: true,
          onChange: true,
          vvalidate: "required"
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
        {key: "samityName", label: this.$t('samity') + ' ' + this.$t("name"), sortable: true},
        {
          key: "memberName",
          label: this.$t("member") + ' ' + this.$t("name"),
          sortable: true
        },
        {key: "loanCode", label: this.$t("loan") + ' ' + this.$t("code"), sortable: true},
        {key: "outstanding", label: this.$t("outstanding"), sortable: true},
        {key: "passbookOutstanding", label: this.$t("passbook") + ' ' + this.$t("outstanding"), sortable: true},
        {key: "savingsCode", label: this.$t("savings") + ' ' + this.$t("code"), sortable: true},
        {key: "savings", label: this.$t("savings"), sortable: true},
        {key: "passbookSavings", label: this.$t("passbook") + ' ' + this.$t("savings"), sortable: true},
        {key: "satisfactionRatio", label: this.$t("satisfaction") + ' ' + this.$t("ratio"), sortable: true},
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
        component_address: "audit_executions/passbook_balances/Edit",
      },
      passbook_balances: [],
      core_passbook_balances: [],
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
    this.loadData(0);
    const data = StorageService.getGeneralConfig();
    this.isMfiAudit = !!Number(data['is_mfi_audit']);
    if (this.isMfiAudit && this.auditExecutionMastersId) {
      this.is_form_load = false;
      this.isMfiAudit = false;
    } else if (this.isMfiAudit && this.auditExecutionMastersId === '') {
      this.is_form_load = false;
      this.getPassbookBalanceFromCoreService();
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
      this.$axios.post("/passbook_balances", null, {params: param})
        .then(res => {
          if (res.status === 204) {
            this.passbook_balances = [];
            return;
          }

          this.passbook_balances = res.data.data.content;
          this.pagination.total_rows = res.data.data['totalElements'];
          this.pagination.offset = res.data.data['pageable']['offset'];
          if (this.passbook_balances.length > 0) {
            for (let i = 0; i < this.passbook_balances.length; i++) {
              this.passbook_balances[i]['samityName'] = '[' + this.passbook_balances[i]['samityCode'] + '] ' + this.passbook_balances[i]['samityName'];
              this.passbook_balances[i]['memberName'] = '[' + this.passbook_balances[i]['memberCode'] + '] ' + this.passbook_balances[i]['memberName'];
              this.passbook_balances[i]['loanCode'] = this.passbook_balances[i]['loanCode'];
              this.passbook_balances[i]['outstanding'] = this.passbook_balances[i]['outstanding'];
              this.passbook_balances[i]['passbookOutstanding'] = this.passbook_balances[i]['passbookOutstanding'];
              this.passbook_balances[i]['savingsCode'] = this.passbook_balances[i]['savingsCode'];
              this.passbook_balances[i]['savings'] = this.passbook_balances[i]['savings'];
              this.passbook_balances[i]['passbookSavings'] = this.passbook_balances[i]['passbookSavings'];
              this.passbook_balances[i]['satisfactionRatio'] = this.getSatisfactionRatioValue(this.passbook_balances[i]['satisfactionRatio']);
              this.passbook_balances[i]['riskLevel'] = this.passbook_balances[i]['riskLevel'];
              this.passbook_balances[i]['html_1'] = this.passbook_balances[i]['comment'];
              this.passbook_balances[i]['edit'] = 1;
              this.passbook_balances[i]['delete'] = 1;
            }
          }
        });
      const auditExecutionMastersId = this.$route.params.auditExecutionMastersId;
      if (this.auditExecutionMastersId) {
        const page = (offset === 0) ? offset : (offset / ROW_PER_PAGE);
        const param = {
          'size': ROW_PER_PAGE,
          'page': page,
          'sort': 'createdOn,desc',
          'auditExecutionMastersId': auditExecutionMastersId
        }
        this.$axios.post("/passbook_balances", null, {params: param})
          .then(res => {
            if (res.status === 204) {
              this.passbook_balances = [];
              return;
            }
            this.passbook_balances = res.data.data.content;
            this.pagination.total_rows = res.data.data['totalElements'];
            this.pagination.offset = res.data.data['pageable']['offset'];
            if (this.passbook_balances.length > 0) {
              for (let i = 0; i < this.passbook_balances.length; i++) {
                this.passbook_balances[i]['samityName'] = '[' + this.passbook_balances[i]['samityCode'] + '] ' + this.passbook_balances[i]['samityName'];
                this.passbook_balances[i]['memberName'] = '[' + this.passbook_balances[i]['memberCode'] + '] ' + this.passbook_balances[i]['memberName'];
                this.passbook_balances[i]['loanCode'] = this.passbook_balances[i]['loanCode'];
                this.passbook_balances[i]['outstanding'] = this.passbook_balances[i]['outstanding'];
                this.passbook_balances[i]['passbookOutstanding'] = this.passbook_balances[i]['passbookOutstanding'];
                this.passbook_balances[i]['savingsCode'] = this.passbook_balances[i]['savingsCode'];
                this.passbook_balances[i]['savings'] = this.passbook_balances[i]['savings'];
                this.passbook_balances[i]['passbookSavings'] = this.passbook_balances[i]['passbookSavings'];
                this.passbook_balances[i]['satisfactionRatio'] = this.getSatisfactionRatioValue(this.passbook_balances[i]['satisfactionRatio']);
                this.passbook_balances[i]['riskLevel'] = this.passbook_balances[i]['riskLevel'];
                this.passbook_balances[i]['html_1'] = this.passbook_balances[i]['comment'];
                this.passbook_balances[i]['edit'] = 1;
                this.passbook_balances[i]['delete'] = 1;
              }
            }
          });
      }
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

          if (!isNaN(this.auditExecutionMastersId)) {
            this.form_data['auditExecutionMasterId'] = this.auditExecutionMastersId;
          }

          const config = {headers: {"Content-Type": "application/json"}};

          this.$axios
            .post("/passbook_balances/add", JSON.stringify(this.form_data), config)
            .then(res => {
              if (res.data.validation_error) {
                this.error_message = res.data.validation_error;
              } else {
                let status = 'failed';
                if (res.data.statusCode === 200) {
                  this.$router.replace({
                    params: {auditExecutionMastersId: res.data.data.auditExecutionMasterId}
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
      this.$set(this.form_data, "samityCode", this.reset_data['samityCode']);
      this.$set(this.form_data, "samityName", this.reset_data['samityName']);
      this.$set(this.form_data, "memberCode", this.reset_data['memberCode']);
      this.$set(this.form_data, "memberName", this.reset_data['memberName']);
      this.$set(this.form_data, "loanCode", this.reset_data['loanCode']);
      this.$set(this.form_data, "outstanding", this.reset_data['outstanding']);
      this.$set(this.form_data, "passbookOutstanding", this.reset_data['passbookOutstanding']);
      this.$set(this.form_data, "loanDifference", this.reset_data['loanDifference']);
      this.$set(this.form_data, "savingsCode", this.reset_data['savingsCode']);
      this.$set(this.form_data, "savings", this.reset_data['savings']);
      this.$set(this.form_data, "passbookSavings", this.reset_data['passbookSavings']);
      this.$set(this.form_data, "savingsDifference", this.reset_data['savingsDifference']);
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
      this.$router.push('/audit-execution/passbook-balances/index');
    },
    customEdit: function (data) {
      if (data.id) {
        this.modal_info.title = this.$t('edit') + " " + this.$t('passbook') + " " + this.$t('balance');
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      }
    },
    customDelete(itemData) {
      let delete_data = [{
        url: '/passbook_balances/delete',
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
    getPassbookBalanceFromCoreService: function () {
      const locationId = localStorage.getItem('api_location_id');
      const auditPeriodFromDate = localStorage.getItem('auditPeriodFromDate');
      const auditPeriodToDate = localStorage.getItem('auditPeriodToDate');
      const url = 'ams_staff_positions/get_passbook_balances';
      $http_core_service.post(url, JSON.stringify({
        'locationId': locationId,
        'auditPeriodFromDate': auditPeriodFromDate,
        'auditPeriodToDate': auditPeriodToDate
      }))
        .then((response) => {
          const myData = response.data;
          if (myData.length > 0) {
            for (let i = 0; i < myData.length; i++) {
              this.core_passbook_balances.push({
                ...myData[i],
                passbookOutstanding: 0,
                passbookSavings: 0,
                loanDifference: 0,
                savingsDifference: 0,
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
      this.core_passbook_balances[index]['satisfactionRatio'] = event.target.value;
    },
    onChangeRl: function (event, index) {
      this.core_passbook_balances[index]['riskLevel'] = event.target.value;
    },
    handleSubmitCoreData: function () {
      let userInfo = this.$store.getters['auth/userInfo'];
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          for (let i = 0; i < this.core_passbook_balances.length; i++) {
            this.core_passbook_balances[i]['createdBy'] = userInfo['id'];
            this.core_passbook_balances[i]['scheduleId'] = localStorage.getItem('schedule');
          }
          // console.log(this.core_passbook_balances)
          const config = {headers: {"Content-Type": "application/json"}};
          this.$axios
            .post("/passbook_balances/addAll", JSON.stringify(this.core_passbook_balances), config)
            .then(res => {
              if (res.data.validation_error) {
                this.error_message = res.data.validation_error;
              } else {
                let status = 'failed';
                if (res.data.statusCode === 200) {
                  this.$router.replace({
                    params: {auditExecutionMastersId: res.data.data.auditExecutionMasterId}
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
    onChangeMethod(field, value) {
      if (field === 'savings' || field === 'passbookSavings') {
        let savings = this.form_data['savings'];
        let passbookSavings = this.form_data['passbookSavings'];
        savings = isNaN(parseFloat(savings)) ? 0 : parseFloat(savings)
        passbookSavings = isNaN(parseFloat(passbookSavings)) ? 0 : parseFloat(passbookSavings)
        this.$set(this.form_data, 'savingsDifference', savings - passbookSavings);
      } else if (field === 'outstanding' || field === 'passbookOutstanding') {
        let out = this.form_data['outstanding'];
        let passbookOut = this.form_data['passbookOutstanding'];
        out = isNaN(parseFloat(out)) ? 0 : parseFloat(out)
        passbookOut = isNaN(parseFloat(passbookOut)) ? 0 : parseFloat(passbookOut)
        this.$set(this.form_data, 'loanDifference', out - passbookOut);
      }
    },
  },
  watch: {
    core_passbook_balances: {
      handler: function (newval, oldval) {
        this.core_passbook_balances.forEach(p => {
          p.loanDifference = p.outstanding - p.passbookOutstanding;
          p.savingsDifference = p.savings - p.passbookSavings;
        });
      }, deep: true
    }
  }
}
