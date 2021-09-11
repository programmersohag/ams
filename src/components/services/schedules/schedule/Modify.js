import FormGenerator from "@/containers/form_generators/FormGenerator";
import {calculateDateDiff, formatDate} from "@/shared/utils";
import {
  getLocations,
  getProjects,
  getScheduleById,
  getScheduleType,
  getTeams,
  getTeamTypes,
  handleReset
} from "@/components/services/schedules/schedule/Common";

export default {
  name: "Modify",
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
          label: this.$t("schedule") + " " + this.$t("id"),
          vvalidate: "required"
        },
        txt_name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("schedule") + " " + this.$t("title"),
          vvalidate: "required"
        },
        txt_location: {
          fieldType: "SelectList",
          fieldName: "location",
          label: this.$t("location"),
          vvalidate: "required",
          options: [],
          onChange: true
        },
        txt_team_type: {
          fieldType: "SelectList",
          fieldName: "teamType",
          label: this.$t("team") + " " + this.$t("type"),
          vvalidate: "required",
          options: [],
          onChange: true
        },
        txt_team: {
          fieldType: "SelectList",
          fieldName: "team",
          label: this.$t("team"),
          vvalidate: "required",
          options: [],
          onChange: true
        },
        txt_project: {
          fieldType: "SelectList",
          fieldName: "project",
          label: this.$t("project"),
          vvalidate: "required",
          options: [],
          onChange: true
        },
        txt_scheduleType: {
          fieldType: "SelectList",
          fieldName: "scheduleType",
          label: this.$t("schedule") + " " + this.$t("type"),
          vvalidate: "required",
          options: [],
          onChange: true
        },
        txt_last_audit_date: {
          fieldType: "DateInput",
          fieldName: "lastAuditDate",
          label: this.$t("last") + " " + this.$t("audit") + " " + this.$t("date"),
          vvalidate: "required",
          isDisabled: true
        },
        txt_audit_cycle_number: {
          fieldType: "NumberInput",
          fieldName: "auditCycleNumber",
          label: this.$t("audit") + " " + this.$t("cycle"),
          isReadOnly: true
        },
        txt_auditing_from_date: {
          fieldType: "DateInput",
          fieldName: "auditingFromDate",
          label: this.$t("auditing") + " " + this.$t('start') + ' ' + this.$t("date"),
          vvalidate: "required",
          onChange: true
        },
        txt_auditing_to_date: {
          fieldType: "DateInput",
          fieldName: "auditingToDate",
          label: this.$t("auditing") + " " + this.$t('end') + ' ' + this.$t("date"),
          vvalidate: "required",
          onChange: true
        },
        txt_audit_duration_day: {
          fieldType: "NumberInput",
          fieldName: "auditDurationDay",
          label: this.$t("audit") + " " + this.$t("duration") + " " + this.$t("day"),
          vvalidate: "required",
          isReadOnly: true
        },
        txt_audit_period_from_date: {
          fieldType: "DateInput",
          fieldName: "auditPeriodFromDate",
          label: this.$t("audit") + " " + this.$t('period') + ' ' + this.$t('start') + ' ' + this.$t("date"),
          vvalidate: "required",
          maxDate: 0,
          onChange: true
        },
        txt_audit_period_to_date: {
          fieldType: "DateInput",
          fieldName: "auditPeriodToDate",
          label: this.$t("audit") + " " + this.$t('period') + ' ' + this.$t('end') + ' ' + this.$t("date"),
          vvalidate: "required",
          maxDate: 0,
          onChange: true
        },
      },
      resetData: {},
      is_form_load: false,
      error_message: [],
      formData: {},
      params: {}
    }
  },
  mounted() {
    getLocations().then(data => {
      this.schema["txt_location"]["options"] = data;
    });
    getTeamTypes().then(data => {
      this.schema["txt_team_type"]["options"] = data;
    });
    getTeams(this.formData['teamType'], this.formData['location']).then(data => {
      this.schema["txt_team"]["options"] = data;
    });
    getProjects().then(data => {
      this.schema["txt_project"]["options"] = data;
    });
    this.schema["txt_scheduleType"]["options"] = getScheduleType();
    if (this.id) {
      getScheduleById(this.id).then(data => {
        this.formData = data;
        let scheduleId = this.id;
        this.resetData = Object.assign({}, data);
        const teamTypeId = data.teamType;
        if (teamTypeId) {
          getTeams(teamTypeId, scheduleId).then(data => {
            this.schema["txt_team"]["options"] = data;
          });
        }
      }).catch(error => {
        console.error(error);
      });
    }
    this.is_form_load = true;
  },
  methods: {
    isDateGetterThenCurrentDate: function (inputDate) {
      var parts = inputDate.split('-');
      var mydate = new Date(parts[2], parts[1] - 1, parts[0]);  //yyyy-mm-dd
      var systemDate = new Date();
      let isOk = true;
      if (systemDate.getFullYear() > mydate.getFullYear()) {
        isOk = false;
      } else if (systemDate.getFullYear() == mydate.getFullYear()
        && systemDate.getMonth() > mydate.getMonth()) {
        isOk = false;
      } else if (systemDate.getFullYear() == mydate.getFullYear()
        && systemDate.getMonth() == mydate.getMonth()
        && systemDate.getDay() > mydate.getDay()) {
        isOk = false;
      }
      if (!isOk) {
        this.$toast.warn({
          title: "Auditing Date Mismatch",
          message: "Auditing date Should not be less then today"
        });
      }
      return isOk;
    },

    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          let params = new FormData();
          let url = '/schedules/add';
          for (let key in this.formData) {
            params.append(key, this.formData[key]);
            if (key == 'auditingFromDate' || key == 'auditingToDate') {
              let ok = this.isDateGetterThenCurrentDate(this.formData[key]);
              if (!ok) {
                return;
              }
            }
          }

          params.delete("scheduleStatus");
          params.delete("id");
          params.append("scheduleStatus", 'PENDING_MODIFIED');
          this.$axios
            .post(url, params)
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
      }).catch(() => {
        this.$toast.error({title: 'error', message: "Invalid Field"});
      });
    }
    ,
    loadLastDateAndCycleNumber: function (param) {
      let url = '/schedules/getLastDateAndCycleNumber';
      this.$axios
        .post(url, null, {params: param})
        .then(res => {
          if (res.data.statusCode === 200) {
            if (res.data.data['auditCycleNumber'] === null) {
              this.$set(this.formData, 'auditCycleNumber', '');
              this.$set(this.formData, 'auditCycleNumber', 1);
              this.$set(this.formData, 'lastAuditDate', '');
              this.schema['txt_last_audit_date']['isDisabled'] = false;
            } else {
              this.$set(this.formData, 'auditCycleNumber', parseInt(res.data.data['auditCycleNumber']) + 1);
              this.schema['txt_last_audit_date']['isDisabled'] = true;
              this.$set(this.formData, 'lastAuditDate', formatDate(res.data.data['lastAuditDate']));
            }
          }
        });
    }
    ,
    onChangeMethod(field, value) {
      if (field === "location") {
        this.params['locationId'] = value;
      }
      if (field === "teamType") {
        this.params['teamTypeId'] = value;
        getTeams(value, this.formData['location']).then(data => {
          this.schema["txt_team"]["options"] = data;
        });
      }
      if (field === "team") {
        this.params['teamId'] = value;
      }
      if (field === "project") {
        this.params['projectId'] = value;
        this.loadLastDateAndCycleNumber(this.params);
      }
      if (field === "auditingFromDate") {
        const end_date = this.formData['auditingToDate'];
        this.$set(this.formData, 'auditDurationDay', calculateDateDiff(end_date, value));
      }
      if (field === "auditingToDate") {
        const start_date = this.formData['auditingFromDate'];
        this.$set(this.formData, 'auditDurationDay', calculateDateDiff(value, start_date));
      }
    }
    ,
    handleReset: function () {
      this.error_message = [];
      this.formData = handleReset(this.resetData);
      this.errors.clear();
    }
    ,
    handleCancel: function () {
      this.$emit('close');
    }
  }
}
