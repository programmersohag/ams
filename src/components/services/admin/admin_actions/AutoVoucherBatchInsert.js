import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import API from "@/shared/common/API.js";
import Loading from 'vue-full-loading'

let cAPI = new API();
cAPI.createEntity({ name: "acc_auto_vouchers" });
let AccAutoVoucherAPI = cAPI.endpoints.acc_auto_vouchers
export default {
  name: "MraReport",
  components: {
    SearchFormGenerator,
    Loading,
  },
  data() {
    return {
       
      user: {},      
      title: '',

      SearchSchema: {
        cbo_branch: {                    
            fieldType: "SelectList",
            fieldName: "cbo_branch",
            label: this.$t("branch"),
            id: "cbo_branch",
            options: {'':'--Select Branche--'},
            onChange: true,
        },
        cbo_fund:{                    
            fieldType: "SelectList",
            fieldName: "cbo_fund",
            label: this.$t("funding_organization"),  
            id: "cbo_fund",          
            options: {'':'--Select Fund--'}, 
        },                
        txt_voucher_from_date:{                    
            fieldType: "DateInput",
            fieldName: "txt_voucher_from_date",
            label: this.$t("date_from"),
            id: "txt_voucher_from_date",
            placeholder: this.$t("date_from")
        },
        txt_voucher_to_date:{                    
            fieldType: "DateInput",
            fieldName: "txt_voucher_to_date",
            label: this.$t("date_to"),
            id: "txt_voucher_to_date",
            placeholder: this.$t("date_to")
        },
      },

      SearchFormData: [], 
      is_form_loaded: false,  
      loading_show: true,
      
    }
  },
  mounted() {    
    this.user = this.$store.getters['auth/userInfo']; 
    this.getIndex();

  },
  methods: {  
    getIndex: function(){
        this.loading_show = true;    
        AccAutoVoucherAPI
        .getRequest("auto_voucher_batch_insert_new")
        .then(response => {
            this.$set(this.SearchFormData, 'cbo_branch', Object.keys(response.data.branches_info)[0])
            this.$set(this.SearchFormData, 'cbo_fund', Object.keys(response.data.fund_info)[0])
            this.$set(this.SearchFormData, 'txt_voucher_from_date', this.$moment().format("YYYY-MM-DD"))
            this.$set(this.SearchFormData, 'txt_voucher_to_date', this.$moment().format("YYYY-MM-DD"))
            this.SearchSchema['cbo_branch']['options'] = response.data.branches_info;
            this.SearchSchema['cbo_fund']['options'] = response.data.fund_info;
            this.is_form_loaded = true; 
            this.loading_show = false;               
        })
        .catch(function (error) {
            console.log(error.response);
        })
    },      
    getAutoVoucherBatchInsert: function() {
        this.loading_show = true;
        var params = new FormData();        
        params.append('cbo_branch', this.SearchFormData.cbo_branch);
        params.append('cbo_fund', this.SearchFormData.cbo_fund);
        params.append('txt_voucher_from_date', this.SearchFormData.txt_voucher_from_date);
        params.append('txt_voucher_to_date', this.SearchFormData.txt_voucher_to_date);     
        this.$axios.post('acc_auto_vouchers/auto_voucher_batch_insert_new', params)
            .then((res) => {
                this.flashMessage(res.data.status,res.data.message);
                this.loading_show = false;

            }).catch(function (error) {
            console.log("error", error);
        });
    },  
            
  },  
  
}