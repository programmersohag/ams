import UserService from '@/components/services/users/UserService.js';

export default {
  name: "View",
  mixins: [UserService],
  data() {
    return {
      page_title: this.$t("targets") + " " + this.$t("and") + " " + this.$t("achievements") + " " + this.$t("Preview"),
      reviewData: [],
      items: [],
      fields: ['mainComponent', 'subComponent', 'closingPreviousFinancialYear',
        'thisYearTarget', 'upToThisMonthTarget', 'thisMonthTarget', 'prevMonthAchievement',
        'upToThisMonthAchievement', 'thisMonthAchievement', 'thisYearTargetPlan', 'thisYearTargetPlanPercent',
        'thisMonthTargetPlan', 'thisMonthTargetPlanPercent', 'satisfactionRatio', 'riskLevel', 'comment']
    }
  },
  mounted() {
    this.findByMasterId();
  },
  computed: {
    reviews: function () {
      for (let i = 0; i < this.reviewData.length; i++) {
        const reviewerId = this.reviewData[i]['reviewedBy'];
        if (reviewerId) {
          this.getUserById(reviewerId).then(user => {
            this.reviewData[i].reviewerName = user['name'];
          });
        }
        const replierId = this.reviewData[i]['repliedBy'];
        if (replierId) {
          this.getUserById(replierId).then(user => {
            this.reviewData[i].replierName = user['name'];
          });
        }
      }
      return this.reviewData;
    }
  },
  methods: {
    findByMasterId: function () {
      this.$axios.get("/target-and-achievements/findAllByMasterId",
        {params: {'masterId': this.$route.query.id}})
        .then(res => {
          this.items = res.data.data['targetAndAchievementsList'];
            for (let i = 0; i < this.items.length; i++) {
              this.items[i]['html_1'] = this.items[i]['comment'];
            }
          this.reviewData = res.data.data['reviews'];
        });
    },
    handleBack: function () {
      this.$router.push('/audit-execution/target-and-achievements/index');
    }
  }
}
