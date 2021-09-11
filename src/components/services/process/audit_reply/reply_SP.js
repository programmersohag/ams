import ReplyCommonMethods from '@/components/services/process/audit_reply/ReplyCommonMethods.js';

export default {
  mixins: [ReplyCommonMethods],
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
    }
  },
  mounted() {
    this.getScheduleById();
    this.loadData();
  },
  methods: {
    loadData: function () {
      const masterId = this.$route.params.auditExecutionMastersId;
      const param = {'masterId': masterId}
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
  }
}

