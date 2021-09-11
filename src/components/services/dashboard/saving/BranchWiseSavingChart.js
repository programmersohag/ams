import { Chart } from 'highcharts-vue';
import { getBranchWiseSaving } from '@/shared/chart/saving_data';
import { getHighChartOption } from '@/shared/chart/high-charts';
import NoFoundForChart from '@/components/dashboard/NoFoundForChart';

export default {
    components: {
        highcharts: Chart,
        NoFoundForChart
    },
    props:['filter_props'],
    data () {
    return {
        chartOptions: {},
        data_info:{},
        isLoad:false
    }
  },
  mounted: function(){
      this.loadData();
  },
  methods:{
      loadData: function(){
        this.isLoad = true;
        this.$http_service.get('dashboard-service/saving/get_saving_chart_info')
        .then(res => {
            this.data_info = {};
            if(res.data && Object.keys(res.data.data.savingChart).length > 0) {
                this.data_info = {
                    data:getBranchWiseSaving(res.data.data.savingChart),
                    text:this.$t('branch_wise_savings'),
                    type:'spline',
                    height:300,
                    y_text:this.$t('value'),
                    x_text:this.$t('branch_name')
                };
                this.chartOptions = getHighChartOption(this.data_info);
            }
            this.isLoad = false;
        });
      }
  }
}