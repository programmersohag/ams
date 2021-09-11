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
          label: this.$t("name") + " ",
          vvalidate: "required",
        },
        txt_code: {
          fieldType: "TextInput",
          fieldName: "code",
          label: this.$t("code") + " ",
          vvalidate: "required|max:10|min:3|regex:^[0-9]*$"
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
      method: ''
    }
  },
  mounted: function () {
    this.method = 'add';
    const formData = {};
    if (this.id) {
      this.method = 'edit';
      let method = 'projects/get/' + this.id;
      let params = {id: this.id};
      this.$axios
        .get(method, params)
        .then(res => {
          if (res.data.data) {
            this.$set(formData, 'code', res.data.data.code);
            this.$set(formData, 'name', res.data.data.name);
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
    this.is_form_load = true;
  },
  methods: {
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          let params = new FormData();
          let url = '/projects/add';
          if (this.id) {
            url = '/projects/edit';
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
      this.errorMessage = [];
      if (this.method === 'add') {
        this.formData = {};
        this.$set(this.formData, 'isActive', 'true');
      } else {
        this.formData = Object.assign(this.formData, this.resetData);
      }
      this.errors.clear();
    },
    handleCancel: function () {
      this.$emit('close');
    }
  }
}
