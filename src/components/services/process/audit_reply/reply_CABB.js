import ReplyCommonMethods from '@/components/services/process/audit_reply/ReplyCommonMethods.js';

export default {
  mixins: [ReplyCommonMethods],
  data() {
    return {
      cash_data: {},
      bank_data: [],
      bankBookTotalAmount: '',
      bankStatementTotalAmount: '',
    }
  },
  mounted() {
    this.getScheduleById();
    const masterId = this.$route.params.auditExecutionMastersId;
    this.loanCashByMasterId(masterId)
    this.loadBanksByMasterId(masterId)
    this.is_form_load = true;
  },
  methods: {
    loanCashByMasterId: function (masterId) {
      const param = {'masterId': masterId}
      this.$axios.post("/cash_and_bank/getCashByMasterId", null, {params: param}).then(resp => {
        this.cash_data = resp.data.data['cashBalance'];
        this.reviewData = resp.data.data['reviews'];
        if (this.cash_data) {
          this.id = this.cash_data['id'];
          this.cash_data.cashInHand = this.cash_data['cashInHand'];
          this.cash_data.denotationOneQuantity = this.cash_data['denotationOneQuantity'];
          this.cash_data.denotationTwoQuantity = this.cash_data['denotationTwoQuantity'];
          this.cash_data.denotationFiveQuantity = this.cash_data['denotationFiveQuantity'];
          this.cash_data.denotationTenQuantity = this.cash_data['denotationTenQuantity'];
          this.cash_data.denotationTwentyQuantity = this.cash_data['denotationTwentyQuantity'];
          this.cash_data.denotationFortyQuantity = this.cash_data['denotationFortyQuantity'];
          this.cash_data.denotationFiftyQuantity = this.cash_data['denotationFiftyQuantity'];
          this.cash_data.denotationOneHundredQuantity = this.cash_data['denotationOneHundredQuantity'];
          this.cash_data.denotationTwoHundredQuantity = this.cash_data['denotationTwoHundredQuantity'];
          this.cash_data.denotationFiveHundredQuantity = this.cash_data['denotationFiveHundredQuantity'];
          this.cash_data.denotationOneThousandQuantity = this.cash_data['denotationOneThousandQuantity'];
          this.cash_data.denotationOneAmount = this.cash_data['denotationOneAmount'];
          this.cash_data.denotationTwoAmount = this.cash_data['denotationTwoAmount'];
          this.cash_data.denotationFiveAmount = this.cash_data['denotationFiveAmount'];
          this.cash_data.denotationTenAmount = this.cash_data['denotationTenAmount'];
          this.cash_data.denotationTwentyAmount = this.cash_data['denotationTwentyAmount'];
          this.cash_data.denotationFortyAmount = this.cash_data['denotationFortyAmount'];
          this.cash_data.denotationFiftyAmount = this.cash_data['denotationFiftyAmount'];
          this.cash_data.denotationHundredAmount = this.cash_data['denotationHundredAmount'];
          this.cash_data.denotationTwoHundredAmount = this.cash_data['denotationTwoHundredAmount'];
          this.cash_data.denotationFiveHundredAmount = this.cash_data['denotationFiveHundredAmount'];
          this.cash_data.denotationOneThousandAmount = this.cash_data['denotationOneThousandAmount'];
          this.cash_data.denotationCoinAmount = this.cash_data['denotationCoinAmount'];
          this.cash_data.denotationTotalAmount = this.cash_data['denotationTotalAmount'];
          this.cash_data.cashAmountDifference = this.cash_data['cashAmountDifference'];
        }
      });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = '';
    },
    loadBanksByMasterId: function (masterId) {
      const param = {'masterId': masterId}
      this.$axios.post("/cash_and_bank/getBankByMasterId", null, {params: param}).then(resp => {
        this.bank_data = resp.data.data['bankBalances'];
        if (this.bank_data) {
          for (let i = 0; i < this.bank_data.length; i++) {
            this.bank_data[i]['bankBookDetails'] = this.bank_data[i]['bankBookDetails'];
            this.bank_data[i]['bankBookAmount'] = this.bank_data[i]['bankBookAmount'];
            this.bank_data[i]['bankStatementDetails'] = this.bank_data[i]['bankStatementDetails'];
            this.bank_data[i]['bankStatementAmount'] = this.bank_data[i]['bankStatementAmount'];
            this.bankBookTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankBookAmount']), 0)
            this.bankStatementTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankStatementAmount']), 0)
          }
        }
      });
    },
  }
}
