import CustomModal from '@/containers/Modal';
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
//import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import API from "@/shared/common/API.js"
var updateLoanAPI =new API()
updateLoanAPI.createEntity({name: "admin_actions"});
var restAPI=updateLoanAPI.endpoints.admin_actions;
import Loading from 'vue-full-loading'

export default {
    name: "Index",
    components: { Loading },
    data() {
        return {
            title: '',
            authInfo: this.$store.getters['auth/userInfo'],
            mfi_lists: {},
            mfi_count: 0,
            search_form_data: {
                txt_notification_message: ''
            },
            txt_form_mfi_list: {},
            chk_form_mfi_list: {},
            mfi_list_show: false,
            mfi_list_show_txt: {},
            click_on_yes: '',
            users: [],
            formData: {},
            loading_label: 'Processsing...',
            loading_show: false
        }
    },
    mounted() {
        this.search_form_data.branch_id=this.authInfo.branch_id;
        this.loadData();
    },
    methods: {
        loadData: function (is_post_request=0) {
            if(is_post_request==1){
                //this.loading_show=true;
                var params = new FormData();
                params.append("txt_notification_message", this.search_form_data.txt_notification_message);
                if(this.click_on_yes == true){
                    params.append("yes", 'yes');
                }
                for (let  key in this.mfi_lists) {
                    if(this.txt_form_mfi_list[key]){
                        params.append(this.mfi_lists[key], this.txt_form_mfi_list[key]);
                    }else{
                        params.append(this.mfi_lists[key], '');
                    }

                }
                var $i = 0;
                for (let  key in this.chk_form_mfi_list) {
                    console.log(this.mfi_lists[key])
                    params.append('mfi_name['+ $i +']', this.mfi_lists[key]);
                    $i++;
                }
                restAPI.postRequest("update_notification_message",params)
                    .then(response => {
                        this.loading_show=false;
                        this.flashMessage(response.data.status,response.data.message);

                    }).catch((error) => {
                    //console.log(error)
                    this.loading_show = false;
                });
            }else{
                restAPI.getRequest("update_notification_message",{})
                    .then(response => {
                        this.loading_show = false;
                        this.mfi_lists = response.data.mfi_list;
                        for (let  key in this.mfi_lists) {
                            this.mfi_list_show_txt[key] = false;
                            if(response.data.massages[this.mfi_lists[key]]){
                                this.mfi_list_show = true;
                                this.mfi_list_show_txt[key] = true;
                                this.txt_form_mfi_list[key] = response.data.massages[this.mfi_lists[key]];
                                this.chk_form_mfi_list[key] = true;
                                this.click_on_yes = true;
                            }
                        }
                        this.mfi_count = response.data.mfi_count;
                        if(response.data.massages.global){
                            this.search_form_data.txt_notification_message = response.data.massages.global;
                        }

                    }).catch((error) => {
                    //console.log(error)
                    this.loading_show = false;
                });
            }
        },
        handleReset: function() {
            this.search_form_data = {};
            this.loadData(this.offset);
        },
        on_action_click_on_yes_checkbox:function () {
            if(this.click_on_yes == true){
                this.mfi_list_show = true;
            }else{
                this.mfi_list_show = false;
            }
        },
        onCheckShowTxt:function (index) {
            if(this.chk_form_mfi_list[index] == true){
                this.mfi_list_show_txt[index] = true;
            }else{
                this.mfi_list_show_txt[index] = false;
            }

        }
    },
    computed: {
        isSearch: function() {
            //return true;
        }
    }
}
