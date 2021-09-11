import FormGenerator from "@/containers/normal_forms/FormGenerator";
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import Preview from '@/components/audit_executions/ongoing_program_average_positions/Preview';
import {$http_core_service} from "@/shared/common/core-service";
import StorageService from "@/shared/common/storage.service";

export default {
  name: "Save",
  components: {
    FormGenerator, CommonIndex, Pagination, Preview
  },
  props: {
    id: null,
    extra_param: Object,
  },
  data() {
    return {
      page_title: this.$t("ongoing") + " " + this.$t("program") + " " + this.$t("average") + " " + this.$t("position"),
      scheduleName: localStorage.getItem('schedule_name'),
      locationName: localStorage.getItem('location_name'),
      schema: {
        txt_total_samity: {
          fieldType: "NumberInput",
          fieldName: "totalSamity",
          label: this.$t("total") + ' ' + this.$t("samity"),
          vvalidate: "required|min_value:0"
        },
        txt_total_member: {
          fieldType: "NumberInput",
          fieldName: "totalMember",
          label: this.$t("total") + ' ' + this.$t("member"),
          vvalidate: "required|min_value:0"
        },
        txt_total_borrower: {
          fieldType: "NumberInput",
          fieldName: "totalBorrower",
          label: this.$t("total") + ' ' + this.$t("borrower"),
          vvalidate: "required|min_value:0"
        },
        txt_total_fo: {
          fieldType: "NumberInput",
          fieldName: "totalFO",
          label: this.$t("total") + ' ' + this.$t("field") + ' ' + this.$t("officer"),
          vvalidate: "required|min_value:0"
        },
        txt_total_working_day: {
          fieldType: "NumberInput",
          fieldName: "weeklyWorkingDay",
          label: this.$t("total") + ' ' + this.$t("working") + ' ' + this.$t("day"),
          vvalidate: "required|min_value:0"
        },
        txt_total_member_cancellation: {
          fieldType: "NumberInput",
          fieldName: "totalMemberCancellation",
          label: this.$t("total") + ' ' + this.$t("member") + ' ' + this.$t("cancellation"),
          vvalidate: "required|min_value:0"
        },
        txt_total_member_admission: {
          fieldType: "NumberInput",
          fieldName: "totalMemberAdmission",
          label: this.$t("total") + ' ' + this.$t("member") + ' ' + this.$t("admission"),
          vvalidate: "required|min_value:0"
        },
        txt_total_loan_outstanding: {
          fieldType: "NumberInput",
          fieldName: "totalLoanOutstanding",
          label: this.$t("total") + ' ' + this.$t("loan") + ' ' + this.$t("outstanding"),
          vvalidate: "required|min_value:0"
        },
        txt_total_savings_balance: {
          fieldType: "NumberInput",
          fieldName: "totalSavingsBalance",
          label: this.$t("total") + ' ' + this.$t("savings") + ' ' + this.$t("balance"),
          vvalidate: "required|min_value:0"
        },
        txt_total_savings_refund: {
          fieldType: "NumberInput",
          fieldName: "totalSavingsRefund",
          label: this.$t("total") + ' ' + this.$t("savings") + ' ' + this.$t("refund"),
          vvalidate: "required|min_value:0"
        },
        txt_total_savings_collection: {
          fieldType: "NumberInput",
          fieldName: "totalSavingsCollection",
          label: this.$t("total") + ' ' + this.$t("savings") + ' ' + this.$t("collection"),
          vvalidate: "required|min_value:0"
        },
        txt_total_due: {
          fieldType: "NumberInput",
          fieldName: "totalDue",
          label: this.$t("total") + ' ' + this.$t("due"),
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
      formData: {},
      formErrors: [],
      pagination: {
        offset: 0,
        total_rows: 0
      },
      preview_data: {
        id: null,
        data: null,
        is_preview_show: false
      },
      isMfiAudit: false,
      auditExecutionMastersId: null,
      coreData: {},
      riskLevels: [
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
      ],
      satisfactionRatios: [
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
      ],
      expectedResult: {}
    }
  },
  mounted() {
    this.schema['txt_satisfaction_ratio']['options'] = this.satisfactionRatios;
    this.schema['txt_risk_level']['options'] = this.riskLevels;
    this.loadBasicInformation();
    this.auditExecutionMastersId = isNaN(this.$route.params.auditExecutionMastersId) ? '' : this.$route.params.auditExecutionMastersId;
    const data = StorageService.getGeneralConfig();
    this.isMfiAudit = !!Number(data['is_mfi_audit']);
    if (this.isMfiAudit && this.auditExecutionMastersId) {
      this.is_form_load = false;
      this.isMfiAudit = false;
    } else if (this.isMfiAudit && this.auditExecutionMastersId === '') {
      this.getLastAuditResult();
      this.getOngoingProgramInfoFromCoreService();
      this.isMfiAudit = true;
      this.is_form_load = false;
    } else {
      this.is_form_load = true;
      this.isMfiAudit = false;
    }
  },
  methods: {
    loadBasicInformation: function () {
      const url = '/config-generals/get/average_position';
      this.$axios
        .get(url)
        .then(res => {
          const data = res.data.data;
          if (data) {
            for (let i = 0; i < data.length; i++) {
              this.expectedResult[data[i]['fieldName']] = data[i]['defaultValue'];
            }
          }
        });
    },
    handlePreview: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.preview_data.is_preview_show = true;
          this.preview_data.id = this.id;
          this.preview_data.data = this.formData;
        }
      }).catch(() => {
        this.$toast.error({title: 'error', message: "Invalid Field"});
      });
    },
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.form_data['scheduleId'] = localStorage.getItem('schedule');
          let url = '/ongoing/program/average/positions/add';
          let headers = {
            headers: {
              'Content-Type': `application/json`
            }
          }
          this.$axios
            .post(url, JSON.stringify(this.form_data), headers)
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
    },
    closeModal(is_reload = false) {
      this.modal_info.isModalVisible = false;
      if (is_reload === true) {
        // this.loadData(0);
      }
    },
    clear: function () {
      this.form_data.totalSamity = '';
      this.form_data.totalMember = '';
    },
    handleBack: function () {
      this.$router.push('/audit-execution/ongoing-program-average-positions/index');
    },
    handleReset: function () {
      this.error_message = [];
      this.errors.clear();
    },
    handleCancel: function () {
      this.$emit('close');
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
    getOngoingProgramInfoFromCoreService: function () {
      const locationId = localStorage.getItem('api_location_id');
      const auditPeriodFromDate = localStorage.getItem('auditPeriodFromDate');
      const auditPeriodToDate = localStorage.getItem('auditPeriodToDate');
      const url = 'ams_staff_positions/ongoing_program_average_position';
      $http_core_service.post(url, JSON.stringify({
        'locationId': locationId,
        "auditPeriodFromDate": auditPeriodFromDate,
        "auditPeriodToDate": auditPeriodToDate
      }))
        .then((response) => {
          if (response.data) {
            Object.assign(this.coreData, response.data);
            Object.assign(this.coreData, this.changeKeyAsBackendProperty(this.expectedResult));
            Object.assign(this.coreData, this.getResult(this.coreData));
            Object.assign(this.coreData, {comment: '', riskLevel: '', satisfactionRatio: ''});
          }
        }).catch(function (error) {
        console.error("error", error);
      });
    },
    onChangeSr: function (event) {
      this.coreData['satisfactionRatio'] = event.target.value;
    },
    onChangeRl: function (event) {
      this.coreData['riskLevel'] = event.target.value;
    },
    handleSubmitCoreData: function () {
      let userInfo = this.$store.getters['auth/userInfo'];
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.coreData['createdBy'] = userInfo['id'];
          this.coreData['scheduleId'] = localStorage.getItem('schedule');
          const config = {headers: {"Content-Type": "application/json"}};
          this.$axios
            .post("/ongoing_program_average_positions/add", JSON.stringify(this.coreData), config)
            .then(res => {
              if (res.data.validation_error) {
                this.error_message = res.data.validation_error;
              } else {
                let status = 'failed';
                if (res.data.statusCode === 200) {
                  status = 'success';
                  // console.log('success', res.data.statusCode);
                  this.handleReset();
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
    getResult(data) {
      const totalMember = parseInt(data['totalMember']);
      const totalSamity = parseInt(data['totalSamity']);
      const totalFo = parseInt(data['totalFO']);
      const totalBorrower = parseInt(data['totalBorrower']);
      const totalLoanOutstanding = parseFloat(data['totalLoanOutstanding']);
      const member_per_samity_result = (totalMember / totalSamity).toFixed();
      const borrower_per_samity_result = (totalBorrower / totalSamity).toFixed();
      const fo_per_member_result = (totalMember / totalFo).toFixed();
      const fo_per_borrower_result = (totalBorrower / totalFo).toFixed();
      const borrower_per_day_fo_wise_result = ((totalBorrower / totalFo) / parseInt(data['weeklyWorkingDay'])).toFixed();
      const member_per_borrower_result = ((totalBorrower / totalMember) * 100).toFixed();
      const member_cancellation_result = ((parseInt(data['totalMemberCancellation']) / parseInt(data['totalMemberAdmission'])) * 100).toFixed(2);
      const fo_per_loan_outstanding_result = (totalFo / totalLoanOutstanding).toFixed();
      const savings_ratio_loan_outstanding_result = ((parseInt(data['totalSavingsBalance']) / totalLoanOutstanding) * 100).toFixed();
      const per_borrower_loan_outstanding_result = (totalBorrower / totalLoanOutstanding).toFixed(2);
      let savings_refund_percent_result = ((parseInt(data['totalSavingsRefund']) / parseInt(data['totalSavingsCollection'])) * 100).toFixed(2);
      let due_loan_percent_result = ((parseInt(data['totalDue']) / totalLoanOutstanding) * 100).toFixed(2);
      const myObj = {
        memberPerSamity: member_per_samity_result,
        borrowerPerSamity: borrower_per_samity_result,
        foPerMember: fo_per_member_result,
        foPerBorrower: fo_per_borrower_result,
        borrowerPerDayFoWise: borrower_per_day_fo_wise_result,
        totalMemberPerTotalBorrower: member_per_borrower_result,
        memberCancellationRate: member_cancellation_result,
        foPerLoanOutstanding: fo_per_loan_outstanding_result,
        loanOutstandingPerBorrower: per_borrower_loan_outstanding_result,
        loanOutstandingSavingsRatio: savings_ratio_loan_outstanding_result,
        savingsRefundPercent: savings_refund_percent_result,
        dueLoanPercent: due_loan_percent_result,
      };
      const output = {};
      for (const [key, value] of Object.entries(myObj)) {
        if (isFinite(parseInt(value)) || isNaN(parseInt(value))) {
          output[key] = 0;
        } else {
          output[key] = value;
        }
      }
      return output;
    },
    getLastAuditResult() {
      const locationId = localStorage.getItem('location_id');
      const url = 'ongoing_program_average_positions/getLastAuditResultByLocation';
      this.$axios
        .get(url, {params: {'locationId': locationId}})
        .then(res => {
          const data = res.data.data;
          if (data) {
            this.coreData['memberPerSamityLast'] = data['memberPerSamity'] ? data['memberPerSamity'] : 0;
            this.coreData['borrowerPerSamityLast'] = data['borrowerPerSamity'] ? data['borrowerPerSamity'] : 0;
            this.coreData['foPerMemberLast'] = data['foPerMember'] ? data['foPerMember'] : 0;
            this.coreData['foPerBorrowerLast'] = data['foPerBorrower'] ? data['foPerBorrower'] : 0;
            this.coreData['borrowerPerDayFoWiseLast'] = data['borrowerPerDayFoWise'] ? data['borrowerPerDayFoWise'] : 0;
            this.coreData['totalMemberPerTotalBorrowerLast'] = data['totalMemberPerTotalBorrower'] ? data['totalMemberPerTotalBorrower'] : 0;
            this.coreData['memberCancellationRateLast'] = data['memberCancellationRate'] ? data['memberCancellationRate'] : 0;
            this.coreData['foPerLoanOutstandingLast'] = data['foPerLoanOutstanding'] ? data['foPerLoanOutstanding'] : 0;
            this.coreData['loanOutstandingSavingsRatioLast'] = data['loanOutstandingSavingsRatio'] ? data['loanOutstandingSavingsRatio'] : 0;
            this.coreData['loanOutstandingPerBorrowerLast'] = data['loanOutstandingPerBorrower'] ? data['loanOutstandingPerBorrower'] : 0;
            this.coreData['savingsRefundPercentLast'] = data['savingsRefundPercent'] ? data['savingsRefundPercent'] : 0;
            this.coreData['dueLoanPercentLast'] = data['dueLoanPercent'] ? data['dueLoanPercent'] : 0;
          }
        });
    },
    changeKeyAsBackendProperty: function (data) {
      const myObject = {};
      myObject['expectedMemberPerSamity'] = data['txt_member_per_samity'];
      myObject['expectedBorrowerPerSamity'] = data['txt_borrower_per_samity'];
      myObject['expectedFoPerMember'] = data['txt_fo_per_member'];
      myObject['expectedFoPerBorrower'] = data['txt_fo_per_borrower'];
      myObject['expectedBorrowerPerDayFoWise'] = data['txt_borrower_per_day_fo_wise'];
      myObject['expectedTotalMemberPerTotalBorrower'] = data['txt_total_member_per_total_borrower'];
      myObject['expectedMemberCancellationRate'] = data['txt_member_cancellation_rate'];
      myObject['expectedFoPerLoanOutstanding'] = data['txt_fo_per_loan_outstanding'];
      myObject['expectedLoanOutstandingSavingsRatio'] = data['txt_savings_ratio_of_loan_outstanding'];
      myObject['expectedLoanOutstandingPerBorrower'] = data['txt_loanee_per_outstanding'];
      myObject['expectedSavingsRefundPercent'] = data['txt_percent_of_savings_refund'];
      myObject['expectedDueLoanPercent'] = data['txt_percent_of_due_loan'];
      return myObject;
    }
  }
}
