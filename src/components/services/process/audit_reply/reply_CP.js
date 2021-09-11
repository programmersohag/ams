import ReviewCommonMethods from '@/components/services/process/audit_reply/ReplyCommonMethods.js';

export default {
  mixins: [ReviewCommonMethods],
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
      check_point_executions: [],
    }
  },
  mounted() {
    this.user = this.$store.getters['auth/userInfo'];
    this.getScheduleById();
    this.loadData();
    this.is_form_load = true;
  },
  methods: {
    loadData: function () {
      const masterId = this.$route.params.auditExecutionMastersId;
      const param = {'masterId': masterId}
      this.$axios.get("/check_point_executions/findAllByMasterId", {params: param})
        .then(res => {
          this.check_point_executions = res.data.data['checkPointExecutions'];
          this.reviewData = res.data.data['reviews'];
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
  }
}
