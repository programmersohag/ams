import API from "@/shared/common/API.js"
import StorageService from "@/shared/common/storage.service";
var updateLoanAPI =new API()
updateLoanAPI.createEntity({name:"admin_actions"});
var restAPI=updateLoanAPI.endpoints.admin_actions;

export default {
    name: "Index",
    components: {  },
    data() {
        return {
            title: '',
            authInfo: this.$store.getters['auth/userInfo'],
            // modal
            branches:{},
            samities:{},
            product_options:{},
            consider:{},
             url:'',
            //common index

            search_form_data: {
                name: "",
                branch_id: '',
                samity_id: 0,
                product_id: -1,
                chk_update_transactions:false,
                cbo_consider:"OO"
            },
            users: [],
            formData: {},
           // config : this.$store.getters['config/generalConfigInfo'],
            config:StorageService.getGeneralConfig(),
        }
    },
    mounted() {
        this.search_form_data.branch_id=this.authInfo.branch_id;
        this.loadData();
    },
    methods: {
        loadData: function (is_post_request=0) {
          if(is_post_request==1){

                var params = new FormData();
                params.append("cbo_branch", this.search_form_data.branch_id);
                params.append("cbo_samity", this.search_form_data.samity_id);
                params.append("cbo_product", this.search_form_data.product_id);
                params.append("txt_name",this.search_form_data.name);
                if(this.search_form_data.chk_update_transactions){
                    params.append("chk_update_transactions", true);
                }
                params.append("cbo_consider", this.search_form_data.cbo_consider);
              this.$axios.post(this.url, params)
                    .then(response => {
                      if(response.data.validation_error) {
                        this.error_message = response.data.validation_error;
                      }
                      else {
                        this.flashMessage(response.data.status,response.data.message);
                      }
                    }).catch((error) => {
                    //console.log(error)


                });
            }else{
                restAPI.getRequest("update_loans",{})
                    .then(response => {
                        this.product_options = response.data.products;
                        this.branches = response.data.branches;
                        this.samities = response.data.samities;
                        this.consider=response.data.consider;
                      if(response.data.is_actual_daily_basis_loan_allowed==1) {
                          this.url="/daily_basis_admin_actions/update_loans";
                        }
                        else{
                        this.url ="/admin_actions/update_loans"
                       }



                    }).catch((error) => {
                    //console.log(error)

                });
            }
        },
        handleReset: function() {
            this.search_form_data = {};
            this.loadData(this.offset);
        },
        getSamityList: function (event) {
            let uri = "/samities/ajax_for_get_samity_list_by_branch"
            let formData = new FormData();
            formData.append('branch_id', event.target.value);
            formData.append('current_date', this.authInfo.current_date);
            this.$axios.post(uri, formData)
                .then(response => {
                    this.samities = {};
                    if (response.data.status === 'success') {
                        for (let key in response.data.samity_id) {
                            this.samities[key] ={};
                                this.samities[key].id=response.data.samity_id[key]
                                this.samities[key].name=response.data.samity_name[key]
                                this.samities[key].code=''
                        }
                    } else {
                        this.validation_error_msg = response.data.validation_error_msg
                    }
                })
                .catch(e => {
                    //console.log(e)
                });
        }
    },
    computed: {
        isSearch: function() {
            //return true;
        }
    }
}
