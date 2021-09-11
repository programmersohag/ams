export default {
  name: "Preview",
  props: {
    id: null,
    data: Object,
  },
  data() {
    return {
      resetData: {},
      error_message: [],
      formData: {},
      loaderStyle: {
        "z-index": "99999999",
        "position": "absolute",
        "top": "10%",
        "left": "38%"
      },
      isLoad: false,
      is_preview: false,
    }
  },
  computed: {
    formData: function () {
      return this.formData;
    },
  },
  mounted() {
    this.isLoad = true;
    this.loadExpectedData();
    this.getLastAuditResult();
    this.isLoad = false;

  },
  methods: {
    loadExpectedData: function () {
      const url = '/config-generals/get/average_position';
      this.$axios
        .get(url)
        .then(res => {
          const data = res.data.data;
          if (data) {
            for (let i = 0; i < data.length; i++) {
              this.formData[data[i]['fieldName']] = data[i]['defaultValue'];
            }
          }
          Object.assign(this.formData, this.data);
          Object.assign(this.formData, this.getResult());
          this.is_preview = true;
        });
    },
    getResult() {
      const totalMember = parseInt(this.data['totalMember']);
      const totalSamity = parseInt(this.data['totalSamity']);
      const totalFo = parseInt(this.data['totalFO']);
      const totalBorrower = parseInt(this.data['totalBorrower']);
      const totalLoanOutstanding = parseFloat(this.data['totalLoanOutstanding']);
      const member_per_samity_result = (totalMember / totalSamity).toFixed();
      const borrower_per_samity_result = (totalBorrower / totalSamity).toFixed();
      const fo_per_member_result = (totalMember / totalFo).toFixed();
      const fo_per_borrower_result = (totalBorrower / totalFo).toFixed();
      const borrower_per_day_fo_wise_result = ((totalBorrower / totalFo) / parseInt(this.data['weeklyWorkingDay'])).toFixed();
      const member_per_borrower_result = ((totalBorrower / totalMember) * 100).toFixed();
      const member_cancellation_result = ((parseInt(this.data['totalMemberCancellation']) / parseInt(this.data['totalMemberAdmission'])) * 100).toFixed(2);
      const fo_per_loan_outstanding_result = (totalFo / totalLoanOutstanding).toFixed();
      const savings_ratio_loan_outstanding_result = ((parseInt(this.data['totalSavingsBalance']) / totalLoanOutstanding) * 100).toFixed();
      const per_borrower_loan_outstanding_result = (totalBorrower / totalLoanOutstanding).toFixed(2);
      const savings_refund_percent_result = ((parseInt(this.data['totalSavingsRefund']) / parseInt(this.data['totalSavingsCollection'])) * 100).toFixed(2);
      const due_loan_percent_result = ((parseInt(this.data['totalDue']) / totalLoanOutstanding) * 100).toFixed(2);
      const myObj = {
        memberPerSamity: member_per_samity_result,
        borrowerPerSamity: borrower_per_samity_result,
        foPerMember: fo_per_member_result,
        foPerBorrower: fo_per_borrower_result,
        borrowerPerDayFoWise: borrower_per_day_fo_wise_result,
        totalMemberPerTotalBorrower: member_per_borrower_result,
        memberCancellationRate: member_cancellation_result,
        foPerLoanOutstanding: fo_per_loan_outstanding_result,
        loanOutstandingPerBorrower: per_borrower_loan_outstanding_result,
        loanOutstandingSavingsRatio: savings_ratio_loan_outstanding_result,
        savingsRefundPercent: savings_refund_percent_result,
        dueLoanPercent: due_loan_percent_result,
      };
/*
      const output = {};
      for (const [key, value] of Object.entries(myObj)) {
        if (isFinite(parseInt(value)) || isNaN(parseInt(value))) {
          output[key] = 0;
        } else {
          output[key] = value;
        }
      }
      console.log(output);
*/
      return myObj;
    },
    getLastAuditResult() {
      const locationId = localStorage.getItem('location_id');
      const url = 'ongoing_program_average_positions/getLastAuditResultByLocation';
      this.$axios
        .get(url, {params: {'locationId': locationId}})
        .then(res => {
          const data = res.data.data;
          if (data) {
            this.formData['memberPerSamityLast'] = data['memberPerSamity'];
            this.formData['borrowerPerSamityLast'] = data['borrowerPerSamity'];
            this.formData['foPerMemberLast'] = data['foPerMember'];
            this.formData['foPerBorrowerLast'] = data['foPerBorrower'];
            this.formData['borrowerPerDayFoWiseLast'] = data['borrowerPerDayFoWise'];
            this.formData['totalMemberPerTotalBorrowerLast'] = data['totalMemberPerTotalBorrower'];
            this.formData['memberCancellationRateLast'] = data['memberCancellationRate'];
            this.formData['foPerLoanOutstandingLast'] = data['foPerLoanOutstanding'];
            this.formData['loanOutstandingSavingsRatioLast'] = data['loanOutstandingSavingsRatio'];
            this.formData['loanOutstandingPerBorrowerLast'] = data['loanOutstandingPerBorrower'];
            this.formData['savingsRefundPercentLast'] = data['savingsRefundPercent'];
            this.formData['dueLoanPercentLast'] = data['dueLoanPercent'];
          } else {
            this.formData['memberPerSamityLast'] = 0;
            this.formData['borrowerPerSamityLast'] = 0;
            this.formData['foPerMemberLast'] = 0;
            this.formData['foPerBorrowerLast'] = 0;
            this.formData['borrowerPerDayFoWiseLast'] = 0;
            this.formData['totalMemberPerTotalBorrowerLast'] = 0;
            this.formData['memberCancellationRateLast'] = 0;
            this.formData['foPerLoanOutstandingLast'] = 0;
            this.formData['loanOutstandingSavingsRatioLast'] = 0;
            this.formData['loanOutstandingPerBorrowerLast'] = 0;
            this.formData['savingsRefundPercentLast'] = 0;
            this.formData['dueLoanPercentLast'] = 0;
          }
        });
    },
    handleSubmit: function () {
      let url;
      this.formData['scheduleId'] = localStorage.getItem('schedule');
      if (this.formData['id']) {
        url = 'ongoing_program_average_positions/edit';
      } else {
        url = 'ongoing_program_average_positions/add';
      }
      this.formData['expectedMemberPerSamity'] = this.formData['txt_member_per_samity'];
      this.formData['expectedBorrowerPerSamity'] = this.formData['txt_borrower_per_samity'];
      this.formData['expectedFoPerMember'] = this.formData['txt_fo_per_member'];
      this.formData['expectedFoPerBorrower'] = this.formData['txt_fo_per_borrower'];
      this.formData['expectedBorrowerPerDayFoWise'] = this.formData['txt_borrower_per_day_fo_wise'];
      this.formData['expectedTotalMemberPerTotalBorrower'] = this.formData['txt_total_member_per_total_borrower'];
      this.formData['expectedMemberCancellationRate'] = this.formData['txt_member_cancellation_rate'];
      this.formData['expectedFoPerLoanOutstanding'] = this.formData['txt_fo_per_loan_outstanding'];
      this.formData['expectedLoanOutstandingSavingsRatio'] = this.formData['txt_savings_ratio_of_loan_outstanding'];
      this.formData['expectedLoanOutstandingPerBorrower'] = this.formData['txt_loanee_per_outstanding'];
      this.formData['expectedSavingsRefundPercent'] = this.formData['txt_percent_of_savings_refund'];
      this.formData['expectedDueLoanPercent'] = this.formData['txt_percent_of_due_loan'];
      const body = JSON.stringify(this.formData);
      this.$axios
        .post(url, body, {
          headers: {'Content-Type': 'application/json'}
        }).then(res => {
        if (res.data.validation_error) {
          this.error_message = res.data.validation_error;
        } else {
          let status = 'failed';
          if (res.data.statusCode === 200) {
            status = 'success';
            this.$router.push('/audit-execution/ongoing-program-average-positions/index');
          }
          this.flashMessage(status, res.data.message);
          if (status === 'success') {
            this.$emit('close', true);
          }
        }
      });
    },
    handleReset: function () {
      this.error_message = [];
      this.errors.clear();
    },
    handleCancel: function () {
      this.$router.push('/audit-execution/ongoing-program-average-positions/index');
    }
  }
}
