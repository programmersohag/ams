import { Chart } from 'highcharts-vue';
import { getMfiBranchNpl } from '@/shared/chart/dalData';
import { getHighChartAdvanceOption } from '@/shared/chart/high-charts';
import NoFoundForChart from '@/components/dashboard/NoFoundForChart';

export default {
    components: {
        highcharts: Chart,
        NoFoundForChart
    },
    data () {
    return {
        chartOptions: {},
        isLoad:false,
        data_info:{}
    }
  },
  mounted: function(){
      this.loadData();
  },
  methods:{
      loadData: function() {
        this.isLoad = true;
        let user = this.$store.getters['auth/userInfo'];
        let params = {};
        params['MfiShortName'] = 'shiropa'; //user['mfi_name'];
        params['BranchKey'] = user['mfi_name']+"-"+user['branch_id'];
        this.$http_dal_service.post('rating/mfibranchnpl', JSON.stringify(params)).then(resp => {
            if((resp && resp.status == 200) && (resp.data && resp.data.BranchNPL)) {
                this.data_info = {
                    data:getMfiBranchNpl(resp.data.BranchNPL),
                    text:this.$t('Quarterly Wise NPL'),
                    type:'spline',
                    height:300,
                    y_text:this.$t('Percent'),
                    x_text:this.$t('Quarterly'),
                    chartType: 2,
                    isNumberFormat:false
                };
                this.chartOptions = getHighChartAdvanceOption(this.data_info);
            }
            this.isLoad = false;
        })
      }
  }
}