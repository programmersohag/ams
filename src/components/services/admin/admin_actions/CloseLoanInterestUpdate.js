import FormGenerator from "@/containers/form_generators/FormGenerator";
import DatePicker from "@/containers/DatePicker";
import FormError from "@/containers/FormError";
import {getBranchOptions}  from '@/shared/options/generate.js';
import API from "@/shared/common/API.js"
import StorageService from "@/shared/common/storage.service";

var closeLoanAPI =new API()
closeLoanAPI.createEntity({name:"daily_basis_admin_actions"});
var restAPI=closeLoanAPI.endpoints.daily_basis_admin_actions;

export default {
  name: "ClosedLoan",
  components: {
    FormGenerator,
    DatePicker,
    FormError,
  },
  props:{
    id: String,
  },
  data() {
    return {
      error_message: [],
      schema:{
        cbo_branch_id:{
          fieldType: "SelectList",
          fieldName: "cbo_branch_id",
          label: this.$t("branch"),
          id: "cbo_branch_id",
          vvalidate: "required",
          options:{},
          isShow:true
        },

        txt_date_from:{
          fieldType: "DateInput",
          fieldName: "txt_date_from",
          label: this.$t("from_date"),
          id: "txt_date_from",
          vvalidate: "required"
        },
        txt_date_to:{
          fieldType: "DateInput",
          fieldName: "txt_date_to",
          label: this.$t("to_date"),
          id: "txt_date_to",
          vvalidate: "required"
        }
      },
      formData: {},
      is_form_load: false,
      current_date:'',
      user:this.$store.getters['auth/userInfo'],
      //config : this.$store.getters['config/generalConfigInfo'],
      config:StorageService.getGeneralConfig(),
      url:''
    }
  },
  mounted() {
    this.loadData();
  },
  methods:{
    loadData: function(){
      restAPI.getRequest("closed_loan_interest_provision_update",{})
        .then(response => {
          if(response.data) {
            if((this.user['is_head_office'] && this.user['is_head_office'] == 1)){
              this.schema["cbo_branch_id"]["options"] =getBranchOptions(response.data.branchLists,'',1);
            } else {
              this.$set(this.formData,"cbo_branch_id", this.user['branch_id']);
            }

            let date = new Date();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            if (month < 10) {
              this.current_date = date.getFullYear() + '-0' + month +'-'+ day;
            } else {
              this.current_date = date.getFullYear() + '-' + month + '-' + day;
            }
            this.$set(this.formData,"txt_date_from",this.current_date);
            this.$set(this.formData,"txt_date_to",this.current_date)
          }
          this.is_form_load = true;
        }).catch((error) => {

      });
    },
    handleSubmit: function() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          let params = new FormData();
          for (let key in this.formData) {
            params.append(key, this.formData[key]);
          }
          restAPI.postRequest('closed_loan_interest_provision_update', params)
            .then((response) => {
              if(response.data.validation_error) {
                this.error_message = response.data.validation_error;
              } else {
                this.flashMessage(response.data.status,response.data.message);
                if(response.data.status == 'success') {
                  this.$emit('close', true);
                }
              }
            })
        }
      });
    },
    handleReset: function (e) {
      this.error_message = [];
      this.$set(this.formData,"cbo_branch_id",'');
      this.$set(this.formData,"txt_date_from",this.current_date);
      this.$set(this.formData,"txt_date_to",this.current_date);
      this.errors.clear();
    },
    handleCancel: function () {
      this.$emit('close');
    }
  },
  computed: {
    isSubmit: function() {
      if(this.formData.cbo_branch_id) {
        return false
      }
      return true
    }
  }
}
