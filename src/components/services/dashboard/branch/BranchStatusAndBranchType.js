import BranchValue from '@/components/dashboard/branch/BranchValue';
import BranchStatus from '@/components/dashboard/branch/BranchStatus';

export default {
    name: 'tabs',
    data () {
        return {
            table_list:[],
            table_lists:[],
            branch_list:[],
            isLoad:false,
            isLoadValue:false,
        }
    },

    mounted:function() {
        this.loadBranchValue();
        this.loadBranchStatus();

    },
    methods: {

        goBack: function () {
            this.$router.push('/mis/dashboard');

        },
        loadBranchStatus:function(){
            this.isLoad = true;
            this.$http_service.get('dashboard-service/branch/get_table_info')
                .then(res => {
                    if(res.data && Object.keys(res.data.data.branch_status).length > 0) {
                        this.table_list = res.data.data.branch_status;
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
        },
        loadBranchValue:function(){
            this.isLoadValue = true;
            this.$http_service.get('dashboard-service/branch/get_table_info')
                .then(res => {
                    if(res.data && Object.keys(res.data.data.branch_status).length > 0) {
                        this.table_lists = res.data.data.branch_status;
                    }
                    this.isLoadValue = false;
                });
        }
    }
}