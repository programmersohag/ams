import FormGenerator from "@/containers/form_generators/FormGenerator";

export default {
  name: "Save",
  components: {
    FormGenerator
  },
  props: {
    id: null,
    extra_param: Object,
  },
  data() {
    return {
      schema: {
        txt_name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("name"),
          vvalidate: "required"
        },
        txt_code: {
          fieldType: "TextInput",
          fieldName: "code",
          label: this.$t("code"),
          vvalidate: "required|max:10|min:3|regex:^[0-9]*$"
        },
        cbo_team_member_list: {
          fieldType: "MultiSelectList",
          fieldName: "member_list",
          label: this.$t("members"),
          id: "member_list",
          placeholder: "Select Team Members",
          options: [],
          searchable: false,
          showPointer: true,
          showLabels: false,
          selectedVals: [],
          // values:[],
          vvalidate: 'required'
        },
        cbo_team_type: {
          fieldType: "SelectList",
          fieldName: "teamType",
          label: this.$t("team") + ' ' + this.$t("type"),
          id: "teamType",
          formClass: 'col col-md-12',
          options: {},
          vvalidate: "required"
        },
        txt_note: {
          fieldType: "TextAreaInput",
          fieldName: "note",
          label: this.$t("note")

        },
        cbo_isActive: {
          fieldType: "SelectList",
          fieldName: "isActive",
          label: this.$t("is") + ' ' + this.$t("active"),
          id: "isActive",
          formClass: 'col col-md-12',
          options: {'true': "Active", 'false': "Inactive"}
        }

      },
      resetData: {},
      is_form_load: false,
      is_edit_load: false,
      error_message: [],
      formData: {},
      selectedMembers: {}
    }
  },
  mounted() {
    this.initialLoadForm();
    if (!this.id) {  // this is  for  multi-select team
      this.is_edit_load = true;
    }

  },
  methods: {
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          let params = new FormData();

          let url = '/teams/save';
          if (this.id) {
            url = '/teams/save';    //update and save are managed by backend method
            params.append('id', this.id);
          }

          for (let key in this.formData) {
            if (key === "member_list")
              continue;
            params.append(key, this.formData[key]);
          }

          //convert form data to object data for json convert
          let object_data = {};
          params.forEach(function (value, key) {
            object_data[key] = value;
          });

          //add member list
          let member_list = [];
          let memberResponse = this.formData['member_list'];
          for (let row_id in memberResponse) {
            member_list.push({
              memberName: memberResponse[row_id]['name'],
              userId: memberResponse[row_id]['code']
            })
          }
          object_data.members = member_list
          //end member list

          //convert object to json data
          let json = JSON.stringify(object_data);

          //add header for json object
          let headers = {
            headers: {
              'Content-Type': `application/json`
            }
          }
          this.$axios
            .post(url, json, headers)
            .then(res => {
              if (res.data.validation_error) {
                this.error_message = res.data.validation_error;
              } else {
                let status = 'failed';
                if (res.data.statusCode === 200) {
                  status = 'success';
                } else if (res.data.statusCode === 202) {
                  status = 'warning';
                }
                this.flashMessage(status, res.data.message);
                if (status === 'success') {
                  this.$emit('close', true);
                }
              }
            });
        }
      }).catch(() => {
        this.$toast.error({title: 'error', message: "Invalid Field"});
      });
    },
    handleReset: function () {
      this.error_message = [];
      this.$set(this.formData, "code", this.resetData.code);
      this.$set(this.formData, "name", this.resetData.name);
      this.$set(this.formData, "members", this.resetData.members);
      this.$set(this.formData, "teamType", this.resetData.teamType);
      this.$set(this.formData, "note", this.resetData.note);
      this.$set(this.formData, "isActive", this.resetData.isActive === undefined ? true : this.resetData.isActive);
      this.errors.clear();
    },
    handleCancel: function () {
      this.$emit('close');
    },

    initialLoadForm: function () {
      // this.loadTeamMemberList();
      this.loadTeamType();


      // this.schema['cbo_team_member_list']['selectedVals'] = [{name: 'Vue.js', code: 158277}];

      const formData = {};
      if (this.id) {
        let method = 'teams/findById/' + this.id;
        let params = {id: this.id};

        this.$axios
          .get(method, params)
          .then(res => {
            if (res.data.data) {
              this.$set(formData, 'name', res.data.data.name);
              this.$set(formData, 'code', res.data.data.code);
              this.$set(formData, 'note', res.data.data.note);
              this.$set(formData, 'teamType', res.data.data.teamType.id);
              this.schema['cbo_isActive']['isDisabled'] = false;
              this.schema['txt_code']['isDisabled'] = true;
              this.$set(formData, 'isActive', res.data.data.isActive);
              this.formData = formData;
              this.resetData = Object.assign({}, formData);
              this.selectedMembers = res.data.data.members;
              this.loadTeamMemberList();
            } else {
              this.$set(formData, 'isActive', true);
            }
          });
      } else {
        this.$set(formData, 'isActive', 'true');
        this.formData = formData;
        this.schema['cbo_isActive']['isDisabled'] = true;
        this.schema['txt_code']['isDisabled'] = false;
        this.loadTeamMemberList();
      }
      this.is_form_load = true;
    },

    loadTeamType: function () {
      this.$axios.get("/team_types")
        .then(response => {
          let team_type_list = [];
          team_type_list.push({
            text: "--" + this.$t("Select") + ' ' + this.$t("Team") + ' ' + this.$t("Type") + "--",
            value: ''
          })

          let teamTypeResponse = response.data.data
          for (let row_id = 0; row_id < teamTypeResponse.length; row_id++) {
            team_type_list.push({
              text: teamTypeResponse[row_id].name,
              value: teamTypeResponse[row_id].id
            })
          }
          this.schema['cbo_team_type']['options'] = team_type_list;
        });
    },
    loadTeamMemberList: function () {
      this.$http_service.get("/ams-auth-api/users/get_audit_user_list")
        .then(response => {
          let member_list = [];
          let memberResponse = response.data
          for (let row_id = 0; row_id < memberResponse.length; row_id++) {
            member_list.push({
              name: memberResponse[row_id].name,
              code: memberResponse[row_id].id
            })
          }
          this.schema['cbo_team_member_list']['options'] = member_list;
          if (this.id) {
            this.loadSelectedTeamMemberList(this.selectedMembers);
          }
        });
    },
    loadSelectedTeamMemberList: function (members) {
      let member_list = [];
      let memberResponse = members
      for (let row_id = 0; row_id < memberResponse.length; row_id++) {
        member_list.push({
          name: memberResponse[row_id]['memberName'],
          code: memberResponse[row_id]['userId']
        })
      }

      this.schema['cbo_team_member_list']['selectedVals'] = member_list;
      this.is_edit_load = true;
    }
  }
}
