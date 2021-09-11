import API from "@/shared/common/API.js";
import CustomModal from '@/containers/Modal';
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import loading from 'vue-full-loading';
import router from "@/router/index.js";
import {getBranchOptions,getDesignationOptions,getCommonOptions} from '@/shared/options/generate.js';

var employeeAPI = new API();
employeeAPI.createEntity({name: "employees"});
let apiEndPoint = employeeAPI.endpoints.employees;

export default {
    name: "Index",
    components: {
        CustomModal, CommonIndex, Pagination, SearchFormGenerator, loading
    },
    data() {
        return {
            isMounted: false,  
            result:[],        
            //pagination
            pagination: {
                offset: 0,
                total_page: 1,
                total_rows: 0,
                row_per_page: 20,
                current_page: 1,
                active_class: false
            },
            offset: 0,
            //common index
            head_information: [
                {key: "index", label: '#',sortable: false, tdClass:"text-center"},

                {key: "name", label: this.$t('emp_name'),sortable: true},

                {key: "code", label: this.$t('emp_code'),sortable: true, tdClass:"text-center"},

            ],
            delete_info:[{
                url:'/employees/delete',
                field_id:'employee_id',
                html:''
            }],
            is_branch_option_enable: false,
            employees: [],
            branch_infos:[],
            designation_infos:[],
            status_info:[],
            loading_show: false,
            is_employee_information_synch: 0,
            load:false,
            user: this.$store.getters['auth/userInfo']
        }
    },
    mounted() {
        this.isMounted = true
        this.logoIndex();
    },
    methods: {

        logoIndex: function(){
            this.$axios
            .get("/employees/logoIndex")
            .then(res => {  
                this.result = res.data.row;  
                console.log("Logo---------",this.result);     
            });
        },
    
        employeeCreate: function() {
            this.$router.push('/admin/logo/save');
        },
        // employeeView: function(itemdata) {
        //     this.$router.push('/employees/employees/view/'+itemdata.id);
        // },
        // employeeUpdate: function(itemdata) {
        //     this.$router.push('/employees/employees/save/'+itemdata.id);
        // },
      
        clear: function() {
            this.edit_id = '';
            this.search_form_data.txt_name = '';
            this.search_form_data.cbo_branch = '-1';
            this.search_form_data.cbo_status = '1';
            this.search_form_data.cbo_employee_designation = '-1';
            this.isMounted = true
            this.loadData(0);
        }
    },
    computed: {
        isSearch: function() {
            return false
        }
    },

}

