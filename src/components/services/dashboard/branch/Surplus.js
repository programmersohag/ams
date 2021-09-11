import { Chart } from 'highcharts-vue';
import { getKpiWiseSurpluses } from '@/shared/chart/branch_data';
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
        input:{
            kpi:1
        },
        branch_list:[],
        surpluses:[],
        isLoad:false
    }
  },
  mounted: function(){
      this.loadData();
  },
  methods:{
      loadData: function(){
        this.isLoad = true;
        this.surpluses = [];
        this.setBranchList();
          let kpi = this.input.kpi;
          let kpi_name = this.$t('income');
          if(kpi == 2){
              kpi_name = this.$t('expense');
          }
        let params = {
        branch_list: this.branch_list.join(),
        period: this.filter_props['period'],
        };
          this.$http_service.get('dashboard-service/branch/get_surplus_info',{params})
        .then(res => {
            this.data_info = {};
            if(res.data && Object.keys(res.data.data.surpluses).length > 0) {
                this.data_info = {
                    data:getKpiWiseSurpluses(res.data.data.surpluses, this.branch_list, kpi, this.filter_props.branch_name),
                    text:kpi_name,
                    type:'column',
                    height:300,
                    y_text:this.$t("value"),
                    x_text:this.$t("month")
                };
                this.chartOptions = getHighChartOption(this.data_info);
            }
            this.isLoad = false;
        });
      },
      setBranchList: function(){
        let branch_combo = [];
          if(Object.keys(this.filter_props.branch).length > 0) {
              for(let key in this.filter_props.branch) {
                branch_combo[key] = this.filter_props.branch[key]['value']
              }
          }
          if(branch_combo.length > 0) {
              this.branch_list = [];
              this.branch_list = branch_combo;
          } else {
            this.branch_list = [1];
          }
      },
      kpiChange(val) {
        this.input.kpi = val;
        this.loadData();
      }
  }
}