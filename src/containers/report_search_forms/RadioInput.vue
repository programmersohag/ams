<template>
  <b-col :class="formClass ? formClass : 'col-md-4'"  v-if="isShow">
    <b-form-group            
      :label="label + this.valid_star"
      label-for="label"
      label-size="sm">  
    <b-form-radio-group :id="'basicRadiosCustom'+fieldName">
      <div class="custom-control custom-radio custom-control-inline" v-for="(option, key) in options"  :key="key">
        <input type="radio" 
        :id="fieldName+key" 
        class="custom-control-input" 
        :name="fieldName" :value="key" 
        :checked="key == value" 
        @change="onChange">
        <label class="custom-control-label" :for="fieldName+key">{{option}}</label>
      </div>
    </b-form-radio-group>
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
    </b-form-group>
  </b-col>
</template>
<script>
import FormError from "@/containers/FormError";
export default {
  components: { FormError },
  name: 'RadioList',
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
    onChange: function(event) {
      this.$emit('input', event.target.value);
      this.$emit('change', event.target.value);
    }
  }
}

</script>