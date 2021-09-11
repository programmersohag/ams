/**
 * Created by jahid on 1/29/19.
 */
import API from "@/shared/common/API.js";
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'
import FormError from "@/containers/FormError";

var memberAPI = new API();
memberAPI.createEntity({name: "members"});
let memberApiEndPoint = memberAPI.endpoints.members;

var savingsAPI = new API();
savingsAPI.createEntity({name: "savings"});
let savingsApiEndPoint = savingsAPI.endpoints.savings;

var memberClosingsAPI = new API();
memberClosingsAPI.createEntity({name: "member_closings"});
let savingsDepositApiEndPoint = memberClosingsAPI.endpoints.member_closings;

export default {
  components: {VueBootstrapTypeahead, 'vue-ckeditor': VueCkeditor.component, FormError},
  props: {
    id: String,
  },
  data() {
    return {
      valid_star: '<span class="required">*</span>',
      editors: {
        classic: ClassicEditor
      },
      inputForm: {
        txt_audit_period: '',
        txt_audit_area: '',
        txt_purpose: '',
        txt_limitation_of_audit: '',
        txt_status: '',
        txt_comment: "",
        txt_review: "",
        txt_reviewed_by: "",
        txt_review_status: "",
        txt_review_date: "",

        txt_reply_comment: "",
        txt_reply_by: "",
        txt_reply_status: "",
        txt_reply_date: "",

      },
      resetData: {},
      location: '',
      schedule: '',
      team: '',
      response_data: [],
      res_review_data: [],
      options: [],
      errorMessage: [],
      is_error_msg_show: false,
      formErrors: [],
      user: {},
    }

  },
  mounted() {
    this.user = this.$store.getters['auth/userInfo'];
    this.loadData();

  },
  methods: {
    loadData: function () {
      this.$axios.get('/reviews/findByExecutionAreaAndId/' + "GI" + '/' + this.$route.params.auditExecutionMastersId)
        .then(res => {
          this.location = res.data.data.schedule.location.name;
          this.team = res.data.data.schedule.team.name;
          this.schedule = res.data.data.schedule.name;
          this.response_data = res.data.data;
          this.setFormDefaultData();
        })
        .catch(function (error) {
          console.log(error.response);
        })
    },
    setFormDefaultData: function () {
      this.options.push({
        text: "--Select--",
        value: ''
      });
      this.options.push({
        text: "Feedback",
        value: FEEDBACK
      });
      this.options.push({
        text: "In progress",
        value: IN_PROGRESS
      });
      this.options.push({
        text: "Close",
        value: 'CLOSE'
      });
      this.inputForm.txt_audit_period = this.response_data.schedule.fromDate + " " + "To" + " " + this.response_data.schedule.toDate;
      this.inputForm.txt_audit_area = this.response_data.auditArea;
      this.inputForm.txt_purpose = this.response_data.purpose;
      this.inputForm.txt_limitation_of_audit = this.response_data.limitationOfAudit;
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = "";

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
    },

    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {

        if (this.inputForm.txt_comment) {
          if (valid) {
            var currentDate = new Date();
            var currentDateWithFormat = new Date().toJSON().slice(0, 10);
            var dateArray = currentDateWithFormat.split('-');
            let reviewDate = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];

            let params = new FormData();
            params.append('id', this.$route.params.id);
            params.append('correctiveActionComment', this.inputForm.txt_comment);
            params.append('replyStatus', this.inputForm.txt_status);
            params.append('correctiveActionBy', this.user.id);
            params.append('correctiveActionDate', reviewDate);

            this.$axios.post('/corrective-action-tools/update', params)
              .then(res => {
                if (res.data.statusCode == 200) {
                  this.flashMessage("Success", res.data.message);
                  this.$router.push({name: 'Audit Reply Index'});
                } else if (res.data.error) {
                  this.errorMessage = res.data.error;
                } else {
                  this.flashMessage("Failed", res.data.message);
                  // this.$router.push({name: 'Audit Reply Index'});
                }
              });
          }
        } else {
          this.is_error_msg_show = true;
          this.errorMessage['txt_comment'] = 'Comment is required';
          this.$toast.error({title: 'Error', message: this.errorMessage['txt_comment']});
          return;
        }

      });
    },

    handleReset: function () {
      //this.$refs.typeahead.$data.inputValue = '';
      this.inputForm.txt_comment = "";
      this.inputForm = Object.assign(this.inputForm, this.resetData);
    },
    handleCancel: function () {
      this.$router.push({name: 'Audit Reply Index'});

    }
  },
}


