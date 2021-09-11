import ReviewCommonMethods from '@/components/services/process/audit_review/ReviewCommonMethods.js';

export default {
  mixins: [ReviewCommonMethods],
  data() {
    return {
      page_title: this.$t("add") + " " + this.$t("review"),
      ongoing_program_average_positions: []
    }
  },
  mounted() {
    this.getScheduleById();
    this.loadData();
  },
  methods: {
    loadData: function () {
      const scheduleId = this.$route.params.id;
      const param = {'masterId': scheduleId}
      this.$axios.post("/ongoing_program_average_positions/findByMasterId", null, {params: param})
        .then(res => {
          this.ongoing_program_average_positions = res.data.data['ongoingProgramAveragePosition'];
          console.log('my data', this.ongoing_program_average_positions)
          this.reviewData=res.data.data['reviews'];
        });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = '';
    },
    handleSubmit: function () {
      this.submit('ONGOING_PROGRAM_AVERAGE_POSITION');
    }
  }
}
