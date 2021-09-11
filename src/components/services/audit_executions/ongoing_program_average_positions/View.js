import UserService from '@/components/services/users/UserService.js';

export default {
  name: "View",
  mixins: [UserService],
  data() {
    return {
      page_title: this.$t("ongoing") + " " + this.$t("program") + " " + this.$t("average") + " " + this.$t("position"),
      reviewData: [],
      formData: {},
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
      this.$axios.post("/ongoing_program_average_positions/findByMasterId", null, {params: {'masterId': this.$route.query.id}})
        .then(res => {
          this.formData = res.data.data['ongoingProgramAveragePosition'];
          for (let i = 0; i < res.data.data['configGenerals'].length; i++) {
            this.formData[res.data.data['configGenerals'][i]['fieldName']] = res.data.data['configGenerals'][i]['defaultValue'];
          }
          this.reviewData = res.data.data['reviews'];
        });
    },
    handleBack: function () {
      this.$router.push('/audit-execution/ongoing-program-average-positions/index');
    }
  }
}
