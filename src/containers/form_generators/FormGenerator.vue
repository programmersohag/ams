<template>
  <div>
    <component v-for="(field, index) in schema"
               :key="index"
               :is="field.fieldType"
               :value="formValue[field.fieldName]"
               :defaultValue="field.defaultValue"
               @input="updateForm(field, $event)"
               @change="onChangeMethod(field, $event)"
               @hit="onHitMethod(field, $event)"
               :errorMsg="errorMessage[field.fieldName]"
               ref="childComponent"
               v-bind="field"
               :vvalidate="field.vvalidate"
               :isField="field.isField"
               :labelClass="field.labelClass"
               :extra1="field.extra1"
               :listData="field.listData">
    </component>
  </div>
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
import ImageInput from "./ImageInput";
import PasswordInput from "./PasswordInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import AutoComplete from "./AutoComplete";
import StaticField from "./StaticField";
import SelectSearchList from "./SelectSearchList";
import MultiSelectList from "@/containers/form_generators/MultiSelectList";
import TextEditor from "@/containers/form_generators/TextEditor";

export default {
  name: "FormGenerator",
  components: {
    TextInput,
    TextAreaInput,
    DateInput,
    NumberInput,
    ConfirmPasswordInput,
    SelectList,
    RadioList,
    CheckBoxList,
    FileInput,
    HiddenInput,
    TimeInput,
    PasswordInput,
    AutoComplete,
    StaticField,
    ImageInput,
    SelectSearchList,
    MultiSelectList,
    TextEditor
  },
  props: {
    schema: {},
    formValue: {},
    errorMessage: {default: ''},
    isOnChangeLoad: {default: false}
  },
  inject: ['$validator'],
  methods: {
    updateForm(field, value) {
      this.$set(this.formValue, field.fieldName, value);
      this.$emit("input", this.formValue);
      if (this.isOnChangeLoad) {
        this.onChangeMethod(field, value);
      }
    },
    onChangeMethod(field, value) {
      this.$store.dispatch('auth/setLoadingShow', false);
      let default_value = field.default;
      if (field.fieldType == "ImageInput" && value) {
        this.$set(this.formValue, field.fieldName, value);
      }
      if (field.onChange) {
        this.$emit('change', field.fieldName, value);
      }
    },
    onHitMethod(field, value) {
      if (field.onHit) {
        this.$emit('hit', field.fieldName, value);
      }
    },
    handleReset: function () {
      if (Object.keys(this.schema).length > 0) {
        let index = 0;
        for (let key in this.schema) {
          if (this.schema[key]['fieldType'] === "AutoComplete") {
            this.$refs.childComponent[index].loadData();
          }
          if (this.schema[key]['fieldType'] === "TimeInput") {
            this.$refs.childComponent[index].loadData(true);
          }
          if (this.schema[key]['fieldType'] === "SelectSearchList") {
            this.$refs.childComponent[index].selectedVal = '';
          }
          index++;
        }
      }
    }
  },
}
</script>
<style>
span.required {
  color: red;
}
</style>

