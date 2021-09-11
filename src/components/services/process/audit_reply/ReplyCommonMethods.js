import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'
import FormError from "@/containers/FormError";

export default {
  components: {FormError, 'vue-ckeditor': VueCkeditor.component, CommonIndex, Pagination},
  inject: ['$validator'],
  data() {
    return {
      page_title: this.$t("add") + " " + this.$t("reply"),
      valid_star: '<span class="required">*</span>',
      editors: {
        classic: ClassicEditor
      },
      formErrors: [],
      errorMessage: {},
      is_error_msg_show: false,

      locationName: '',
      scheduleName: '',
      teamName: '',
      inputForm: {
        txt_status: '',
        txt_comment: '',
      },
      options: [{
        text: "--Select--",
        value: ''
      },
        {
          text: "In Progress",
          value: 'IN_PROGRESS'
        },
        {
          text: "Resolved",
          value: 'RESOLVED'
        }],
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
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          const id = this.$store.getters['auth/userInfo']['id']
          let params = new FormData();
          params.append('id', this.$route.params.id);
          params.append('replyComment', this.inputForm.txt_comment);
          params.append('replyStatus', this.inputForm.txt_status);
          params.append('repliedBy', id);
          params.append('replyDate', this.$moment().format('DD-MM-YYYY'));
          this.$axios.post('/reviews/update', params)
            .then(res => {
              if (res.data.statusCode === 200) {
                this.flashMessage("Success", res.data.message);
                this.$router.push({name: 'Audit Reply Index'});
              } else if (res.data.error) {
                this.errorMessage = res.data.error;
              } else {
                this.flashMessage("Failed", res.data.message);
                this.$router.push({name: 'Audit Reply Index'});
              }
            });
        } else {
          this.is_error_msg_show = true;
          this.$toast.error({title: 'error', message: 'Invalid Field'});
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
      this.inputForm.txt_comment = '';
      this.inputForm.txt_status = '';
    },
    handleCancel: function () {
      this.$router.push({name: 'Audit Reply Index'});
    },
  }
}
