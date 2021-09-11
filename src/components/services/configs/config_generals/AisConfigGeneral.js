import FormGenerator from "@/containers/form_generators/FormGenerator";
import API from "@/shared/common/API.js"
import router from "../../../../router";
var configGeneralAPI =new API();
configGeneralAPI.createEntity({name:"ais_config_generals"});
export default {
  name: "ConfigGeneral",    
  components: { FormGenerator },
  props: { purpose_info:{} },
  data() {
    return {
      tab_label: '',
      purpose: '',
      schema: {},
      formData: {},
      resetData: {},
      errorMessage: [], 
    }
  },

  mounted:function(){
    //  console.log(this.purpose_info)
    let tab_label = this.purpose_info.label;
    let purpose = this.purpose_info.purpose;
    let purpose_info = this.purpose_info.purpose_info;
    // console.log(purpose_info)
    const formData = {};    
    const schema = [];
    let fieldType = "TextInput";  
    let options = "";  
    
      
      for (let key in purpose_info) {        
        
        let field_name = purpose_info[key].field_name        
        this.$set(formData,field_name,purpose_info[key].default_value)

        if(purpose_info[key].field_type=='text'){
          fieldType = "TextInput";
        }else if(purpose_info[key].field_type=='textarea'){
          fieldType = "TextAreaInput";          
        }else if(purpose_info[key].field_type=='number'){
          fieldType = "NumberInput";          
        }else if(purpose_info[key].field_type=='select'){
          fieldType = "SelectList";
          options = this.formatedOptions(purpose_info[key].field_value);          
        }else if(purpose_info[key].field_type=='radio'){
          fieldType = "RadioList";      
          options = purpose_info[key].field_value;     
        }else if(purpose_info[key].field_type=='checkbox'){
          fieldType = "CheckBoxList";      
          options = purpose_info[key].field_value;     
        }else if(purpose_info[key].field_type=='date'){
          var txt_date = this.$moment(purpose_info[key].default_value).format("YYYY-MM-DD");
          this.$set(formData,field_name,txt_date)
          fieldType = "DateInput";    
        }else if(purpose_info[key].field_type=='file'){
          fieldType = "FileInput";      
        }     
        
        schema.push({                    
          fieldType: fieldType,
          placeholder: "",
          label: purpose_info[key].label_name,
          fieldName : purpose_info[key].field_name,
          options: options,
          multi: false,
          vvalidate: purpose_info[key].is_required==1?"required":"",
          formClass: "col-md-4"
        });
      }

      this.tab_label = tab_label
      this.purpose = purpose
      this.formData=formData
      this.resetData = Object.assign({}, formData);
      this.schema=schema      
  },

  methods:{
    handleSubmit: function() { 
      this.$validator.validate().then(valid => {
        if (valid) {
          const params = new FormData();
          params.append('operation', this.purpose);
          for (let  key in this.formData) {
            params.append(key, this.formData[key]);
          }

          this.$axios.post('/ais_config_generals/general_configuration',params,
          ).then(res => {
                if(res.data.status=='success'){
                  this.$store.dispatch('config/getGeneralConfig');
                  this.flashMessage(res.data.status,res.data.message); 
                }else if (res.data.error) {
                  this.errorMessage = res.data.error;
                }
              
            }).catch(function (error) {
                console.log(error);
            });
        }
      });
    },

    handleReset: function (e) {            
      this.errorMessage = []; 
      this.errors.clear(); 
      this.formData = Object.assign(this.formData, this.resetData);      
    },
    handleCancel: function () {
      this.$emit('ActiveTab', 'active');
    },
      
    onChangeMethod(field, value) {
      
      
  },
  formatedOptions: function(options){
    let common_data=[];
       for (let key in options) {           
           common_data.push({
                   text: options[key],
                   value: key
               })
       }
       return common_data
  }

  }
};
