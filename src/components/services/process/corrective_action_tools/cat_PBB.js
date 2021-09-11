import ReplyCommonMethods from '@/components/services/process/corrective_action_tools/CatCommonMethods.js';

export default {
  mixins: [ReplyCommonMethods],
  data() {
    return {
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: "samityName", label: this.$t('samity') + ' ' + this.$t("name"), sortable: true},
        {
          key: "memberName",
          label: this.$t("member") + ' ' + this.$t("name"),
          sortable: true
        },
        {key: "loanCode", label: this.$t("loan") + ' ' + this.$t("code"), sortable: true},
        {key: "outstanding", label: this.$t("outstanding"), sortable: true},
        {key: "passbookOutstanding", label: this.$t("passbook") + ' ' + this.$t("outstanding"), sortable: true},
        {key: "savingsCode", label: this.$t("savings") + ' ' + this.$t("code"), sortable: true},
        {key: "savings", label: this.$t("savings"), sortable: true},
        {key: "passbookSavings", label: this.$t("passbook") + ' ' + this.$t("savings"), sortable: true},
        {key: "satisfactionRatio", label: this.$t("satisfaction") + ' ' + this.$t("ratio"), sortable: true},
        {key: "comment", label: this.$t("comment"), sortable: true},
      ],
      passbook_balances: [],
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
    this.loadData(this.pagination.offset);
    this.loadReviewReply();
    this.is_form_load = true;
  },
  methods: {
    loadData: function (offset = 0) {
      const masterId = this.$route.params.auditExecutionMastersId;
      const param = {'masterId': masterId}
      this.$axios.get("/passbook_balances/findAllByMasterId", {params: param})
        .then(res => {
          this.passbook_balances = res.data.data['passbookBalances'];
          this.reviewData = res.data.data['reviews'];
          if (this.passbook_balances.length > 0) {
            for (let i = 0; i < this.passbook_balances.length; i++) {
              this.passbook_balances[i]['samityName'] = '[' + this.passbook_balances[i]['samityCode'] + '] ' + this.passbook_balances[i]['samityName'];
              this.passbook_balances[i]['memberName'] = '[' + this.passbook_balances[i]['memberCode'] + '] ' + this.passbook_balances[i]['memberName'];
              this.passbook_balances[i]['loanCode'] = this.passbook_balances[i]['loanCode'];
              this.passbook_balances[i]['outstanding'] = this.passbook_balances[i]['outstanding'];
              this.passbook_balances[i]['passbookOutstanding'] = this.passbook_balances[i]['passbookOutstanding'];
              this.passbook_balances[i]['savingsCode'] = this.passbook_balances[i]['savingsCode'];
              this.passbook_balances[i]['savings'] = this.passbook_balances[i]['savings'];
              this.passbook_balances[i]['passbookSavings'] = this.passbook_balances[i]['passbookSavings'];
              this.passbook_balances[i]['satisfactionRatio'] = this.getSatisfactionRatioValue(this.passbook_balances[i]['satisfactionRatio']);
              this.passbook_balances[i]['riskLevel'] = this.passbook_balances[i]['riskLevel'];
              this.passbook_balances[i]['comment'] = this.passbook_balances[i]['comment'];
            }
          }
        });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = "";
      this.$axios.get('/reviews/findById/' + this.$route.params.id)
        .then(res => {
          this.res_review_data = res.data.data;
          this.inputForm.txt_review = this.res_review_data.reviewComment;
          this.inputForm.txt_review_status = this.res_review_data.reviewStatus;
          this.inputForm.txt_review_date = this.res_review_data.reviewDate;
          this.getUserById(this.res_review_data['reviewedBy']).then(user => {
            this.inputForm.txt_reviewed_by = user['name'];
          });

          if (this.inputForm.txt_review_status === 1) {
            this.inputForm.txt_review_status = "Done";
          } else if (this.inputForm.txt_review_status === 0) {
            this.inputForm.txt_review_status = "In progress";
          } else {
            this.inputForm.txt_review_status = "Pending";
          }
        })
        .catch(function (error) {
          console.log(error.response);
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
    },

  }
}
