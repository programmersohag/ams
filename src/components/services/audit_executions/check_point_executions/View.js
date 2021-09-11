import UserService from '@/components/services/users/UserService.js';

export default {
  name: "View",
  mixins: [UserService],
  data() {
    return {
      page_title: this.$t("check") + " " + this.$t("point") + " " + this.$t("execution"),
      items: [],
      categories: [],
      reviewData: [],
      fields: ['checkList.name', 'expectedAction', 'satisfactionRatio', 'riskLevel', 'comment'],
    }
  },
  computed: {
    groupedCheckListExecutionItems() {
      const groups = {};
      this.items.forEach(item => {
        let categoryName = item.checkList.checkListCategory.name
        if (groups[categoryName]) {
          groups[categoryName].push(item);
          console.log(item);
        } else {
          groups[categoryName] = [item];
        }
      });
      return groups;
    },
    reviews: function () {
      for (let i = 0; i < this.reviewData.length; i++) {
        const reviewerId = this.reviewData[i]['reviewedBy'];
        if (reviewerId) {
          this.getUserById(reviewerId).then(data => {
            this.reviewData[i].reviewerName = data.data[0]['name'];
          });
        }
        const replierId = this.reviewData[i]['repliedBy'];
        if (replierId) {
          this.getUserById(replierId).then(user => {
            this.reviewData[i].replierName = user[0]['name'];
          });
        }
      }
      return this.reviewData;
    }
  },
  mounted() {
    this.loadData();
    this.getCheckListCategories();
  },
  methods: {
    getSatisfactionRatioValue: function (ratioName) {
      if (ratioName === 'FULLY_DONE') {
        return 1;
      } else if (ratioName === 'PARTIALLY_DONE') {
        return 0.50;
      } else if (ratioName === 'NOT_DONE') {
        return 0;
      }
    },
    loadData: function () {
      this.$axios.get("/check_point_executions/findAllByMasterId", {params: {'masterId': this.$route.query.id}})
        .then(res => {
          this.items = res.data.data['checkPointExecutions'];
          for (let i = 0; i < this.items.length; i++) {
            this.items[i]['satisfactionRatio'] = this.getSatisfactionRatioValue(this.items[i]['satisfactionRatio']);
            this.items[i]['comment'] = this.items[i]['comment'];
          }
          this.reviewData = res.data.data['reviews'];
        });
    },
    getCheckListCategories: function () {
      this.$axios.get("checkListCategories")
        .then(res => {
          if (res.data.data) {
            const groups = res.data.data;
            for (let i = 0; i < groups.length; i++) {
              this.categories.push(groups[i].name)
            }
          }
        });
    },
    handleBack: function () {
      this.$router.push('/audit-execution/check-point-executions/index');
    }
  }
}
