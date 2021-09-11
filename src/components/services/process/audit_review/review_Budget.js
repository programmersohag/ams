import ReviewCommonMethods from '@/components/services/process/audit_review/ReviewCommonMethods.js';

export default {
  mixins: [ReviewCommonMethods],
  data() {
    return {
      page_title: this.$t("add") + " " + this.$t("review"),
      fields: ['budgetHead', 'yearlyApprovedBudget', 'yearlyReviseBudget', 'yearlyTotalBudget',
        'selectedMonthBudget', 'expenditureUpToPreviousMonth', 'expenditureSelectedMonth',
        'expenditureSelectedMonth', 'totalExpenditure', 'budgetVarianceSelectedMonth', 'cumulativeBudget'],
      budgets: [],
    }
  },
  mounted() {
    this.getScheduleById();
    this.loadData();
  },
  methods: {
    loadData: function () {
      const masterId = this.$route.params.id;
      const param = {'masterId': masterId}
      this.$axios.get("/budgets/findAllByMasterId", {params: param})
        .then(res => {
          this.budgets = res.data.data['budgetList'];
          this.reviewData = res.data.data['reviews'];
        });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = '';
    },
    handleSubmit: function () {
      this.submit('BUDGET');
    }
  }
}
