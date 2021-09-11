import FormGenerator from "@/containers/form_generators/FormGenerator";
import {imageLoad} from '@/shared/utils';

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
        txt_check_list_category: {
          fieldType: "SelectList",
          fieldName: "checkListCategory",
          label: this.$t("check") + " " + this.$t("list") + ' ' + this.$t("category"),
          options: [],
        },
        txt_check_list: {
          fieldType: "SelectList",
          fieldName: "checkList",
          label: this.$t("check") + " " + this.$t("list"),
          options: {'': "--" + this.$t("select") + "--"},
          onChange: true,
          vvalidate: "required"
        },
        txt_expected_action: {
          fieldType: "SelectList",
          fieldName: "expectedAction",
          label: this.$t("expected") + " " + this.$t("action"),
          options: {'': "--" + this.$t("select") + "--"},
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
        txt_evidence: {
          fieldType: "ImageInput",
          fieldName: "evidence",
          label: this.$t("evidence"),
          vvalidate: ""
        },
        txt_comment: {
          fieldType: "TextEditor",
          fieldName: "comment",
          label: this.$t("comments"),
          vvalidate: "required",
        }
      },
      reset_data: {},
      is_form_load: false,
      error_message: [],
      form_data: {},
    }
  },
  mounted() {
    this.getExpectedActions();
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
        let url = 'check_point_executions/get';
        this.$axios
          .post(url, null, {params: {'id': id}})
          .then(res => {
            if (res.data.data) {
              const catId = res.data.data['checkList']['checkListCategory']['id'];
              const formData = {};
              this.$set(formData, 'checkListCategory', catId);
              this.$set(formData, 'checkList', res.data.data['checkList']['id']);
              this.$set(formData, 'expectedAction', res.data.data['expectedAction']);
              this.$set(formData, 'satisfactionRatio', res.data.data['satisfactionRatio']);
              this.$set(formData, 'riskLevel', res.data.data['riskLevel']);
              this.$set(formData, 'comment', res.data.data['comment']);
              this.form_data = formData;
              this.form_data['auditExecutionMastersId'] = res.data.data['auditExecutionMastersId'];
              this.schema.txt_check_list_category.options = [{
                text: res.data.data['checkList']['checkListCategory']['name'],
                value: catId
              }];
              this.getCheckList({"groupId": catId});
              const imagePath = res.data.data['imageIdentity'];
              if (imagePath) {
                this.getDoc(imagePath);
              }
              this.reset_data = Object.assign({}, this.form_data);
            }
          });
      }
    },
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          const url = '/check_point_executions/edit';
          if (this.id) {
            this.form_data['id'] = this.id
            this.form_data['checkList'] = {id: this.form_data['checkList']};
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
      this.$set(this.form_data, "checkList", this.reset_data.checkList);
      this.$set(this.form_data, "expectedAction", this.reset_data.expectedAction);
      this.$set(this.form_data, "satisfactionRatio", this.reset_data.satisfactionRatio);
      this.$set(this.form_data, "riskLevel", this.reset_data.riskLevel);
      this.$set(this.form_data, "comment", this.reset_data.comment);
      this.errors.clear();
    },
    handleCancel: function () {
      this.$emit('close');
    },
    getCheckList: function (params) {
      this.$axios.get("schedules/check_lists", {params: params})
        .then(res => {
          let array = [{
            text: "--" + this.$t("select") + " " + this.$t("check") + " " + this.$t("list") + "--",
            value: ''
          }];
          if (res.data.data) {
            const check_list = res.data.data;
            for (let key in check_list) {
              array.push({value: check_list[key].id, text: check_list[key].name});
            }
            this.is_child_form_load = true;
          }
          this.schema['txt_check_list']['options'] = array;
        });
    },
    getExpectedActions: function () {
      this.schema['txt_expected_action']['options'] = [
        {
          text: "--" + this.$t("select") + "--",
          value: ''
        },
        {
          text: "Verified",
          value: 'VERIFIED'
        },
        {
          text: "Not Verified",
          value: 'NOT_VERIFIED'
        },
        {
          text: "Not Applicable",
          value: 'NOT_APPLICABLE'
        }
      ];
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
    //Display Image
    getDoc: function (docFileName) {
      let dowFileInfo = {
        "file": docFileName,
        "folder": 'employee_signature',
        "project": 'branch-2',
        "drive": "mfin-" + "demonext",
      };
      if (docFileName) {
        imageLoad(dowFileInfo).then((value) => {
          if (value) {
            this.form_data['evidence'] = value;
          }
        })
      }
    },
  }
}
