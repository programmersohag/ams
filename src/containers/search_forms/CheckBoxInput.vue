<template>
<b-form-group            
            :label="label"
            :label-cols="3"
            :horizontal="true">  
    
    <b-form-checkbox-group stacked  class="col-sm-6" :id="'basicCustomCheckboxes'+fieldName">
              <div class="custom-control custom-checkbox" v-for="(option,key) in options"  :key="key">
                <input type="checkbox" class="custom-control-input" :id="fieldName+key" :name="fieldName" :value="key" :checked="key == value" @change="$emit('input',$event.target.value)" >
                <label class="custom-control-label" :for="fieldName+key">{{option}}</label>
              </div>
            </b-form-checkbox-group>

  </b-form-group>
  
  
</template>
<script>
export default {
  name: 'CheckBoxList',
  // created() {
  //   console.log(this.fieldValue)  //undefined;
  // },  
  props: ['options', 'fieldName', 'label', 'value', 'vvalidate']
}
</script>