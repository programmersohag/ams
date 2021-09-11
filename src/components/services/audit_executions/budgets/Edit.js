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
      form_data: {},
    }
  },
  mounted() {
    this.getSatisfactionRatio();
    this.getRiskLevel();
    this.findById();
    this.reset_data = Object.assign({}, this.form_data);
    this.is_form_load = true;
  },
  methods: {
    findById: function () {
      let id = this.id;
      if (id) {
        let url = 'budgets/get';
        this.$axios
          .get(url, {params: {'id': id}})
          .then(res => {
            if (res.data.data) {
              const formData = {};
              this.$set(formData, 'budgetHead', res.data.data['budgetHead']);
              this.$set(formData, 'yearlyApprovedBudget', res.data.data['yearlyApprovedBudget']);
              this.$set(formData, 'yearlyReviseBudget', res.data.data['yearlyReviseBudget']);
              this.$set(formData, 'auditingPeriodBudget', res.data.data['auditingPeriodBudget']);
              this.$set(formData, 'expenditureUpToPreviousMonth', res.data.data['expenditureUpToPreviousMonth']);
              this.$set(formData, 'expenditureAuditingMonth', res.data.data['expenditureAuditingMonth']);
              this.$set(formData, 'comment', res.data.data['comment']);
              this.$set(formData, 'satisfactionRatio', res.data.data['satisfactionRatio']);
              this.$set(formData, 'riskLevel', res.data.data['riskLevel']);
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
          const url = '/budgets/edit';
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
      this.$set(this.form_data, "name", this.reset_data.name);
      this.$set(this.form_data, "code", this.reset_data.code);
      this.$set(this.form_data, "numberOfSamity", this.reset_data['numberOfSamity']);
      this.$set(this.form_data, "numberOfMember", this.reset_data['numberOfMember']);
      this.$set(this.form_data, "numberOfLoanee", this.reset_data['numberOfLoanee']);
      this.$set(this.form_data, "savingsBalance", this.reset_data['savingsBalance']);
      this.$set(this.form_data, "loanBalance", this.reset_data['loanBalance']);
      this.$set(this.form_data, "currentDueLoanee", this.reset_data['currentDueLoanee']);
      this.$set(this.form_data, "currentDueBalance", this.reset_data['currentDueBalance']);
      this.$set(this.form_data, "totalDueLoanee", this.reset_data['totalDueLoanee']);
      this.$set(this.form_data, "totalDueBalance", this.reset_data['totalDueBalance']);
      this.$set(this.form_data, "comment", this.reset_data['comment']);
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
    }
  }
}
