import ReplyCommonMethods from '@/components/services/process/audit_reply/ReplyCommonMethods.js';

export default {
  mixins: [ReplyCommonMethods],
  data() {
    return {
      fields: ['budgetHead', 'yearlyApprovedBudget', 'yearlyReviseBudget', 'yearlyTotalBudget',
        'selectedMonthBudget', 'expenditureUpToPreviousMonth', 'expenditureSelectedMonth',
        'expenditureSelectedMonth', 'totalExpenditure', 'budgetVarianceSelectedMonth', 'cumulativeBudget'],
      budgets: [],
    }
  },
  mounted() {
    this.getScheduleById();
    this.loadData();
    this.is_form_load = true;
  },
  methods: {
    loadData: function () {
      const masterId = this.$route.params.auditExecutionMastersId;
      const param = {'masterId': masterId}
      this.$axios.get("/budgets/findAllByMasterId", {params: param})
        .then(res => {
          this.budgets = res.data.data['budgetList'];
          this.reviewData = res.data.data['reviews'];
        });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = '';
    },
  },
}
