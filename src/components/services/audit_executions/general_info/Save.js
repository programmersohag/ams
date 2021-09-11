import FormGenerator from "@/containers/form_generators/FormGenerator";

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
        txt_schedule: {
          fieldType: "SelectList",
          fieldName: "schedule",
          label: this.$t("schedule"),
          id: "schedule",
          options: [],
          vvalidate: "required",
          onChange: true,
        },
        txt_team: {
          fieldType: "TextInput",
          fieldName: "team",
          label: this.$t("team") + ' ' + this.$t("info"),
          isReadOnly: true
        },
        txt_location: {
          fieldType: "TextInput",
          fieldName: "location",
          label: this.$t("location"),
          isReadOnly: true
        },
        txt_auditingDate: {
          fieldType: "TextInput",
          fieldName: "auditingDate",
          label: this.$t("auditing") + ' ' + this.$t("date"),
          isReadOnly: true
        },
        txt_auditPeriod: {
          fieldType: "TextInput",
          fieldName: "auditPeriod",
          label: this.$t("audit") + ' ' + this.$t("period"),
          isReadOnly: true
        },
        txt_audit_area: {
          fieldType: "TextAreaInput",
          fieldName: "auditArea",
          label: this.$t("audit") + ' ' + this.$t("area"),
          vvalidate: "required",
        },
        txt_purpose: {
          fieldType: "TextAreaInput",
          fieldName: "purpose",
          label: this.$t("purpose"),
          vvalidate: "required",
        },
        txt_limitation_of_audit: {
          fieldType: "TextAreaInput",
          fieldName: "limitationOfAudit",
          label: this.$t("limitation") + ' ' + this.$t("of") + ' ' + this.$t("audit"),
          vvalidate: "required",
        }
      },
      resetData: {},
      is_form_load: false,
      error_message: [],
      schedule_list: [],
      formData: {},
    }
  },
  mounted() {
    this.is_form_load = true;
    this.loadSchedules();

    if (this.id) {
      let url = 'general_info/getDetailsByMasterId/' + this.id;   //here this.id is master id
      this.$axios
        .post(url)
        .then(res => {
          if (res.data.data['generalInfo']) {
            const general_info = res.data.data['generalInfo'];
            const formData = {};
            this.$set(formData, 'schedule', general_info.schedule.id);
            this.$set(formData, 'auditArea', general_info.auditArea);
            this.$set(formData, 'purpose', general_info.purpose);
            this.$set(formData, 'limitationOfAudit', general_info.limitationOfAudit);
            let team = '[' + general_info.schedule.team.code + ']-' + general_info.schedule.team.name;
            let location = '[' + general_info.schedule.location.code + ']-' + general_info.schedule.location.name + ', ' + general_info.schedule.location.address;
            let auditPeriod = general_info.schedule.auditPeriodFromDate + ' To ' + general_info.schedule.auditPeriodToDate;
            let auditingDate = general_info.schedule.auditingFromDate + ' To ' + general_info.schedule.auditingToDate;

            this.$set(formData, 'team', team);
            this.$set(formData, 'location', location);
            this.$set(formData, 'auditingDate', auditingDate);
            this.$set(formData, 'auditPeriod', auditPeriod);

            this.formData = formData;
            this.resetData = Object.assign({}, general_info);
            this.schema['txt_schedule']['isDisabled'] = true;
          }
        });
    } else {
      this.schema['txt_schedule']['isDisabled'] = false;
    }
  },
  methods: {
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          let url = '/general_info/add';
          if (this.id) {
            url = '/general_info/edit';
            this.formData['auditExecutionMastersId'] = this.id;
          }
          this.formData['schedule'] = {'id': this.formData['schedule']};
          this.formData['scheduleId'] = this.formData['schedule'];
          this.$axios
            .post(url, JSON.stringify(this.formData), {
              headers: {'Content-Type': 'application/json'}
            })
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
      }).catch(() => {
        this.$toast.error({title: 'error', message: "Invalid Field"});
      });
    },
    handleReset: function () {
      this.error_message = [];
      const general_info = this.resetData;
      const formData = {};

      if (this.id) {   //for edit
        this.$set(formData, 'schedule', general_info.schedule.id);
        let team = '[' + general_info.schedule.team.code + ']-' + general_info.schedule.team.name;
        let location = '[' + general_info.schedule.location.code + ']-' + general_info.schedule.location.name + ', ' + general_info.schedule.location.address;
        let auditPeriod = general_info.schedule.auditPeriodFromDate + ' To ' + general_info.schedule.auditPeriodToDate;
        let auditingDate = general_info.schedule.auditingFromDate + ' To ' + general_info.schedule.auditingToDate;

        this.$set(formData, 'team', team);
        this.$set(formData, 'location', location);
        this.$set(formData, 'auditingDate', auditingDate);
        this.$set(formData, 'auditPeriod', auditPeriod);
        this.$set(formData, 'auditArea', general_info.auditArea);
        this.$set(formData, 'purpose', general_info.purpose);
        this.$set(formData, 'limitationOfAudit', general_info.limitationOfAudit);
        this.formData = formData;
      } else if (!window.localStorage.getItem("schedule")) {   // for admint add
        this.formData = formData;  // blank formdata to clear all field
      } else if (window.localStorage.getItem("schedule")) {  // for non admin add
        this.$set(this.formData, 'auditArea', '');
        this.$set(this.formData, 'purpose', '');
        this.$set(this.formData, 'limitationOfAudit', '');
      }

      this.errors.clear();
    },
    handleCancel: function () {
      this.resetData = {};
      this.$emit('close');
    },
    loadScheduleRelatedInfos: function (scheduleId) {
      this.resetScheduleRelatedInfo();
      let url = '/schedules/findById/' + scheduleId;
      this.$axios.get(url)
        .then(res => {
          if (res.data.statusCode === 200) {
            if (res.data.data) {
              let team = '[' + res.data.data.team.code + ']-' + res.data.data.team.name;
              let location = '[' + res.data.data.location.code + ']-' + res.data.data.location.name + ', ' + res.data.data.location.address;
              let auditingDate = res.data.data.auditingFromDate + ' To ' + res.data.data.auditingToDate;
              let auditPeriod = res.data.data.auditPeriodFromDate + ' To ' + res.data.data.auditPeriodToDate;
              this.$set(this.formData, 'team', team);
              this.$set(this.formData, 'location', location);
              this.$set(this.formData, 'auditPeriod', auditPeriod);
              this.$set(this.formData, 'auditingDate', auditingDate);
            }
          }
        });
    },
    loadSchedules: function () {
      this.$axios
        .get('/schedules')
        .then(res => {
          if (res.data.statusCode === 200) {
            this.schedule_list.push({
              text: "--" + this.$t("select") + this.$t(" ") + this.$t("schedule") + "--",
              value: ''
            });
            for (let i in res.data.data) {
              this.schedule_list.push({
                value: res.data.data[i].id,
                text: res.data.data[i].name
              });
            }
            this.schema["txt_schedule"]["options"] = this.schedule_list;
            if (this.id) {
              this.schema['txt_schedule']['isDisabled'] = true;
            } else if (window.localStorage.getItem("schedule")) {
              this.$set(this.formData, 'schedule', window.localStorage.getItem("schedule"));
              this.loadScheduleRelatedInfos(window.localStorage.getItem("schedule"));
              this.schema['txt_schedule']['isDisabled'] = true;
            } else {
              this.schema['txt_schedule']['isDisabled'] = false;
            }

          }
        });
    },
    onChangeMethod(field, value) {
      if (field === "schedule") {
        this.loadScheduleRelatedInfos(value);
      }
    },
    resetScheduleRelatedInfo: function () {
      this.$set(this.formData, 'team', '');
      this.$set(this.formData, 'location', '');
      this.$set(this.formData, 'auditPeriod', '');
      this.$set(this.formData, 'auditingDate', '');
    }
  }
}
