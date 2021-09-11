import FormGenerator from "@/containers/form_generators/FormGenerator";

export default {
  name: "Edit",
  components: {
    FormGenerator
  },
  props: {
    id: null,
    extra_param: Object,
  },
  data() {
    return {
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
          id: "subComponentEdit",
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
      reset_data: {},
      is_form_load: false,
      error_message: [],
      main_component_list: [],
      sub_component_list: [],
      form_data: {},
    }
  },
  mounted() {
    this.getSatisfactionRatio();
    this.getRiskLevel();
    this.loadMainComponent();
    this.findById();
    this.reset_data = Object.assign({}, this.form_data);
    this.is_form_load = true;
  },
  methods: {
    findById: function () {
      let id = this.id;
      if (id) {
        let url = 'target-and-achievements/get';
        this.$axios
          .get(url, {params: {'id': id}})
          .then(res => {
            if (res.data.data) {
              const formData = {};
              this.$set(formData, 'mainComponent', res.data.data['mainComponent']);
              this.$set(formData, 'closingPreviousFinancialYear', res.data.data['closingPreviousFinancialYear']);
              this.$set(formData, 'upToThisMonthTarget', res.data.data['upToThisMonthTarget']);
              this.$set(formData, 'thisYearTarget', res.data.data['thisYearTarget']);
              this.$set(formData, 'thisMonthTarget', res.data.data['thisMonthTarget']);
              this.$set(formData, 'prevMonthAchievement', res.data.data['prevMonthAchievement']);
              this.$set(formData, 'upToThisMonthAchievement', res.data.data['upToThisMonthAchievement']);
              this.$set(formData, 'thisMonthAchievement', res.data.data['thisMonthAchievement']);
              this.$set(formData, 'comment', res.data.data['comment']);
              this.$set(formData, 'satisfactionRatio', res.data.data['satisfactionRatio']);
              this.$set(formData, 'riskLevel', res.data.data['riskLevel']);

              this.loadSubComponent(res.data.data['mainComponent']);
              this.$set(formData, 'subComponent', res.data.data['subComponent']);

              this.form_data = formData;
              this.form_data['auditExecutionMastersId'] = res.data.data['auditExecutionMastersId'];
              this.reset_data = Object.assign({}, this.form_data);
            }
          });
      }
    },
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          const url = '/target-and-achievements/edit';
          if (this.id) {
            this.form_data['id'] = this.id
            const options = {
              headers: {
                'Content-Type': 'application/json'
              }
            }
            this.$axios
              .post(url, JSON.stringify(this.form_data), options)
              .then(res => {
                if (res.data.validation_error) {
                  this.error_message = res.data.validation_error;
                } else {
                  let status = 'failed';
                  if (res.data.statusCode === 200) {
                    status = 'success';
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
        }
      }).catch(() => {
        this.$toast.error({title: 'error', message: "Invalid Field"});
      });
    },
    handleReset: function () {
      this.error_message = [];

      this.errors.clear();
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

      let subComponent = [];
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

      document.getElementById("subComponentEdit").innerHTML = "";

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
  }
}
