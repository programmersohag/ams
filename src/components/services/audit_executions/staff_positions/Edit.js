import FormGenerator from "@/containers/form_generators/FormGenerator";
import {formatDate} from "@/shared/utils";
import StorageService from "@/shared/common/storage.service";

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
        txt_code: {
          fieldType: "TextInput",
          fieldName: "code",
          label: this.$t("code"),
          vvalidate: "required"
        },
        txt_name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("staff") + " " + this.$t("name"),
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
          vvalidate: "required",
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
    const data = StorageService.getGeneralConfig();
    this.isMfiAudit = !!Number(data['is_mfi_audit']);
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
        let url = 'staff_positions/get';
        this.$axios
          .post(url, null, {params: {'id': id}})
          .then(res => {
            if (res.data.data) {
              const formData = {};
              this.$set(formData, 'name', res.data.data['name']);
              this.$set(formData, 'code', res.data.data['code']);
              this.$set(formData, 'designation', res.data.data['designation']);
              this.$set(formData, 'organizationJoiningDate', formatDate(res.data.data['organizationJoiningDate']));
              this.$set(formData, 'branchJoiningDate', formatDate(res.data.data['branchJoiningDate']));
              this.$set(formData, 'address', res.data.data['address']);
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
          const url = 'staff_positions/edit';
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
      this.$set(this.form_data, "name", this.reset_data.name);
      this.$set(this.form_data, "code", this.reset_data.code);
      this.$set(this.form_data, "designation", this.reset_data.designation);
      this.$set(this.form_data, "organizationJoiningDate", this.reset_data.organizationJoiningDate);
      this.$set(this.form_data, "branchJoiningDate", this.reset_data.branchJoiningDate);
      this.$set(this.form_data, "address", this.reset_data.address);
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
    }
  }
}
