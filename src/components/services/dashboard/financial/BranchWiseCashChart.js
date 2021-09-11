import { Chart } from 'highcharts-vue';
import { getBranchWiseCash } from '@/shared/chart/financial_data';
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
        this.$http_service.get('dashboard-service/financial/get_cash_chart_info')
        .then(res => {
            this.data_info = {};
            if(res.data && Object.keys(res.data.data.cashChart).length > 0) {
                this.data_info = {
                    data:getBranchWiseCash(res.data.data.cashChart),
                    text:this.$t('branch_wise_cash_and_bank_balance'),
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