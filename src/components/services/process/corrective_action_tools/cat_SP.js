import CommonIndex from '@/containers/CommonIndex';
import ReplyCommonMethods from '@/components/services/process/corrective_action_tools/CatCommonMethods.js';

export default {
  mixins: [ReplyCommonMethods],
  components: {CommonIndex},
  inject: ['$validator'],
  data() {
    return {
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: "name", label: this.$t('name'), sortable: true},
        {key: "designation", label: this.$t('designation'), sortable: true},
        {
          key: "organizationJoiningDate",
          label: this.$t('organization') + ' ' + this.$t('joining') + ' ' + this.$t('date'),
          sortable: true
        },
        {
          key: "branchJoiningDate",
          label: this.$t('branch') + ' ' + this.$t('joining') + ' ' + this.$t('date'),
          sortable: true
        },
        {key: "address", label: this.$t('address'), sortable: true},
        {key: "comment", label: this.$t('comment'), sortable: true},
      ],
      staff_positions: [],
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
      const masterId = this.$route.params.auditExecutionMastersId;
      const param = {'masterId': masterId}
      this.$axios.get("/staff_positions/findAllByMasterId", {params: param})
        .then(res => {
          this.staff_positions = res.data.data['staffPositions'];
          if (this.staff_positions.length > 0) {
            for (let i = 0; i < this.staff_positions.length; i++) {
              this.staff_positions[i]['name'] = '[' + this.staff_positions[i]['code'] + ']' + this.staff_positions[i]['name'];
              this.staff_positions[i]['designation'] = this.staff_positions[i]['designation'];
              this.staff_positions[i]['organizationJoiningDate'] = this.staff_positions[i]['organizationJoiningDate'];
              this.staff_positions[i]['branchJoiningDate'] = this.staff_positions[i]['branchJoiningDate'];
              this.staff_positions[i]['address'] = this.staff_positions[i]['address'];
              this.staff_positions[i]['comment'] = this.staff_positions[i]['comment'];
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

