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
          isShow: false
        },
        txt_team: {
          fieldType: "TextInput",
          fieldName: "team",
          label: this.$t("team") + ' ' + this.$t("info"),
          isReadOnly: true,
          isShow: false
        },
        txt_location: {
          fieldType: "TextInput",
          fieldName: "location",
          label: this.$t("location"),
          isReadOnly: true,
          isShow: false
        },
        txt_auditPeriod: {
          fieldType: "TextInput",
          fieldName: "auditPeriod",
          label: this.$t("audit") + ' ' + this.$t("period"),
          isReadOnly: true,
          isShow: false
        },
        txt_fixedAssetOpeningBalance: {  //1
          fieldType: "NumberInput",
          fieldName: "fixedAssetOpeningBalance",
          label: this.$t("fixed") + ' ' + this.$t("asset") + ' ' + this.$t("opening") + ' ' + this.$t("balance"),
          vvalidate: "required",
          onChange: true,
        },
        txt_addition: {   //2
          fieldType: "NumberInput",
          fieldName: "fixedAssetAddition",
          label: this.$t("addition"),
          vvalidate: "required",
          onChange: true
        },
        txt_disposal: {  //3
          fieldType: "NumberInput",
          fieldName: "fixedAssetDisposal",
          label: this.$t("disposal"),
          vvalidate: "required",
          onChange: true
        },
        txt_closingBalance: {   //4
          fieldType: "NumberInput",
          fieldName: "fixedAssetClosingBalance",
          label: this.$t("closing") + ' ' + this.$t("balance"),
          vvalidate: "required",
          isReadOnly: true
        },
        txt_actualBalanceAfterInventory: {   //5
          fieldType: "NumberInput",
          fieldName: "actualBalanceAfterInventory",
          label: this.$t("actual") + ' ' + this.$t("balance") + ' ' + this.$t("after") + ' ' + this.$t("inventory"),
          vvalidate: "required"
        },
        txt_depreciationOpeningBalance: {   //6
          fieldType: "NumberInput",
          fieldName: "depreciationOpeningBalance",
          label: this.$t("depreciation") + ' ' + this.$t("opening") + ' ' + this.$t("balance"),
          vvalidate: "required",
          onChange: true
        },
        txt_depreciationNewCharge: {    //7
          fieldType: "NumberInput",
          fieldName: "depreciationNewCharge",
          label: this.$t("depreciation") + ' ' + this.$t("new") + ' ' + this.$t("charge"),
          vvalidate: "required",
          onChange: true
        },
        txt_depreciationAdjustment: {   //8
          fieldType: "NumberInput",
          fieldName: "depreciationAdjustment",
          label: this.$t("depreciation") + ' ' + this.$t("adjustment"),
          vvalidate: "required",
          onChange: true
        },
        txt_accumulatedDepreciation: {   //9
          fieldType: "NumberInput",
          fieldName: "accumulatedDepreciation",
          label: this.$t("accumulated") + ' ' + this.$t("depreciation"),
          vvalidate: "required",
          isReadOnly: true
        },
        txt_writtenDownValue: {   //10
          fieldType: "NumberInput",
          fieldName: "writtenDownValue",
          label: this.$t("written") + ' ' + this.$t("down") + ' ' + this.$t("value"),
          vvalidate: "required",
          isReadOnly: true
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
        /*txt_comment: {
          fieldType: "TextAreaInput",
          fieldName: "comment",
          label: this.$t("comments"),
          vvalidate: "required",
        },*/
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
      schedule_list: [],
      formData: {},
      calculated_value: false,

    }
  },
  mounted() {

    this.is_form_load = true;
    this.getSatisfactionRatio();
    this.getRiskLevel();
    this.loadSchedules();

    if (this.id) {
      let url = 'fixed-asset/getByMasterId/' + this.id;   //here this.id is master id
      this.$axios
        .post(url)
        .then(res => {
          if (res.data.data) {
            const formData = {};
            this.$set(formData, 'schedule', res.data.data.schedule.id);
            this.$set(formData, 'fixedAssetOpeningBalance', res.data.data.fixedAssetOpeningBalance);
            this.$set(formData, 'fixedAssetAddition', res.data.data.fixedAssetAddition);
            this.$set(formData, 'fixedAssetDisposal', res.data.data.fixedAssetDisposal);
            this.$set(formData, 'fixedAssetClosingBalance', res.data.data.fixedAssetClosingBalance);
            this.$set(formData, 'actualBalanceAfterInventory', res.data.data.actualBalanceAfterInventory);
            this.$set(formData, 'depreciationOpeningBalance', res.data.data.depreciationOpeningBalance);
            this.$set(formData, 'depreciationNewCharge', res.data.data.depreciationNewCharge);
            this.$set(formData, 'depreciationAdjustment', res.data.data.depreciationAdjustment);
            this.$set(formData, 'accumulatedDepreciation', res.data.data.accumulatedDepreciation);
            this.$set(formData, 'writtenDownValue', res.data.data.writtenDownValue);
            this.$set(formData, 'comment', res.data.data.comment);
            this.$set(formData, 'satisfactionRatio', res.data.data.satisfactionRatio);
            this.$set(formData, 'riskLevel', res.data.data.riskLevel);
            if (!res.data.data['riskLevel']) {
              this.$set(formData, 'riskLevel', "NOT_APPLICABLE");
            }
            let team = '[' + res.data.data.schedule.team.code + ']-' + res.data.data.schedule.team.name;
            let location = '[' + res.data.data.schedule.location.code + ']-' + res.data.data.schedule.location.name + ', ' + res.data.data.schedule.location.address;
            let auditPeriod = res.data.data.schedule.fromDate + ' To ' + res.data.data.schedule.toDate;
            this.$set(formData, 'team', team);
            this.$set(formData, 'location', location);
            this.$set(formData, 'auditPeriod', auditPeriod);

            this.formData = formData;
            this.resetData = Object.assign({}, res.data.data);
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
          let params = new FormData();
          let form = this.formData;
          let url = '/fixed-asset/add';
          if (this.id) {
            url = '/fixed-asset/edit';
            params['master_id'] = this.id;
          }
          for (let key in form) {
            params[key] = form[key];
          }
          const body = JSON.stringify(params);
          this.$axios
            .post(url, body, {
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
      const formData = {};
      this.$set(formData, 'schedule', this.resetData.schedule.id);
      this.$set(formData, 'fixedAssetOpeningBalance', this.resetData.fixedAssetOpeningBalance);
      this.$set(formData, 'fixedAssetAddition', this.resetData.fixedAssetAddition);
      this.$set(formData, 'fixedAssetDisposal', this.resetData.fixedAssetDisposal);
      this.$set(formData, 'fixedAssetClosingBalance', this.resetData.fixedAssetClosingBalance);
      this.$set(formData, 'actualBalanceAfterInventory', this.resetData.actualBalanceAfterInventory);
      this.$set(formData, 'depreciationOpeningBalance', this.resetData.depreciationOpeningBalance);
      this.$set(formData, 'depreciationNewCharge', this.resetData.depreciationNewCharge);
      this.$set(formData, 'depreciationAdjustment', this.resetData.depreciationAdjustment);
      this.$set(formData, 'accumulatedDepreciation', this.resetData.accumulatedDepreciation);
      this.$set(formData, 'writtenDownValue', this.resetData.writtenDownValue);
      this.$set(formData, 'comment', this.resetData.comment);
      this.$set(formData, 'satisfactionRatio', this.resetData.satisfactionRatio);
      this.$set(formData, 'riskLevel', this.resetData.riskLevel);
      if (!this.resetData['riskLevel']) {
        this.$set(formData, 'riskLevel', "NOT_APPLICABLE");
      }
      let team = '[' + this.resetData.schedule.team.code + ']-' + this.resetData.schedule.team.name;
      let location = '[' + this.resetData.schedule.location.code + ']-' + this.resetData.schedule.location.name + ', ' + this.resetData.schedule.location.address;
      let auditPeriod = this.resetData.schedule.fromDate + ' To ' + this.resetData.schedule.toDate;
      this.$set(formData, 'team', team);
      this.$set(formData, 'location', location);
      this.$set(formData, 'auditPeriod', auditPeriod);

      this.formData = formData;
      this.errors.clear();
      // this.formData = this.resetData;
    },
    handleCancel: function () {
      this.$emit('close');
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
            if (window.localStorage.getItem("schedule")) {
              this.$set(this.formData, 'schedule', window.localStorage.getItem("schedule"));
              this.loadScheduleRelatedInfo(window.localStorage.getItem("schedule"));
              this.schema['txt_schedule']['isDisabled'] = true;
            } else {
              this.schema['txt_schedule']['isDisabled'] = false;
            }

          }
        });
    },
    onChangeMethod: function (field, value) {
      if (field === "schedule") {
        this.loadScheduleRelatedInfo(value);
      } else if (field === "fixedAssetOpeningBalance") {  //1
        this.autoCalculation();
      } else if (field === "fixedAssetAddition") { //2
        this.autoCalculation();
      } else if (field === "fixedAssetDisposal") { //3
        this.autoCalculation();
      } else if (field === "depreciationOpeningBalance") { //6
        this.autoCalculation();
      } else if (field === "depreciationNewCharge") { //7
        this.autoCalculation();
      } else if (field === "depreciationAdjustment") { //8
        this.autoCalculation();
      }
    },
    loadScheduleRelatedInfo: function (scheduleId) {
      this.resetScheduleRelatedInfo();
      let url = '/schedules/findById/' + scheduleId;
      this.$axios.get(url)
        .then(res => {
          if (res.data.statusCode === 200) {
            if (res.data.data) {
              let team = '[' + res.data.data.team.code + ']-' + res.data.data.team.name;
              let location = '[' + res.data.data.location.code + ']-' + res.data.data.location.name + ', ' + res.data.data.location.address;
              let auditPeriod = res.data.data.fromDate + ' To ' + res.data.data.toDate;
              this.$set(this.formData, 'team', team);
              this.$set(this.formData, 'location', location);
              this.$set(this.formData, 'auditPeriod', auditPeriod);
            }
          }
        });
    },
    resetScheduleRelatedInfo: function () {
      this.$set(this.formData, 'team', '');
      this.$set(this.formData, 'location', '');
      this.$set(this.formData, 'auditPeriod', '');
    },
    autoCalculation: function () {
      let fixedAssetOpeningBalance = this.formData['fixedAssetOpeningBalance'] ? parseInt(this.formData['fixedAssetOpeningBalance']) : 0;
      let fixedAssetAddition = this.formData['fixedAssetAddition'] ? parseInt(this.formData['fixedAssetAddition']) : 0;
      let fixedAssetDisposal = this.formData['fixedAssetDisposal'] ? parseInt(this.formData['fixedAssetDisposal']) : 0;
      let fixedAssetClosingBalance = fixedAssetOpeningBalance + fixedAssetAddition - fixedAssetDisposal;
      this.$set(this.formData, 'fixedAssetClosingBalance', fixedAssetClosingBalance);

      let depreciationOpeningBalance = this.formData['depreciationOpeningBalance'] ? parseInt(this.formData['depreciationOpeningBalance']) : 0;
      let depreciationNewCharge = this.formData['depreciationNewCharge'] ? parseInt(this.formData['depreciationNewCharge']) : 0;
      let depreciationAdjustment = this.formData['depreciationAdjustment'] ? parseInt(this.formData['depreciationAdjustment']) : 0;
      let accumulatedDepreciation = depreciationOpeningBalance + depreciationNewCharge - depreciationAdjustment;
      this.$set(this.formData, 'accumulatedDepreciation', accumulatedDepreciation);

      fixedAssetClosingBalance = fixedAssetClosingBalance ? parseInt(fixedAssetClosingBalance) : 0;
      accumulatedDepreciation = accumulatedDepreciation ? parseInt(accumulatedDepreciation) : 0;
      let writtenDownValue = fixedAssetClosingBalance - accumulatedDepreciation;
      this.$set(this.formData, 'writtenDownValue', writtenDownValue);
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

  }
}
