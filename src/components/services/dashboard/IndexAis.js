import Vue from 'vue';
import DragDrop from '@/components/dashboard/DragDrop';
import Financial from '@/components/dashboard/financial/Index';
import HighchartsVue from 'highcharts-vue';
Vue.use(HighchartsVue);

export default {
  name: 'tabs',
  components: {
    DragDrop,
    Financial
  },
  data () {
    return {
      tabIndex: [0],
      tabs: [
        'Financial Position',
      ],
      isFinancial:true,
    }
  },
  mounted:function() {
  },
  methods:{
    loadChildComponent: function(index){
      if(index == 0) {
        this.isFinancial = true;
      }
    }
  }
}