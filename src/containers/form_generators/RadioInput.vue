<template>
<b-form-group v-if="isShow"          
    :label="label + valid_star"
    :label-cols="labelClass ? labelClass : 3"
    label-size="sm"
    :horizontal="true"> 
    <b-form-radio-group :id="'basicRadiosCustom'+fieldName">
              <div class="custom-control custom-radio custom-control-inline" v-for="(option, key) in options"  :key="key">
                <input type="radio" :id="fieldName+key" class="custom-control-input" :name="fieldName" :value="key" :checked="key == value"
            @change="onChange">
                <label class="custom-control-label" :for="fieldName+key">{{option}}</label>
              </div>
    </b-form-radio-group>
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>

  </b-form-group>
  
  
</template>
<script>
import FormError from "@/containers/FormError";
export default {
  components: { FormError },
  inject: ['$validator'],
  name: 'RadioList',
  props: {
    label: {},
    options: {},
    fieldName: {},
    value: {},
    vvalidate: {default:''},
    errorMsg: {},
    isDisabled: {},
    labelClass:{
      default:''
    },
    isShow: { default: true }
  }, 
  data() {
    return {
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