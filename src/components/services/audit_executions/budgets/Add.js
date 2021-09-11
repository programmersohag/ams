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
  inject: ['$validator'],
  props: {
    id: null,
    extra_param: Object,
  },
  data() {
    return {
      page_title: this.$t("budgets"),
      scheduleName: localStorage.getItem('schedule_name'),
      locationName: localStorage.getItem('location_name'),
      schema: {
        txt_budgetHead: {
          fieldType: "TextInput",
          fieldName: "budgetHead",
          label: this.$t("budget") + ' ' + this.$t("head"),
          vvalidate: "required"
        },

        txt_yearlyApprovedBudget: {
          fieldType: "NumberInput",
          fieldName: "yearlyApprovedBudget",
          label: this.$t("yearly") + ' ' + this.$t("approved") + ' ' + this.$t("budget"),
          vvalidate: "required|min_value:0"
        },
        txt_yearlyReviseBudget: {
          fieldType: "NumberInput",
          fieldName: "yearlyReviseBudget",
          label: this.$t("yearly") + ' ' + this.$t("revise") + ' ' + this.$t("budget"),
          vvalidate: "required|min_value:0"
        },
        txt_auditingPeriodBudget: {
          fieldType: "NumberInput",
          fieldName: "auditingPeriodBudget",
          label: this.$t("auditing") + ' ' + this.$t("period") + ' ' + this.$t("budget"),
          vvalidate: "required|min_value:0"
        },
        txt_expenditureUpToPreviousMonth: {
          fieldType: "NumberInput",
          fieldName: "expenditureUpToPreviousMonth",
          label: this.$t("expenditure") + ' ' + this.$t("up") + ' ' + this.$t("to") + ' ' + this.$t("previous") + ' ' + this.$t("month"),
          vvalidate: "required|min_value:0"
        },
        txt_expenditureAuditingMonth: {
          fieldType: "NumberInput",
          fieldName: "expenditureAuditingMonth",
          label: this.$t("expenditure") + ' ' + this.$t("auditing") + ' ' + this.$t("month"),
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
        component_address: "audit_executions/budgets/Edit",
      },
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: "budgetHead", label: this.$t('budget') + ' ' + this.$t('head'), sortable: true},
        {
          key: "yearlyApprovedBudget",
          label: this.$t('yearly') + ' ' + this.$t('approved') + ' ' + this.$t('budget'),
          sortable: true
        },
        {
          key: "yearlyReviseBudget",
          label: this.$t('yearly') + ' ' + this.$t('revise') + ' ' + this.$t('budget'),
          sortable: true
        },
        {
          key: "yearlyTotalBudget",
          label: this.$t('yearly') + ' ' + this.$t('total') + ' ' + this.$t('budget'),
          sortable: true
        },
        {
          key: "auditingPeriodBudget",
          label: this.$t('auditing') + ' ' + this.$t('period') + ' ' + this.$t('budget'),
          sortable: true
        },
        {
          key: "expenditureUpToPreviousMonth",
          label: this.$t('expenditure') + ' ' + this.$t('up') + ' ' + this.$t('to') + ' ' + this.$t('previous') + ' ' + this.$t('month'),
          sortable: true
        },
        {
          key: "expenditureAuditingMonth",
          label: this.$t('expenditure') + ' ' + this.$t('auditing') + ' ' + this.$t('month'),
          sortable: true
        },
        {key: "totalExpenditure", label: this.$t('total') + ' ' + this.$t('expenditure'), sortable: true},
        {
          key: "budgetVarianceSelectedMonth",
          label: this.$t('budget') + ' ' + this.$t('variance') + ' ' + this.$t('selected') + ' ' + this.$t('month'),
          sortable: true
        },
        {key: "remainingBudget", label: this.$t('remaining') + ' ' + this.$t('budget'), sortable: true},
        {
          key: "satisfactionRatio",
          label: this.$t('satisfaction') + ' ' + this.$t('ratio'),
        },
        {
          key: "riskLevel",
          label: this.$t('risk') + ' ' + this.$t('level'),
        },
        {key: "html_1", label: this.$t('comment'), sortable: true},
        {key: 'actions', label: this.$t('actions'), sortable: false}
      ],
      budgets: [],
      core_budgets: [],
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
        }],
      isMfiAudit: false,
      isEdit: false,
      auditExecutionMastersId: null,
      processedApiBudgetsData: [],
      auditPeriodFromDate: null,
      auditPeriodToDate: null,
    }
  },
  mounted() {
    this.getSatisfactionRatio();
    this.getRiskLevel();
    this.is_form_load = true;
    const data = StorageService.getGeneralConfig();
    this.isMfiAudit = !!Number(data['is_mfi_audit']);
    this.auditExecutionMastersId = isNaN(this.$route.params.auditExecutionMastersId) ? '' : this.$route.params.auditExecutionMastersId;
    this.loadData(this.pagination.offset);
    if (this.isMfiAudit && this.auditExecutionMastersId) {
      this.is_form_load = false;
      this.isMfiAudit = false;
    } else if (this.isMfiAudit && this.auditExecutionMastersId === '') {
      this.is_form_load = false;
      this.getBudgetsFromCoreService();
      this.isMfiAudit = true;
    } else {
      this.is_form_load = true;
      this.isMfiAudit = false;
    }
  },
  methods: {
    loadData: function (offset = 0) {
      const page = (offset === 0) ? offset : (offset / ROW_PER_PAGE);
      const param = {'size': ROW_PER_PAGE, 'page': page}

      const scheduleId = localStorage.getItem('schedule');  // for add operation
      const auditExecutionMastersId = this.$route.query.id;   //for edit operation

      if (auditExecutionMastersId === undefined) {  // add operation
        param.scheduleId = scheduleId;
      } else {                                      // edit operation
        param.auditExecutionMastersId = auditExecutionMastersId;
      }

      this.$axios.post("/budgets", null, {params: param})
        .then(res => {
          if (res.status === 204) {
            this.budgets = [];
            return;
          }

          this.budgets = res.data.data.content;
          this.pagination.total_rows = res.data.data['totalElements'];
          this.pagination.offset = res.data.data['pageable']['offset'];
          if (this.budgets.length > 0) {
            for (let i = 0; i < this.budgets.length; i++) {
              this.budgets[i]['budgetHead'] = this.budgets[i]['budgetHead'];
              this.budgets[i]['yearlyApprovedBudget'] = this.budgets[i]['yearlyApprovedBudget'];
              this.budgets[i]['yearlyReviseBudget'] = this.budgets[i]['yearlyReviseBudget'];
              this.budgets[i]['yearlyTotalBudget'] = this.budgets[i]['yearlyTotalBudget'];
              this.budgets[i]['auditingPeriodBudget'] = this.budgets[i]['auditingPeriodBudget'];
              this.budgets[i]['expenditureUpToPreviousMonth'] = this.budgets[i]['expenditureUpToPreviousMonth'];
              this.budgets[i]['expenditureAuditingMonth'] = this.budgets[i]['expenditureAuditingMonth'];
              this.budgets[i]['totalExpenditure'] = this.budgets[i]['totalExpenditure'];
              this.budgets[i]['budgetVarianceSelectedMonth'] = this.budgets[i]['budgetVarianceSelectedMonth'];
              this.budgets[i]['remainingBudget'] = this.budgets[i]['remainingBudget'];
              this.budgets[i]['html_1'] = this.budgets[i]['comment'];
              this.budgets[i]['satisfactionRatio'] = this.getSatisfactionRatioValue(this.budgets[i]['satisfactionRatio']);
              this.budgets[i]['riskLevel'] = this.budgets[i]['riskLevel'];
              this.budgets[i]['edit'] = 1;
              this.budgets[i]['delete'] = 1;
            }
          } else {
            this.budgets = [];
          }
        });
    },

    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.form_data['scheduleId'] = localStorage.getItem('schedule');
          let url = '/budgets/add';
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
        this.modal_info.title = this.$t('edit') + " " + this.$t("budget");
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      } else {
        this.modal_info.id = null;
        this.modal_info.title = this.$t('add') + " " + this.$t("budget");
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
        url: '/budgets/delete-child',
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
        this.modal_info.title = this.$t('edit') + " " + this.$t('budget');
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      }
    },

    handleBack: function () {
      this.$router.push('/audit-execution/budgets/index');
    },

    handleReset: function () {
      this.error_message = [];
      this.form_data.budgetHead = '';
      this.form_data.yearlyApprovedBudget = '';
      this.form_data.yearlyReviseBudget = '';
      this.form_data.auditingPeriodBudget = '';
      this.form_data.expenditureUpToPreviousMonth = '';
      this.form_data.expenditureAuditingMonth = '';
      this.errors.clear();
    },

    getSatisfactionRatio: function () {
      this.schema['txt_satisfaction_ratio']['options'] = [
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
      ];
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

    getRiskLevel: function () {
      this.schema['txt_risk_level']['options'] = [
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
      ];
    },

    handleCancel: function () {
      this.$emit('close');
    },

    getBudgetsFromCoreService: function () {
      const url = 'ams_staff_positions/budget_data_api';
      const auditPeriodFromDate = localStorage.getItem('auditPeriodFromDate');
      const auditPeriodToDate = localStorage.getItem('auditPeriodToDate');
      const api_location_id = localStorage.getItem('api_location_id');
      let params = {
        "api_branch_id": api_location_id,
        // "api_branch_id": 2,
        "auditPeriodFromDate": auditPeriodFromDate,
        // "auditPeriodFromDate": "2020-07-01",
        // "auditPeriodToDate": "2020-07-31"
        "auditPeriodToDate": auditPeriodToDate
      };
      $http_core_service.post(url, JSON.stringify(params))
        .then((response) => {
          let current_month_voucher_details = response.data["current_month_voucher_details"];
          let ledger_data = response.data["ledger_data"];
          let voucher_details = response.data["voucher_details"];
          let budget_details = response.data["budget_details"];

          for (let i = 0; i < ledger_data.length; i++) {
            let ledger_head_id = parseInt(ledger_data[i]["id"]);
            if (ledger_data[i]["acctype"] == "INCOME" || ledger_data[i]["acctype"] == "EXPENSE") {

              let budget_amount = budget_details[ledger_head_id];
              let current_month_budget = budget_amount / response.data["month_diff"];
              let cons_amount = voucher_details[ledger_head_id];
              let current_month_cons_amount = current_month_voucher_details[ledger_head_id];
              let upto_previous_month_cons_amount = cons_amount - current_month_cons_amount;
              let current_month_variance = current_month_budget - current_month_cons_amount;
              let cumulative_variance = budget_amount - cons_amount;

              if (typeof budget_amount !== 'undefined' || !isNaN(current_month_budget) || !isNaN(upto_previous_month_cons_amount)
                || typeof current_month_cons_amount !== 'undefined'
                || typeof cons_amount !== 'undefined' || !isNaN(current_month_variance) || !isNaN(cumulative_variance)) {

                if (current_month_budget != 0 || upto_previous_month_cons_amount != 0 || current_month_cons_amount != 0
                  || cons_amount != 0 || current_month_variance != 0 || cumulative_variance != 0) {
                  this.processedApiBudgetsData.push({
                    "budgetHead": ledger_data[i]["ParentName"] + "->" + ledger_data[i]["name"], //2
                    "yearlyApprovedBudget": (budget_details[ledger_head_id] ? budget_details[ledger_head_id] : 0), //3
                    "yearlyReviseBudget": 0, //4
                    "auditingPeriodBudget": (budget_details[ledger_head_id] ? budget_details[ledger_head_id] / response.data["month_diff"] : 0), //6
                    "expenditureAuditingMonth": (current_month_voucher_details[ledger_head_id] ? current_month_voucher_details[ledger_head_id] : 0).toFixed(2), //8
                    "expenditureUpToPreviousMonth": ((voucher_details[ledger_head_id] ? voucher_details[ledger_head_id] : 0) - current_month_voucher_details[ledger_head_id] ? current_month_voucher_details[ledger_head_id] : 0).toFixed(2), //7
                    comment: '',
                    riskLevel: '',
                    satisfactionRatio: ''
                  });
                }
              }
            }
          }
        }).catch(function (error) {
        console.error("error", error);
      });
    },

    onChangeSr: function (event, index) {
      this.processedApiBudgetsData[index]['satisfactionRatio'] = event.target.value;
    },
    onChangeRl: function (event, index) {
      this.processedApiBudgetsData[index]['riskLevel'] = event.target.value;
    },

    handleCoreData: function () {
      let userInfo = this.$store.getters['auth/userInfo'];
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          let object = {};
          object.scheduleId = 6;
          let budgetsArr = [];
          for (let i = 0; i < this.processedApiBudgetsData.length; i++) {
            let obj = {
              budgetHead: this.processedApiBudgetsData[i]['budgetHead'],
              yearlyApprovedBudget: this.processedApiBudgetsData[i]['yearlyApprovedBudget'],
              yearlyReviseBudget: this.processedApiBudgetsData[i]['yearlyReviseBudget'],
              auditingPeriodBudget: this.processedApiBudgetsData[i]['auditingPeriodBudget'],
              expenditureAuditingMonth: this.processedApiBudgetsData[i]['expenditureAuditingMonth'],
              expenditureUpToPreviousMonth: this.processedApiBudgetsData[i]['expenditureUpToPreviousMonth'],
              satisfactionRatio: this.processedApiBudgetsData[i]['satisfactionRatio'],
              riskLevel: this.processedApiBudgetsData[i]['riskLevel'],
              comment: this.processedApiBudgetsData[i]['comment'],
              createdBy: userInfo['id']
            };
            budgetsArr.push(obj);
          }
          let headers = {
            headers: {'Content-Type': `application/json`}
          }
          object.budgetsList = budgetsArr;
          var jsonData = JSON.stringify(object);
          let url = "/budgets/addAll";
          this.$axios
            .post(url, jsonData, headers)
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
    monthDiff: function (d1, d2) {
      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    }

  }
}
