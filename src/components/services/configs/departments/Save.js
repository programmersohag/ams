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
        txt_project: {
          fieldType: "SelectList",
          fieldName: "project",
          label: this.$t("project"),
          options: [],
          onChange: true,
          vvalidate: "required"
        },
        txt_note: {
          fieldType: "TextAreaInput",
          fieldName: "note",
          label: this.$t("note") + " "

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
    this.loadProjects();
    const formData = {};
    if (this.id) {
      let method = 'departments/edit/' + this.id;
      let params = {id: this.id};

      this.$axios
        .get(method, params)
        .then(res => {
          if (res.data.data) {
            this.$set(formData, 'code', res.data.data.code);
            this.$set(formData, 'name', res.data.data.name);

            if (res.data.data.project) {
              this.$set(formData, 'project', res.data.data.project.id);
            } else {   //for all project
              this.$set(formData, 'project', -1);
            }

            this.$set(formData, 'note', res.data.data.note);
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
          let url = '/departments/save';
          if (this.id) {
            url = '/departments/update';
            params.append('id', this.id);
          }
          for (let key in this.formData) {
            //when select all project option then null value save in database
            if (key === 'project' && this.formData[key] == null) {
              continue;
            }
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
      this.$set(this.formData, "project", this.resetData.project);
      this.$set(this.formData, "code", this.resetData.code);
      this.$set(this.formData, "name", this.resetData.name);
      this.$set(this.formData, "note", this.resetData.note);
      this.errors.clear();
    },
    handleCancel: function () {
      this.$emit('close');
    },
    loadProjects: function () {
      let url = '/projects';
      this.$axios
        .get(url)
        .then(res => {
          if (res.data.statusCode === 200) {
            let project_list = [];
            project_list.push({
              text: "--" + this.$t("Select Project") + "--",
              value: ''
            })
            project_list.push({
              text: "All" + this.$t(" ") + this.$t("project"),
              value: -1
            })
            for (let i = 0; i < res.data.data.length; i++) {
              project_list.push({text: res.data.data[i].name, value: res.data.data[i].id});
            }
            this.schema["txt_project"]["options"] = project_list;
          }
        });
    }
  }
}
