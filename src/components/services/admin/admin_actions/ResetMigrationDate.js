import API from "@/shared/common/API.js";
import router from "@/router/index.js";
import swal from "sweetalert2";
import loading from "vue-full-loading";
import DatePicker from "@/containers/DatePicker";

var adminActionAPI = new API();
adminActionAPI.createEntity({name: "admin_actions"});

export default {
    components:{
        swal,
        loading,
        DatePicker

    },
    data() {
        return {
            migration_type: '',
            curr_migration_date:'',
            branch_list: [],
            branch: '',
            prev_branch_id:'',
            prev_migration_date: '',
            loading_show:false,
            loading_label:'Processing',
            valid_star: '<span class="required">*</span>',
            is_error_msg_show:true,
            errorMessage:[],
            user:[]

        };
    },
    mounted() {
        this.user = this.$store.getters['auth/userInfo'];
        this.is_error_msg_show=true;
        this.errorMessage=[];
        this.branch_list=[];
        var params = {};
        adminActionAPI.endpoints.admin_actions.getRequest('reset_migration_date', params)
            .then(response => {
                this.branch_list=response.data.branchLists;
                this.prev_migration_date=response.data.sw_start_date;
                this.curr_migration_date=this.prev_migration_date;
            });

    },
    methods: {

        ResetMigrationDate:function () {

            this.$validator.validate().then(valid => {
                if (valid) {
                    var formData = new FormData();
                    formData.append("txt_migration_date", this.curr_migration_date);
                    formData.append("cbo_branch_id", this.branch);
                    formData.append("migrationType", this.migration_type);

                    adminActionAPI.endpoints.admin_actions.postRequest('reset_migration_date', formData)
                        .then(response => {
                            if (response.data.status == 'success') {
                                this.$toast.success({title: response.data.status, message: response.data.message});
                                this.$router.push('/admin/admin-actions/index');
                                if (this.branch == this.user['branch_id']) {
                                    this.$store.dispatch('auth/logout')
                                        .then(() => {
                                            this.$router.push('/login')
                                        })
                                } else {
                                    this.$router.push('/admin/admin-actions/index');
                                }

                            }
                            else if (response.data.status == 'failure') {
                                this.$toast.error({title: response.data.status, message: response.data.message});
                                this.errorMessage=response.data.error;
                            }
                            else if (response.data.status == 'warning') {
                                this.$toast.warn({title: response.data.status, message: response.data.message});
                            }

                        })
                }
            })
        },
        resetPage:function () {
            this.errorMessage=[];
            this.is_error_msg_show=false;
            this.migration_type='';
            this.branch='';
            this.curr_migration_date=this.prev_migration_date;
        },
        cancleModal: function () {
            this.$emit('close',0);
        },
    }

}