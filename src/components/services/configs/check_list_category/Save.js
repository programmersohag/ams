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
          vvalidate: "required|regex:^[0-9]*$|max:10|min:3"
        },
        txt_department: {
          fieldType: "SelectList",
          fieldName: "department",
          label: this.$t("department"),
          options: [],
          vvalidate: "required",
          onChange: true,
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
      department_list: [],
      formData: {},
    }
  },
  mounted() {
    this.initialLoadComponent();
  },
  methods: {
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          let params = new FormData();
          let url = '/checkListCategories/add';
          if (this.id) {
            url = '/checkListCategories/edit';
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
    initialLoadComponent: function () {
      this.is_form_load = true;
      this.loadDepartments();
      const formData = {};
      if (this.id) {
        let url = 'checkListCategories/get?id=' + this.id;
        this.$axios
          .post(url)
          .then(res => {
            if (res.data.data) {
              this.$set(formData, 'code', res.data.data.code);
              this.$set(formData, 'name', res.data.data.name);
              this.$set(formData, 'department', res.data.data.department.id);
              this.$set(formData, 'isActive', res.data.data.isActive);
              this.schema['cbo_isActive']['isDisabled'] = false;
              this.formData = formData;
              this.resetData = Object.assign({}, formData);
            }
          });
      } else {
        this.$set(formData, 'isActive', 'true');
        this.formData = formData;
        this.schema['cbo_isActive']['isDisabled'] = true;
      }
    },

    handleReset: function () {
      this.error_message = [];
      this.$set(this.formData, "department", this.resetData.department);
      this.$set(this.formData, "code", this.resetData.code);
      this.$set(this.formData, "name", this.resetData.name);
      this.errors.clear();
    },
    handleCancel: function () {
      this.$emit('close');
    },
    loadDepartments: function () {
      this.$axios
        .get('/departments')
        .then(res => {
          if (res.data.statusCode === 200) {
            this.department_list.push({
              text: "--" + this.$t("Select Department") + this.$t(" ") + "--",
              value: ''
            });
            for (let i in res.data.data) {
              this.department_list.push({
                value: res.data.data[i].id,
                text: res.data.data[i].name
              });
            }
            this.schema["txt_department"]["options"] = this.department_list;
          }
        });
    }
  }
}
