import { Chart } from 'highcharts-vue';
import { getBranchWiseCurrentYearSurplus } from '@/shared/chart/financial_data';
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
        isLoad:false,
        data_info:{}
    }
  },
  mounted: function(){
      this.loadData();
  },
  methods:{
      loadData: function(){
        this.isLoad = true;
        this.$http_service.get('dashboard-service/financial/get_current_year_surplus_chart_info')
        .then(res => {
            this.data_info = {};
            if(res.data && Object.keys(res.data.data.surplusChart).length > 0) {
                this.data_info = {
                    data:getBranchWiseCurrentYearSurplus(res.data.data.surplusChart),
                    text:this.$t('branch_wise_surplus')+" ("+this.$t('current_year')+")",
                    type:'column',
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