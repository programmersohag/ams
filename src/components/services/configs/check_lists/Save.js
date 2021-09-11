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
          vvalidate: "required",
        },
        txt_code: {
          fieldType: "TextInput",
          fieldName: "code",
          label: this.$t("code"),
          vvalidate: "required|max:10|min:3|regex:^[0-9]*$"
        },
        txt_check_list_categories: {
          fieldType: "SelectList",
          fieldName: "checkListCategory",
          label: this.$t("check") + this.$t(" ") + this.$t("list") + this.$t(" ") + this.$t("category"),
          options: [],
          vvalidate: "required",
          onChange: true,
        },
        txt_department: {
          fieldType: "TextInput",
          fieldName: "departmentName",
          label: this.$t("department"),
          isReadOnly: true
        },
        txt_team_type: {
          fieldType: "SelectList",
          fieldName: "teamType",
          label: this.$t("team") + ' ' + this.$t("type"),
          options: [],
          vvalidate: "required",
          onChange: true,
        },
        txt_description: {
          fieldType: "TextAreaInput",
          fieldName: "description",
          label: this.$t("description"),
          vvalidate: "",
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
      error_message: [],
      formData: {},
    }
  },
  mounted() {
    this.loadCheckListCategory();
    this.loadTeamTypes();
    const formData = {};
    if (this.id) {
      let url = 'check_lists/get?id=' + this.id;
      this.$axios
        .post(url)
        .then(res => {
          if (res.data.data) {
            this.$set(formData, 'code', res.data.data.code);
            this.$set(formData, 'name', res.data.data.name);
            this.$set(formData, 'checkListCategory', res.data.data.checkListCategory.id);
            this.$set(formData, 'teamType', res.data.data.teamType.id);
            this.$set(formData, 'description', res.data.data.description);
            this.$set(formData, 'isActive', res.data.data.isActive);
            this.schema['cbo_isActive']['isDisabled'] = false;
            this.formData = formData;
            this.resetData = Object.assign({}, formData);
            this.loadCheckListCategoryRelatedInfo(res.data.data.checkListCategory.id);
          }
        });
    } else {
      this.$set(formData, 'isActive', 'true');
      this.formData = formData;
      this.schema['cbo_isActive']['isDisabled'] = true;
    }
    this.is_form_load = true;
  },
  methods: {
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          let params = new FormData();
          let url = '/check_lists/add';
          if (this.id) {
            url = '/check_lists/edit';
            params.append('id', this.id);
          }
          for (let key in this.formData) {
            params.append(key, this.formData[key]);
          }
          this.$axios
            .post(url, params)
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
      this.$set(this.formData, "checkListCategory", this.resetData.checkListCategory);
      this.$set(this.formData, "teamType", this.resetData.teamType);
      this.$set(this.formData, "description", this.resetData.description);
      this.errors.clear();
    },
    handleCancel: function () {
      this.$emit('close');
    },
    loadCheckListCategory: function () {
      let url = '/checkListCategories';
      this.$axios
        .get(url)
        .then(res => {
          if (res.data.statusCode === 200) {
            let group_list = [];
            group_list.push({
              text: "--" + this.$t("select check list category") + "--",
              value: ''
            })
            for (let i = 0; i < res.data.data.length; i++) {
              group_list.push({
                text: '[' + res.data.data[i].code + ']-' + res.data.data[i].name,
                value: res.data.data[i].id
              });
            }
            this.schema["txt_check_list_categories"]["options"] = group_list;
          }
        });
    },
    loadTeamTypes: function () {
      let url = '/team_types';
      this.$axios
        .get(url)
        .then(res => {
          if (res.data.statusCode === 200) {
            let team_type_list = [];
            team_type_list.push({
              text: "--" + this.$t("select team type") + "--",
              value: ''
            })
            for (let i = 0; i < res.data.data.length; i++) {
              team_type_list.push({text: res.data.data[i].name, value: res.data.data[i].id});
            }
            this.schema["txt_team_type"]["options"] = team_type_list;
          }
        });
    },
    onChangeMethod(field, value) {
      if (field === "checkListCategory") {
        this.loadCheckListCategoryRelatedInfo(value);
      }
    },
    loadCheckListCategoryRelatedInfo: function (checkListCategoryId) {
      this.resetCheckListCategoryRelatedInfo();
      let url = '/departments/findByCheckListCategoryId/' + checkListCategoryId;
      this.$axios.get(url)
        .then(res => {
          if (res.data.statusCode === 200) {
            if (res.data.data) {
              let departmentName = '[' + res.data.data.departmentCode + ']-' + res.data.data.departmentName;
              this.$set(this.formData, 'departmentName', departmentName);
            }
          }
        });
    },
    resetCheckListCategoryRelatedInfo: function () {
      this.$set(this.formData, 'team', '');
      this.$set(this.formData, 'location', '');
      this.$set(this.formData, 'auditPeriod', '');
    }
  }
}
