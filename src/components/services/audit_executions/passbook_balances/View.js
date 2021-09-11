import UserService from '@/components/services/users/UserService.js';

export default {
  name: "View",
  mixins: [UserService],
  data() {
    return {
      page_title: this.$t("passbook") + " " + this.$t("balance"),
      reviewData: [],
      items: [],
      fields: ['samityName', 'memberName', 'loanCode', 'outstanding', 'passbookOutstanding', 'savingsCode', 'savings', 'passbookSavings', 'satisfactionRatio', 'riskLevel', 'comment'],
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
      this.$axios.get("/passbook_balances/findAllByMasterId", {params: {'masterId': this.$route.query.id}})
        .then(res => {
          this.items = res.data.data['passbookBalances'];
          for (let i = 0; i < this.items.length; i++) {
            this.items[i]['satisfactionRatio'] = this.getSatisfactionRatioValue(this.items[i]['satisfactionRatio']);
            this.items[i]['comment'] = this.items[i]['comment'];
          }
          this.reviewData = res.data.data['reviews'];
        });
    },
    handleBack: function () {
      this.$router.push('/audit-execution/passbook-balances/index');
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
  }
}
