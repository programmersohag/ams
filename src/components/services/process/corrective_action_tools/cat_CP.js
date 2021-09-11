import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import ReviewCommonMethods from '@/components/services/process/corrective_action_tools/CatCommonMethods.js';

export default {
  mixins: [ReviewCommonMethods],
  components: {CommonIndex, Pagination},
  inject: ['$validator'],
  data() {
    return {
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: "checkList", label: this.$t('check') + ' ' + this.$t('list'), sortable: true},
        {key: "expectedAction", label: this.$t('expected') + ' ' + this.$t('action'), sortable: true},
        {key: "satisfactionRatio", label: this.$t('satisfaction') + ' ' + this.$t('ratio'), sortable: true},
        {key: "riskLevel", label: this.$t('risk') + ' ' + this.$t('level'), sortable: true},
        {key: "comment", label: this.$t('comment'), sortable: true},
      ],
      pagination: {
        offset: 0,
        total_rows: 0
      },
      check_point_executions: [],
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
      this.$axios.get("/check_point_executions/findAllByMasterId", {params: param})
        .then(res => {
          this.check_point_executions = res.data.data['checkPointExecutions'];
          if (this.check_point_executions.length > 0) {
            for (let i = 0; i < this.check_point_executions.length; i++) {
              this.check_point_executions[i]['checkList'] = this.check_point_executions[i]['checkList']['name'];
              this.check_point_executions[i]['expectedAction'] = this.check_point_executions[i]['expectedAction'];
              this.check_point_executions[i]['satisfactionRatio'] = this.check_point_executions[i]['satisfactionRatio'];
              this.check_point_executions[i]['riskLevel'] = this.check_point_executions[i]['riskLevel'];
              this.check_point_executions[i]['comment'] = this.check_point_executions[i]['comment'];
            }
          }
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
  }
}
