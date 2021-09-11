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
      issueStatus: '',
      fixedAssetOpeningBalance: '',
      fixedAssetAddition: '',
      fixedAssetDisposal: '',
      fixedAssetClosingBalance: '',
      actualBalanceAfterInventory: '',
      depreciationOpeningBalance: '',
      depreciationNewCharge: '',
      depreciationAdjustment: '',
      accumulatedDepreciation: '',
      writtenDownValue: '',
      reviewData: [],
      satisfactionRatio: '',
      riskLevel: '',
      comment: '',

      resetData: {},
      is_form_load: false,
      error_message: [],
      schedule_list: [],

    }
  },
  mounted() {
    this.is_form_load = true;
    this.loadData();
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
    loadData: function () {
      let url = 'fixed-asset/getDetailsByMasterId/' + this.id;   //here this.id is master id
      this.$axios
        .post(url)
        .then(res => {
          this.reviewData = res.data.data['reviews'];
          const fixedAsset = res.data.data['fixedAsset'];
          if (fixedAsset) {
            console.log(fixedAsset['schedule']['auditingFromDate']);
            this.schedule = '[' + fixedAsset['schedule']['code'] + ']-' + fixedAsset['schedule']['name'];
            this.teamMembers = Array.prototype.map.call(fixedAsset['schedule']['team']['members'], s => s.memberName).toString();
            this.location = '[' + fixedAsset['schedule']['location']['code'] + ']-' + fixedAsset['schedule']['location']['name'] + ', ' + fixedAsset['schedule']['location']['address'];
            this.auditPeriod = fixedAsset['schedule']['auditingFromDate'] + ' To ' + fixedAsset['schedule']['auditingToDate'];
            this.issueStatus = res.data.data.issueStatus;
            this.fixedAssetOpeningBalance = fixedAsset.fixedAssetOpeningBalance;
            this.fixedAssetAddition = fixedAsset.fixedAssetAddition;
            this.fixedAssetDisposal = fixedAsset.fixedAssetDisposal;
            this.fixedAssetClosingBalance = fixedAsset.fixedAssetClosingBalance;
            this.actualBalanceAfterInventory = fixedAsset.actualBalanceAfterInventory;
            this.depreciationOpeningBalance = fixedAsset.depreciationOpeningBalance;
            this.depreciationNewCharge = fixedAsset.depreciationNewCharge;
            this.depreciationAdjustment = fixedAsset.depreciationAdjustment;
            this.accumulatedDepreciation = fixedAsset.accumulatedDepreciation;
            this.writtenDownValue = fixedAsset.writtenDownValue;
            this.riskLevel = fixedAsset.riskLevel;
            this.satisfactionRatio = fixedAsset.satisfactionRatio.replace('_',' ');
            this.comment = fixedAsset.comment;
          }
        });
    },
  }
}
