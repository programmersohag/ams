import UserService from '@/components/services/users/UserService.js';

export default {
  name: "View",
  mixins: [UserService],
  data() {
    return {
      page_title: this.$t("field") + " " + this.$t("officer") + " " + this.$t("wise") + " " + this.$t("performance") + " " + this.$t("analysis"),
      items: [],
      reviewData: [],
      fields: ['name', 'code', 'numberOfSamity', 'numberOfMember', 'numberOfLoan', 'savingsBalance', 'loanBalance', 'currentDueLoan', 'totalDueLoan', 'currentDueBalance', 'totalDueBalance', 'satisfactionRatio', 'riskLevel', 'comment'],
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
      this.$axios.get("/field_officer_performance_analysis/findAllByMasterId", {params: {'masterId': this.$route.query.id}})
        .then(res => {
          this.items = res.data.data['fowpa'];
          for (let i = 0; i < this.items.length; i++) {
            this.items[i]['satisfactionRatio'] = this.getSatisfactionRatioValue(this.items[i]['satisfactionRatio']);
            this.items[i]['comment'] = this.items[i]['comment'];
          }
          this.reviews = res.data.data['reviews'];
        });
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
    handleBack: function () {
      this.$router.push('/audit-execution/field-officer-wise-performance-analysis/index');
    },
  },
}
