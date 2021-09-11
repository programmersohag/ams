<template>
  <b-form-group v-if="isShow"
            :label="label + this.valid_star"
            :label-cols="labelClass ? labelClass : 3"
            label-size="sm"
            :horizontal="true">
    <b-input-group>
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
        :plain="true"
        :class="{[formClass]: true, 'is-invalid': errors.has(fieldName) }"
        :disabled="isDisabled"
         :options="options">
      </b-form-select>
      <b-input-group-append v-if="isShowRightButton">
        <b-button size="sm" text="Button" variant="success" v-on:click="$router.push({ path: rightButtonRouteName, query: {openSaveModal: rightButtonFromRouteName} })"><i class="fa fa-plus fa-sm"></i></b-button>
      </b-input-group-append>
    </b-input-group>
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
    <div v-if="extra1 !== ''">{{ extra1 }}</div>
  </b-form-group>
</template>
<script>
import FormError from "@/containers/FormError";
import router from "../../router";
import Vue from 'vue'
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
      valid_star: ''
    }
  },
  mounted: function() {
    this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
  },
  methods:{
    onChange: function(event) {
     let _this = this;
     if(this.isNextTick) {
        _this.$emit('change', event);
     } else {
       Vue.nextTick(function(){
        _this.$emit('change', event);
      })
     }
    }
  }
  
}
</script>