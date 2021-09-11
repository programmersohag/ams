import Vue from 'vue';
import DragDrop from '@/components/dashboard/DragDrop';
import Branch from '@/components/dashboard/branch/Index';
import Loan from '@/components/dashboard/loan/Index';
import Saving from '@/components/dashboard/saving/Index';
import Financial from '@/components/dashboard/financial/Index';
import Dal from '@/components/dashboard/dal/Index';
import Dal2 from '@/components/dashboard/dal2/Index';
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import drilldown from "highcharts/modules/drilldown";
import StorageService from "@/shared/common/storage.service";

drilldown(Highcharts);
exportingInit(Highcharts);

Vue.use(HighchartsVue);

export default {
  name: 'tabs',
  components: {
    DragDrop,
    Branch,
    //Loan,
    //Saving,
    //Financial,
    //Dal,
    //Dal2
  },
  data () {
    return {
      tabIndex: [0, 1, 2, 3, 4, 5, 6],
      tabs: [],
      isLoan:false,
      isSaving:false,
      isFinancial:false,
      isDal:false,
      isDal2:false,
      user:this.$store.getters['auth/userInfo'],
     // config:this.$store.getters['config/generalConfigInfo']
      config:StorageService.getGeneralConfig(),
    }
  },
  mounted:function() {
      if( this.user.default_language=='english') {
          this.tabs = [
              'Audit Plan Update',
              'loan performance',
              'saving performance'
          ];
          // if(this.config['show_advanced_analytics'] == "1") {
          //   this.tabs.push(
          //     'Analytics',
          //     'Analytics2'
          //   )
          // }
          this.tabs.push(
            'geo_performance',
            'employee_performance',
            'user_activities'
          )
      }else{
          this.tabs = [
            'শাখা কর্মক্ষমতা',
            'ঋণ পারফরম্যান্স',
            'সঞ্চয়ের কর্মক্ষমতা'
          ];
          
          // if(this.config['show_advanced_analytics']) {
          //   this.tabs.push(
          //     'Analytics',
          //     'Analytics2'
          //   )
          // }
          this.tabs.push(
            'geo_performance',
            'employee_performance',
            'user_activities'
          )
      }
  },
  methods:{
    loadChildComponent: function(index){
      if(index == 1) {
        this.isLoan = true;
      }
      if(index == 2) {
        this.isSaving = true;
      }
      if(index == 3) {
        this.isDal = true;
      }
      if(index == 4) {
        this.isDal2 = true;
      }
    }
  }
}
