<template>
  <b-row class="form-row" id="report-search">   
    <component v-for="(field, index) in schema"
      :key="index"
      :is="field.fieldType"
      :value="formValue[field.fieldName]"  
      @input="updateForm(field, $event)"               
      @change="onChangeMethod(field, $event)"
      @hit="onHitMethod(field, $event)"
      :errorMsg="errorMessage[field.fieldName]"            
      v-bind="field"
      ref="childComponent"
      :vvalidate="field.vvalidate"
      :formClass="field.formClass">
    </component>
    <div v-if="isSearch" class="col-auto rep_btn"  style="margin-top: 27px;">
     <b-button @click="handleSearch" type="submit" variant="primary" size="sm"><i class="fa fa-search fa-sm"></i>&nbsp;{{ searchName ? searchName : $t("show_report") }}</b-button>&nbsp;
    <b-button v-if="isSearch" variant="danger" size="sm" class="add" @click="handleReset()">
        <i class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
    </b-button>
    </div>
  </b-row>
</template>

<script>
import NumberInput from "./NumberInput";
import SelectList from "./SelectList";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import RadioList from "./RadioInput";
import TextAreaInput from "./TextAreaInput";
import CheckBoxList from "./CheckBoxInput";
import FileInput from "./FileInput";
import HiddenInput from "./HiddenInput";
import TimeInput from "./TimeInput";
import StaticField from "./StaticField";
import AutoComplete from "./AutoComplete";
import SelectSearchList from "./SelectSearchList";
export default {
  name: "FormGenerator",
  components: { TextInput, TextAreaInput, DateInput, NumberInput, SelectList, RadioList, CheckBoxList, FileInput, HiddenInput, TimeInput, StaticField, AutoComplete, SelectSearchList },
 inject: ['$validator'],
  props: {
    schema: {},
    formValue: {},
    errorMessage: {default:''},
    searchName:{default:""},
    isSearch: {default: false},
    isOnChangeLoad:{default: false}
  },
  data() {
    return {
      resetData:{}
    }
  },
  mounted:function(){
    let formData = {}; 
    formData = Object.assign({}, this.formValue); 
    this.resetData = Object.assign({}, formData);
  },
  methods: {
    updateForm(field, value) {
      this.$set(this.formValue, field.fieldName, value);
      this.$emit("input", this.formValue);
      if(this.isOnChangeLoad) {
         this.onChangeMethod(field, value);
      }
    }, 
    onChangeMethod(field, value){
      this.$store.dispatch('auth/setLoadingShow', false);
      if(field.onChange){
        this.$emit('change', field.fieldName, value);
      }
      if(field.fieldType == "AutoComplete" && value == '') {
        let defaultValue = (this.resetData[field.fieldName] == undefined) ? '' : this.resetData[field.fieldName];
        this.$set(this.formValue, field.fieldName, defaultValue);
      }     
    },
    onHitMethod(field, value){
      if(field.onHit){
        this.$emit('hit', field.fieldName, value);
      }
    },
    handleSearch: function() {
      this.$store.dispatch('auth/setLoadingShow', true);
    },
    handleReset: function() {
      this.$store.dispatch('auth/setLoadingShow', true);
      if(Object.keys(this.schema).length > 0) {
        let index = 0;
        for(let key in this.schema) {
          if(this.resetData[key] != undefined) {
            this.updateForm(this.schema[key], this.resetData[key]);
          } else {
            this.updateForm(this.schema[key], '');
          }
          if(this.schema[key]['fieldType'] == "AutoComplete") {
            this.$refs.childComponent[index].loadData(true);
          }
          if(this.schema[key]['fieldType'] == "SelectSearchList") {
            let selectedVal = '';
            this.$refs.childComponent[index].selectedVal = selectedVal;
          }
          index++;
        }
      }
      if(this.isSearch) {
        try {
				  this.$parent.handleReset()
        } catch (error) {
        }
        if(this.$parent.report_view) {
          this.$parent.report_view = "";
        }
        if(this.$parent.report_html) {
          this.$parent.report_html = "";
        }
      }
    } 
  }
}
</script>

<style>
div#report-search label{
    font-size: 11px;
    padding-bottom: 0px;
    margin-left: 3px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 99%;
    text-transform: capitalize;
}
div#report-search label:hover{
    font-size: 11px;
    padding-bottom: 0px;
    margin-left: 3px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 99%;
}

div#report-search .form-control-sm{
  padding: 0.15rem 0.2rem;
  font-size: 11px;
  height: calc(1.3rem + 2px);
}
div#report-search .form-group{
      margin-bottom: 0px;
}
form.report-search-form{

}
form.report-search-form button{
    line-height: 1;
    font-size: 11px;
    padding: 0.20rem 0.3rem;
        margin-top: 22px;
}
span.required{
  color: red;
}
#report-container{
  max-width: 100%;
  overflow:auto;
  max-height: 350px;
}
 #report-container::-webkit-scrollbar-track
  {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
  }

  #report-container::-webkit-scrollbar
  {
        width: 8px;
        height: 8px;
        background-color: #F5F5F5;
  }
  #report-container::-webkit-scrollbar:hover::-webkit-scrollbar
  {
        width: 10px;
        height: 10px;
        background-color: #F5F5F5;
  }

  #report-container::-webkit-scrollbar-thumb
  {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: rgb(122, 122, 122);
  }

</style>
