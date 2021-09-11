import { Chart } from 'highcharts-vue';
import { getBranchWiseLoan } from '@/shared/chart/loan_data';
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
        data_info:{},
    }
  },
  mounted: function(){
      this.loadData();
  },
  methods:{
      loadData: function(){
        this.isLoad = true;
          this.$http_service.get('dashboard-service/loan/get_loan_status_chart_info')
        .then(res => {
            this.data_info = {};
            if(Object.keys(res.data && res.data.data.loanStatusChart).length > 0) {
                this.loanStatus = res.data.data.loanStatusChart;
                this.data_info = {
                    data:getBranchWiseLoan(this.loanStatus),
                    text:this.$t('loan_status'),
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