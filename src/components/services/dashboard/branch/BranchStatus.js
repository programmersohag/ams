import {numberFormat} from '@/shared/utils';

export default {
    name: 'branchStatus',
    data () {
      return {
          table_list:[],
          branch_list:[],
          isLoad:false
      }
    },
    mounted:function() {
        this.loadData();
    },
    methods: {
      loadData:function(){
          this.isLoad = true;
          this.$http_service.get('dashboard-service/branch/get_table_info')
          .then(res => {
              if(res.data && Object.keys(res.data.data.branch_status).length > 0) {
                let _data = res.data.data.branch_status;
                for(let key in res.data.data.branch_status) {
                  if(key < 25) {
                    
                    this.table_list[key] = _data[key];
                  }
                }
              }
              if(res.data && Object.keys(res.data.data.branches).length > 0) {
                let branch_combo = [];
                for(let key in res.data.data.branches) {
                    branch_combo[res.data.data.branches[key]['id']] = res.data.data.branches[key]['softwareDtart'];
                }
                this.branch_list = branch_combo;
            }
            this.isLoad = false;
          });
      }
    }
  }