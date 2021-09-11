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
        txt_current_due_Loan: {
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
        let url = 'field_officer_performance_analysis/get';
        this.$axios
          .get(url, {params: {'id': id}})
          .then(res => {
            if (res.data.data) {
              const formData = {};
              this.$set(formData, 'name', res.data.data['name']);
              this.$set(formData, 'code', res.data.data['code']);
              this.$set(formData, 'numberOfSamity', res.data.data['numberOfSamity']);
              this.$set(formData, 'numberOfMember', res.data.data['numberOfMember']);
              this.$set(formData, 'numberOfLoan', res.data.data['numberOfLoan']);
              this.$set(formData, 'savingsBalance', res.data.data['savingsBalance']);
              this.$set(formData, 'loanBalance', res.data.data['loanBalance']);
              this.$set(formData, 'currentDueLoan', res.data.data['currentDueLoan']);
              this.$set(formData, 'currentDueBalance', res.data.data['currentDueBalance']);
              this.$set(formData, 'totalDueLoan', res.data.data['totalDueLoan']);
              this.$set(formData, 'totalDueBalance', res.data.data['totalDueBalance']);
              this.$set(formData, 'satisfactionRatio', res.data.data['satisfactionRatio']);
              this.$set(formData, 'riskLevel', res.data.data['riskLevel']);
              this.$set(formData, 'comment', res.data.data['comment']);
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
          const masterId = this.$route.params.id;
          const url = '/field_officer_performance_analysis/edit';
          if (this.id) {
            this.form_data['auditExecutionMastersId'] = masterId;
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
    handleReset: function () {
      this.error_message = [];
      this.$set(this.form_data, "name", this.reset_data.name);
      this.$set(this.form_data, "code", this.reset_data.code);
      this.$set(this.form_data, "numberOfSamity", this.reset_data['numberOfSamity']);
      this.$set(this.form_data, "numberOfMember", this.reset_data['numberOfMember']);
      this.$set(this.form_data, "numberOfLoan", this.reset_data['numberOfLoan']);
      this.$set(this.form_data, "savingsBalance", this.reset_data['savingsBalance']);
      this.$set(this.form_data, "loanBalance", this.reset_data['loanBalance']);
      this.$set(this.form_data, "currentDueLoan", this.reset_data['currentDueLoan']);
      this.$set(this.form_data, "currentDueBalance", this.reset_data['currentDueBalance']);
      this.$set(this.form_data, "totalDueLoan", this.reset_data['totalDueLoan']);
      this.$set(this.form_data, "totalDueBalance", this.reset_data['totalDueBalance']);
      this.errors.clear();
    },
    handleCancel: function () {
      this.$emit('close');
    }
  }
}
