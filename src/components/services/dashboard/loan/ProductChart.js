import { Chart } from 'highcharts-vue';
import { getProductLoan } from '@/shared/chart/loan_data';
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
        this.$http_service.get('dashboard-service/loan/get_product_wise_loan_chart_info')
        .then(res => {
            this.data_info = {};
            if(res.data && Object.keys(res.data.data.productLoanChart).length > 0) {
                this.data_info = {
                    data:getProductLoan(res.data.data.productLoanChart),
                    text:this.$t('product_wise_loan'),
                    type:'spline',
                    height:300,
                    y_text:this.$t('value'),
                    x_text:this.$t('products')
                };
                this.chartOptions = getHighChartOption(this.data_info);
            }
            this.isLoad = false;
        });
          
      },
      kpiChange($event){
          this.input.kpi = $event.target.value;
          this.loadData();
      }
  }
}