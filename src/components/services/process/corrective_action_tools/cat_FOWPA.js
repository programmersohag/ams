import CommonIndex from '@/containers/CommonIndex';
import ReplyCommonMethods from '@/components/services/process/corrective_action_tools/CatCommonMethods.js';

export default {
  mixins: [ReplyCommonMethods],
  components: {CommonIndex},
  data() {
    return {
      pagination: {
        offset: 0,
        total_rows: 0
      },
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: "name", label: this.$t('name'), sortable: true},
        {
          key: "numberOfSamity",
          label: this.$t('number') + ' ' + this.$t('of') + ' ' + this.$t('samity'),
          sortable: true
        },
        {
          key: "numberOfMember",
          label: this.$t('number') + ' ' + this.$t('of') + ' ' + this.$t('member'),
          sortable: true
        },
        {
          key: "numberOfLoanee",
          label: this.$t('number') + ' ' + this.$t('of') + ' ' + this.$t('loanee'),
          sortable: true
        },
        {key: "savingsBalance", label: this.$t('savings') + ' ' + this.$t('balance'), sortable: true},
        {key: "loanBalance", label: this.$t('loan') + ' ' + this.$t('balance'), sortable: true},
        {
          key: "currentDueLoanee",
          label: this.$t('current') + ' ' + this.$t('due') + ' ' + this.$t('loanee'),
          sortable: true
        },
        {
          key: "totalDueLoanee",
          label: this.$t('total') + ' ' + this.$t('due') + ' ' + this.$t('loanee'),
          sortable: true
        },
        {
          key: "currentDueBalance",
          label: this.$t('current') + ' ' + this.$t('due') + ' ' + this.$t('balance'),
          sortable: true
        },
        {
          key: "totalDueBalance",
          label: this.$t('total') + ' ' + this.$t('due') + ' ' + this.$t('balance'),
          sortable: true
        },
        {key: 'actions', label: this.$t('actions'), sortable: false}
      ],
      performanceAnalysis: [],
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
    this.loadData(this.pagination.offset);
    this.loadReviewReply();
    this.is_form_load = true;
  },
  methods: {
    loadData: function () {
      const masterId = this.$route.params.auditExecutionMastersId;
      const param = {'masterId': masterId}
      this.$axios.get("/field_officer_performance_analysis/findAllByMasterId", {params: param})
        .then(res => {
          this.performanceAnalysis = res.data.data['fowpa'];
          if (this.performanceAnalysis.length > 0) {
            for (let i = 0; i < this.performanceAnalysis.length; i++) {
              this.performanceAnalysis[i]['name'] = '[' + this.performanceAnalysis[i]['code'] + ']' + this.performanceAnalysis[i]['name'];
              this.performanceAnalysis[i]['numberOfSamity'] = this.performanceAnalysis[i]['numberOfSamity'];
              this.performanceAnalysis[i]['numberOfMember'] = this.performanceAnalysis[i]['numberOfMember'];
              this.performanceAnalysis[i]['numberOfLoanee'] = this.performanceAnalysis[i]['numberOfLoanee'];
              this.performanceAnalysis[i]['savingsBalance'] = this.performanceAnalysis[i]['savingsBalance'];
              this.performanceAnalysis[i]['loanBalance'] = this.performanceAnalysis[i]['loanBalance'];
              this.performanceAnalysis[i]['currentDueLoanee'] = this.performanceAnalysis[i]['currentDueLoanee'];
              this.performanceAnalysis[i]['totalDueLoanee'] = this.performanceAnalysis[i]['totalDueLoanee'];
              this.performanceAnalysis[i]['currentDueBalance'] = this.performanceAnalysis[i]['currentDueBalance'];
              this.performanceAnalysis[i]['totalDueBalance'] = this.performanceAnalysis[i]['totalDueBalance'];
            }
          }
        });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = '';
    },
    loadReviewReply:function (){
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
