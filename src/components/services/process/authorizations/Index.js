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
          transaction_authorizations:[],
          is_SKT_required:0,
          loading_show: false,
      }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData: function() {
            this.loading_show = true;
            this.$axios.get("/transaction_authorizations/authorization_index")
            .then(res => {
                if(Object.keys(res.data.transaction_authorizations).length > 0) {
                    this.current_date = res.data.current_date;
                    this.transaction_authorizations = res.data.transaction_authorizations;
                    this.is_SKT_required = res.data.is_SKT_required;
                }
                this.loading_show = false;
            });
        },
        searchData:function(){
            let txt_name = (this.search_form_data.txt_name).trim();
            let resetArr = {};
            for(let key in this.transaction_authorizations) {
                let code = this.transaction_authorizations[key].samity_code;
                let name = this.transaction_authorizations[key].samity_name;
                if((code == txt_name) || (name == txt_name)) {
                    resetArr = {
                        [key]:this.transaction_authorizations[key]
                    }
                }
            }
            let len = Object.keys(resetArr).length;
            if(len > 0) {
                this.transaction_authorizations = resetArr;
            }
        },
        authorize: function() {
            let title = 'Are you sure you want to authorize these data?';
            swalConfirm(title).then((result) => {
                if (result.value) {
                    this.loading_show = true;
                    let params = new FormData();
                    let i =1;
                    for(let key in this.transaction_authorizations){
                        params.append("transactiondata["+i+"][samity_id]", this.transaction_authorizations[key].samity_id);
                        params.append("transactiondata["+i+"][loan_amount]", this.transaction_authorizations[key].loan_amount);
                        params.append("transactiondata["+i+"][deposit_amount]", this.transaction_authorizations[key].deposit_amount);
                        params.append("transactiondata["+i+"][skt_collection_amount]", this.transaction_authorizations[key].skt_collection_amount);
                        params.append("transactiondata["+i+"][skt_withdraw_amount]", this.transaction_authorizations[key].skt_withdraw_amount);
                        params.append("transactiondata["+i+"][withdraw_amount]", this.transaction_authorizations[key].withdraw_amount);
                        params.append("transactiondata["+i+"][loan_transaction_amount]", this.transaction_authorizations[key].transaction_amount);
                        i++;
                    }
                    this.$axios
                        .post("/transaction_authorizations/ajax_authorization_index", params)
                        .then(res => {
                            if(res.data) {
                                this.flashMessage(res.data.status,res.data.message);
                                if(res.data.status == 'success') {
                                    this.transaction_authorizations = [];
                                    this.loadData();
                                }
                            }
                        this.loading_show = false;
                    });
                }
            });
        },
        singleAuthorize: function(samity_id = 0) {
            let title = 'Are you sure you want to authorize these data?';
            swalConfirm(title).then((result) => {
                if (result.value) {
                    this.loading_show = true;
                    let params = new FormData();
                    params.append("samity_id", samity_id);
                    this.$axios
                        .post("/transaction_authorizations/ajax_authorization_index", params)
                        .then(res => {
                            if(res.data) {
                                this.flashMessage(res.data.status,res.data.message);
                                if(res.data.status == 'success') {
                                    this.transaction_authorizations = [];
                                    this.loadData();
                                }
                            }
                        this.loading_show = false;
                    });
                }
            });
        },
        handleView:function(samity_id = 0) {
            this.$router.push('/process/transaction-authorizations/authorization-detail/'+samity_id);
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
            if(this.transaction_authorizations) {
                for(let key in this.transaction_authorizations){
                    total++;
                    total_loan_amount += parseFloat(this.transaction_authorizations[key].loan_amount);
                    total_deposit_amount += parseFloat(this.transaction_authorizations[key].deposit_amount);
                    total_skt_collection_amount += parseFloat(this.transaction_authorizations[key].skt_collection_amount);
                    total_skt_withdraw_amount += parseFloat(this.transaction_authorizations[key].skt_withdraw_amount);
                    total_withdraw_amount += parseFloat(this.transaction_authorizations[key].withdraw_amount);
                    total_loan_transaction_amount += parseFloat(this.transaction_authorizations[key].transaction_amount);
                };
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