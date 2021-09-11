<template>
  <b-col :class="formClass ? formClass : 'col-md-4'"  v-if="isShow">
    <b-form-group 
      :label="label + this.valid_star"
      label-for="label"
      label-size="sm"> 
            
    <input type="number"  
      class="form-control form-control-sm"
      :placeholder="placeholder"
      :id="id"
      :name="fieldName"
      :value="value" 
      @input="$emit('input',$event.target.value)"
      v-validate="vvalidate" 
      :data-vv-as="label"
      :class="{'form-control': true, 'is-invalid': errors.has(fieldName) }" 
      :disabled="isDisabled">
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
  </b-form-group>
  </b-col>
</template>
<script>
import FormError from "@/containers/FormError";
export default {
  components: { FormError },
  inject: ['$validator'],
  props: {
    placeholder: { type: String },
    label: { type: String },
    fieldName: { type: String, default: '' },
    value: {},
    vvalidate: {
      default:''
    },
    errorMsg: {},
    id: {},
    isDisabled: {},
    formClass:{
      default: ''
    },
    isShow: { default: true }
  },
   data() {
    return{
      valid_star: ''
    }
  },
  mounted: function() {
    this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
  }
}
</script>