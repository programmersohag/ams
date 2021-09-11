import CommonIndex from '@/containers/CommonIndex';
import ReviewCommonMethods from '@/components/services/process/audit_review/ReviewCommonMethods.js';
import {ROW_PER_PAGE} from "../../../../shared/common/config";

export default {
  mixins: [ReviewCommonMethods],
  components: {CommonIndex},
  data() {
    return {
      page_title: this.$t("add") + " " + this.$t("review"),
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: "samityName", label: this.$t('samity') + ' ' + this.$t("name"), sortable: true},
        {
          key: "memberName",
          label: this.$t("member") + ' ' + this.$t("name"),
          sortable: true
        },
        {key: "loanCode", label: this.$t("loan") + ' ' + this.$t("code"), sortable: true},
        {key: "outstanding", label: this.$t("outstanding"), sortable: true},
        {key: "passbookOutstanding", label: this.$t("passbook") + ' ' + this.$t("outstanding"), sortable: true},
        {key: "savingsCode", label: this.$t("savings") + ' ' + this.$t("code"), sortable: true},
        {key: "savings", label: this.$t("savings"), sortable: true},
        {key: "passbookSavings", label: this.$t("passbook") + ' ' + this.$t("savings"), sortable: true},
        {key: "satisfactionRatio", label: this.$t("satisfaction") + ' ' + this.$t("ratio"), sortable: true},
        {key: "comment", label: this.$t("comment"), sortable: true},
      ],
      pagination: {
        offset: 0,
        total_rows: 0
      },

      passbook_balances: [],
      user: {},
    }
  },
  mounted() {
    this.getScheduleById();
    this.loadData();
  },
  methods: {
    loadData: function (offset = 0) {
      const scheduleId = this.$route.params.id;
      const page = (offset === 0) ? offset : (offset / ROW_PER_PAGE);
      const param = {'size': ROW_PER_PAGE, 'page': page, 'masterId': scheduleId}
      this.$axios.get("/passbook_balances/findAllByMasterId", {params: param})
        .then(res => {
          this.passbook_balances = res.data.data['passbookBalances'];
          if (this.passbook_balances.length > 0) {
            for (let i = 0; i < this.passbook_balances.length; i++) {
              this.passbook_balances[i]['samityName'] = '[' + this.passbook_balances[i]['samityCode'] + '] ' + this.passbook_balances[i]['samityName'];
              this.passbook_balances[i]['memberName'] = '[' + this.passbook_balances[i]['memberCode'] + '] ' + this.passbook_balances[i]['memberName'];
              this.passbook_balances[i]['loanCode'] = this.passbook_balances[i]['loanCode'];
              this.passbook_balances[i]['outstanding'] = this.passbook_balances[i]['outstanding'];
              this.passbook_balances[i]['passbookOutstanding'] = this.passbook_balances[i]['passbookOutstanding'];
              this.passbook_balances[i]['savingsCode'] = this.passbook_balances[i]['savingsCode'];
              this.passbook_balances[i]['savings'] = this.passbook_balances[i]['savings'];
              this.passbook_balances[i]['passbookSavings'] = this.passbook_balances[i]['passbookSavings'];
              this.passbook_balances[i]['satisfactionRatio'] = this.getSatisfactionRatioValue(this.passbook_balances[i]['satisfactionRatio']);
              this.passbook_balances[i]['riskLevel'] = this.passbook_balances[i]['riskLevel'];
              this.passbook_balances[i]['comment'] = this.passbook_balances[i]['comment'];
            }
          }
        });
      this.options.push({
        text: "--Select--",
        value: ''
      });
      this.options.push({
        text: "Feedback",
        value: 0
      });
      this.options.push({
        text: "Done",
        value: 1
      });
      this.inputForm.txt_status = '';
      this.inputForm.txt_comment = "";
    },
    getScheduleById: function () {
      const scheduleId = this.$route.params.scheduleId;
      let params = {id: scheduleId};
      let url = 'schedules/findById/' + scheduleId;
      this.$axios
        .get(url, params)
        .then(res => {
          this.locationName = res.data.data['location']['name'];
          this.locationId = res.data.data['location']['id'];
          this.scheduleName = res.data.data['name'];
          this.teamName = res.data.data['team']['name'];
        });
    },
    handleReset: function () {
      this.inputForm.txt_comment = "";
      this.inputForm = Object.assign(this.inputForm, this.resetData);
    },
    handleCancel: function () {
      this.$router.push({name: 'Audit Review Index'});
    },
    handleSubmit: function () {
      this.submit('PASSBOOK_BALANCING');
    }
  }
}
