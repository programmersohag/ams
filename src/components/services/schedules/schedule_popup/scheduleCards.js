export default {
  name: "Save",
  components: {},
  props: {
    id: null,
    noCloseOnEsc: false,
    noCloseOnBackdrop: false,
    hideFooter: false,
    extra_param: Object,
  },
  data() {
    return {
      is_form_load: false,
      formData: [],
      scheduleId: window.localStorage.getItem("schedule")
    }
  },
  mounted() {
    console.log("ssssssssssssssdfsdfsdfsf")
    this.loadSchedulesPopup();
  },
  methods: {
    saveToLocal: function (data) {
      window.localStorage.setItem("schedule", data.schedule_id);
      window.localStorage.setItem("schedule_name", data.schedule_name);
      window.localStorage.setItem("location_name", data.location_name);
      window.localStorage.setItem("location_id", data.location_id);
      window.localStorage.setItem("api_location_id", data.api_branch_id);
      window.localStorage.setItem("auditPeriodFromDate", data['audit_period_from_date']);
      window.localStorage.setItem("auditPeriodToDate", data['audit_period_to_date']);
      this.closeModal();
    },

    loadSchedulesPopup: function () {
      let session = this.$store.getters['auth/userInfo'];
      let url = 'schedules/findAllByMemberId/' + session.id;
      let params = {id: session.id};
      this.$axios
        .get(url, params)
        .then(res => {
          if (res.data.data.length > 0) {
            this.formData = res.data.data;
          } else {  //if there is no schedule then modal will close
            this.closeModal();
          }
        });
      this.is_form_load = true;
    },

    closeModal() {
      this.$emit('close');
    }
  }
}
