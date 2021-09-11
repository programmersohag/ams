<template>

      
    
    <input  type="hidden"
          :id="id"
          :name="fieldName"
          :value="value" 
          @input="$emit('input',$event.target.value)"
          >
   
  
</template>
<script>
export default {
  name: 'TextInput',
  props: {
    fieldName: { type: String, default: '' },
    value: {},
    id: {}
  }
  
}
</script>