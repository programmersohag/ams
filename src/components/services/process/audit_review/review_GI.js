import ReviewCommonMethods from '@/components/services/process/audit_review/ReviewCommonMethods.js';

export default {
  mixins: [ReviewCommonMethods],
  data() {
    return {
      page_title: this.$t("add") + " " + this.$t("review"),
      inputForm: {
        txt_audit_period: '',
        txt_audit_area: '',
        txt_purpose: '',
        txt_limitation_of_audit: '',
        txt_status: '',
        txt_comment: "",
      },
      location: '',
      locationId: '',
      schedule: '',
      team: '',
      response_data: [],
    }
  },
  mounted() {
    this.user = this.$store.getters['auth/userInfo'];
    this.loadData()
  },
  methods: {
    loadData: function () {
      this.$axios.post('/general_info/getDetailsByMasterId/' + this.$route.params.id)
        .then(res => {
          if (res.data.data['generalInfo']) {
            this.response_data = res.data.data['generalInfo'];
          }
          if (res.data.data['reviews']) {
            this.reviewData = res.data.data['reviews'];
          }
          this.location = this.response_data.schedule.location.name;
          this.locationId = this.response_data.schedule.location.id;
          this.team = this.response_data.schedule.team.name;
          this.schedule = this.response_data.schedule.name;
          this.inputForm.txt_audit_period = this.response_data.schedule.fromDate + " " + "To" + " " + this.response_data.schedule.toDate;
          this.inputForm.txt_audit_area = this.response_data.auditArea;
          this.inputForm.txt_purpose = this.response_data.purpose;
          this.inputForm.txt_limitation_of_audit = this.response_data.limitationOfAudit;

          this.inputForm.txt_status = '';
          this.inputForm.txt_comment = '';
        })
        .catch(function (error) {
          console.log(error.response);
        })
    },
    handleSubmit: function () {
      this.submit('GENERAL_INFO');
    }
  },
}
