import Vue from 'vue';
import DragDrop from '@/components/dashboard/DragDrop';
import Branch from '@/components/dashboard/branch/IndexBijoy';
import Loan from '@/components/dashboard/loan/IndexBijoy';
import Saving from '@/components/dashboard/saving/IndexBijoy';
import Financial from '@/components/dashboard/financial/Index';
import HighchartsVue from 'highcharts-vue';
Vue.use(HighchartsVue);

export default {
  name: 'tabs',
  components: {
    DragDrop,
    Branch,
    Loan,
    Saving,
    Financial
  },
  data () {
    return {
      tabIndex: [0, 1, 2, 3, 4, 5],
      tabs: [
        'Branch Performance',
        'Loan Performance',
        'Saving Performance',
        'Geo Performance',
        'Employee Performance',
        'User Activities'
      ],
      isLoan:false,
      isSaving:false,
      isFinancial:false
    }
  },
  mounted:function() {
  },
  methods:{
    loadChildComponent: function(index){
      if(index == 1) {
        this.isLoan = true;
      }
      if(index == 2) {
        this.isSaving = true;
      }
      if(index == 5) {
        this.isFinancial = true;
      }
    }
  }
}