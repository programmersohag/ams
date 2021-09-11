import ReviewCommonMethods from '@/components/services/process/audit_review/ReviewCommonMethods.js';

export default {
  mixins: [ReviewCommonMethods],
  data() {
    return {
      page_title: this.$t("add") + " " + this.$t("review"),
      fields: ['mainComponent', 'subComponent', 'closingPreviousFinancialYear', 'thisYearTarget', 'upToThisMonthTarget',
        'thisMonthTarget', 'prevMonthAchievement', 'upToThisMonthAchievement',
        'thisMonthAchievement', 'thisYearTargetPlan', 'thisYearTargetPlanPercent', 'thisMonthTargetPlan', 'thisMonthTargetPlanPercent'],
      target_and_achievements: [],
    }
  },
  mounted() {
    this.getScheduleById();
    this.loadData();
  },
  methods: {
    loadData: function () {
      const masterId = this.$route.params.id;
      const param = {'masterId': masterId}
      this.$axios.get("/target-and-achievements/findAllByMasterId", {params: param})
        .then(res => {
          this.target_and_achievements = res.data.data['targetAndAchievementsList'];
          this.reviewData=res.data.data['reviews'];
        });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = '';
    },
    handleSubmit: function () {
      this.submit('TARGET_AND_ACHIEVEMENT');
    }
  }
}
