import { Chart } from 'highcharts-vue';
import { getMfiBranchLinvestMentStatus } from '@/shared/chart/dalData';
import { getPieAdvChartOption } from '@/shared/chart/high-charts';
import NoFoundForChart from '@/components/dashboard/NoFoundForChart';
import {formatDate } from '@/shared/utils';
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
        ratingDate:formatDate('30 sep 2018', 'DD MMM YYYY'),
        ratingDatelist:[
            formatDate('30 sep 2018', 'DD MMM YYYY'),
        ],
        isLoad:false
    }
  },
  mounted: function(){
      this.loadData();
  },
  methods:{
      loadData: function(){
        this.isLoad = true;
        let user = this.$store.getters['auth/userInfo'];
        let paramsDate = formatDate(this.ratingDate, 'DD MMM YYYY');
        let params = {};
        params['MfiShortName'] = 'shiropa'; //user['mfi_name'];
        params['RatingDate'] = paramsDate;
        params['BranchKey'] = user['mfi_name']+"-"+user['branch_id'];
        this.$http_dal_service.post('rating/mfibranchInvestmentstatus', JSON.stringify(params))
        .then(resp => {
            if((resp && resp.status == 200) && (resp.data && resp.data.BranchInvestmentstatus)) {
                this.data_info = {
                    data:getMfiBranchLinvestMentStatus(resp.data.BranchInvestmentstatus),
                    text:this.$t('Due Classification ('+paramsDate+')'),
                    type:'spline',
                    height:300,
                    isPercent:true
                };
                this.chartOptions = getPieAdvChartOption(this.data_info);
            }
            this.isLoad = false;
        });
      },
  }
}