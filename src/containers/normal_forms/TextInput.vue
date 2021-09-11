<template>
  <b-col :class="formClass ? formClass : 'col-md-4'" v-if="isShow">
    <b-form-group
      :label="label + this.valid_star"
      label-for="label"
      label-size="sm">
      <input type="text" class="form-control form-control-sm" 
        :placeholder="placeholder"
        :id="id"
        @change="onChange"
        @blur="onBlur"
        :name="fieldName"
        :value="value" 
        @input="$emit('input',$event.target.value)"
        v-validate="vvalidate" 
        :data-vv-as="label"
        v-bind:class="{'form-control': true, 'is-invalid': errors.has(fieldName) }" 
        :disabled="isDisabled"
        :readonly="isReadOnly"
        >
      <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
    </b-form-group>
  </b-col>
  
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
    vvalidate: '',
    errorMsg: {},
    id: {},
    isDisabled: {},
    formClass:{
      default: ''
    },
    isShow: { default: true },
    isReadOnly: { default: false }
  },
  data() {
    return{
      valid_star: ''
    }
  },
  mounted: function() {
    this.valid_star = (this.vvalidate!=undefined && this.vvalidate.includes("required")) ? '<span class="required">*</span>' : '';
  },
  methods:{
    onBlur: function(e){
      this.$emit('blur', e.target.value);
    },
    onChange: function(event) {
      this.$emit('change', event.target.value);
    },
    onkeyup: function(event) {
      this.$emit('keyup', event.target.value);
    }
  }
}
</script>