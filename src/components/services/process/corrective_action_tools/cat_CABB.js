import ReplyCommonMethods from '@/components/services/process/corrective_action_tools/CatCommonMethods.js';

export default {
  mixins: [ReplyCommonMethods],
  inject: ['$validator'],
  data() {
    return {
      page_title: this.$t("corrective") + " " + this.$t("action")
        + " " + this.$t("tools") + ": " + this.$t("cash") + " "
        + this.$t("&") + " " + this.$t("bank") + " " + this.$t("balance"),
      cash_data: {},
      bank_data: [],
      bankBookTotalAmount: '',
      bankStatementTotalAmount: '',
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
    this.getScheduleById();
    const masterId = this.$route.params.auditExecutionMastersId;
    this.loanCashByMasterId(masterId);
    this.loadBanksByMasterId(masterId);
    this.loadReviewReply();
    this.is_form_load = true;
  },
  methods: {
    loanCashByMasterId: function (masterId) {
      const param = {'masterId': masterId}
      this.$axios.post("/cash_and_bank/getCashByMasterId", null, {params: param}).then(resp => {
        this.cash_data = resp.data.data['cashBalance'];
        if (this.cash_data) {
          this.id = this.cash_data['id'];
          this.cash_data.cashInHand = this.cash_data['cashInHand'];
          this.cash_data.denotationOneQuantity = this.cash_data['denotationOneQuantity'];
          this.cash_data.denotationTwoQuantity = this.cash_data['denotationTwoQuantity'];
          this.cash_data.denotationFiveQuantity = this.cash_data['denotationFiveQuantity'];
          this.cash_data.denotationTenQuantity = this.cash_data['denotationTenQuantity'];
          this.cash_data.denotationTwentyQuantity = this.cash_data['denotationTwentyQuantity'];
          this.cash_data.denotationFortyQuantity = this.cash_data['denotationFortyQuantity'];
          this.cash_data.denotationFiftyQuantity = this.cash_data['denotationFiftyQuantity'];
          this.cash_data.denotationOneHundredQuantity = this.cash_data['denotationOneHundredQuantity'];
          this.cash_data.denotationTwoHundredQuantity = this.cash_data['denotationTwoHundredQuantity'];
          this.cash_data.denotationFiveHundredQuantity = this.cash_data['denotationFiveHundredQuantity'];
          this.cash_data.denotationOneThousandQuantity = this.cash_data['denotationOneThousandQuantity'];
          this.cash_data.denotationOneAmount = this.cash_data['denotationOneAmount'];
          this.cash_data.denotationTwoAmount = this.cash_data['denotationTwoAmount'];
          this.cash_data.denotationFiveAmount = this.cash_data['denotationFiveAmount'];
          this.cash_data.denotationTenAmount = this.cash_data['denotationTenAmount'];
          this.cash_data.denotationTwentyAmount = this.cash_data['denotationTwentyAmount'];
          this.cash_data.denotationFortyAmount = this.cash_data['denotationFortyAmount'];
          this.cash_data.denotationFiftyAmount = this.cash_data['denotationFiftyAmount'];
          this.cash_data.denotationHundredAmount = this.cash_data['denotationHundredAmount'];
          this.cash_data.denotationTwoHundredAmount = this.cash_data['denotationTwoHundredAmount'];
          this.cash_data.denotationFiveHundredAmount = this.cash_data['denotationFiveHundredAmount'];
          this.cash_data.denotationOneThousandAmount = this.cash_data['denotationOneThousandAmount'];
          this.cash_data.denotationCoinAmount = this.cash_data['denotationCoinAmount'];
          this.cash_data.denotationTotalAmount = this.cash_data['denotationTotalAmount'];
          this.cash_data.cashAmountDifference = this.cash_data['cashAmountDifference'];
        }
      });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = '';
    },
    loadBanksByMasterId: function (masterId) {
      const param = {'masterId': masterId}
      this.$axios.post("/cash_and_bank/getBankByMasterId", null, {params: param}).then(resp => {
        this.bank_data = resp.data.data['bankBalances'];
        if (this.bank_data) {
          for (let i = 0; i < this.bank_data.length; i++) {
            this.bank_data[i]['bankBookDetails'] = this.bank_data[i]['bankBookDetails'];
            this.bank_data[i]['bankBookAmount'] = this.bank_data[i]['bankBookAmount'];
            this.bank_data[i]['bankStatementDetails'] = this.bank_data[i]['bankStatementDetails'];
            this.bank_data[i]['bankStatementAmount'] = this.bank_data[i]['bankStatementAmount'];
            this.bankBookTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankBookAmount']), 0)
            this.bankStatementTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankStatementAmount']), 0)
          }
        }
      });
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
            // this.inputForm.txt_review_status = this.inputForm.txt_review_status + " " + '<i class="fa fa-dot-circle-o" style=" align: center;font-size: 1.45em; color:green;"></i>';
          } else if (this.inputForm.txt_review_status === 0) {
            this.inputForm.txt_review_status = "Feedback";
            // this.inputForm.txt_review_status = this.inputForm.txt_review_status + " " + '<i class="fa fa-dot-circle-o" style=" align: center;font-size: 1.4em; color:red;"></i>';
          } else {
            this.inputForm.txt_review_status = "Pending";
            // this.inputForm.txt_review_status = this.inputForm.txt_review_status + " " + '<i class="fa fa-dot-circle-o" style=" align: center;font-size: 1.4em; color:yellow;"></i>';

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
            // this.inputForm.txt_review_status = this.inputForm.txt_review_status + " " + '<i class="fa fa-dot-circle-o" style=" align: center;font-size: 1.45em; color:green;"></i>';
          } else if (this.inputForm.txt_reply_status === 0) {
            this.inputForm.txt_reply_status = "Feedback";
            // this.inputForm.txt_review_status = this.inputForm.txt_review_status + " " + '<i class="fa fa-dot-circle-o" style=" align: center;font-size: 1.4em; color:red;"></i>';
          } else {
            this.inputForm.txt_reply_status = "Pending";
            // this.inputForm.txt_review_status = this.inputForm.txt_review_status + " " + '<i class="fa fa-dot-circle-o" style=" align: center;font-size: 1.4em; color:yellow;"></i>';

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
  }
}
