<template>
  <b-col :class="formClass ? formClass : 'col-md-4'" v-if="isShow">
   <div class="form-control-sm">
       <label for="label" class="col-form-label col-form-label-sm pt-0">{{label}}</label>
       <div class="form-control form-control-sm form-control" style="background-color: #ddd;">{{value}}</div>
    </div>
  </b-col>
  
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