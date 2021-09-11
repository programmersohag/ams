<template>
  <b-form-group v-if="isShow"
    :label="label + this.valid_star"
    :label-cols="labelClass ? labelClass : 3"
    label-size="sm"
    :horizontal="true">
    <div v-if="isField" :class="formClass ? formClass : 'form-control form-control-sm'" style="">{{value}}</div>
  </b-form-group>
</template>
<script>
export default {
  name: 'StaticField',
  props: {
    placeholder: { type: String },
    label: { type: String },
    fieldName: { type: String, default: '' },
    value: {},
    id: {},
    isDisabled: {},
    formClass:{
      default: ''
    },
    labelClass:{
      default:''
    },
    isField:{
      default:true
    },
    isShow: { default: true }
  },
  data() {
    return{
      valid_star: ''
    }
  },
  mounted: function() {
    // this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
  }
}
</script>
