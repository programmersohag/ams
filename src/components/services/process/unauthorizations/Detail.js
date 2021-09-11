import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import Loading from 'vue-full-loading';
import {swalConfirm, swalAlert} from "@/shared/common/sweet-alert";

export default {
    name: "Index",
    components: {
        SearchFormGenerator,
        Loading
      },
    data() {
      return {
          search_schema:{
            txt_name:{
                fieldType: "TextInput",
                fieldName: "txt_name",
                placeholder: 'By Name/Code'
            }
        },
          search_form_data:{},
          current_date:'',
          transaction_authorization_not_req_detail:[],
          transaction_authorizations_detail:[],
          is_SKT_required:0,
          loading_show: false,
          id:0,
          is_authorization:false
      }
    },
    mounted() {
        this.id = this.$route.params.id;
        this.loadData();
    },
    methods: {
        loadData: function() {
            this.loading_show = true;
            this.$axios.get("/transaction_unauthorizations/unauthorization_detail/"+this.id)
            .then(res => {
                if(Object.keys(res.data.transaction_authorizations_detail).length > 0) {
                    this.is_authorization = true;
                    if(res.data.status == 'warning') {
                        this.flashMessage(res.data.status,res.data.message);
                        this.$router.push('/process/transaction-unauthorizations/unauthorization-index');
                    }
                    this.current_date = res.data.current_date;
                    this.transaction_authorizations_detail = res.data.transaction_authorizations_detail;
                    this.transaction_authorization_not_req_detail = res.data.transaction_authorization_not_req_detail;
                    this.is_SKT_required = res.data.is_SKT_required;
                }
                this.loading_show = false;
            });
        },
        searchData:function(){
            let txt_name = (this.search_form_data.txt_name).trim();
            let resetArr = {};
            for(let key in this.transaction_authorizations_detail) {
                let code = this.transaction_authorizations_detail[key].code;
                let name = this.transaction_authorizations_detail[key].name;
                if((code == txt_name) || (name == txt_name)) {
                    resetArr = {
                        [key]:this.transaction_authorizations_detail[key]
                    }
                }
            }
            let len = Object.keys(resetArr).length;
            if(len > 0) {
                this.transaction_authorizations_detail = resetArr;
            }
        },
        authorize: function() {
            let title = 'Are you sure you want to unauthorize these data?';
            swalConfirm(title).then((result) => {
                if (result.value) {
                    this.loading_show = true;
                    let params = new FormData();
                    let i =1;
                    for(let key in this.transaction_authorizations_detail){
                        params.append("transactiondata["+i+"][samity_id]", this.transaction_authorizations_detail[key].samity_id);
                        i++;
                    }
                    this.$axios
                        .post("/transaction_unauthorizations/ajax_unauthorization_index", params)
                        .then(res => {
                            if(res.data) {
                                this.flashMessage(res.data.status,res.data.message);
                                if(res.data.status == 'success') {
                                    this.$router.push('/process/transaction-unauthorizations/unauthorization-index');
                                }
                            }
                        this.loading_show = true;
                    });
                }
            });
        },
        handleView:function(member_id = 0) {
            this.$router.push('/process/transaction-unauthorizations/unauthorization-detail-member-wise/'+member_id);
        },
        handleReset: function() {
            this.search_form_data={};
            this.loadData();
        }
    },
    computed: {
        totalVal:function() {
            let arr = [];
            let total_loan_amount = 0;
            let total = 0;
            let total_deposit_amount = 0;
            let total_skt_collection_amount = 0;
            let total_skt_withdraw_amount = 0;
            let total_withdraw_amount = 0;
            let total_loan_transaction_amount = 0;
            if(this.transaction_authorizations_detail) {
                for(let key in this.transaction_authorizations_detail){
                    total++;
                    total_loan_amount += parseFloat(this.transaction_authorizations_detail[key].loan_amount);
                    total_deposit_amount += parseFloat(this.transaction_authorizations_detail[key].deposit_amount);
                    total_skt_collection_amount += parseFloat(this.transaction_authorizations_detail[key].skt_collection_amount);
                    total_skt_withdraw_amount += parseFloat(this.transaction_authorizations_detail[key].skt_withdraw_amount);
                    total_withdraw_amount += parseFloat(this.transaction_authorizations_detail[key].withdraw_amount);
                    total_loan_transaction_amount += parseFloat(this.transaction_authorizations_detail[key].transaction_amount);
                };
            }
            if(this.transaction_authorization_not_req_detail) {
                for(let key in this.transaction_authorization_not_req_detail){
                    total++;
                    total_deposit_amount += parseFloat(this.transaction_authorization_not_req_detail[key].deposit_amount);
                    total_withdraw_amount += parseFloat(this.transaction_authorization_not_req_detail[key].withdraw_amount);
                    total_loan_transaction_amount += parseFloat(this.transaction_authorization_not_req_detail[key].transaction_amount);
                }
            }
            arr['total'] = total;
            arr['total_loan_amount'] = total_loan_amount;
            arr['total_deposit_amount'] = total_deposit_amount;
            arr['total_skt_collection_amount'] = total_skt_collection_amount;
            arr['total_skt_withdraw_amount'] = total_skt_withdraw_amount;
            arr['total_withdraw_amount'] = total_withdraw_amount;
            arr['total_loan_transaction_amount'] = total_loan_transaction_amount;
            return arr;
        },
        isSearch: function() {
            if(this.search_form_data.txt_name){
                return false
            }
            return true;
        }
    }
}