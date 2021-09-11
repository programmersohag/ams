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
  props: {
    id: null,
    extra_param: Object,
  },
  data() {
    return {
      page_title: this.$t("Target") + ' ' + this.$t("And") + ' ' + this.$t("Acheivements"),
      scheduleName: localStorage.getItem('schedule_name'),
      locationName: localStorage.getItem('location_name'),
      schema: {
        txt_mainComponent: {
          fieldType: "SelectList",
          fieldName: "mainComponent",
          label: this.$t("main") + ' ' + this.$t('component'),
          id: "mainComponent",
          options: [],
          vvalidate: "required",
          onChange: true,
        },
        txt_subComponent: {
          fieldType: "SelectList",
          fieldName: "subComponent",
          label: this.$t("sub") + ' ' + this.$t('component'),
          id: "subComponent",
          options: [],
          vvalidate: "required",
        },
        txt_closingPreviousFinancialYear: {
          fieldType: "NumberInput",
          fieldName: "closingPreviousFinancialYear",
          label: this.$t('closing') + ' ' + this.$t('previous') + ' ' + this.$t('financial') + ' ' + this.$t('year'),
          vvalidate: "required"
        },
        txt_thisMonthTarget: {
          fieldType: "NumberInput",
          fieldName: "thisMonthTarget",
          label: this.$t('auditing') + ' ' + this.$t('month') + ' ' + this.$t('target'),
          vvalidate: "required"
        },
        txt_thisYearTarget: {
          fieldType: "NumberInput",
          fieldName: "thisYearTarget",
          label: this.$t('this') + ' ' + this.$t('year') + ' ' + this.$t('target'),
          vvalidate: "required"
        },
        txt_upToThisMonthTarget: {
          fieldType: "NumberInput",
          fieldName: "upToThisMonthTarget", //
          label: this.$t('up') + ' ' + this.$t('to') + ' ' + this.$t('this') + ' ' + this.$t('month') + ' ' + this.$t('target'),
          vvalidate: "required"
        },
        txt_prevMonthAchievement: {
          fieldType: "NumberInput",
          fieldName: "prevMonthAchievement",
          label: this.$t('previous') + ' ' + this.$t('month') + ' ' + this.$t('achievement'),
          vvalidate: "required"
        },
        txt_upToThisMonthAchievement: {
          fieldType: "NumberInput",
          fieldName: "upToThisMonthAchievement",
          label: this.$t('up') + ' ' + this.$t('to') + ' ' + this.$t('this') + ' ' + this.$t('month') + ' ' + this.$t('achievement'),
          vvalidate: "required"
        },
        txt_thisMonthAchievement: {
          fieldType: "NumberInput",
          fieldName: "thisMonthAchievement",
          label: this.$t('auditing') + ' ' + this.$t('month') + ' ' + this.$t('achievement'),
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
        // txt_comment: {
        //   fieldType: "TextAreaInput",
        //   fieldName: "comment",
        //   label: this.$t("comments"),
        //   vvalidate: "required",
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
      main_component_list: [],
      sub_component_list: [],
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "audit_executions/target_and_achievements/Edit",
      },
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: "mainComponent", label: this.$t('main') + ' ' + this.$t('component'), sortable: true},
        {key: "subComponent", label: this.$t('sub') + ' ' + this.$t('component'), sortable: true},
        {
          key: "closingPreviousFinancialYear",
          label: this.$t('closing') + ' ' + this.$t('previous') + ' ' + this.$t('financial') + ' ' + this.$t('year'),
          sortable: true
        },
        {
          key: "thisYearTarget",
          label: this.$t('this') + ' ' + this.$t('year') + ' ' + this.$t('target'),
          sortable: true
        },
        {
          key: "upToThisMonthTarget",
          label: this.$t('up') + ' ' + this.$t('to') + ' ' + this.$t('this') + ' ' + this.$t('month') + ' ' + this.$t('target'),
          sortable: true
        },
        {
          key: "thisMonthTarget",
          label: this.$t('auditing') + ' ' + this.$t('month') + ' ' + this.$t('target'),
          sortable: true
        },
        {
          key: "prevMonthAchievement",
          label: this.$t('previous') + ' ' + this.$t('month') + ' ' + this.$t('achievement'),
          sortable: true
        },
        {
          key: "upToThisMonthAchievement",
          label: this.$t('up') + ' ' + this.$t('to') + ' ' + this.$t('this') + ' ' + this.$t('month') + ' ' + this.$t('achievement'),
          sortable: true
        },
        {
          key: "thisMonthAchievement",
          label: this.$t('auditing') + ' ' + this.$t('month') + ' ' + this.$t('achievement'),
          sortable: true
        },
        {
          key: "thisYearTargetPlan",
          label: this.$t('this') + ' ' + this.$t('year') + ' ' + this.$t('target') + ' ' + this.$t('plan') + ' ' + this.$t('(/-)'),
          sortable: true
        },
        {
          key: "thisYearTargetPlanPercent",
          label: this.$t('this') + ' ' + this.$t('year') + ' ' + this.$t('target') + ' ' + this.$t('plan') + ' ' + this.$t('(%)'),
          sortable: true
        },
        {
          key: "thisMonthTargetPlan",
          label: this.$t('this') + ' ' + this.$t('month') + ' ' + this.$t('target') + ' ' + this.$t('plan') + ' ' + this.$t('(/-)'),
          sortable: true
        },
        {
          key: "thisMonthTargetPlanPercent",
          label: this.$t('this') + ' ' + this.$t('month') + ' ' + this.$t('target') + ' ' + this.$t('plan') + ' ' + this.$t('(%)'),
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
          label: this.$t('comments'),
          sortable: true
        },
        {key: 'actions', label: this.$t('actions'), sortable: false}
      ],
      target_and_achievements: [],
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
      processedApiData: [],
      formErrors: [],
    }
  },
  mounted() {
    this.getSatisfactionRatio();
    this.getRiskLevel();
    this.loadData(this.pagination.offset);
    this.loadMainComponent();
    this.is_form_load = true;
    const data = StorageService.getGeneralConfig();
    this.isMfiAudit = !!Number(data['is_mfi_audit']);
    // this.isMfiAudit = true;
    this.auditExecutionMastersId = isNaN(this.$route.params.auditExecutionMastersId) ? '' : this.$route.params.auditExecutionMastersId;
    if (this.isMfiAudit && this.auditExecutionMastersId) {
      this.is_form_load = false;
      this.isMfiAudit = false;
    } else if (this.isMfiAudit && this.auditExecutionMastersId === '') {
      this.is_form_load = false;
      this.getApiDataFromCoreService();
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

      this.$axios.post("/target-and-achievements", null, {params: param})
        .then(res => {
          this.target_and_achievements = res.data.data.content;
          this.pagination.total_rows = res.data.data['totalElements'];
          this.pagination.offset = res.data.data['pageable']['offset'];
          if (this.target_and_achievements.length > 0) {
            for (let i = 0; i < this.target_and_achievements.length; i++) {
              this.target_and_achievements[i]['budgetHead'] = this.target_and_achievements[i]['budgetHead'];
              this.target_and_achievements[i]['yearlyApprovedBudget'] = this.target_and_achievements[i]['yearlyApprovedBudget'];
              this.target_and_achievements[i]['yearlyReviseBudget'] = this.target_and_achievements[i]['yearlyReviseBudget'];
              this.target_and_achievements[i]['yearlyTotalBudget'] = this.target_and_achievements[i]['yearlyTotalBudget'];
              this.target_and_achievements[i]['selectedMonthBudget'] = this.target_and_achievements[i]['selectedMonthBudget'];
              this.target_and_achievements[i]['expenditureUpToPreviousMonth'] = this.target_and_achievements[i]['expenditureUpToPreviousMonth'];
              this.target_and_achievements[i]['expenditureSelectedMonth'] = this.target_and_achievements[i]['expenditureSelectedMonth'];
              this.target_and_achievements[i]['totalExpenditure'] = this.target_and_achievements[i]['totalExpenditure'];
              this.target_and_achievements[i]['budgetVarianceSelectedMonth'] = this.target_and_achievements[i]['budgetVarianceSelectedMonth'];
              this.target_and_achievements[i]['cumulativeBudget'] = this.target_and_achievements[i]['cumulativeBudget'];
              this.target_and_achievements[i]['html_1'] = this.target_and_achievements[i]['comment'];
              this.target_and_achievements[i]['satisfactionRatio'] = this.getSatisfactionRatioValue(this.target_and_achievements[i]['satisfactionRatio']);
              this.target_and_achievements[i]['riskLevel'] = this.target_and_achievements[i]['riskLevel'];
              this.target_and_achievements[i]['edit'] = 1;
              this.target_and_achievements[i]['delete'] = 1;
            }
          }
        });
    },
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.form_data['scheduleId'] = localStorage.getItem('schedule');
          let url = '/target-and-achievements/add';
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
        this.modal_info.title = this.$t('edit') + " " + this.$t("targets") + " " + this.$t("and") + " " + this.$t("achievements");
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      } else {
        this.modal_info.id = null;
        this.modal_info.title = this.$t('add') + " " + this.$t("targets") + " " + this.$t("and") + " " + this.$t("achievements");
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
        url: '/target-and-achievements/delete-child',
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
        this.modal_info.title = this.$t('edit') + " " + this.$t("targets") + " " + this.$t("and") + " " + this.$t("achievements");
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      }
    },
    handleBack: function () {
      this.$router.push('/audit-execution/target-and-achievements/index');
    },
    handleReset: function () {
      this.error_message = [];

      this.form_data.mainComponent = '';
      this.form_data.subComponent = '';
      this.form_data.closingPreviousFinancialYear = '';
      this.form_data.thisYearTarget = '';
      this.form_data.upToThisMonthTarget = '';
      this.form_data.thisMonthTarget = '';
      this.form_data.prevMonthAchievement = '';
      this.form_data.upToThisMonthAchievement = '';
      this.form_data.thisMonthAchievement = '';
      this.form_data.comment = '';

      this.reset_data = Object.assign({}, this.form_data);
      this.errors.clear();
      //mainComponent subComponent

    },
    handleCancel: function () {
      this.$emit('close');
    },
    loadMainComponent: function () {
      let mainComponent = "Member,Borrower,Loan Disburse,Loan Outstanding,Savings,Due Loanee,Due Amount,Loan Recovery,Due Collection,Total Income,Total Expenditure,Surplus,CRR,PAR,OTR".split(',');
      this.main_component_list.push({
        text: "--" + this.$t("select") + this.$t(" ") + this.$t("main") + this.$t(" ") + this.$t("component") + "--",
        value: ''
      });
      for (let i = 0; i < mainComponent.length; i++) {
        this.main_component_list.push({
          value: mainComponent[i],
          text: mainComponent[i]
        });
      }
      this.schema["txt_mainComponent"]["options"] = this.main_component_list;
    },
    loadSubComponent: function (mainComponent) {
      // this.$set(this.formData, 'txt_subComponent', null);
      // this.schema["txt_subComponent"]["options"] = null;
      //,Total Income,Total Expenditure,Surplus,CRR,PAR,OTR
      let Member = "Saver’s member,Non-savers member,Total Savers and Non-Savers,Admissions,Drop Out".split(',');
      let borrower = "Borrowers (Loan Receivers),Current,Current (AGR),Overdue Borrower (AGR),Per Credit Officer".split(',');
      let loanDisburse = "No. of Borrower,Amount (Tk)".split(',');
      let loanOutstanding = "Current,Overdue,Total Loan Outstanding,Loan Outstanding (AGR),Per Credit Officer".split(',');
      let dueLoanee = "Current,Overdue".split(',');
      let savings = "Fdr,Mandatory,Dps,Msp".split(',');
      let dueAmount = "Current,Overdue".split(',');
      let loanRecovery = "Recoverable,Current Loan Recovery".split(',');
      let dueCollection = "Current,Overdue".split(',');
      let totalIncome = "".split(',');
      let totalExpenditure = "".split(',');
      let surplus = "".split(',');
      let cRR = "".split(',');
      let pAR = "".split(',');
      let oTR = "".split(',');

      let subComponent;
      if (mainComponent == 'Member') {
        subComponent = Member;
      } else if (mainComponent == 'Borrower') {
        subComponent = borrower;
      } else if (mainComponent == 'Loan Disburse') {
        subComponent = loanDisburse;
      } else if (mainComponent == 'Loan Outstanding') {
        subComponent = loanOutstanding;
      } else if (mainComponent == 'Savings') {
        subComponent = savings;
      } else if (mainComponent == 'Due Loanee') {
        subComponent = dueLoanee;
      } else if (mainComponent == 'Due Amount') {
        subComponent = dueAmount;
      } else if (mainComponent == 'Due Collection') {
        subComponent = dueCollection;
      } else if (mainComponent == 'Total Income') {
        subComponent = totalIncome;
      } else if (mainComponent == 'Total Expenditure') {
        subComponent = totalExpenditure;
      } else if (mainComponent == 'Surplus') {
        subComponent = surplus;
      } else if (mainComponent == 'CRR') {
        subComponent = cRR;
      } else if (mainComponent == 'PAR') {
        subComponent = pAR;
      } else if (mainComponent == 'OTR') {
        subComponent = oTR;
      } else if (mainComponent == 'Loan Recovery') {
        subComponent = loanRecovery;
      }

      document.getElementById("subComponent").innerHTML = "";

      this.sub_component_list.push({
        text: "--" + this.$t("select") + this.$t(" ") + this.$t("sub") + this.$t(" ") + this.$t("component") + "--",
        value: ''
      });
      for (let i = 0; i < subComponent.length; i++) {
        this.sub_component_list.push({
          value: subComponent[i],
          text: subComponent[i]
        });
      }
      this.schema["txt_subComponent"]["options"] = this.sub_component_list;
    },
    onChangeMethod(field, value) {
      if (field === "mainComponent") {
        this.loadSubComponent(value);
      }
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


    getApiDataFromCoreService: function () {
      const url = 'ams_staff_positions/target_achievement_api_data';

      const auditPeriodFromDate = localStorage.getItem('auditPeriodFromDate');
      const auditPeriodToDate = localStorage.getItem('auditPeriodToDate');
      const api_location_id = localStorage.getItem('api_location_id');
      let params = {
        "cbo_branch": api_location_id,  //2
        // "cbo_branch": 2,
        "to_date": auditPeriodToDate,
        // "to_date": "2021-06-01",
        "from_date": auditPeriodFromDate
        // "from_date": "2021-01-01"  //"2021-01-01"
      };
      $http_core_service.post(url, JSON.stringify(params))
        .then((response) => {

          let report_data = response.data["report_data"];
          let saving_product = response.data["saving_product"];

          this.memberInsert(report_data);
          this.BorrowerInsert(report_data);
          this.loanDisburseInsert(report_data);
          this.loanOutstandingInsert(report_data);
          // this.savingsInsert(report_data, saving_product);
          this.dueLoaneeInsert(report_data);
          this.dueAmountInsert(report_data);
          this.loanRecoveryInsert(report_data);
          this.dueCollectionInsert(report_data);
          this.totalIncomeInsert(report_data);
          this.totalExpenditureInsert(report_data);
          this.surplusInsert(report_data);
          this.CRRInsert(report_data);
          this.PARInsert(report_data);
          this.OTRInsert(report_data);


        }).catch(function (error) {
        console.error("error", error);
      });
    },

    onChangeSr: function (event, index) {
      this.processedApiData[index]['satisfactionRatio'] = event.target.value;
    },
    onChangeRl: function (event, index) {
      this.processedApiData[index]['riskLevel'] = event.target.value;
    },

    handleCoreData: function () {
      let userInfo = this.$store.getters['auth/userInfo'];
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          let object = {};
          object.scheduleId = 6;
          let entityArr = [];
          for (let i = 0; i < this.processedApiData.length; i++) {
            let obj = {
              mainComponent: this.processedApiData[i]['mainComponent'],
              subComponent: this.processedApiData[i]['subComponent'],
              closingPreviousFinancialYear: this.processedApiData[i]['closingPreviousFinancialYear'],
              thisYearTarget: this.processedApiData[i]['thisYearTarget'],
              upToThisMonthTarget: this.processedApiData[i]['upToThisMonthTarget'],
              thisMonthTarget: this.processedApiData[i]['thisMonthTarget'],
              prevMonthAchievement: this.processedApiData[i]['prevMonthAchievement'],
              upToThisMonthAchievement: this.processedApiData[i]['upToThisMonthAchievement'],
              thisMonthAchievement: this.processedApiData[i]['thisMonthAchievement'],

              satisfactionRatio: this.processedApiData[i]['satisfactionRatio'],
              riskLevel: this.processedApiData[i]['riskLevel'],
              comment: this.processedApiData[i]['comment'],
              createdBy: userInfo['id']
            };
            entityArr.push(obj);
          }
          let headers = {
            headers: {'Content-Type': `application/json`}
          }
          object.targetAndAchievementList = entityArr;
          var jsonData = JSON.stringify(object);
          let url = "/target-and-achievements/addAll";
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


    memberInsert: function (report_data) {
      //Member -> savers_member
      this.processedApiData.push({
        "mainComponent": "Member", // 2.1
        "subComponent": "Saver’s member", // 2.2
        "closingPreviousFinancialYear": report_data["prev_fin_year_closing"]["members"]["savers_member"] ? report_data["prev_fin_year_closing"]["members"]["savers_member"] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['savers_member'] ? report_data['this_year']['loans']['savers_member'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['savers_member'] ? report_data['upto_this_month']['loans']['savers_member'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['savers_member'] ? report_data['this_month_info']['loans_this_month']['savers_member'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['members']['savers_member'] ? report_data['prev_month']['members']['savers_member'] : 0, // ?7
        "upToThisMonthAchievement": report_data['this_month']['members']['savers_member'] ? report_data['this_month']['members']['savers_member'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['members']['savers_member'] ? report_data['this_month']['members']['savers_member'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Member -> Non-savers member
      this.processedApiData.push({
        "mainComponent": "Member", // 2.1
        "subComponent": "Non-savers member", // 2.2
        "closingPreviousFinancialYear": report_data["prev_fin_year_closing"]["members"]["nonsavers_member"] ? report_data["prev_fin_year_closing"]["members"]["nonsavers_member"] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['nonsavers_member'] ? report_data['this_year']['loans']['nonsavers_member'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['nonsavers_member'] ? report_data['upto_this_month']['loans']['nonsavers_member'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['nonsavers_member'] ? report_data['this_month_info']['loans_this_month']['nonsavers_member'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['members']['nonsavers_member'] ? report_data['prev_month']['members']['nonsavers_member'] : 0, // ?7
        "upToThisMonthAchievement": report_data['this_month']['members']['nonsavers_member'] ? report_data['this_month']['members']['nonsavers_member'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['members']['nonsavers_member'] ? report_data['this_month']['members']['nonsavers_member'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Member -> Total Savers and Non-Savers
      this.processedApiData.push({
        "mainComponent": "Member", // 2.1
        "subComponent": "Total Savers and Non-Savers", // 2.2
        "closingPreviousFinancialYear": report_data["prev_fin_year_closing"]["members"]["total_member"] ? report_data["prev_fin_year_closing"]["members"]["total_member"] : 0, // 3
        "thisYearTarget": (report_data['this_year']['loans']['savers_member'] ? report_data['this_year']['loans']['savers_member'] : 0) + (report_data['this_year']['loans']['savers_member'] ? report_data['this_year']['loans']['nonsavers_member'] : 0), // 4
        "upToThisMonthTarget": (report_data['upto_this_month']['loans']['savers_member'] ? report_data['upto_this_month']['loans']['savers_member'] : 0) + (report_data['upto_this_month']['loans']['savers_member'] ? report_data['upto_this_month']['loans']['nonsavers_member'] : 0), // 5
        "thisMonthTarget": (report_data['this_month_info']['loans_this_month']['savers_member'] ? report_data['this_month_info']['loans_this_month']['savers_member'] : 0) + (report_data['this_month_info']['loans_this_month']['savers_member'] ? report_data['this_month_info']['loans_this_month']['nonsavers_member'] : 0), // 6
        "prevMonthAchievement": (report_data['prev_month']['members']['savers_member'] ? report_data['prev_month']['members']['savers_member'] : 0) + (report_data['prev_month']['members']['savers_member'] ? report_data['prev_month']['members']['nonsavers_member'] : 0), // ?7
        "upToThisMonthAchievement": (report_data['this_month']['members']['savers_member'] ? report_data['this_month']['members']['savers_member'] : 0) + (report_data['this_month']['members']['savers_member'] ? report_data['this_month']['members']['nonsavers_member'] : 0), // 8
        "thisMonthAchievement": (report_data['this_month']['members']['savers_member'] ? report_data['this_month']['members']['savers_member'] : 0) + (report_data['this_month']['members']['savers_member'] ? report_data['this_month']['members']['nonsavers_member'] : 0), // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Member -> Admissions
      this.processedApiData.push({
        "mainComponent": "Member", // 2.1
        "subComponent": "Admissions", // 2.2
        "closingPreviousFinancialYear": report_data["prev_fin_year_closing"]["members"]["member_admission"] ? report_data["prev_fin_year_closing"]["members"]["member_admission"] : 0, // 3
        "thisYearTarget": report_data['this_year']['admission'] ? report_data['this_year']['admission'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['admission'] ? report_data['upto_this_month']['admission'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['admission_this_month'] ? report_data['this_month_info']['admission_this_month'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['members']['member_admission'] ? report_data['prev_month']['members']['member_admission'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['members']['member_admission'] ? report_data['upto_this_month_achievement']['members']['member_admission'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['members']['member_admission'] ? report_data['this_month']['members']['member_admission'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Member -> Drop Out
      this.processedApiData.push({
        "mainComponent": "Member", // 2.1
        "subComponent": "Drop Out", // 2.2
        "closingPreviousFinancialYear": report_data["prev_fin_year_closing"]["members"]["dropout"] ? report_data["prev_fin_year_closing"]["members"]["dropout"] : 0, // 3
        "thisYearTarget": report_data['this_year']['dropout'] ? report_data['this_year']['dropout'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['dropout'] ? report_data['upto_this_month']['dropout'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['dropout_this_month'] ? report_data['this_month_info']['dropout_this_month'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['members']['dropout'] ? report_data['prev_month']['members']['dropout'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['members']['dropout'] ? report_data['upto_this_month_achievement']['members']['dropout'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['members']['dropout'] ? report_data['this_month']['members']['dropout'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

    },

    BorrowerInsert: function (report_data) {

      //Borrower -> Borrowers (Loan Receivers)
      this.processedApiData.push({
        "mainComponent": "Borrower", // 2.1
        "subComponent": "Borrowers (Loan Receivers)", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['current_borrower_with_expired'] ? report_data['prev_fin_year_closing']['loans']['current_borrower_with_expired'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['current_borrower_with_expired'] ? report_data['this_year']['loans']['current_borrower_with_expired'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['current_borrower_with_expired'] ? report_data['upto_this_month']['loans']['current_borrower_with_expired'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['current_borrower_with_expired'] ? report_data['this_month_info']['loans_this_month']['current_borrower_with_expired'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['current_borrower_with_expired'] ? report_data['prev_month']['loans']['current_borrower_with_expired'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['current_borrower_with_expired'] ? report_data['upto_this_month_achievement']['loans']['current_borrower_with_expired'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['current_borrower_with_expired'] ? report_data['this_month']['loans']['current_borrower_with_expired'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Borrower -> Current
      this.processedApiData.push({
        "mainComponent": "Borrower", // 2.1
        "subComponent": "Current", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['current_borrower'] ? report_data['prev_fin_year_closing']['loans']['current_borrower'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['current_borrower'] ? report_data['this_year']['loans']['current_borrower'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['current_borrower'] ? report_data['upto_this_month']['loans']['current_borrower'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['current_borrower'] ? report_data['this_month_info']['loans_this_month']['current_borrower'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['current_borrower'] ? report_data['prev_month']['loans']['current_borrower'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['current_borrower'] ? report_data['upto_this_month_achievement']['loans']['current_borrower'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['current_borrower'] ? report_data['this_month']['loans']['current_borrower'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Borrower -> Current (AGR)
      this.processedApiData.push({
        "mainComponent": "Borrower", // 2.1
        "subComponent": "Current (AGR)", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['current_borrower_agr'] ? report_data['prev_fin_year_closing']['loans']['current_borrower_agr'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['current_borrower_agr'] ? report_data['this_year']['loans']['current_borrower_agr'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['current_borrower_agr'] ? report_data['upto_this_month']['loans']['current_borrower_agr'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['current_borrower_agr'] ? report_data['this_month_info']['loans_this_month']['current_borrower_agr'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['current_borrower_agr'] ? report_data['prev_month']['loans']['current_borrower_agr'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['current_borrower_agr'] ? report_data['upto_this_month_achievement']['loans']['current_borrower_agr'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['current_borrower_agr'] ? report_data['this_month']['loans']['current_borrower_agr'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Borrower -> Overdue Borrower (AGR)
      this.processedApiData.push({
        "mainComponent": "Borrower", // 2.1
        "subComponent": "Overdue Borrower (AGR)", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['overdue_borrower_agr'] ? report_data['prev_fin_year_closing']['loans']['overdue_borrower_agr'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['overdue_borrower_agr'] ? report_data['this_year']['loans']['overdue_borrower_agr'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['overdue_borrower_agr'] ? report_data['upto_this_month']['loans']['overdue_borrower_agr'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['overdue_borrower_agr'] ? report_data['this_month_info']['loans_this_month']['overdue_borrower_agr'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['overdue_borrower_agr'] ? report_data['prev_month']['loans']['overdue_borrower_agr'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['overdue_borrower_agr'] ? report_data['upto_this_month_achievement']['loans']['overdue_borrower_agr'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['overdue_borrower_agr'] ? report_data['this_month']['loans']['overdue_borrower_agr'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Borrower -> Per Credit Officer
      this.processedApiData.push({
        "mainComponent": "Borrower", // 2.1
        "subComponent": "Per Credit Officer", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['per_credit_officer_borrower'] ? report_data['prev_fin_year_closing']['loans']['per_credit_officer_borrower'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['per_credit_officer_borrower'] ? report_data['this_year']['loans']['per_credit_officer_borrower'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['per_credit_officer_borrower'] ? report_data['upto_this_month']['loans']['per_credit_officer_borrower'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['per_credit_officer_borrower'] ? report_data['this_month_info']['loans_this_month']['per_credit_officer_borrower'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['per_credit_officer_borrower'] ? report_data['prev_month']['loans']['per_credit_officer_borrower'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['per_credit_officer_borrower'] ? report_data['upto_this_month_achievement']['loans']['per_credit_officer_borrower'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['per_credit_officer_borrower'] ? report_data['this_month']['loans']['per_credit_officer_borrower'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

    },

    loanDisburseInsert: function (report_data) {
      //Loan Disburse -> No. of Borrower
      this.processedApiData.push({
        "mainComponent": "Loan Disburse", // 2.1
        "subComponent": "No. of Borrower", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['no_of_borrower'] ? report_data['prev_fin_year_closing']['loans']['no_of_borrower'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['no_of_borrower'] ? report_data['this_year']['loans']['no_of_borrower'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['no_of_borrower'] ? report_data['upto_this_month']['loans']['no_of_borrower'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['no_of_borrower'] ? report_data['this_month_info']['loans_this_month']['no_of_borrower'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['no_of_borrower'] ? report_data['prev_month']['loans']['no_of_borrower'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['no_of_borrower'] ? report_data['upto_this_month_achievement']['loans']['no_of_borrower'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['no_of_borrower'] ? report_data['this_month']['loans']['no_of_borrower'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Loan Disburse -> Amount (Tk)
      this.processedApiData.push({
        "mainComponent": "Loan Disburse", // 2.1
        "subComponent": "Amount (Tk)", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['disbursed_amount'] ? report_data['prev_fin_year_closing']['loans']['disbursed_amount'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['disbursed_amount'] ? report_data['this_year']['loans']['disbursed_amount'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['disbursed_amount'] ? report_data['upto_this_month']['loans']['disbursed_amount'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['disbursed_amount'] ? report_data['this_month_info']['loans_this_month']['disbursed_amount'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['disbursed_amount'] ? report_data['prev_month']['loans']['disbursed_amount'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['disbursed_amount'] ? report_data['upto_this_month_achievement']['loans']['disbursed_amount'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['disbursed_amount'] ? report_data['this_month']['loans']['disbursed_amount'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

    },

    loanOutstandingInsert: function (report_data) {
      //Loan Outstanding ->Current
      this.processedApiData.push({
        "mainComponent": "Loan Outstanding", // 2.1
        "subComponent": "Current", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['current_outstanding'] ? report_data['prev_fin_year_closing']['loans']['current_outstanding'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['current_outstanding'] ? report_data['this_year']['loans']['current_outstanding'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['current_outstanding'] ? report_data['upto_this_month']['loans']['current_outstanding'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['current_outstanding'] ? report_data['this_month_info']['loans_this_month']['current_outstanding'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['current_outstanding'] ? report_data['prev_month']['loans']['current_outstanding'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['current_outstanding'] ? report_data['upto_this_month_achievement']['loans']['current_outstanding'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['current_outstanding'] ? report_data['this_month']['loans']['current_outstanding'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Loan Outstanding -> Overdue
      this.processedApiData.push({
        "mainComponent": "Loan Outstanding", // 2.1
        "subComponent": "Overdue", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['overdue_outstanding'] ? report_data['prev_fin_year_closing']['loans']['overdue_outstanding'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['overdue_outstanding'] ? report_data['this_year']['loans']['overdue_outstanding'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['overdue_outstanding'] ? report_data['upto_this_month']['loans']['overdue_outstanding'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['overdue_outstanding'] ? report_data['this_month_info']['loans_this_month']['overdue_outstanding'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['overdue_outstanding'] ? report_data['prev_month']['loans']['overdue_outstanding'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['overdue_outstanding'] ? report_data['upto_this_month_achievement']['loans']['overdue_outstanding'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['overdue_outstanding'] ? report_data['this_month']['loans']['overdue_outstanding'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Loan Outstanding -> Loan Outstanding(AGR)
      this.processedApiData.push({
        "mainComponent": "Loan Outstanding", // 2.1
        "subComponent": "Loan Outstanding (AGR)", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['current_outstanding_agr'] ? report_data['prev_fin_year_closing']['loans']['current_outstanding_agr'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['current_outstanding_agr'] ? report_data['this_year']['loans']['current_outstanding_agr'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['current_outstanding_agr'] ? report_data['upto_this_month']['loans']['current_outstanding_agr'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['current_outstanding_agr'] ? report_data['this_month_info']['loans_this_month']['current_outstanding_agr'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['current_outstanding_agr'] ? report_data['prev_month']['loans']['current_outstanding_agr'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['current_outstanding_agr'] ? report_data['upto_this_month_achievement']['loans']['current_outstanding_agr'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['current_outstanding_agr'] ? report_data['this_month']['loans']['current_outstanding_agr'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Loan Outstanding -> Per Credit Officer
      this.processedApiData.push({
        "mainComponent": "Loan Outstanding", // 2.1
        "subComponent": "Per Credit Officer", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['per_credit_officer_outstanding'] ? report_data['prev_fin_year_closing']['loans']['per_credit_officer_outstanding'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['per_credit_officer_outstanding'] ? report_data['this_year']['loans']['per_credit_officer_outstanding'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['per_credit_officer_outstanding'] ? report_data['upto_this_month']['loans']['per_credit_officer_outstanding'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['per_credit_officer_outstanding'] ? report_data['this_month_info']['loans_this_month']['per_credit_officer_outstanding'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['per_credit_officer_outstanding'] ? report_data['prev_month']['loans']['per_credit_officer_outstanding'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['per_credit_officer_outstanding'] ? report_data['upto_this_month_achievement']['loans']['per_credit_officer_outstanding'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['per_credit_officer_outstanding'] ? report_data['this_month']['loans']['per_credit_officer_outstanding'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });


    },

    savingsInsert: function (report_data, saving_product) {
      saving_product.forEach(myFunction);

      function myFunction(sp) {
        this.processedApiData.push({
          "mainComponent": "Savings", // 2.1
          "subComponent": sp, // 2.2
          "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['savings'].sp ? report_data['prev_fin_year_closing']['savings'].sp : 0, // 3
          // "thisYearTarget": report_data['this_year']['savings'][sp] ? report_data['this_year']['savings'][sp] : 0, // 4
          // "upToThisMonthTarget": report_data['upto_this_month']['savings'][sp] ? report_data['upto_this_month']['savings'][sp] : 0, // 5
          // "thisMonthTarget": report_data['this_month_info']['savings_this_month'][sp] ? report_data['this_month_info']['savings_this_month'][sp] : 0, // 6
          // "prevMonthAchievement": report_data['prev_month']['savings'][sp] ? report_data['prev_month']['savings'][sp] : 0, // ?7
          // "upToThisMonthAchievement": report_data['upto_this_month_achievement']['savings'][sp] ? report_data['upto_this_month_achievement']['savings'][sp] : 0, // 8
          // "thisMonthAchievement": report_data['this_month']['savings'][sp] ? report_data['this_month']['savings'][sp] : 0, // 9
          comment: '',
          riskLevel: '',
          satisfactionRatio: ''
        });
      }
    },

    dueLoaneeInsert: function (report_data) {
      //Due Lonee ->Current
      this.processedApiData.push({
        "mainComponent": "Due Lonee", // 2.1
        "subComponent": "Current", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['current_due_loanee'] ? report_data['prev_fin_year_closing']['loans']['current_due_loanee'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['current_due_loanee'] ? report_data['this_year']['loans']['current_due_loanee'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['current_due_loanee'] ? report_data['upto_this_month']['loans']['current_due_loanee'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['current_due_loanee'] ? report_data['this_month_info']['loans_this_month']['current_due_loanee'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['current_due_loanee'] ? report_data['prev_month']['loans']['current_due_loanee'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['current_due_loanee'] ? report_data['upto_this_month_achievement']['loans']['current_due_loanee'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['current_due_loanee'] ? report_data['this_month']['loans']['current_due_loanee'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Due Lonee ->Overdue
      this.processedApiData.push({
        "mainComponent": "Due Lonee", // 2.1
        "subComponent": "Overdue", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['overdue_borrower'] ? report_data['prev_fin_year_closing']['loans']['overdue_borrower'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['overdue_borrower'] ? report_data['this_year']['loans']['overdue_borrower'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['overdue_borrower'] ? report_data['upto_this_month']['loans']['overdue_borrower'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['overdue_borrower'] ? report_data['this_month_info']['loans_this_month']['overdue_borrower'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['overdue_borrower'] ? report_data['prev_month']['loans']['overdue_borrower'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['overdue_borrower'] ? report_data['upto_this_month_achievement']['loans']['overdue_borrower'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['overdue_borrower'] ? report_data['this_month']['loans']['overdue_borrower'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

    },

    dueAmountInsert: function (report_data) {
      //Due Amount ->Current
      this.processedApiData.push({
        "mainComponent": "Due Amount", // 2.1
        "subComponent": "Current", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['current_due_amount'] ? report_data['prev_fin_year_closing']['loans']['current_due_amount'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['current_due_amount'] ? report_data['this_year']['loans']['current_due_amount'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['current_due_amount'] ? report_data['upto_this_month']['loans']['current_due_amount'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['current_due_amount'] ? report_data['this_month_info']['loans_this_month']['current_due_amount'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['current_due_amount'] ? report_data['prev_month']['loans']['current_due_amount'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['current_due_amount'] ? report_data['upto_this_month_achievement']['loans']['current_due_amount'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['current_due_amount'] ? report_data['this_month']['loans']['current_due_amount'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Due Amount ->Overdue
      this.processedApiData.push({
        "mainComponent": "Due Amount", // 2.1
        "subComponent": "Overdue", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['overdue_amount'] ? report_data['prev_fin_year_closing']['loans']['overdue_amount'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['overdue_amount'] ? report_data['this_year']['loans']['overdue_amount'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['overdue_amount'] ? report_data['upto_this_month']['loans']['overdue_amount'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['overdue_amount'] ? report_data['this_month_info']['loans_this_month']['overdue_amount'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['overdue_amount'] ? report_data['prev_month']['loans']['overdue_amount'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['overdue_amount'] ? report_data['upto_this_month_achievement']['loans']['overdue_amount'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['overdue_amount'] ? report_data['this_month']['loans']['overdue_amount'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Due Amount ->Overdue (Agrosor)
      this.processedApiData.push({
        "mainComponent": "Due Amount", // 2.1
        "subComponent": "Overdue (Agrosor)", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['overdue_amount_agr'] ? report_data['prev_fin_year_closing']['loans']['overdue_amount_agr'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['overdue_amount_agr'] ? report_data['this_year']['loans']['overdue_amount_agr'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['overdue_amount_agr'] ? report_data['upto_this_month']['loans']['overdue_amount_agr'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['overdue_amount_agr'] ? report_data['this_month_info']['loans_this_month']['overdue_amount_agr'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['overdue_amount_agr'] ? report_data['prev_month']['loans']['overdue_amount_agr'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['overdue_amount_agr'] ? report_data['upto_this_month_achievement']['loans']['overdue_amount_agr'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['overdue_amount_agr'] ? report_data['this_month']['loans']['overdue_amount_agr'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Due Amount ->Overdue (Agrosor)
      this.processedApiData.push({
        "mainComponent": "Due Amount", // 2.1
        "subComponent": "New Defaulter", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['new_defaulter'] ? report_data['prev_fin_year_closing']['loans']['new_defaulter'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['new_defaulter'] ? report_data['this_year']['loans']['new_defaulter'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['new_defaulter'] ? report_data['upto_this_month']['loans']['new_defaulter'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['new_defaulter'] ? report_data['this_month_info']['loans_this_month']['new_defaulter'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['new_defaulter'] ? report_data['prev_month']['loans']['new_defaulter'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['new_defaulter'] ? report_data['upto_this_month_achievement']['loans']['new_defaulter'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['new_defaulter'] ? report_data['this_month']['loans']['new_defaulter'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });


    },

    loanRecoveryInsert: function (report_data) {
      //Loan Recovery ->Recoverable
      this.processedApiData.push({
        "mainComponent": "Loan Recovery", // 2.1
        "subComponent": "Recoverable", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['loan_recoverable'] ? report_data['prev_fin_year_closing']['loans']['loan_recoverable'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['loan_recoverable'] ? report_data['this_year']['loans']['loan_recoverable'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['loan_recoverable'] ? report_data['upto_this_month']['loans']['loan_recoverable'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['loan_recoverable'] ? report_data['this_month_info']['loans_this_month']['loan_recoverable'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['loan_recoverable'] ? report_data['prev_month']['loans']['loan_recoverable'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['loan_recoverable'] ? report_data['upto_this_month_achievement']['loans']['loan_recoverable'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['loan_recoverable'] ? report_data['this_month']['loans']['loan_recoverable'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Loan Recovery ->Current Loan Recovery
      this.processedApiData.push({
        "mainComponent": "Loan Recovery", // 2.1
        "subComponent": "Current Loan Recovery", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['current_loan_recovery'] ? report_data['prev_fin_year_closing']['loans']['current_loan_recovery'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['current_loan_recovery'] ? report_data['this_year']['loans']['current_loan_recovery'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['current_loan_recovery'] ? report_data['upto_this_month']['loans']['current_loan_recovery'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['current_loan_recovery'] ? report_data['this_month_info']['loans_this_month']['current_loan_recovery'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['current_loan_recovery'] ? report_data['prev_month']['loans']['current_loan_recovery'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['current_loan_recovery'] ? report_data['upto_this_month_achievement']['loans']['current_loan_recovery'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['current_loan_recovery'] ? report_data['this_month']['loans']['current_loan_recovery'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

    },

    dueCollectionInsert: function (report_data) {
      //Due Collection ->Current
      this.processedApiData.push({
        "mainComponent": "Due Collection", // 2.1
        "subComponent": "Current", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['current_due_collection'] ? report_data['prev_fin_year_closing']['loans']['current_due_collection'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['current_due_collection'] ? report_data['this_year']['loans']['current_due_collection'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['current_due_collection'] ? report_data['upto_this_month']['loans']['current_due_collection'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['current_due_collection'] ? report_data['this_month_info']['loans_this_month']['current_due_collection'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['current_due_collection'] ? report_data['prev_month']['loans']['current_due_collection'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['current_due_collection'] ? report_data['upto_this_month_achievement']['loans']['current_due_collection'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['current_due_collection'] ? report_data['this_month']['loans']['current_due_collection'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });

      //Due Collection ->Overdue
      this.processedApiData.push({
        "mainComponent": "Due Collection", // 2.1
        "subComponent": "Overdue", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['loans']['overdue_collection'] ? report_data['prev_fin_year_closing']['loans']['overdue_collection'] : 0, // 3
        "thisYearTarget": report_data['this_year']['loans']['overdue_collection'] ? report_data['this_year']['loans']['overdue_collection'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['loans']['overdue_collection'] ? report_data['upto_this_month']['loans']['overdue_collection'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['loans_this_month']['overdue_collection'] ? report_data['this_month_info']['loans_this_month']['overdue_collection'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['loans']['overdue_collection'] ? report_data['prev_month']['loans']['overdue_collection'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['loans']['overdue_collection'] ? report_data['upto_this_month_achievement']['loans']['overdue_collection'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['loans']['overdue_collection'] ? report_data['this_month']['loans']['overdue_collection'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });
    },

    totalIncomeInsert: function (report_data) {
      //Total Income ->Overdue
      this.processedApiData.push({
        "mainComponent": "Total Income", // 2.1
        "subComponent": "", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['total_income'] ? report_data['prev_fin_year_closing']['total_income'] : 0, // 3
        "thisYearTarget": report_data['this_year']['others']['total_income'] ? report_data['this_year']['others']['total_income'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['others']['total_income'] ? report_data['upto_this_month']['others']['total_income'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['others_this_month']['total_income'] ? report_data['this_month_info']['others_this_month']['total_income'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['total_income'] ? report_data['prev_month']['total_income'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['total_income'] ? report_data['upto_this_month_achievement']['total_income'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['total_income'] ? report_data['this_month']['total_income'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });
    },

    totalExpenditureInsert: function (report_data) {
      //Total Expenditure ->Overdue
      this.processedApiData.push({
        "mainComponent": "Total Expenditure", // 2.1
        "subComponent": "", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['total_expenditure'] ? report_data['prev_fin_year_closing']['total_expenditure'] : 0, // 3
        "thisYearTarget": report_data['this_year']['others']['total_expenditure'] ? report_data['this_year']['others']['total_expenditure'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['others']['total_expenditure'] ? report_data['upto_this_month']['others']['total_expenditure'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['others_this_month']['total_expenditure'] ? report_data['this_month_info']['others_this_month']['total_expenditure'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['total_expenditure'] ? report_data['prev_month']['total_expenditure'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['total_expenditure'] ? report_data['upto_this_month_achievement']['total_expenditure'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['total_expenditure'] ? report_data['this_month']['total_expenditure'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });
    },

    surplusInsert: function (report_data) {
      //Surplus ->Overdue
      this.processedApiData.push({
        "mainComponent": "Surplus", // 2.1
        "subComponent": "", // 2.2
        "closingPreviousFinancialYear": report_data['prev_fin_year_closing']['surplus'] ? report_data['prev_fin_year_closing']['surplus'] : 0, // 3
        "thisYearTarget": report_data['this_year']['others']['surplus'] ? report_data['this_year']['others']['surplus'] : 0, // 4
        "upToThisMonthTarget": report_data['upto_this_month']['others']['surplus'] ? report_data['upto_this_month']['others']['surplus'] : 0, // 5
        "thisMonthTarget": report_data['this_month_info']['others_this_month']['surplus'] ? report_data['this_month_info']['others_this_month']['surplus'] : 0, // 6
        "prevMonthAchievement": report_data['prev_month']['surplus'] ? report_data['prev_month']['surplus'] : 0, // ?7
        "upToThisMonthAchievement": report_data['upto_this_month_achievement']['surplus'] ? report_data['upto_this_month_achievement']['surplus'] : 0, // 8
        "thisMonthAchievement": report_data['this_month']['surplus'] ? report_data['this_month']['surplus'] : 0, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });
    },

    CRRInsert: function (report_data) {
      let prev_fin_year_closing_loan_crr = report_data['prev_fin_year_closing']['loans']['crr'] ? report_data['prev_fin_year_closing']['loans']['crr'] : 0;
      if (report_data['prev_fin_year_closing']['crr_branch'] > 0) {
        prev_fin_year_closing_loan_crr = (prev_fin_year_closing_loan_crr / report_data['prev_fin_year_closing']['crr_branch']);
      }
      let this_year_other_crr = report_data['this_year']['others']['crr'] ? report_data['this_year']['others']['crr'] : 0;
      if (report_data['this_year']['crr_branch'] > 0) {
        this_year_other_crr = (this_year_other_crr / report_data['this_year']['crr_branch']);
      }
      let upto_this_month_other_crr = report_data['upto_this_month']['others']['crr'];
      if (report_data['upto_this_month']['crr_branch'] > 0) {
        upto_this_month_other_crr = (upto_this_month_other_crr / report_data['upto_this_month']['crr_branch']);
      }
      let this_month_info_others_this_month_crr = report_data['this_month_info']['others_this_month']['crr'];
      if (report_data['this_month_info']['crr_branch'] > 0) {
        this_month_info_others_this_month_crr = (this_month_info_others_this_month_crr / report_data['this_month_info']['crr_branch']);
      }
      let prev_month_loan_crr = report_data['prev_month']['loans']['crr'];
      if (report_data['prev_month']['crr_branch'] > 0) {
        prev_month_loan_crr = (prev_month_loan_crr / report_data['prev_month']['crr_branch']);
      }
      let upto_this_month_achievement_loan_crr = report_data['upto_this_month_achievement']['loans']['crr'];
      if (report_data['upto_this_month_achievement']['crr_branch'] > 0) {
        upto_this_month_achievement_loan_crr = (upto_this_month_achievement_loan_crr / report_data['upto_this_month_achievement']['crr_branch']);
      }
      let this_month_loan_crr = report_data['this_month']['loans']['crr'];
      if (report_data['this_month']['crr_branch'] > 0) {
        this_month_loan_crr = (this_month_loan_crr / report_data['this_month']['crr_branch']);
      }


      //CRR ->
      this.processedApiData.push({
        "mainComponent": "CRR", // 2.1
        "subComponent": "", // 2.2
        "closingPreviousFinancialYear": prev_fin_year_closing_loan_crr, // 3
        "thisYearTarget": this_year_other_crr, // 4
        "upToThisMonthTarget": upto_this_month_other_crr, // 5
        "thisMonthTarget": this_month_info_others_this_month_crr, // 6
        "prevMonthAchievement": prev_month_loan_crr, // ?7
        "upToThisMonthAchievement": upto_this_month_achievement_loan_crr, // 8
        "thisMonthAchievement": this_month_loan_crr, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });
    },

    PARInsert: function (report_data) {
      let prev_fin_year_closing_loans_par = report_data['prev_fin_year_closing']['loans']['par'] ? report_data['prev_fin_year_closing']['loans']['par'] : 0;
      if (report_data['prev_fin_year_closing']['par_branch'] > 0) {
        prev_fin_year_closing_loans_par = (prev_fin_year_closing_loans_par / report_data['prev_fin_year_closing']['par_branch']);
      }
      let this_year_others_par = report_data['this_year']['others']['par'] ? report_data['this_year']['others']['par'] : 0;

      if (report_data['this_year']['par_branch'] > 0) {
        this_year_others_par = (this_year_others_par / report_data['this_year']['par_branch']);
      }
      let upto_this_month_others_par = report_data['upto_this_month']['others']['par'] ? report_data['upto_this_month']['others']['par'] : 0;
      if (report_data['upto_this_month']['par_branch'] > 0) {
        upto_this_month_others_par = (upto_this_month_others_par / report_data['upto_this_month']['par_branch']);
      }
      let this_month_info_others_this_month_par = report_data['this_month_info']['others_this_month']['par'] ? report_data['this_month_info']['others_this_month']['par'] : 0;
      if (report_data['this_month_info']['par_branch'] > 0) {
        this_month_info_others_this_month_par = (this_month_info_others_this_month_par / report_data['this_month_info']['par_branch']);
      }
      let prev_month_loan_par = report_data['prev_month']['loans']['par'] ? report_data['prev_month']['loans']['par'] : 0;
      if (report_data['prev_month']['par_branch'] > 0) {
        prev_month_loan_par = (prev_month_loan_par / report_data['prev_month']['par_branch']);
      }
      let upto_this_month_achievement_loans_par = report_data['upto_this_month_achievement']['loans']['par'] ? report_data['upto_this_month_achievement']['loans']['par'] : 0;
      if (report_data['upto_this_month_achievement']['par_branch'] > 0) {
        upto_this_month_achievement_loans_par = (upto_this_month_achievement_loans_par / report_data['upto_this_month_achievement']['par_branch']);
      }

      let this_month_loans_par = report_data['this_month']['loans']['par'] ? report_data['this_month']['loans']['par'] : 0;
      if (report_data['this_month']['par_branch'] > 0) {
        this_month_loans_par = (this_month_loans_par / report_data['this_month']['par_branch']);
      }

      //PAR ->
      this.processedApiData.push({
        "mainComponent": "PAR", // 2.1
        "subComponent": "", // 2.2
        "closingPreviousFinancialYear": prev_fin_year_closing_loans_par, // 3
        "thisYearTarget": this_year_others_par, // 4
        "upToThisMonthTarget": upto_this_month_others_par, // 5
        "thisMonthTarget": this_month_info_others_this_month_par, // 6
        "prevMonthAchievement": prev_month_loan_par, // ?7
        "upToThisMonthAchievement": upto_this_month_achievement_loans_par, // 8
        "thisMonthAchievement": this_month_loans_par, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });
    },

    OTRInsert: function (report_data) {
      let prev_fin_year_closing_loans_otr = report_data['prev_fin_year_closing']['loans']['otr'] ? report_data['prev_fin_year_closing']['loans']['otr'] : 0;
      if (report_data['prev_fin_year_closing']['otr_branch'] > 0) {
        prev_fin_year_closing_loans_otr = (prev_fin_year_closing_loans_otr / report_data['prev_fin_year_closing']['otr_branch']);
      }
      let this_year_other_otr = report_data['this_year']['others']['otr'] ? report_data['this_year']['others']['otr'] : 0;
      if (report_data['this_year']['otr_branch'] > 0) {
        this_year_other_otr = (this_year_other_otr / report_data['this_year']['otr_branch']);
      }

      let upto_this_month_other_otr = report_data['upto_this_month']['others']['otr'] ? report_data['upto_this_month']['others']['otr'] : 0;
      if (report_data['upto_this_month']['otr_branch'] > 0) {
        upto_this_month_other_otr = (upto_this_month_other_otr / report_data['upto_this_month']['otr_branch']);
      }
      let this_month_info_others_this_month_otr = report_data['this_month_info']['others_this_month']['otr'] ? report_data['this_month_info']['others_this_month']['otr'] : 0;
      if (report_data['this_month_info']['otr_branch'] > 0) {
        this_month_info_others_this_month_otr = (this_month_info_others_this_month_otr / report_data['this_month_info']['otr_branch']);
      }
      let prev_month_loans_otr = report_data['prev_month']['loans']['otr'] ? report_data['prev_month']['loans']['otr'] : 0;
      if (report_data['prev_month']['otr_branch'] > 0) {
        prev_month_loans_otr = (prev_month_loans_otr / report_data['prev_month']['otr_branch']);
      }
      let upto_this_month_achievement_loans_otr = report_data['upto_this_month_achievement']['loans']['otr'] ? report_data['upto_this_month_achievement']['loans']['otr'] : 0;
      if (report_data['upto_this_month_achievement']['otr_branch'] > 0) {
        upto_this_month_achievement_loans_otr = (upto_this_month_achievement_loans_otr / report_data['upto_this_month_achievement']['otr_branch']);
      }

      //OTR ->
      this.processedApiData.push({
        "mainComponent": "OTR", // 2.1
        "subComponent": "", // 2.2
        "closingPreviousFinancialYear": prev_fin_year_closing_loans_otr, // 3
        "thisYearTarget": this_year_other_otr, // 4
        "upToThisMonthTarget": upto_this_month_other_otr, // 5
        "thisMonthTarget": this_month_info_others_this_month_otr, // 6
        "prevMonthAchievement": prev_month_loans_otr, // ?7
        "upToThisMonthAchievement": upto_this_month_achievement_loans_otr, // 8
        "thisMonthAchievement": upto_this_month_achievement_loans_otr, // 9
        comment: '',
        riskLevel: '',
        satisfactionRatio: ''
      });
    }

  }
}
