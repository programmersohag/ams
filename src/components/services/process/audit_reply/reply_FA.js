import ReplyCommonMethods from '@/components/services/process/audit_reply/ReplyCommonMethods.js';

export default {
  mixins: [ReplyCommonMethods],
  data() {
    return {
      page_title: this.$t("add") + " " + this.$t("review"),
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
    }
  },
  mounted() {
    this.getScheduleById();
    this.loadData();
    this.is_form_load = true;
  },
  methods: {
    loadData: function () {
      let url = 'fixed-asset/getDetailsByMasterId/' + this.$route.params.auditExecutionMastersId;   //here this.id is master id
      this.$axios
        .post(url)
        .then(res => {
          this.reviewData = res.data.data['reviews'];
          const fixedAsset = res.data.data['fixedAsset'];
          if (fixedAsset) {
            this.schedule = '[' + fixedAsset['schedule']['code'] + ']-' + fixedAsset['schedule']['name'];
            this.teamMembers = Array.prototype.map.call(fixedAsset['schedule']['team']['members'], s => s.memberName).toString();
            this.location = '[' + fixedAsset['schedule']['location']['code'] + ']-' + fixedAsset['schedule']['location']['name'] + ', ' + fixedAsset['schedule']['location']['address'];
            this.auditPeriod = fixedAsset['schedule']['fromDate'] + ' To ' + fixedAsset['schedule']['toDate'];
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
          }
        });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = "";
    },
  }
}

