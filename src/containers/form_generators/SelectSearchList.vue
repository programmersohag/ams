<template>
  <b-form-group v-if="isShow"
            :label="label + this.valid_star"
            :label-cols="labelClass ? labelClass : 3"
            label-size="sm"
            :horizontal="true">
        <multiselect
            v-model="selectedVal"
            :options="options" 
            placeholder="Select one" 
            @input="updateValueAction"
            label="text" 
            track-by="text">
        </multiselect>
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
  </b-form-group>
</template>
<script>
import FormError from "@/containers/FormError";
import Multiselect from 'vue-multiselect';
import Vue from 'vue'
export default {
  components: { FormError, Multiselect },
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
    extra1: '',
    id: {},
    isDisabled: {},
    labelClass:{
      default:''
    },
    isNextTick: {default:false},
    formClass:{ default:"col-md-12"},
    isShow: { default: true },
    isShowRightButton: { default: false },
      rightButtonRouteName: '',
      rightButtonFromRouteName: ''
  },
  data() {
    return{
      valid_star: '',
      val: { text: '---Select---', value: '' }
    }
  },
  mounted: function() {
    this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
  },
  methods:{
    updateValueAction: function(event) {
      this.$emit('input',event.value)
      this.onChange(event)
    },
    onChange: function(event) {
      let _this = this;
      Vue.nextTick(function(){
      _this.$emit('change', event.value);
      })
    }
  },
  computed: {
    selectedVal: {
      // getter
      get: function () {
        let selectedData = {};
        if(Object.keys(this.options).length > 0 && this.value) {
          for(let key in this.options) {
            if(this.value == this.options[key]['value']) {
              selectedData = {text:this.options[key]['text'], value: this.value};
            }
          }
          return this.val = selectedData;
        }
        return this.val;
      },
      // setter
      set: function (newValue) {
        return this.val = newValue;
      }
    }
  }
  
}
</script>
<style src="@/assets/css/multiselect.css"></style>
<style>
div.select-search .multiselect{
  min-height: 25px;
}
div.select-search .multiselect__tags {
  min-height: 22px;
  display: block;
  padding: 3px 40px 0 8px;
  font-size: 11px;
  height: 25px;
}
div.select-search .multiselect__select{
  height: 22px;
}
div.select-search li.multiselect__element{
  font-size: 11px;
}
div.select-search li.multiselect__element span.multiselect__option{
    color:#000000;
    padding: 8px;
    line-height: 12px;
    min-height: 30px;
}
div.select-search li.multiselect__element span.multiselect__option--highlight:after {
  content: "";
}
div.select-search span.multiselect__single{
  font-size: 11px;
    margin-bottom: 0px;
    line-height: 16px;
}
div.select-search .multiselect__input{
  font-size: 11px;
}
</style>