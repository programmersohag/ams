<template>
  <b-row>
    <component v-for="(field, index) in schema"
               :key="index"
               :is="field.fieldType"
               :value="formValue[field.fieldName]"
               @input="updateForm(field, $event)"
               @change="onChangeMethod(field, $event)"
               @blur="onBlurMethod(field, $event)"
               :errorMsg="errorMessage[field.fieldName]"
               v-bind="field"
               :vvalidate="field.vvalidate"
               :isField="field.isField"
               :htmlDesign="field.htmlDesign"
               :formClass="field.formClass">
    </component>
    <slot></slot>
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
import ImageInput from "./ImageInput";
import AutoComplete from "./AutoComplete";
import Style from "./Style";
import SelectSearchList from "./SelectSearchList";
import TextEditor from "@/containers/form_generators/TextEditor";

export default {
  name: "FormGenerator",
  components: {
    TextInput,
    AutoComplete,
    ImageInput,
    TextAreaInput,
    DateInput,
    NumberInput,
    SelectList,
    RadioList,
    CheckBoxList,
    FileInput,
    HiddenInput,
    TimeInput,
    StaticField,
    Style,
    SelectSearchList,
    TextEditor
  },
  inject: ['$validator'],
  props: {
    schema: {},
    formValue: {},
    errorMessage: {default: ''},
    isSubmitBtn: {default: false},
    isOnChangeLoad: {default: false}
  },
  methods: {
    updateForm(field, value) {
      this.$set(this.formValue, field.fieldName, value);
      this.$emit("input", this.formValue);
      if (this.isOnChangeLoad) {
        this.onChangeMethod(field, value);
      }
    },
    onBlurMethod(field, value) {
      this.$store.dispatch('auth/setLoadingShow', false);
      if (field.onBlur) {
        this.$emit('blur', field.fieldName, value);
      }
    },
    onChangeMethod(field, value) {
      this.$store.dispatch('auth/setLoadingShow', false);
      if (field.fieldType == "ImageInput" && value) {
        this.$set(this.formValue, field.fieldName, value);
      }
      if (field.onChange) {
        this.$emit('change', field.fieldName, value);
      }
    }
  },
  computed: {
    submitCheck: function () {
      return false;
    }
  }
}
</script>

<style>
span.required {
  color: red;
}
</style>
