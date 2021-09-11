import FormGenerator from "@/containers/normal_forms/FormGenerator";
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import Preview from '@/components/audit_executions/ongoing_program_average_positions/Preview';


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
      pagination: {
        offset: 0,
        total_rows: 0
      },
      preview_data:{
        id: null,
        data: null,
        is_preview_show: false
      }
    }
  },
  mounted() {
    this.getSatisfactionRatio();
    this.getRiskLevel();
    this.loadByMasterId();
    this.is_form_load = true;
  },
  methods: {
    loadByMasterId: function () {
      const url = '/ongoing_program_average_positions/findByMasterId';
      const masterId = this.$route.query.id;
      if (masterId)
        this.$axios
          .post(url, null, {params: {'masterId': masterId}})
          .then(res => {
            const resData = res.data.data['ongoingProgramAveragePosition']
            if (resData) {
              console.log(resData['riskLevel']);
              const formData = {};
              this.$set(formData, 'totalSamity', resData['totalSamity']);
              this.$set(formData, 'totalMember', resData['totalMember']);
              this.$set(formData, 'totalBorrower', resData['totalBorrower']);
              this.$set(formData, 'totalFO', resData['totalFO']);
              this.$set(formData, 'weeklyWorkingDay', resData['weeklyWorkingDay']);
              this.$set(formData, 'totalMemberCancellation', resData['totalMemberCancellation']);
              this.$set(formData, 'totalMemberAdmission', resData['totalMemberAdmission']);
              this.$set(formData, 'totalLoanOutstanding', resData['totalLoanOutstanding']);
              this.$set(formData, 'totalSavingsBalance', resData['totalSavingsBalance']);
              this.$set(formData, 'totalSavingsRefund', resData['totalSavingsRefund']);
              this.$set(formData, 'totalSavingsCollection', resData['totalSavingsCollection']);
              this.$set(formData, 'totalDue', resData['totalDue']);
              this.$set(formData, 'id', resData['id']);
              this.$set(formData, 'auditExecutionMastersId', resData['auditExecutionMastersId']);
              this.$set(formData, 'satisfactionRatio', resData['satisfactionRatio']);
              this.$set(formData, 'riskLevel', resData['riskLevel']);
              this.$set(formData, 'comment', resData['comment']);
              this.formData = formData;
              this.reset_data = Object.assign({}, this.formData);
            }
          });
    },
    handlePreview: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.preview_data.is_preview_show = true;
          this.preview_data.id=this.id;
          this.preview_data.data=this.formData;
          console.log(this.preview_data.data);
        }
      }).catch(() => {
        this.$toast.error({title: 'error', message: "Invalid Field"});
      });

    },
    clear: function () {
      this.search_form_data.name = '';
      this.search_form_data.code = '';
      this.loadData(0);
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
    onChangeMethod(field, value){
      this.formData;
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
