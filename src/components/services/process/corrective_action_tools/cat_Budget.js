import ReplyCommonMethods from '@/components/services/process/corrective_action_tools/CatCommonMethods.js';

export default {
  mixins: [ReplyCommonMethods],
  inject: ['$validator'],
  data() {
    return {
      page_title: this.$t("corrective") + " " + this.$t("action") + " " + this.$t("tools") + ": " + this.$t("budgets"),
      pagination: {
        offset: 0,
        total_rows: 0
      },
      fields: ['budgetHead', 'yearlyApprovedBudget', 'yearlyReviseBudget', 'yearlyTotalBudget',
        'selectedMonthBudget', 'expenditureUpToPreviousMonth', 'expenditureSelectedMonth',
        'expenditureSelectedMonth', 'totalExpenditure', 'budgetVarianceSelectedMonth', 'cumulativeBudget'],
      budgets: [],
      user: {},
      inputForm: {
        txt_review: "",
        txt_reviewed_by: "",
        txt_review_status: "",
        txt_review_date: "",
        txt_reply_comment: "",
        txt_reply_by: "",
        txt_reply_status: "",
        txt_reply_date: "",
      },
    }
  },
  mounted() {
    this.user = this.$store.getters['auth/userInfo'];
    this.getScheduleById();
    this.loadData();
    this.loadReviewReply();
    this.is_form_load = true;
  },
  methods: {
    loadData: function () {
      const masterId = this.$route.params.auditExecutionMastersId;
      const param = {'masterId': masterId}
      this.$axios.get("/budgets/findAllByMasterId", {params: param})
        .then(res => {
          this.budgets = res.data.data['budgetList'];
        });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = '';
    },
    loadReviewReply: function () {
      this.$axios.get('/reviews/findById/' + this.$route.params.id)
        .then(res => {
          this.res_review_data = res.data.data;
          // ==========review start==========================
          this.inputForm.txt_review = this.res_review_data.reviewComment;
          this.inputForm.txt_review_status = this.res_review_data.reviewStatus;
          this.inputForm.txt_review_date = this.res_review_data.reviewDate;

          if (this.inputForm.txt_review_status === 1) {
            this.inputForm.txt_review_status = "Done";
          } else if (this.inputForm.txt_review_status === 0) {
            this.inputForm.txt_review_status = "Feedback";
          } else {
            this.inputForm.txt_review_status = "Pending";
          }
          this.$http_service.get("/ams-auth-api/users/get_user/" + this.res_review_data.reviewedBy)
            .then(response => {
              if (response.data) {
                let user = response.data;
                this.inputForm.txt_reviewed_by = user[0].name;
              }
            });
          // ==========review end==========================
          // ==========reply start==========================
          this.inputForm.txt_reply_comment = this.res_review_data.replyComment;
          this.inputForm.txt_reply_status = this.res_review_data.replyStatus;
          this.inputForm.txt_reply_date = this.res_review_data.replyDate;

          if (this.inputForm.txt_reply_status === 1) {
            this.inputForm.txt_reply_status = "Done";
          } else if (this.inputForm.txt_reply_status === 0) {
            this.inputForm.txt_reply_status = "Feedback";
          } else {
            this.inputForm.txt_reply_status = "Pending";
          }
          this.$http_service.get("/ams-auth-api/users/get_user/" + this.res_review_data.repliedBy)
            .then(response => {
              if (response.data) {
                let user = response.data;
                this.inputForm.txt_reply_by = user[0].name;
              }
            });
          // ==========reply end==========================
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }
  },
}
