<template>
  <b-form-group
            :description="label"
            :label="label"
            :label-cols="3"
            :horizontal="true"> 
            
    <input type="number"  class="form-control col-sm-6"
          :placeholder="placeholder"
          :name="fieldName"
          :value="value" 
          @input="$emit('input',$event.target.value)"
          v-validate="vvalidate" 
          :data-vv-as="label"
          v-bind:class="{'form-control': true, 'error': errors.has(fieldName) }" 
          >
    <span v-show="errors.has(fieldName)" class="text-danger">{{ errors.first(fieldName) }}</span>
  </b-form-group>
</template>
<script>
export default {
  name: 'NumberInput',
  // props: ['placeholder', 'label', 'fieldName', 'value', 'vvalidate']
  props: {
    placeholder: { type: String },
    label: { type: String },
    fieldName: { type: String, default: '' },
    value: {},
    vvalidate: {}
  }
}
</script>