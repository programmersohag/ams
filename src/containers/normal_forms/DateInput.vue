<template>
  <b-col :class="formClass ? formClass : 'col-md-4'" v-if="isShow">
      <b-form-group
      :label="label + this.valid_star"
      label-for="label"
      label-size="sm">
      <date-picker date-format="dd-mm-yy" class="form-control form-control-sm"
        :placeholder="placeholder"
        :name="fieldName"
        :value="value"
        v-validate=""
        :data-vv-as="label"
        :class="{'form-control': true, 'is-invalid': errors.has(fieldName) }"
        @input="formatDate(fieldName, $event)"
        :disabled="isDisabled"
        :readonly="isReadOnly">
      </date-picker>
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
  </b-form-group>
  </b-col>
</template>
<script>
  import DatePicker from "@/containers/DatePicker";
  import FormError from "@/containers/FormError";
export default {
  components: { DatePicker, FormError },
  name: 'DateInput',
  inject: ['$validator'],
  props: {
    placeholder: { type: String },
    label: { type: String },
    fieldName: { type: String, default: '' },
    value: {},
    vvalidate: {default:''},
    errorMsg: {},
    id: {},
    isDisabled: { default: false },
    isShow: { default: true },
    formClass:{
      default: ''
    },
    isReadOnly: { default: false }
  },
  data() {
    return {
      date_value: '',
      valid_star: ''
    }
  },
   mounted: function() {
    this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
  },
  methods: {
    formatDate(fieldName, fieldValue) {
      this.$emit("input", fieldValue)
      this.$emit('change', fieldValue);
    }
  }

}
</script>
