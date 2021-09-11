import FormGenerator from "@/containers/form_generators/FormGenerator";
import DatePicker from "@/containers/DatePicker";
import FormError from "@/containers/FormError";
import Loading from 'vue-full-loading';

export default {
  name: "Save",
  components: {
    FormGenerator,
    DatePicker,
    FormError,
    Loading
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
          options:{}
        },
        cbo_fund:{                    
            fieldType: "SelectList",
            fieldName: "cbo_fund",
            label: this.$t("fund"), 
            id: "cbo_fund",
            vvalidate: "required",
            options:{}
          },
          cbo_action_for:{                    
            fieldType: "SelectList",
            fieldName: "cbo_action_for",
            label: this.$t("action_for"), 
            id: "cbo_action_for",
            vvalidate: "required",
            options:{
              1:'Only Auto Voucher',
              0:'Only Manual Voucher',
              '-1':'All Vouchers'
            }
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
      loading_show: false,
    }
  },
  mounted() {
    this.loading_show = true;
    this.$axios
      .get("/acc_vouchers/voucher_batch_delete")
      .then(res => {
        if(res.data) {
          if(res.data.branches_info.length > 0) {
            let branch_combo = {};
            for (let key in res.data.branches_info) {
              branch_combo[res.data.branches_info[key].branch_id] = res.data.branches_info[key].branch_code+"-"+res.data.branches_info[key].branch_name;
            }
            this.schema["cbo_branch"]["options"] = branch_combo;
            this.$set(this.formData,"cbo_branch",1);
          }
          if(res.data.fund_info.length > 0) {
            let fund_combo = {};
            fund_combo['-1'] = "All Fund";
            for (let key in res.data.fund_info) {
              fund_combo[res.data.fund_info[key].id] = res.data.fund_info[key].name;
            }
            this.schema["cbo_fund"]["options"] = fund_combo;
            this.$set(this.formData,"cbo_fund",'-1');
          }
          this.$set(this.formData,"cbo_action_for", 1);
        }
        this.is_form_load = true;
        this.loading_show = false;
    });
  },
  methods:{
    handleSubmit: function() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.loading_show = true;
          let url = '/acc_vouchers/voucher_batch_delete';
          let params = new FormData();  
          for (let key in this.formData) {
            params.append(key, this.formData[key]);
          }
          this.$axios
            .post(url, params)
            .then(res => {
              if(res.data.validation_error) {
                this.error_message = res.data.validation_error;
              } else {
                this.flashMessage(res.data.status,res.data.message);
                if(res.data.status == 'success') {
                  this.$emit('close', true);
                }
              }
              this.loading_show = false;
            })
        }
      });
    },
    handleReset: function (e) {            
      this.error_message = [];  
      this.$set(this.formData,"cbo_branch",1);
      this.$set(this.formData,"cbo_fund",'-1');
      this.$set(this.formData,"cbo_action_for", 1);
      this.$set(this.formData,"txt_voucher_from_date",'');
      this.$set(this.formData,"txt_voucher_to_date",'');  
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