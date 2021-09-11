
import DragDrop from '@/components/dashboard/DragDrop';
import WidgetOne from '@/components/dashboard/widget/WidgetOne';
import TrendChart from '@/components/dashboard/branch/TrendChart';
import KpiChart from '@/components/dashboard/branch/KpiChart';
import BranchWiseSavingChart from '@/components/dashboard/branch/BranchWiseSavingChart';

import BranchValue from '@/components/dashboard/branch/BranchValue';
import BranchStatus from '@/components/dashboard/branch/BranchStatus';
import {numberFormat} from '@/shared/utils';
import WidgetFive from '@/components/dashboard/widget/WidgetFive';


export default {
  name: 'tabs',
  props:['branch_list'],
  components: {
    DragDrop,
    WidgetOne,
    TrendChart,
    KpiChart,
    BranchValue,
    BranchStatus,
    WidgetFive,
    BranchWiseSavingChart
  },
  data () {
    return {
        branch_card:[],
        total_branch: 0
    }
  },
  mounted:function() {
      this.loadData();
  },
  methods: {
    loadData:function(){
        /*this.$http_service.get('dashboard-service/branch/get_card_info')
        .then(res => {
            if(Object.keys(res.data.data.cards).length > 0 && res.data.data) {
                let data = res.data.data;
                this.total_branch = res.data.data.cards['total_branch'];
                this.branch_card.push(
                    {
                        icon:'fa-braille',
                        name:this.$t('branch'),
                        value:this.$numberConverter(numberFormat(data.cards['total_branch']))
                    },
                    {
                        icon:'fa-map-marker',
                        name:this.$t('samity'),
                        value:this.$numberConverter(numberFormat(data.cards['total_samity']))
                    },
                    {
                        icon:'fa-male',
                        name:this.$t('active_male'),
                        value:this.$numberConverter(numberFormat(data.cards['total_active_male_member']))
                    },
                    {
                        icon:'fa-female',
                        name:this.$t('active_female'),
                        value:this.$numberConverter(numberFormat(data.cards['total_active_female_member']))
                    }
                );
            }
       });*/
    },
      branchStatusAndBranchType: function () {
          this.$router.push('/mis/dashboard/branch-status-and-branch-type');
      }
  }
}
