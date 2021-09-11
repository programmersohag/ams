<template>
    <b-form-group
      :label="label + this.valid_star"
      :label-cols="labelClass ? labelClass : 3"
      label-size="sm"
      :horizontal="true">
      <date-picker
        :date-format="dateFormat"
        :maxDate="maxDate"
        :placeholder="placeholder"
        :name="fieldName"
        :value="value"
        v-validate="vvalidate"
        :data-vv-as="label"
        :class="{[formClass]: true, 'is-invalid': errors.has(fieldName) }"
        class="form-control form-control-sm"
        @input="formatDate(fieldName, $event)"
        :readonly="isReadOnly"
        :disabled="isDisabled">
      </date-picker>
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
  </b-form-group>

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
    isDisabled: {},
    dateFormat:{
      default:'dd-mm-yy'
    },
    maxDate: null,
    isReadOnly: { default: false },
    labelClass:{
      default:''
    },
    formClass:{ default:"col-md-12"},
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
