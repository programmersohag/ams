<template>
    
    <input  type="text" class="mr-sm-2 form-control form-control-sm" 
          :placeholder="placeholder"
          :name="fieldName"
          :value="value" 
          @input="$emit('input',$event.target.value)"
          v-validate="vvalidate" 
          :data-vv-as="label"
          :class="{[formClass]: true, 'error': errors.has(fieldName) }" 
          >
</template>
<script>
export default {
  name: 'TextInput',
  props: {
    placeholder: { type: String },
    label: { type: String },
    fieldName: { type: String, default: '' },
    value: {},
    formClass:{
          default: 'col-sm-1'
      },
    vvalidate: {}
  }
  
}
</script>