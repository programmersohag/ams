import ReplyCommonMethods from '@/components/services/process/corrective_action_tools/CatCommonMethods.js';

export default {
  mixins: [ReplyCommonMethods],
  inject: ['$validator'],
  data() {
    return {
      page_title: this.$t("corrective") + " " + this.$t("action")
        + " " + this.$t("tools") + ": " + this.$t("Fixed") + " " + this.$t("Assets"),
      schedule: '',
      teamMembers: '',
      location: '',
      auditPeriod: '',
      issueStatus: '',
      fixedAssetOpeningBalance: '',
      fixedAssetAddition: '',
      fixedAssetDisposal: '',
      fixedAssetClosingBalance: '',
      actualBalanceAfterInventory: '',
      depreciationOpeningBalance: '',
      depreciationNewCharge: '',
      depreciationAdjustment: '',
      accumulatedDepreciation: '',
      writtenDownValue: '',
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
    this.loadData();
    this.loadReviewReply();

  },
  methods: {
    loadData: function () {
      let url = 'fixed-asset/getDetailsByMasterId/' + this.$route.params.auditExecutionMastersId;   //here this.id is master id
      this.$axios
        .post(url)
        .then(res => {
          if (res.data.data) {
            this.schedule = '[' + res.data.data.schedules_code + ']-' + res.data.data.schedules_name;
            this.teamMembers = res.data.data.member_name;
            this.location = '[' + res.data.data.location_code + ']-' + res.data.data.location_name + ', ' + res.data.data.location_address;
            this.auditPeriod = res.data.data.schedules_from_date + ' To ' + res.data.data.schedules_to_date;
            this.issueStatus = res.data.data.issueStatus;
            this.fixedAssetOpeningBalance = res.data.data.fixed_asset_opening_balance;
            this.fixedAssetAddition = res.data.data.fixed_asset_addition;
            this.fixedAssetDisposal = res.data.data.fixed_asset_disposal;
            this.fixedAssetClosingBalance = res.data.data.fixed_asset_closing_balance;
            this.actualBalanceAfterInventory = res.data.data.actual_balance_after_inventory;
            this.depreciationOpeningBalance = res.data.data.depreciation_opening_balance;
            this.depreciationNewCharge = res.data.data.depreciation_new_charge;
            this.depreciationAdjustment = res.data.data.depreciation_adjustment;
            this.accumulatedDepreciation = res.data.data.accumulated_depreciation;
            this.writtenDownValue = res.data.data.written_down_value;
          }
        });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = "";
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

