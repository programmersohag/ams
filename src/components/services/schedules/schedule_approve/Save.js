import FormGenerator from "@/containers/form_generators/FormGenerator";
import {getScheduleById} from "@/components/services/schedules/schedule/Common";
import {getScheduleStatus} from "../schedule/Common";

export default {
  name: "Save",
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
        // ===================hidden input start=========================================
        hidden_locationId: {
          fieldType: "HiddenInput",
          fieldName: "location",
          label: "",
          onChange: false,
        },
        hidden_teamTypeId: {
          fieldType: "HiddenInput",
          fieldName: "teamType",
          label: "",
          onChange: false,
        },
        hidden_teamId: {
          fieldType: "HiddenInput",
          fieldName: "team",
          label: "",
          onChange: false,
        },
        hidden_projectId: {
          fieldType: "HiddenInput",
          fieldName: "project",
          label: "",
          onChange: false,
        },
        // ===================hidden input end=========================================
        txt_location: {
          fieldType: "StaticField",
          fieldName: "locationName",
          label: this.$t("location"),
        },
        txt_project: {
          fieldType: "StaticField",
          fieldName: "projectName",
          label: this.$t("project"),
        },
        txt_team: {
          fieldType: "StaticField",
          fieldName: "teamName",
          label: this.$t("team"),
        },
        txt_schedule_status: {
          fieldType: "SelectList",
          fieldName: "scheduleStatus",
          label: this.$t("schedule") + ' ' + this.$t("status"),
          options: [],
          onChange: true,
          vvalidate: "required"
        },
        txt_comment: {
          fieldType: "TextEditor",
          fieldName: "note",
          label: this.$t("note"),
        }
      },
      resetData: {},
      is_form_load: false,
      error_message: [],
      formData: {},
      params: {}
    }
  },
  mounted() {
    if (this.id) {
      getScheduleById(this.id).then(data => {
        this.formData = data;
        this.formData['note'] = '';
        this.resetData = Object.assign({}, this.formData);
      }).catch(error => {
        console.error(error);
      });
    }
    this.schema.txt_schedule_status.options = getScheduleStatus();
    this.is_form_load = true;
  },
  methods: {
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          let params = {};
          let url = '/schedules/edit_approved';
          for (let key in this.formData) {
            params[key] = this.formData[key];
          }
          params['id'] = this.id;
          params['scheduleStatus'] = this.formData['scheduleStatus'];
          this.$axios
            .post(url, JSON.stringify(params), {
              headers: {'Content-Type': 'application/json'}
            }).then(res => {
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
      }).catch(() => {
        this.$toast.error({title: 'error', message: "Invalid Field"});
      });
    },
    handleReset: function () {
      this.error_message = [];
      this.$set(this.formData, 'scheduleStatus', this.resetData['scheduleStatus']);
      this.$set(this.formData, 'note', this.resetData['note']);
      this.errors.clear();
    },
    handleCancel: function () {
      this.$emit('close');
    },
    onChangeMethod(field, value) {
      if (field === "scheduleStatus" && value === 'FEEDBACK') {
        this.schema['txt_note']['vvalidate'] = 'required';
      } else {
        this.schema['txt_note']['vvalidate'] = '';
      }
    }
  }
}
