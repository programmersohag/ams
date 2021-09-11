<template>
  <b-form-group v-if="isShow"
    :label="label + this.valid_star"
    :label-cols="labelClass ? labelClass : 3"
    label-size="sm"
    :horizontal="true">  
    <input type="password" class="form-control form-control-sm"
      :placeholder="placeholder"
      :id="id"
      :name="fieldName"
      :value="value" 
      :ref="refPassword"
      @input="$emit('input',$event.target.value)"
      v-validate="vvalidate" 
      :data-vv-as="label"
      :class="{[formClass]: true, 'is-invalid': errors.has(fieldName) }" 
      :disabled="isDisabled"
      >
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
  </b-form-group>
  
  
</template>
<script>
import FormError from "@/containers/FormError";
export default {
  components: { FormError },
  name: 'PasswordInput',
  inject: ['$validator'],
  props: {
    placeholder: { type: String },
    label: { type: String },
    fieldName: { type: String, default: '' },
    value: {},
    vvalidate: {default:''},
    refPassword:{default:''},
    errorMsg: {},
    id: {},
    isDisabled: {},
    labelClass:{
      default:''
    },
    formClass:{ default:"col-md-12"},
    isShow: { default: true },
  },
  data() {
    return{
      valid_star: ''
    }
  },
  mounted: function() {
    //console.log(this.refPassword)
    this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
  }
}
</script>
