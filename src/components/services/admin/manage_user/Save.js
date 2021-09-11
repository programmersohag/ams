import API from "@/shared/common/API.js"
import FormGenerator from "@/containers/form_generators/FormGenerator";
import {loadLanguageAsync} from '@/shared/lan/i18n-setup';
import {getFormatForNameAndId} from "@/shared/options/generate.js";


var manageUserAPI = new API()
manageUserAPI.createEntity({name: "users"});

export default {
  components: {
    FormGenerator
  },
  props:
    {
      id: String
    },
  data() {
    return {
      schema: {
        "txt_full_name": {
          fieldType: "TextInput",
          fieldName: "txt_full_name",
          label: this.$t("full_name"),
          id: "txt_name",
          vvalidate: "required|max:100",
        },
        "txt_login": {
          fieldType: "TextInput",
          fieldName: "txt_login",
          label: this.$t("user_login"),
          id: "txt_login",
          vvalidate: "required|max:40",
        },
        "txt_password": {
          fieldType: "PasswordInput",
          fieldName: "txt_password",
          label: this.$t("user_password"),
          id: "password",
          refPassword: "password",
          vvalidate: "max:40|min:8",
        },
        "txt_verify_password": {
          fieldType: "ConfirmPasswordInput",
          fieldName: "txt_verify_password",
          label: this.$t("verify_password"),
          id: "verify_pass",
          vvalidate: "max:40|min:8",
        },
        "txt_email": {
          fieldType: "TextInput",
          fieldName: "txt_email",
          label: this.$t("user_email"),
          id: "txt_email",
          vvalidate: "required|email",
        },
        "cbo_role_id": {
          fieldType: "SelectList",
          fieldName: "cbo_role_id",
          label: this.$t("user_Roles"),
          id: "cbo_role",
          vvalidate: "required",
          options: {}
        },
        "cbo_user_type": {
          fieldType: "SelectList",
          fieldName: "cbo_user_type",
          label: this.$t("user_type"),
          id: "cbo_user_type",
          vvalidate: "required",
          options: {
            "": this.$t("select"),
            'auditee': 'Auditee',
            'auditor': 'Auditor',
            'monitoring_officer': 'Monitoring Officer'
          }
        },
        "cbo_default_branch_id": {
          fieldType: "SelectList",
          fieldName: "cbo_default_branch_id",
          label: this.$t("location"),
          id: "cbo_default_branch_id",
          options: {}
        },
        "cbo_current_status": {
          fieldType: "SelectList",
          fieldName: "cbo_current_status",
          label: this.$t("current_status"),
          id: "cbo_status",
          vvalidate: "required",
          options: {'active': 'Active', 'inactive': 'Inactive'},
        },
        "cbo_is_deleted": {
          fieldType: "SelectList",
          fieldName: "cbo_is_deleted",
          label: this.$t("is_deleted"),
          id: "cbo_is_deleted",
          vvalidate: "required",
          isShow: false,
        },
        "cbo_default_language": {
          fieldType: "SelectList",
          fieldName: "cbo_default_language",
          label: this.$t("user_language"),
          id: "cbo_language",
          vvalidate: "required",
        },
      },
      show_error_message: false,
      user_role_options: {"": this.$t("select")},
      employee_list: [],
      employees: [],
      user: '',
      default_branches: [],
      language_info: {
        "": this.$t("select"),
        'bengali': 'বাংলা',
        'english': 'English',
        'spanish': 'español',
        'indonesian': 'Indonesia',
        'nepali': 'Nepali',
        'singali': 'Singali'
      },
      is_submitted: false,
      password: "",
      re_password: "",
      email: "",
      is_head_office: false,
      is_deleted: 0,
      login_user_role_id: '',
      is_edit: 0,
      delete_options: {0: 'No', 1: 'Yes'},
      errorMessage: [],
      resetData: {},
      formData: {},
      is_load_schema: false,
      is_edit_page: false,
      is_employee_required: 0,
      userResponse: {},
      locations: {},
    };
  },
  mounted() {
    this.user = this.$store.getters['auth/userInfo'];
    this.loadComboData();
  },
  methods: {

    loadComboData: function () {
      this.resetData = [];
      if (this.id == null || this.id == '') {
        this.is_deleted = false;
      } else {
        this.is_deleted = false;
        this.is_edit = 1;
      }

      this.is_head_office = 0;
      this.login_user_role_id = 0;
      this.is_deleted = 0;
      var method_name = "add";
      this.$http_service.get("/ams-auth-api/roles/")
        .then(res => {
          let parent_list = res.data._embedded.roleList;
          if (parent_list) {
            for (let key in parent_list) {
              this.user_role_options[parent_list[key].role_id] = parent_list[key].role_name;
            }
            this.schema['cbo_role_id']['options'] = this.user_role_options;
          }
        });

      this.$axios.get("/locations")
        .then(res => {
          this.locations[""] = this.$t("select");
          if (res.data.data) {
            //console.log(res.data.data.locations);
            if (res.data.data.is_mfi_audit.defaultValue == 1) {
              this.getMfiLocations();
            } else {
              for (let key in res.data.data.locations) {
                this.locations[res.data.data.locations[key]['id']] = "[" + res.data.data.locations[key]['code'] + "] - " + res.data.data.locations[key]['name'];
              }
              this.schema['cbo_default_branch_id']['options'] = this.locations;
            }
          }
        });

      if (this.is_edit == 0) {
        method_name = "add";
      } else {
        method_name = "edit";
      }
      if (method_name == "edit") {
        this.get_user();
      } else {
        this.$set(this.formData, 'cbo_default_language', 'english');
        this.generate_form();
      }
    },
    getMfiLocations: function () {
      this.$http_service.get("/core-service/po_branches/all_branch_info")
        .then(res => {
          if (res.data.data) {
            for (let key in res.data) {
              this.locations[res.data.data[key]['id']] = "[" + res.data.data[key]['code'] + "] - " + res.data.data[key]['name'];
            }
            this.schema['cbo_default_branch_id']['options'] = this.locations;
          }
        });
    },

    generate_form: function () {
      this.resetData = Object.assign({}, this.formData);
      this.is_load_schema = true;

      if (this.is_edit == 1) {
        //console.log('is_edit ',this.is_edit);
        this.schema['txt_password']['isShow'] = false;
        this.schema['txt_verify_password']['isShow'] = false;
        this.schema['txt_full_name']['isDisabled'] = true;
        this.schema['txt_login']['isDisabled'] = true;
      } else {
        this.schema['txt_password']['vvalidate'] = "required|max:40|min:8";
        this.schema['txt_verify_password']['vvalidate'] = "required|max:40|min:8";
      }

      if (this.is_edit == 1 && this.login_user_role_id == 1 && this.is_deleted == 1) {
        this.schema['cbo_is_deleted']['isShow'] = true;
      }

      //let form_data = {};
      if (this.is_edit === 0) {
        this.$set(this.formData, 'cbo_current_status', 'active');
      }
      //this.schema['cbo_current_status']['options'] = this.status_info;
      this.schema['cbo_default_language']['options'] = this.language_info;

      if (this.is_deleted == 1) {
        this.schema['cbo_is_deleted']['options'] = this.delete_options;
        this.$set(this.formData, "cbo_is_deleted", 1);
      }
    },
    get_user: function () {
      this.$http_service.get("/ams-auth-api/users/" + this.id)
        .then(response => {
          this.userResponse = response.data.user;
          if (typeof this.userResponse.fullName != 'undefined') {
            this.$set(this.formData, "txt_full_name", this.userResponse.fullName);
            this.$set(this.formData, "txt_login", this.userResponse.login);
            this.$set(this.formData, "txt_email", this.userResponse.email);
            this.$set(this.formData, "cbo_role_id", this.userResponse.roleId);
            this.$set(this.formData, "cbo_default_branch_id", this.userResponse.defaultBranchId);
            this.$set(this.formData, "cbo_user_type", this.userResponse.userType);
            this.$set(this.formData, "cbo_current_status", this.userResponse.currentStatus);
            this.$set(this.formData, "cbo_is_deleted", this.userResponse.is_deleted);
            this.$set(this.formData, "cbo_default_language", this.userResponse.defaultLanguage);
            this.is_deleted = this.userResponse.is_deleted;
          }
          this.generate_form();
        });
    },

    onChangeMethod: function (field, value) {
      /*if (field == "cbo_default_branch_id") {
        this.getEmpoyeeList(value);
      }*/
    },
    validate_form: function () {

      this.$validator.validate().then(valid => {
        if (valid) {

          let params = {} // use new FormData()  instance only for file upload
          for (let key in this.formData) {
            params[key] = this.formData[key];
          }

          var method_name = "add";
          if (this.is_edit) {
            method_name = "edit";
          } else {
            method_name = "add";
          }
          this.errorMessage = [];

          if (method_name == "add") {
            this.$http_service.post("/ams-auth-api/users/", JSON.stringify(params))
              .then(response => {
                if (response.data.code == 201) {
                  this.show_error_message = false;
                  this.$toast.success({title: response.data.status, message: response.data.message});
                  this.$emit('close', 1);
                } else {
                  this.$toast.warn({
                    title: response.data.status,
                    message: "Login User name is already used. Try Another Login Name"
                  });
                }
              })
              .catch(error => {
                this.show_error_message = true;
                this.errorMessage = error.response.data.errors;
                // console.log(this.errorMessage)
                //console.log(error.response);
              })
          } else {
            this.$http_service.put("/ams-auth-api/users/" + this.id, JSON.stringify(params))
              .then(response => {
                if (response.data.code == 201) {
                  let lan = "en";
                  if (params['cbo_default_language'] != 'english') {
                    lan = "bn";
                  }
                  if (this.$store.getters['auth/userInfo']['login'] == params['txt_login']) {
                    let userInfo = {
                      name: params['txt_full_name'],
                      role_id: params['cbo_role_id'],
                      default_language: params['cbo_default_language'],
                      branch_id: params['cbo_default_branch_id'],
                      login: params['txt_login'],
                      lan: lan
                    };
                    this.$store.dispatch('auth/updateUserInfo', userInfo);
                    loadLanguageAsync(lan);
                    this.$router.go();
                  }
                  this.$toast.success({title: response.data.status, message: response.data.message});
                  this.$emit('close', 1);
                } else {
                  // this.errorMessage = response.data.message;

                }
              });
          }

        }
      });
    },
    cancleModal: function () {
      this.$emit('close', 0);
    },
    resetPage: function () {
      this.errorMessage = [];
      this.errors.clear();
      if (this.is_edit) {
        this.formData = Object.assign(this.formData, this.resetData);
      } else {
        this.formData = {};
      }
    }
  }
}
;
