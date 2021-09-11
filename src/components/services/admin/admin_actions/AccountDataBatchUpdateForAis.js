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
          cbo_option:{                    
            fieldType: "SelectList",
            fieldName: "cbo_option",
            label: this.$t("generate_auto_vouchers"), 
            id: "generate_auto_vouchers",
            vvalidate: "required",
            options:{
              0:'No',
              1:'Yes'
            }
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
      loading_show: false,
    }
  },
  mounted() {
    this.loadData();
  },
  methods:{
    loadData:function(){
      this.loading_show = true;
      this.$axios
        .get("/process_day_ends/back_date_day_end_process_within_period")
        .then(res => {
          console.log('res',res);
          if(res.data) {
            if(res.data.branches_info.length > 0) {
              let branch_combo = {};
              branch_combo[''] = '--Select--';
              for (let key in res.data.branches_info) {
                branch_combo[res.data.branches_info[key].branch_id] = res.data.branches_info[key].branch_code+"-"+res.data.branches_info[key].branch_name;
              }
              this.schema["cbo_branch"]["options"] = branch_combo;
              this.$set(this.formData,"cbo_branch",'');
            }
            this.$set(this.formData,"cbo_option", 0);
          }
          this.is_form_load = true;
          this.loading_show = false;
      });
    },
    handleSubmit: function() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.loading_show = true;
          let url = '/process_day_ends/back_date_day_end_process_within_period';
          let params = new FormData();  
          for (let key in this.formData) {
            params.append(key, this.formData[key]);
          }
          this.$axios
            .post(url, params)
            .then(res => {
              console.log('post', res.data)
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
      this.$set(this.formData,"cbo_branch",'');
      this.$set(this.formData,"cbo_option", 0);
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