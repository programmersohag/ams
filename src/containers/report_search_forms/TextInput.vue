<template>
  <b-col :class="formClass ? formClass : 'col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2'" v-if="isShow">
    <b-form-group
      :label="label + this.valid_star"
      label-for="label"
      label-size="sm">
      <input type="text" class="form-control form-control-sm" 
        :placeholder="placeholder"
        :id="id"
        @change.native="onChangeMethod"
        :name="fieldName"
        :value="value" 
        @input="$emit('input',$event.target.value)"
        v-validate="vvalidate" 
        :data-vv-as="label"
        :title="errors.first(fieldName) || errorMsg"
        v-bind:class="{'form-control': true, 'is-invalid': errors.has(fieldName) || errorMsg}"
        :disabled="isDisabled"
        :readonly="isReadOnly"
        >
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
  }
}
</script>