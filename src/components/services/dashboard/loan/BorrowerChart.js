import { Chart } from 'highcharts-vue';
import { getBorrower } from '@/shared/chart/loan_data';
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
        is_load:false,
        data_info:{},
        borrowers:[],
        isLoad:false
    }
  },
  mounted: function(){
      this.loadData();
  },
  methods:{
      loadData: function(){
        this.isLoad = true;
          this.$http_service.get('dashboard-service/loan/get_borrower_chart_info')
        .then(res => {
            this.data_info = {};
            if(res.data && Object.keys(res.data.data.borrowerChart).length > 0) {
                this.borrowers = res.data.data.borrowerChart;
                this.data_info = {
                    data:getBorrower(this.borrowers),
                    text:this.$t('borrower'),
                    type:'column',
                    height:300,
                    y_text:this.$t('value'),
                    x_text:this.$t('branch_name')
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