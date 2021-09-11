import FormGenerator from "@/containers/form_generators/FormGenerator";
import {formatDate} from "@/shared/utils";

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
        txt_date_from: {
          fieldType: "DateInput",
          fieldName: "openingDate",
          label: this.$t("opening") + ' ' + this.$t("date"),
          id: "txt_opening_date",
          vvalidate: "required"
        },
        txt_address: {
          fieldType: "TextAreaInput",
          fieldName: "address",
          label: this.$t("address"),
          vvalidate: "required",
        },
        txt_contact_number: {
          fieldType: "NumberInput",
          fieldName: "contactNumber",
          label: this.$t("contact") + ' ' + this.$t("number"),
          vvalidate: "max:13|min:11"
        },
        txt_email: {
          fieldType: "TextInput",
          fieldName: "email",
          label: this.$t("email"),
          vvalidate: "email"
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
    const formData = {};
    if (this.id) {
      let method = 'locations/findById/' + this.id;
      let params = {id: this.id};

      this.$axios
        .get(method, params)
        .then(res => {
          if (res.data.data) {
            this.$set(formData, 'code', res.data.data.code);
            this.$set(formData, 'name', res.data.data.name);
            this.$set(formData, 'openingDate', formatDate(res.data.data['openingDate']));
            this.$set(formData, 'address', res.data.data.address);
            this.$set(formData, 'contactNumber', res.data.data.contactNumber);
            this.$set(formData, 'email', res.data.data.email);
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
          let url = '/locations/save';
          if (this.id) {
            url = '/locations/update';
            params.append('id', this.id);
          }
          for (let key in this.formData) {
            if ((key == "contactNumber" || key == "email") && this.formData[key] == ''){
            }else{
              params.append(key, this.formData[key]);
            }
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
      this.$set(this.formData, "openingDate", this.resetData.openingDate);
      this.$set(this.formData, "address", this.resetData.address);
      this.$set(this.formData, "contactNumber", this.resetData.contactNumber);
      this.$set(this.formData, "email", this.resetData.email);
      this.errors.clear();
    },
    handleCancel: function () {
      this.$emit('close');
    }
  }
}
