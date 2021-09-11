<template>

    <b-form-group
            :description="label"
            :label="label"
            :label-cols="3"
            :horizontal="true">  
    
    <b-form-file  :id="id" :plain="true"
          :placeholder="placeholder"
          :name="fieldName"
          :value="value"
          @change="$emit('input',$event.target.value)">           
    </b-form-file>
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>

  </b-form-group>
  
</template>
<script>
import FormError from "@/containers/FormError";
export default {
  components: { FormError },
  name: 'FileInput',
  props: {
    placeholder: { type: String },
    label: { type: String },
    fieldName: { type: String, default: '' },
    value: {},
    vvalidate: {},
    errorMsg: {},
    id: {},
  }
  
}
</script>