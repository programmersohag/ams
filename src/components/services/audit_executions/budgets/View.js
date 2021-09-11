export default {
  name: "View",
  data() {
    return {
      page_title: this.$t("budget") + " " + this.$t("Preview"),
      reviewData: [],
      items: [],
      fields: ['budgetHead', 'yearlyApprovedBudget', 'yearlyReviseBudget', 'yearlyTotalBudget',
        'auditingPeriodBudget', 'expenditureUpToPreviousMonth',
        'expenditureAuditingMonth', 'totalExpenditure', 'budgetVarianceSelectedMonth',
        'remainingBudget','satisfactionRatio','riskLevel', 'comment'],
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
          this.getUserName(reviewerId).then(data => {
            this.reviewData[i].reviewerName = data.data[0]['name'];
          });
        }
        const replierId = this.reviewData[i]['repliedBy'];
        if (replierId) {
          this.getUserName(replierId).then(user => {
            this.reviewData[i].replierName = user[0]['name'];
          });
        }
      }
      return this.reviewData;
    }
  },
  methods: {
    findByMasterId: function () {
      this.$axios.get("/budgets/findAllByMasterId", {params: {'masterId': this.$route.query.id}})
        .then(res => {
          this.items = res.data.data['budgetList'];
          for (let i = 0; i < this.items.length; i++) {
            this.items[i]['comment'] = this.items[i]['comment'];
          }
          this.reviewData = res.data.data['reviews'];
        });
    },
    getUserName: function (id) {
      if (id) {
        return this.$http_service.get("/ams-auth-api/users/get_user/" + id);
      } else return '';
    },
    handleBack: function () {
      this.$router.push('/audit-execution/budgets/index');
    }
  }
}
