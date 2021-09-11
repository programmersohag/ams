<template>
  <b-form-group v-if="isShow"
                :label="label + this.valid_star"
                :label-cols="labelClass ? labelClass : 3"
                label-size="sm"
                :horizontal="true">
    <input type="number"  class="form-control form-control-sm"
           :placeholder="placeholder"
           :id="id"
           :name="fieldName"
           :value="value"
           @input="$emit('input',$event.target.value)"
           @keyup="onChange"
           @keydown="onChange"
           @change="onChange"
           v-validate="vvalidate"
           :data-vv-as="label"
           v-bind:class="{[formClass]: true, 'is-invalid': errors.has(fieldName) }"
           :readonly="isReadOnly"
           :disabled="isDisabled">
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
  </b-form-group>
</template>
<script>
  import FormError from "@/containers/FormError";
  export default {
    components: { FormError },
    inject: ['$validator'],
    props: {
      placeholder: { type: String },
      label: { type: String },
      maxlength:11,
      fieldName: { type: String, default: '' },
      value: {},
      vvalidate: {
        default:''
      },
      errorMsg: {},
      id: {},
      isDisabled: {},
      isReadOnly: { default: false },
      labelClass:{
        default:''
      },
      formClass:{ default:"col-md-12"},
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
        this.$emit('change', event.target.value);
      }
    }
  }
</script>
