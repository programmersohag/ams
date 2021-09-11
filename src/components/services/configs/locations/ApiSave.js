import {$http_core_service} from "@/shared/common/core-service";


export default {

  data() {
    return {
      page_title: this.$t("budgets"),
      locations: [],
    }
  },
  mounted() {
    this.getLocationsFromCoreService();
  },
  methods: {
    getLocationsFromCoreService: function () {
      let session = this.$store.getters['auth/userInfo'];
      const url = 'ams_staff_positions/locations';
      let params = {
        "cbo_branch": session.branch_id  //no need this params
      };
      $http_core_service.post(url, JSON.stringify(params))
        .then((response) => {
          this.locations = response.data["branches_info"];
        }).catch(function (error) {
        console.error("error", error);
      });
    },

    handleSubmitCoreData: function () {
      let userInfo = this.$store.getters['auth/userInfo'];
      if (this.locations.length > 0) {
        let object = {};
        object.locations = this.locations;  //already load from api call
        object.userInfo = userInfo;

        let headers = {
          headers: {'Content-Type': `application/json`}
        }

        var jsonData = JSON.stringify(object);
        let url = "/locations/addAll";
        this.$axios
          .post(url, jsonData, headers)
          .then(res => {
            if (res.data.validation_error) {
              this.error_message = res.data.validation_error;
            } else {
              let status = 'failed';
              if (res.data.statusCode === 200) {
                status = 'success';
              } else if (res.data.statusCode === 202) {
                status = 'warning';
              }

              this.flashMessage(status, res.data.message);

              if (status === 'success') {
                this.$emit('close', true);
              }
            }
          });
      }

    },

    handleReset: function () {

      this.errors.clear();
    },

    handleCancel: function () {
      this.$emit('close');
    }

  }
}
