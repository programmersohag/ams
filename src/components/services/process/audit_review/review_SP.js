import CommonIndex from '@/containers/CommonIndex';
import ReviewCommonMethods from '@/components/services/process/audit_review/ReviewCommonMethods.js';

export default {
  mixins: [ReviewCommonMethods],
  components: {CommonIndex},
  data() {
    return {
      page_title: this.$t("add") + " " + this.$t("review"),
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
    }
  },
  mounted() {
    this.getScheduleById();
    this.loadData();
  },
  methods: {
    loadData: function () {
      const scheduleId = this.$route.params.id;
      const param = {'masterId': scheduleId}
      this.$axios.get("/staff_positions/findAllByMasterId", {params: param})
        .then(res => {
          this.staff_positions = res.data.data['staffPositions'];
          this.reviewData = res.data.data['reviews'];
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
    handleSubmit: function () {
      this.submit('STAFF_POSITION');
    }
  }
}
