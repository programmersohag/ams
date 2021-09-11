import UserService from '@/components/services/users/UserService.js';

export default {
  name: "View",
  mixins: [UserService],
  data() {
    return {
      cash_data: {},
      bank_data: [],
      bankBookTotalAmount: '',
      bankStatementTotalAmount: '',
      masterId: null,
      reviewData: []
    }
  },
  mounted() {
    this.masterId = this.$route.query.id;
    this.loanCashByMasterId(this.masterId);
    this.loadBanksByMasterId(this.masterId);
  },
  computed: {
    reviews: function () {
      for (let i = 0; i < this.reviewData.length; i++) {
        const reviewerId = this.reviewData[i]['reviewedBy'];
        if (reviewerId) {
          this.getUserById(reviewerId).then(data => {
            this.reviewData[i].reviewerName = data.data[0]['name'];
          });
        }
        const replierId = this.reviewData[i]['repliedBy'];
        if (replierId) {
          this.getUserById(replierId).then(user => {
            this.reviewData[i].replierName = user[0]['name'];
          });
        }
      }
      return this.reviewData;
    }
  },
  methods: {
    loanCashByMasterId: function (masterId) {
      this.$axios.post("/cash_and_bank/getCashByMasterId", null, {params: {masterId: masterId}}).then(resp => {
        this.cash_data = resp.data.data['cashBalance'];
        this.reviewData = resp.data.data['reviews'];
        if (this.cash_data) {
          this.id = this.cash_data['id'];
          this.cash_info.cashInHand = this.cash_data['cashInHand'];
          this.cash_info.denotationOneQuantity = this.cash_data['denotationOneQuantity'];
          this.cash_info.denotationTwoQuantity = this.cash_data['denotationTwoQuantity'];
          this.cash_info.denotationFiveQuantity = this.cash_data['denotationFiveQuantity'];
          this.cash_info.denotationTenQuantity = this.cash_data['denotationTenQuantity'];
          this.cash_info.denotationTwentyQuantity = this.cash_data['denotationTwentyQuantity'];
          this.cash_info.denotationFortyQuantity = this.cash_data['denotationFortyQuantity'];
          this.cash_info.denotationFiftyQuantity = this.cash_data['denotationFiftyQuantity'];
          this.cash_info.denotationOneHundredQuantity = this.cash_data['denotationOneHundredQuantity'];
          this.cash_info.denotationTwoHundredQuantity = this.cash_data['denotationTwoHundredQuantity'];
          this.cash_info.denotationFiveHundredQuantity = this.cash_data['denotationFiveHundredQuantity'];
          this.cash_info.denotationOneThousandQuantity = this.cash_data['denotationOneThousandQuantity'];
          this.cash_info.denotationOneAmount = this.cash_data['denotationOneAmount'];
          this.cash_info.denotationTwoAmount = this.cash_data['denotationTwoAmount'];
          this.cash_info.denotationFiveAmount = this.cash_data['denotationFiveAmount'];
          this.cash_info.denotationTenAmount = this.cash_data['denotationTenAmount'];
          this.cash_info.denotationTwentyAmount = this.cash_data['denotationTwentyAmount'];
          this.cash_info.denotationFortyAmount = this.cash_data['denotationFortyAmount'];
          this.cash_info.denotationFiftyAmount = this.cash_data['denotationFiftyAmount'];
          this.cash_info.denotationHundredAmount = this.cash_data['denotationHundredAmount'];
          this.cash_info.denotationTwoHundredAmount = this.cash_data['denotationTwoHundredAmount'];
          this.cash_info.denotationFiveHundredAmount = this.cash_data['denotationFiveHundredAmount'];
          this.cash_info.denotationOneThousandAmount = this.cash_data['denotationOneThousandAmount'];
          this.cash_info.denotationCoinAmount = this.cash_data['denotationCoinAmount'];
          this.cash_info.denotationTotalAmount = this.cash_data['denotationTotalAmount'];
          this.cash_info.cashAmountDifference = this.cash_data['cashAmountDifference'];
        }
      });
    },
    loadBanksByMasterId: function (masterId) {
      this.$axios.post("/cash_and_bank/getBankByMasterId", null, {params: {masterId: masterId}}).then(resp => {
        this.bank_data = resp.data.data['bankBalances'];
        if (this.bank_data) {
          for (let i = 0; i < this.bank_data.length; i++) {
            this.bank_data[i]['bankBookDetails'] = this.bank_data[i]['bankBookDetails'];
            this.bank_data[i]['bankBookAmount'] = this.bank_data[i]['bankBookAmount'];
            this.bank_data[i]['bankStatementAmount'] = this.bank_data[i]['bankStatementAmount'];
            this.bankBookTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankBookAmount']), 0)
            this.bankStatementTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankStatementAmount']), 0)
          }
        }
      });
    },
  }
}
