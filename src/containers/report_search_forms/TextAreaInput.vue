<template>
<b-col :class="formClass ? formClass : 'col-md-4'">
  <b-form-group
    :label="label + this.valid_star"
    label-for="label"
    label-size="sm">
    <textarea class="form-control form-control-sm" 
            :id="id"
            :textarea="true" 
            :rows="3"
            :placeholder="placeholder"
            :name="fieldName"
            :value="value" 
            @input="$emit('input',$event.target.value)"
            v-validate="vvalidate" 
            v-bind:class="{'form-control': true, 'error': errors.has(fieldName) }" 
            :disabled="isDisabled"
            >  
    </textarea>  
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
  </b-form-group>
</b-col>
</template>
<script>
import FormError from "@/containers/FormError";
export default {
  components: { FormError },
  name: 'TextAreaInput',
  props: {
    placeholder: { type: String },
    label: { type: String },
    fieldName: { type: String, default: '' },
    value: {},
    vvalidate: {default:''},
    errorMsg: {},
    id: {},
    isDisabled: {},
    formClass:{
      default: ''
    }
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