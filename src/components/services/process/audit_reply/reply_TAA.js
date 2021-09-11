import ReplyCommonMethods from '@/components/services/process/audit_reply/ReplyCommonMethods.js';

export default {
  mixins: [ReplyCommonMethods],
  data() {
    return {
      fields: ['mainComponent', 'subComponent', 'closingPreviousFinancialYear', 'thisYearTarget', 'upToThisMonthTarget',
        'thisMonthTarget', 'prevMonthAchievement', 'upToThisMonthAchievement',
        'thisMonthAchievement', 'thisYearTargetPlan', 'thisYearTargetPlanPercent', 'thisMonthTargetPlan', 'thisMonthTargetPlanPercent'],
      target_and_achievements: [],
    }
  },
  mounted() {
    this.getScheduleById();
    this.loadData();
    this.is_form_load = true;
  },
  methods: {
    loadData: function () {
      const masterId = this.$route.params.auditExecutionMastersId;
      const param = {'masterId': masterId}
      this.$axios.get("/target-and-achievements/findAllByMasterId", {params: param})
        .then(res => {
          this.target_and_achievements = res.data.data['targetAndAchievementsList'];
          this.reviewData = res.data.data['reviews'];
        });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = '';
    },
  }
}
