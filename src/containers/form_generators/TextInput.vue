<template>
  <b-form-group v-if="isShow"
    :label="label + this.valid_star"
    :label-cols="labelClass ? labelClass : 3"
    label-size="sm"
    :horizontal="true">  
    <input type="text" class="form-control form-control-sm"
      :placeholder="placeholder"
      :id="id"
      @change="onChange"
      :name="fieldName"
      :value="value" 
      @input="$emit('input',$event.target.value)"
      v-validate="vvalidate" 
      :data-vv-as="label"
      :class="{[formClass]: true, 'is-invalid': errors.has(fieldName) }" 
      :disabled="isDisabled"
      :readonly="isReadOnly"
      >
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
  </b-form-group>
  
  
</template>
<script>
import FormError from "@/containers/FormError";
export default {
  components: { FormError },
  name: 'TextInput',
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
    labelClass:{
      default:''
    },
    formClass:{ default:"col-md-12"},
    isShow: { default: true },
    isReadOnly: { default: false }
  },
  data() {
    return{
      valid_star: ''
    }
  },
  mounted: function() {
    this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
  },
  methods:{
      onChange: function(event) {
          this.$emit('change', event.target.value);
      },
      onkeyup: function(event) {
          this.$emit('keyup', event.target.value);
      }
  }
}
</script>