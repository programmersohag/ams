import FormGenerator from "@/containers/form_generators/FormGenerator";
import UserService from '@/components/services/users/UserService.js';

export default {
  name: "Show",
  mixins: [UserService],
  components: {
    FormGenerator
  },
  props: {
    id: null,
    extra_param: Object,
  },
  data() {
    return {
      schedule: '',
      teamMembers: '',
      location: '',
      auditPeriod: '',
      auditingDate: '',
      auditArea: '',
      purpose: '',
      limitationOfAudit: '',
      issueStatus: '',
      reviewData: [],

      resetData: {},
      is_form_load: false,
      error_message: [],
      schedule_list: [],

    }
  },
  mounted() {
    this.is_form_load = true;
    this.loadGeneralInfo();
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
    loadGeneralInfo: function () {
      let url = 'general_info/getDetailsByMasterId/' + this.id;   //here this.id is master id
      this.$axios
        .post(url)
        .then(res => {
          if (res.data.data['generalInfo']) {
            const general_info = res.data.data['generalInfo'];
            this.schedule = '[' + general_info.schedule.code + ']-' + general_info.schedule.name;
            this.teamMembers = general_info.schedule.team.name;
            this.location = '[' + general_info.schedule.location.code + ']-' + general_info.schedule.location.name + ', ' + general_info.schedule.location.address;
            this.auditPeriod = general_info.schedule.auditPeriodFromDate + ' To ' + general_info.schedule.auditPeriodToDate;
            this.auditingDate = general_info.schedule.auditingFromDate + ' To ' + general_info.schedule.auditingToDate;
            this.auditArea = general_info.auditArea;
            this.purpose = general_info.purpose;
            this.limitationOfAudit = general_info.limitationOfAudit;
            this.issueStatus = general_info.issueStatus;
          }
          if (res.data.data['reviews']) {
            this.reviewData = res.data.data['reviews'];
          }
        });
    },
  }
}
