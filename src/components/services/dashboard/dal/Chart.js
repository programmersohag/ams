import MfiBranch from '@/components/dashboard/dal/MfiBranch';
import MfiSector from '@/components/dashboard/dal/MfiSector';
import MfiGeo from '@/components/dashboard/dal/MfiGeo';
import MfiOverallInvestmentStatus from '@/components/dashboard/dal/MfiOverallInvestmentStatus';
import MfiNpl from '@/components/dashboard/dal/MfiNpl';
import MfiBranchNplByDate from '@/components/dashboard/dal/MfiBranchNplByDate';
import MfiBranchNpl from '@/components/dashboard/dal/MfiBranchNpl';
import MfiBranchLinvestMentStatus from '@/components/dashboard/dal/MfiBranchLinvestMentStatus';
import Drilldown from '@/components/dashboard/dal/Drilldown';

export default {
    components: {
      MfiBranch,
      MfiSector,
      MfiGeo,
      MfiOverallInvestmentStatus,
      MfiNpl,
      MfiBranchNplByDate,
      MfiBranchNpl,
      MfiBranchLinvestMentStatus,
      Drilldown
    },
    data () {
    return {
      isLoad: false,
      isHeadOffice:true,
      isBranch:false,
      user:this.$store.getters['auth/userInfo']
    }
  },
  mounted:function() {
    let user = this.$store.getters['auth/userInfo'];
    if(!user['is_head_office']) {
      this.isHeadOffice = false;
    }
    if(user['branch_type'] == 'B') {
      this.isBranch = true;
    }
    this.isLoad = true;
  }
}