import { Chart } from 'highcharts-vue';
import { getDueClassification } from '@/shared/chart/loan_data';
import { getPieHighChartOption } from '@/shared/chart/high-charts';
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
        this.$http_service.get('dashboard-service/loan/get_due_classification_chart_info')
        .then(res => {
            this.data_info = {};
            if(res.data && Object.keys(res.data.data).length > 0) {
                this.data_info = {
                    data:getDueClassification(res.data.data),
                    text:this.$t('due_classification'),
                    height:300,
                };
                this.chartOptions = getPieHighChartOption(this.data_info);
            }
            this.isLoad = false;
        });
      },
  }
}