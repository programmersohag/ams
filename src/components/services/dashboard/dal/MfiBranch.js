import { Chart } from 'highcharts-vue';
import { getMfiWiseBranch } from '@/shared/chart/dalData';
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
    props:['layer, poData'],
    data () {
    return {
        chartOptions: {},
        isLoad:false,
        data_info:{},
        ratingDate:formatDate('31 May 2019', 'DD MMM YYYY'),
        ratingDatelist:[
            formatDate('31 May 2019', 'DD MMM YYYY'),
        ],
        poData:[],
        zoneList:[],
        areaList:[],
        layer:4,
        ids:{
            poId:"",
            zoneId:"",
            areaId:"",
        },
        textName:{
            region:"------Region------",
            zone:"------Zone------",
            area:"------Area------"
        }
    }
  },
  mounted: function(){
      this.loadData();
  },
  methods:{
      loadData: function(areaId = 0) {
        this.isLoad = true;
        this.data_info = {};
        let user = this.$store.getters['auth/userInfo'];
        let paramsDate = formatDate(this.ratingDate, 'DD MMM YYYY');
        let params = {};
        params['MfiShortName'] = 'shiropa'; //user['mfi_name'];
        params['RatingDate'] = paramsDate;
        params['AreaId'] = 0;
        // .then(res => {
        //     this.$axios.get("/pages/getPoLayerCheck").then(resp => {
        //         if(resp) {
        //             this.getPoInfo(resp.data);
        //             this.getChartInfo(res, paramsDate);
        //         }
        //         this.isLoad = false;
        //     })
        // })
      },
      getPoInfo: function(resp) {
        let tempData = [];
        if(resp['layer'] == 1){
            this.layer = 1;
            tempData.push({
                text:this.textName['region'],
                value:""
            })
            this.setZone();
            this.setArea();
        } else if(resp['layer'] == 2){
            this.layer = 2;
            tempData.push({
                text:this.textName['zone'],
                value:""
            })
            this.setArea();
        } else if(resp['layer'] == 3){
            tempData.push({
                text:this.textName['area'],
                value:""
            })
            this.layer = 3;
        }
        if(resp['records'].length > 0) {
            for(let key in resp['records']){
                let _list ="";
                if(this.layer == 1) {
                    _list = resp['records'][key]['zone_list'];
                } else if(this.layer == 2){
                    _list = resp['records'][key]['area_list'];
                } else if(this.layer == 3) {
                    _list = resp['records'][key]['id'];
                }
                tempData.push({
                    text:resp['records'][key]['name'],
                    value:_list
                })
            }
        }
        this.poData = tempData;
      },
      getChartInfo: function(res, paramsDate) {
        let mfiBranch = res.data.MFIBranch;
        this.data_info = {
            data:getMfiWiseBranch(mfiBranch),
            text:this.$t('Branch Rating ('+paramsDate+')'),
            type:'column',
            height:300,
            y_text:this.$t('Rating'),
            x_text:this.$t('Branch')
        };
        this.chartOptions = getHighChartAdvanceOption(this.data_info);
      },
      poChange: function(e){
        this.$store.dispatch('auth/setLoadingShow', false);
        let val = e.target.value;
        if(this.layer == 1){
        this.getZoneList(val);
        } else if(this.layer == 2) {
        this.getAreaList(val);
        } else if(this.layer == 3) {
           // this.loadData(val);
        }
      },
      zoneChange: function(e) {
        this.$store.dispatch('auth/setLoadingShow', false);
        let val = e.target.value;
        this.getAreaList(val);
      },
      areaChange: function(e){
        this.$store.dispatch('auth/setLoadingShow', false);
        let val = e.target.value;
       // this.loadData(val)
      },
      getZoneList: function(ids){
        let params = {};
        params['zone_list'] = ids;
        this.$axios.get("/pages/get_zone_list", {params:params}).then(resp => {
            if((resp && resp.status == 200) && (resp.data && resp.data['records'].length > 0)){
                let records = resp.data['records'];
                this.setZone();
                this.setArea();
                for(let key in records){
                    this.zoneList.push({
                        text:records[key]['name'],
                        value:records[key]['area_list']
                    })
                }
            }
        })
      },
      getAreaList: function(ids) {
        let params = {};
        params['area_list'] = ids;
        this.$axios.get("/pages/get_area_list", {params:params}).then(resp => {
            if((resp && resp.status == 200) && (resp.data && resp.data['records'].length > 0)){
                this.setArea();
                let records = resp.data['records'];
                for(let key in records){
                    this.areaList.push({
                        text:records[key]['name'],
                        value:records[key]['id']
                    })
                }
            }
        })
      },
      setZone: function(){
          this.zoneList = [];
          this.zoneList.push({
            text:this.textName['zone'],
            value:""
        })
      },
      setArea: function(){
          this.areaList = [];
          this.areaList.push({
            text:this.textName['area'],
            value:""
        })
      },
      getRatingDate: function(ratingDate) {
          this.ratingDate = ratingDate;
          this.loadData();
      }
  }
}
