import { Chart } from 'highcharts-vue';
import { getMfiOverAllInvestmentStatus } from '@/shared/chart/dalData';
import { getPieAdvChartOption } from '@/shared/chart/high-charts';
import NoFoundForChart from '@/components/dashboard/NoFoundForChart';
import {formatDate } from '@/shared/utils';

export default {
    components: {
        highcharts: Chart,
        NoFoundForChart
    },
    data () {
    return {
        chartOptions: {},
        isLoad:false,
        data_info:{},
        ratingDate:formatDate('30 sep 2018', 'DD MMM YYYY'),
        ratingDatelist:[
            formatDate('30 sep 2018', 'DD MMM YYYY'),
        ],
    }
  },
  mounted: function(){
      this.loadData();
  },
  methods:{
      loadData: function() {
        this.isLoad = true;
        let user = this.$store.getters['auth/userInfo'];
        let paramsDate = formatDate(this.ratingDate, 'DD MMM YYYY');
        let params = {};
        params['MfiShortName'] = 'shiropa'; //user['mfi_name'];
        params['RatingDate'] = paramsDate;
      }
  }
}
