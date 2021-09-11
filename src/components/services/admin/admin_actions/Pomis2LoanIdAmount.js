import '@/shared/common/confirm-message.js';
import API from "@/shared/common/API.js";
import CommonIndex from '@/containers/CommonIndex';
import Loading from 'vue-full-loading';
import FormError from "@/containers/FormError";
import router from "@/router/index.js";
var pomis2dueLoanAPI = new API();
pomis2dueLoanAPI.createEntity({ name: "admin_actions" });
var restAPI = pomis2dueLoanAPI.endpoints.admin_actions;

export default {
    name: "pomis2dueLoanAmount",
    components: { CommonIndex, Loading, FormError },
    data() {
        return {
            //seraching field
            cbo_branch: '',
            cbo_month: '',
            cbo_year: '',
            cbo_service_charge: '',
            branch_options: [],
            months: [],
            year: [],
            service_charge: [],
            pomis_2_due_loan: [],
            loan_code: [],
            loading_show: false,
            errorMessage: []

        };
    },
    mounted() {
        restAPI.getRequest('pomis_2_new_due_list').then(
            response =>{
                this.branch_options = response.data.branch_options;
                    this.months =response.data.months;
                    this.year =response.data.year;
                    this.service_charge = response.data.service_charge;
            }
        )
    },

    methods: {
        loanView: function(loan_id){
            router.push({
                name: "LoansView",
                params: {
                    id: loan_id
                }
            });
        },

        loadData: function (offset=0) {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading_show = true;

                    var params = new FormData();

                    params.append('cbo_branch',this.cbo_branch);
                    params.append('cbo_month',this.cbo_month);
                    params.append('cbo_year',this.cbo_year);
                    params.append('cbo_service_charge',this.cbo_service_charge);


                    restAPI.postRequest("pomis_2_new_due_list", params)
                        .then(response => {
                            this.loading_show = false;

                            if(response.data.status=='success'){
                                if(response.data.loan_amount){
                                    this.pomis_2_due_loan = response.data.loan_amount;
                                    this.loan_code = response.data.loan_code;
                                }
                            }else{
                                this.flashMessage(response.data.status,response.data.message);
                            }



                        });

                }
            })
        }
    }
}