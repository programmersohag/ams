import CommonIndex from '@/containers/CommonIndex';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'
import FormError from "@/containers/FormError";

export default {
  components: {FormError, 'vue-ckeditor': VueCkeditor.component, CommonIndex},
  data() {
    return {
      page_title: this.$t("add") + " " + this.$t("review"),
      valid_star: '<span class="required">*</span>',
      editors: {
        classic: ClassicEditor
      },
      options: [{
        text: "--Select--",
        value: ''
      },
        {
          text: "Feedback",
          value: 'FEEDBACK'
        },
        {
          text: "Done",
          value: 'REVIEWED'
        }],
      locationName: '',
      locationId: '',
      scheduleName: '',
      teamName: '',

      formErrors: [],
      errorMessage: {},
      is_error_msg_show: false,

      inputForm: {
        txt_status: '',
        txt_comment: '',
      },
      pagination: {
        offset: 0,
        total_rows: 0
      },
      reviewData: []
    }
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
    getScheduleById: function () {
      const scheduleId = this.$route.params.scheduleId;
      let params = {id: scheduleId};
      let url = 'schedules/findById/' + scheduleId;
      this.$axios
        .get(url, params)
        .then(res => {
          this.locationName = res.data.data['location']['name'];
          this.locationId = res.data.data['location']['id'];
          this.scheduleName = res.data.data['name'];
          this.teamName = res.data.data['team']['name'];
        });
    },
    submit: function (executionArea) {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          const id = this.$store.getters['auth/userInfo']['id']
          let params = new FormData();
          params.append('executionArea', executionArea);
          params.append('auditExecutionMastersId', this.$route.params.id);
          params.append('scheduleId', this.$route.params.scheduleId);
          params.append('locationId', this.locationId);
          params.append('reviewComment', this.inputForm.txt_comment);
          params.append('reviewStatus', this.inputForm.txt_status);
          params.append('reviewedBy', id);
          params.append('replyStatus', 'PENDING');
          params.append('reviewDate', this.$moment().format('DD-MM-YYYY'));
          this.$axios.post('/reviews/add', params)
            .then(res => {
              if (res.data.statusCode === 200) {
                this.flashMessage("Success", res.data.message);
                this.$router.push({name: 'Audit Review Index'});
              } else if (res.data.error) {
                this.errorMessage = res.data.error;
              } else {
                this.flashMessage("Failed", res.data.message);
                this.$router.push({name: 'Audit Review Index'});
              }
            });
        } else {
          this.is_error_msg_show = true;
          this.$toast.error({title: 'Error', message: 'Invalid Field'});
        }
      });
    },
    getUserById: function (userId) {
      return this.$http_service.get("/ams-auth-api/users/get_user/" + userId)
        .then(response => {
          if (response.data) {
            let user = response.data;
            return user[0];
          }
        })
        .catch(function (error) {
          console.log(error.response);
        });
    },
    handleReset: function () {
      this.inputForm.txt_comment = "";
    },
    handleCancel: function () {
      this.$router.push({name: 'Audit Review Index'});
    }
  }
}
