import { Chart } from 'highcharts-vue';
import { getFundingOrganizationLoan } from '@/shared/chart/loan_data';
import { getHighChartOption } from '@/shared/chart/high-charts';
export default {
    components: {
        highcharts: Chart
    },
    props:['filter_props'],
    data () {
    return {
        chartOptions: {},
        is_load:false,
        data_info:{}
    }
  },
  mounted: function(){
      this.loadData();
  },
  methods:{
      loadData: function(){
          this.data_info = {
            data:getFundingOrganizationLoan(),
            text:'Funding Organization',
            type:'column',
            height:300,
            y_text:'Value',
            x_text:'Funding Org.'
        };
        this.chartOptions = getHighChartOption(this.data_info);
        console.log('founding', this);
      },
      kpiChange($event){
          this.input.kpi = $event.target.value;
          this.loadData();
      }
  }
}