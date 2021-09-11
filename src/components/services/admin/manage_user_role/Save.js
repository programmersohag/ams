
import API from "@/shared/common/API.js";
import FormGenerator from "@/containers/form_generators/FormGenerator";

var userRoleAPI = new API();
userRoleAPI.createEntity({ name: "user_roles" });
export default {
    name: 'RoleSave',
    components: {
        FormGenerator
    },
    props:{ data: Object },
    data() {
        return {
            parent_options: [],
            valid_star: '<span class="required">*</span>',
            errorMessage: [],
            method: '',
            is_form_loaded: false,
            cbo_report_level: {
                fieldType: "SelectList",
                fieldName: "cbo_report_level",
                label: this.$t("report level"),
                id: "cbo_report_level",
                options: {},
                onChange: true,
            },
            schema: {
                parent_id: {
                    fieldType: "SelectList",
                    fieldName: "parent_id",
                    label: this.$t("parent"),
                    id: "parent_id",
                    onChange: true,
                    options: {},
                    vvalidate: "required"
                },
                role_id: {
                    fieldType: "HiddenInput",
                    fieldName: "role_id",
                    label: "",
                    id: "role_id",
                    onChange: false,
                },
                role_name: {
                    fieldType: "TextInput",
                    fieldName: "role_name",
                    label: this.$t("role_name"),
                    id: "role_name",
                    onChange: false,
                    vvalidate: "required"
                },
                role_description: {
                    fieldType: "TextInput",
                    fieldName: "role_description",
                    label: this.$t("role_description"),
                    id: "role_description",
                }
            },
            formData: {

            },
            resetData: {}
        }
    },

    mounted: function () {
        var params={};
        this.method = "add";
        this.$http_service.get("/ams-auth-api/roles/")
            .then(res => {
              let parent_combo = [];
              parent_combo.push({
                text:this.$t('select'),
                value:''
              })
              let parent_list = res.data._embedded.roleList;
              if(parent_list){
                for(let key in parent_list) {
                  parent_combo.push({
                    text:parent_list[key].role_name,
                    value : parent_list[key].role_id
                  })
                  //parent_combo[parent_list[key].role_id] = parent_list[key].role_name;
                }
              }
                this.parent_options = parent_combo;

                this.schema['parent_id']["options"] = this.parent_options;
            }).then(() => {
            this.loading_show = false;
            this.is_form_loaded = true;
        });

        if(this.data.role_id){
            this.method = "edit";
            this.methodName = "Edit";
            this.schema['parent_id']["isDisabled"] = true;
            this.$set(this.formData,"role_id",this.data.role_id);
            this.$set(this.formData,"parent_id",this.data.parent_id);
            this.$set(this.formData,"role_name",this.data.role_name);
            this.$set(this.formData,"role_description",this.data.role_description);
            this.resetData = this.data;
        }
    },
    methods: {
        handleSubmit: function () {
            this.$validator.validate().then(valid => {
                if (valid) {
                    let params = {};
                    params["parent_id"]  = this.formData.parent_id;
                    params["role_name"]  = this.formData.role_name;
                    params["role_description"]  = this.formData.role_description;
                    this.loading_show = true;
                    let api_url = "/ams-auth-api/roles/";
                    if(this.data.role_id){
                        api_url = "/ams-auth-api/roles/"+this.data.role_id;
                        this.$http_service.put(api_url, JSON.stringify(params))
                            .then(res => {
                                if(res.data.code == 201) {
                                    this.flashMessage("success",res.data.message);
                                    this.$emit('close',1);
                                } else {
                                    this.flashMessage("failure",res.data.message);
                                }
                                this.loading_show = false;
                            }).catch(err => {
                            for(let key in err.response.data.errors){
                                let message = JSON.parse(err.response.data.errors[key]);
                                this.errorMessage[message.field] = message.error;
                            }
                        })
                    }else{
                        this.$http_service.post(api_url, JSON.stringify(params))
                            .then(res => {
                                if(res.data.code == 201) {
                                    this.flashMessage("success",res.data.message);
                                    this.$emit('close',1);
                                } else {
                                    this.flashMessage("failure",res.data.message);
                                }
                                this.loading_show = false;
                            }).catch(err => {
                            for(let key in err.response.data.errors){
                                let message = JSON.parse(err.response.data.errors[key]);
                                this.errorMessage[message.field] = message.error;
                                //console.log(this.errorMessage)
                            }
                        })
                    }


                } else {
                }
            });

        },
        handleReset: function (event) {
            this.errorMessage = [];
            if(this.data.role_id){
                this.formData = Object.assign(this.formData, this.resetData);
            }else{
                this.formData={};
            }
        },
        handleCancel: function () {
            this.$emit('close');
        }
    },
    computed: {
        isSubmit: function() {
          if(this.formData.parent_id) {
            return false
          }
          return true
        }
      }
}
