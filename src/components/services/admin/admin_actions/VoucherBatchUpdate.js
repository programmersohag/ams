import FormGenerator from "@/containers/form_generators/FormGenerator";
import DatePicker from "@/containers/DatePicker";
import FormError from "@/containers/FormError";
import {getCommonOptions}  from '@/shared/options/generate.js';
import StorageService from "@/shared/common/storage.service";

export default {
  name: "Save",
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
        cbo_branch:{
          fieldType: "SelectList",
          fieldName: "cbo_branch",
          label: this.$t("branch"),
          id: "cbo_branch",
          vvalidate: "required",
          options:{},
          isShow:false
        },
        cbo_fund:{
            fieldType: "SelectList",
            fieldName: "cbo_fund",
            label: this.$t("fund"),
            id: "cbo_fund",
            vvalidate: "required",
            options:{}
          },
          txt_voucher_from_date:{
          fieldType: "DateInput",
          fieldName: "txt_voucher_from_date",
          label: this.$t("from_date"),
          id: "txt_voucher_from_date",
          vvalidate: "required"
        },
        txt_voucher_to_date:{
            fieldType: "DateInput",
            fieldName: "txt_voucher_to_date",
            label: this.$t("to_date"),
            id: "txt_voucher_to_date",
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
      console.log("cong",this.config)
      if(this.config.is_project_accounting_enable && this.config.is_project_accounting_enable==1) {
        this.url="/acc_auto_project_vouchers/auto_voucher_batch_insert"
      }
      else{
        this.url="/acc_auto_vouchers/auto_voucher_batch_insert"
      }
      this.$axios
        .get(this.url)
        .then(res => {
          if(res.data) {
            if((this.user['is_head_office'] && this.user['is_head_office'] == 1)){
              this.schema['cbo_branch']['isShow'] = true;
              if(Object.keys(res.data.branches_info).length > 0) {
                this.schema["cbo_branch"]["options"] =getCommonOptions(res.data.branches_info,'');
              }
            } else {
              this.$set(this.formData,"cbo_branch", this.user['branch_id']);
            }
            if(Object.keys(res.data.fund_info).length > 0) {
              this.schema["cbo_fund"]["options"] =getCommonOptions(res.data.fund_info,'');
            }
            let date = new Date();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            if (month < 10) {
              this.current_date = date.getFullYear() + '-0' + month +'-'+ day;
            } else {
              this.current_date = date.getFullYear() + '-' + month + '-' + day;
            }
            this.$set(this.formData,"txt_voucher_from_date",this.current_date);
            this.$set(this.formData,"txt_voucher_to_date",this.current_date)
          }
          this.is_form_load = true;
      });
    },
    handleSubmit: function() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          let params = new FormData();
          for (let key in this.formData) {
            params.append(key, this.formData[key]);
          }
          this.$axios
            .post(this.url, params)
            .then(res => {
              if(res.data.validation_error) {
                this.error_message = res.data.validation_error;
              } else {
                this.flashMessage(res.data.status,res.data.message);
                if(res.data.status == 'success') {
                  this.$emit('close', true);
                }
              }
            })
        }
      });
    },
    handleReset: function (e) {
      this.error_message = [];
      this.$set(this.formData,"cbo_branch",'');
      this.$set(this.formData,"cbo_fund",'');
      this.$set(this.formData,"txt_voucher_from_date",this.current_date);
      this.$set(this.formData,"txt_voucher_to_date",this.current_date);
      this.errors.clear();
    },
    handleCancel: function () {
      this.$emit('close');
    }
  },
  computed: {
    isSubmit: function() {
      if(this.formData.cbo_branch) {
        return false
      }
      return true
    }
  }
}
