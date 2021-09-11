<template>
  <b-col :class="formClass ? formClass : 'col-md-4'"  v-if="isShow">
    <b-form-group            
      :label="label + this.valid_star"
      label-for="label"
      label-size="sm">
      <b-form-checkbox-group :id="'basicCustomCheckboxes'+fieldName">
        <div class="custom-control custom-checkbox custom-control-inline" 
        v-for="(option,key) in options"  :key="key">
          <input type="checkbox" 
          class="custom-control-input" 
          :id="fieldName+key" 
          :name="fieldName" 
          :value="key" 
          :checked="key==value" 
          :disabled="isDisabled"
          @change="onChange()" >
          <label class="custom-control-label" :for="fieldName+key">{{option}}</label>
        </div>
      </b-form-checkbox-group>
      <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
      </b-form-group>
  </b-col>
  
</template>
<script>
import FormError from "@/containers/FormError";
export default {
  components: { FormError },
  name: 'CheckBoxList',  
  inject: ['$validator'],
  props: {
    label: {},
    options: {},
    fieldName: {},
    value: {},
    vvalidate: {default:''},
    errorMsg: {},
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
  },
  methods:{
    onChange: function() {
      this.$emit('input', event.target.checked);
      this.$emit('change', event.target.checked);
    }
  }
}
</script>