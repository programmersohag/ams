import { Chart } from 'highcharts-vue';
import { getSavingProductWiseSaving } from '@/shared/chart/saving_data';
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
        this.$http_service.get('dashboard-service/saving/get_saving_product_chart_info')
        .then(res => {
            this.data_info = {};
            if(res.data && Object.keys(res.data.data.savingProductChart).length > 0) {
                this.savingProduct = res.data.data.savingProductChart;
                this.data_info = {
                    data:getSavingProductWiseSaving(this.savingProduct),
                    text:this.$t('saving_product_wise_savings'),
                    type:'column',
                    height:300,
                    y_text:this.$t('value'),
                    x_text:this.$t('saving_products')
                };
                this.chartOptions = getHighChartOption(this.data_info);
            }
            this.isLoad = false;
        });
      }
  }
}