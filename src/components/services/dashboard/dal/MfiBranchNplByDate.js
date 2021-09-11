import { Chart } from 'highcharts-vue';
import { getMfiBranchNplByDate } from '@/shared/chart/dalData';
import { getHighChartAdvanceOption } from '@/shared/chart/high-charts';
import NoFoundForChart from '@/components/dashboard/NoFoundForChart';
import DatePicker from "@/containers/DatePicker";
import {formatDate } from '@/shared/utils';

export default {
    components: {
        highcharts: Chart,
        NoFoundForChart,
        DatePicker
    },
    data () {
    return {
        chartOptions: {},
        isLoad:false,
        data_info:{},
        ratingDate:formatDate('31 Mar 2019', 'DD MMM YYYY'),
        ratingDatelist:[
           // formatDate('30 sep 2018', 'DD MMM YYYY'),
            formatDate('31 Mar 2019', 'DD MMM YYYY'),
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
        params['NplDate'] = paramsDate;
        params['AreaId'] = 0;
        this.$http_dal_service.post('rating/mfibranchnplbydate', JSON.stringify(params)).then(resp => {
            if((resp && resp.status == 200) && (resp.data && resp.data.BranchNPLByDate)) {
                this.data_info = {
                    data:getMfiBranchNplByDate(resp.data.BranchNPLByDate),
                    text:this.$t('Branch Wise NPL ('+paramsDate+')'),
                    type:'column',
                    height:300,
                    y_text:this.$t('Percent'),
                    x_text:this.$t('branch'),
                    chartType: 2,
                    isNumberFormat:false
                };
                this.chartOptions = getHighChartAdvanceOption(this.data_info);
            }
            this.isLoad = false;
        })
      },
      onChangeRatingDate: function(e){
        this.$store.dispatch('auth/setLoadingShow', false);
        let val = e.target.value;
        this.ratingDate = val;
        console.log("val", val)
        this.loadData()
      },
  }
}