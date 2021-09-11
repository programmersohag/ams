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
        {
          key: "numberOfSamity",
          label: this.$t('number') + ' ' + this.$t('of') + ' ' + this.$t('samity'),
          sortable: true
        },
        {
          key: "numberOfMember",
          label: this.$t('number') + ' ' + this.$t('of') + ' ' + this.$t('member'),
          sortable: true
        },
        {
          key: "numberOfLoanee",
          label: this.$t('number') + ' ' + this.$t('of') + ' ' + this.$t('loanee'),
          sortable: true
        },
        {key: "savingsBalance", label: this.$t('savings') + ' ' + this.$t('balance'), sortable: true},
        {key: "loanBalance", label: this.$t('loan') + ' ' + this.$t('balance'), sortable: true},
        {
          key: "currentDueLoanee",
          label: this.$t('current') + ' ' + this.$t('due') + ' ' + this.$t('loanee'),
          sortable: true
        },
        {
          key: "totalDueLoanee",
          label: this.$t('total') + ' ' + this.$t('due') + ' ' + this.$t('loanee'),
          sortable: true
        },
        {
          key: "currentDueBalance",
          label: this.$t('current') + ' ' + this.$t('due') + ' ' + this.$t('balance'),
          sortable: true
        },
        {
          key: "totalDueBalance",
          label: this.$t('total') + ' ' + this.$t('due') + ' ' + this.$t('balance'),
          sortable: true
        },
        {key: 'actions', label: this.$t('actions'), sortable: false}
      ],
      performanceAnalysis: []
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
      this.$axios.get("/field_officer_performance_analysis/findAllByMasterId", {params: param})
        .then(res => {
          this.performanceAnalysis = res.data.data['fowpa'];
          this.reviewData = res.data.data['reviews'];
          if (this.performanceAnalysis.length > 0) {
            for (let i = 0; i < this.performanceAnalysis.length; i++) {
              this.performanceAnalysis[i]['name'] = '[' + this.performanceAnalysis[i]['code'] + ']' + this.performanceAnalysis[i]['name'];
              this.performanceAnalysis[i]['numberOfSamity'] = this.performanceAnalysis[i]['numberOfSamity'];
              this.performanceAnalysis[i]['numberOfMember'] = this.performanceAnalysis[i]['numberOfMember'];
              this.performanceAnalysis[i]['numberOfLoanee'] = this.performanceAnalysis[i]['numberOfLoanee'];
              this.performanceAnalysis[i]['savingsBalance'] = this.performanceAnalysis[i]['savingsBalance'];
              this.performanceAnalysis[i]['loanBalance'] = this.performanceAnalysis[i]['loanBalance'];
              this.performanceAnalysis[i]['currentDueLoanee'] = this.performanceAnalysis[i]['currentDueLoanee'];
              this.performanceAnalysis[i]['totalDueLoanee'] = this.performanceAnalysis[i]['totalDueLoanee'];
              this.performanceAnalysis[i]['currentDueBalance'] = this.performanceAnalysis[i]['currentDueBalance'];
              this.performanceAnalysis[i]['totalDueBalance'] = this.performanceAnalysis[i]['totalDueBalance'];
            }
          }
        });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = '';
    },
    handleSubmit: function () {
      this.submit('FILED_OFFICER_WISE_PERFORMANCE_ANALYSIS');
    }
  }
}
