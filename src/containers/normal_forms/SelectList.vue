<template>
  <b-col :class="formClass ? formClass : 'col-md-4'"  v-if="isShow">
    <b-form-group
      :label="label + this.valid_star"
      label-for="label"
      label-size="sm"> 
      <b-form-select
              class="form-control form-control-sm"
              :multiple="multi"
              :id="id"
              :name="fieldName"
              :value="value"
              @input="$emit('input',$event)"
              @change="onChange"
              v-validate="vvalidate"
              :data-vv-as="label"
              :disabled="isDisabled"
              :class="{'form-control': true, 'is-invalid': errors.has(fieldName) || errorMsg}"
              :options="options">
      </b-form-select>
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
    </b-form-group>
  </b-col>
</template>
<script>
import FormError from "@/containers/FormError";
import Vue from 'vue';
export default {
  components: { FormError },
  name: 'SelectList',  
  inject: ['$validator'],
  props: {
    multi: {},
    options: {},
    placeholder: { type: String },
    label: { type: String },
    fieldName: { type: String, default: '' },
    value: { default: '' },
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
  },
  methods:{
    onChange: function(event) {
      let _this = this;
      Vue.nextTick(function(){
      _this.$emit('change', event);
      })
    }
  }
  
}
</script>