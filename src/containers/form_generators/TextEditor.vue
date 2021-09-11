<template>
  <b-form-group v-if="isShow"
                :label="label + this.valid_star"
                :label-cols="labelClass ? labelClass : 3"
                label-size="sm"
                :horizontal="true">
    <vue-ckeditor type="classic"
                  class="form-control form-control-sm"
                  :placeholder="placeholder"
                  :id="id"
                  :name="fieldName"
                  :value="value"
                  v-validate="vvalidate"
                  :data-vv-as="label"
                  @input="$emit('input',$event)"
                  :editors="editors"
                  :class="{[formClass]: true, 'is-invalid': errors.has(fieldName) }"
                  :disabled="isDisabled"
                  :readonly="isReadOnly">
    </vue-ckeditor>
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
  </b-form-group>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'
import FormError from "@/containers/FormError";

export default {
  components: {FormError, 'vue-ckeditor': VueCkeditor.component},
  name: "TextEditor",
  inject: ['$validator'],
  props: {
    placeholder: { type: String },
    label: { type: String },
    vvalidate: {default:''},
    errorMsg: {},
    value: '',
    id: {},
    fieldName: { type: String, default: '' },
    isDisabled: {},
    labelClass:{
      default:''
    },
    formClass:{ default:"col-md-12"},
    isShow: { default: true },
    isReadOnly: { default: false }
  },
  data() {
    return{
      valid_star: '',
      editors: {
        classic: ClassicEditor
      },
    }
  },
  mounted: function() {
    this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
  }
}
</script>

<style scoped>

</style>
