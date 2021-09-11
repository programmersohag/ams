<template>
<b-form-group            
            :label="label"
            :label-cols="3"
            :horizontal="true">  
    
    <b-form-radio-group class="col-sm-6" :id="'basicRadiosCustom'+fieldName">
              <div class="custom-control custom-radio custom-control-inline" v-for="(option, key) in options"  :key="key">
                <input type="radio" :id="fieldName+key" class="custom-control-input" :name="fieldName" :value="key" :checked="key == value" @change="$emit('input',$event.target.value)">
                <label class="custom-control-label" :for="fieldName+key">{{option}}</label>
              </div>
    </b-form-radio-group>
    

  </b-form-group>
  
  
</template>
<script>
export default {
  name: 'RadioList',
  props: ['options', 'fieldName', 'label', 'value', 'vvalidate']  
}

</script>