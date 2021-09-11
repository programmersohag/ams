import { Chart } from 'highcharts-vue';
import { getMfiWiseSector } from '@/shared/chart/dalData';
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
        ratingDate:formatDate('31 May 2019', 'DD MMM YYYY'),
        ratingDatelist:[
            formatDate('31 May 2019', 'DD MMM YYYY'),
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
        this.$http_dal_service.post('rating/mfisector', JSON.stringify(params)).then(resp => {
            if((resp && resp.status == 200) && (resp.data && resp.data.MFISector)) {
                let mfiSector = resp.data.MFISector;
                this.data_info = {
                    data:getMfiWiseSector(mfiSector),
                    text:this.$t('Purpose/Sector Rating ('+paramsDate+')'),
                    type:'spline',
                    height:300,
                    y_text:this.$t('Rating'),
                    x_text:this.$t('Product')
                };
                this.chartOptions = getHighChartAdvanceOption(this.data_info);
            }
            this.isLoad = false;
        })
      },
    getRatingDate: function(ratingDate) {
        this.ratingDate = ratingDate;
        this.loadData();
    }
  }
}