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
        },
        txt_passbook_outstanding: {
          fieldType: "NumberInput",
          fieldName: "passbookOutstanding",
          label: this.$t("passbook") + ' ' + this.$t("outstanding"),
          vvalidate: "required"
        },
        txt_loan_difference: {
          fieldType: "NumberInput",
          fieldName: "loanDifference",
          label: this.$t("loan") + ' ' + this.$t("difference"),
          isDisabled: true,
          onChange: true,
          vvalidate: "required"
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
          vvalidate: "required"
        },
        txt_passbook_savings: {
          fieldType: "NumberInput",
          fieldName: "passbookSavings",
          label: this.$t("passbook") + ' ' + this.$t("savings"),
          vvalidate: "required"
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
        // txt_comment: {
        //   fieldType: "TextAreaInput",
        //   fieldName: "comment",
        //   label: this.$t("comment"),
        //   vvalidate: ""
        // }
        txt_comment: {
          fieldType: "TextEditor",
          fieldName: "comment",
          label: this.$t("comments"),
          vvalidate: "required",
        },
      },
      reset_data: {},
      is_form_load: false,
      isMfiAudit: false,
      error_message: [],
      form_data: {},
    }
  },
  mounted() {
    this.getSatisfactionRatio();
    this.getRiskLevel();
    this.findById();
    this.isMfiAudit = false;
    if (this.isMfiAudit) {
      this.makeFormDisabled();
    }
    this.reset_data = Object.assign({}, this.form_data);
    this.is_form_load = true;
  },
  methods: {
    findById: function () {
      let id = this.id;
      if (id) {
        let url = 'passbook_balances/get';
        this.$axios
          .post(url, null, {params: {'id': id}})
          .then(res => {
            if (res.data.data) {
              const formData = {};
              this.$set(formData, 'samityCode', res.data.data['samityCode']);
              this.$set(formData, 'samityName', res.data.data['samityName']);
              this.$set(formData, 'memberCode', res.data.data['memberCode']);
              this.$set(formData, 'memberName', res.data.data['memberName']);
              this.$set(formData, 'loanCode', res.data.data['loanCode']);
              this.$set(formData, 'outstanding', res.data.data['outstanding']);
              this.$set(formData, 'passbookOutstanding', res.data.data['passbookOutstanding']);
              this.$set(formData, 'loanDifference', res.data.data['loanDifference']);
              this.$set(formData, 'savingsCode', res.data.data['savingsCode']);
              this.$set(formData, 'savings', res.data.data['savings']);
              this.$set(formData, 'passbookSavings', res.data.data['passbookSavings']);
              this.$set(formData, 'savingsDifference', res.data.data['savingsDifference']);
              this.$set(formData, 'satisfactionRatio', res.data.data['satisfactionRatio']);
              this.$set(formData, 'riskLevel', res.data.data['riskLevel']);
              this.$set(formData, 'comment', res.data.data['comment']);

              if(!res.data.data['riskLevel']){
                this.$set(formData, 'riskLevel', "NOT_APPLICABLE");
              }
              this.form_data = formData;
              this.form_data['auditExecutionMasterId'] = res.data.data['auditExecutionMasterId'];
              this.reset_data = Object.assign({}, this.form_data);
            }
          });
      }
    },
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          const url = 'passbook_balances/edit';
          if (this.id) {
            this.form_data['id'] = this.id
            let params = new FormData();
            for (let key in this.form_data) {
              params.append(key, this.form_data[key]);
            }
            this.$axios
              .post(url, params)
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
      this.$set(this.form_data, "samityCode", this.reset_data['samityCode']);
      this.$set(this.form_data, "samityName", this.reset_data['samityName']);
      this.$set(this.form_data, "memberCode", this.reset_data['memberCode']);
      this.$set(this.form_data, "memberName", this.reset_data['memberName']);
      this.$set(this.form_data, "loanCode", this.reset_data['loanCode']);
      this.$set(this.form_data, "outstanding", this.reset_data['outstanding']);
      this.$set(this.form_data, "passbookOutstanding", this.reset_data['passbookOutstanding']);
      this.$set(this.form_data, "savingsCode", this.reset_data['savingsCode']);
      this.$set(this.form_data, "savings", this.reset_data['savings']);
      this.$set(this.form_data, "passbookSavings", this.reset_data['passbookSavings']);
      this.$set(this.form_data, "satisfactionRatio", this.reset_data.satisfactionRatio);
      this.$set(this.form_data, "riskLevel", this.reset_data.riskLevel);
      this.$set(this.form_data, "comment", this.reset_data.comment);
      this.errors.clear();
    },
    clear: function () {
      this.search_form_data.name = '';
    },
    handleCancel: function () {
      this.$emit('close');
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
    makeFormDisabled: function () {
      this.schema.txt_code['isDisabled'] = true;
      this.schema.txt_name['isDisabled'] = true;
      this.schema.txt_designation['isDisabled'] = true;
      this.schema.txt_org_join_date['isDisabled'] = true;
      this.schema.txt_branch_join_date['isDisabled'] = true;
      this.schema.txt_address['isDisabled'] = true;
    },
  }
}
