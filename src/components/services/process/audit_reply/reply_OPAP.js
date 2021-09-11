import ReplyCommonMethods from '@/components/services/process/audit_reply/ReplyCommonMethods.js';

export default {
  mixins: [ReplyCommonMethods],
  data() {
    return {
      ongoing_program_average_positions: []
    }
  },
  mounted() {
    this.getScheduleById();
    this.loadData(this.pagination.offset);
    this.is_form_load = true;
  },
  methods: {
    loadData: function () {
      const masterId = this.$route.params.auditExecutionMastersId;
      const param = {'masterId': masterId}
      this.$axios.post("/ongoing_program_average_positions/findByMasterId", null, {params: param})
        .then(res => {
          this.ongoing_program_average_positions = res.data.data['ongoingProgramAveragePosition'];
          this.reviewData = res.data.data['reviews'];
        });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = '';
    },
  }
}
