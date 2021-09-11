<template>
  <div class="col-md-12">
    <component v-for="(field, index) in schema"
               :key="index"
               :is="field.fieldType"
               :value="formValue[field.fieldName]"
               @input="updateForm(field, $event)"
               @change="onChangeMethod(field, $event)"
               v-bind="field"
               :vvalidate="field.vvalidate"
               :isShow="field.isShow"
               >
    </component>
    <b-button v-if="isSearch" type="submit" :disabled="searchCheck" variant="primary" size="sm">
        <i class="fa fa-search fa-sm"></i>&nbsp;{{ $t("search") }}
    </b-button>&nbsp;
    <b-button v-if="isSearch" variant="danger" size="sm" class="add" @click="handleReset()">
        <i class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
    </b-button>&nbsp;
  </div>
</template>

<script>
    import NumberInput from "./NumberInput";
    import SelectList from "./SelectList";
    import TextInput from "./TextInput";
    import DateInput from "./DateInput";
    import RadioList from "./RadioInput";
    import CheckBoxList from "./CheckBoxInput";
    import HiddenInput from "./HiddenInput";

    export default {
        name: "FormGenerator",
        components: {TextInput, DateInput, NumberInput, SelectList, RadioList, CheckBoxList, HiddenInput},
        inject: ['$validator'],
        props: {
            schema: {},
            formValue: {},
            errorMessage: {default: ''},
            isSearch: {default: false},
            isOnChangeLoad:{default: false},
            repayment_frequencies: {repayment_frequencies:'repayment_frequencies'},
            repayment_frequency:{repayment_frequency:'repayment_frequency'},
            products:{products:'products'},
            product_id:{product_id:'product_id'},
            advance_search:{advance_search:'advance_search'}
        },
        data() {
            return {
                repayment_frequency_value:this.repayment_frequency,
                product_id_value:this.product_id
            }
        },

        methods: {
            updateForm(field, value) {
                this.$set(this.formValue, field.fieldName, value);
                this.$emit("input", this.formValue);
                if(this.isOnChangeLoad) {
                    this.onChangeMethod(field, value);
                }
            },
            onChangeMethod(field, value) {
                this.$store.dispatch('auth/setLoadingShow', false);
                if (field.onChange) {
                    this.$emit('change', field.fieldName, value);
                }
            },
            handleReset:function() {
                this.$emit('handleReset'),
                this.repayment_frequency_value=''
                this.product_id_value=''
            },
            handleAdvanceSearch:function()
            {
                this.$emit('handleAdvanceSearch')
            },
            updateValue: function (name,value) {
                this.$emit('handleChange', name,value);
            }
        },
        computed: {
            searchCheck:function() {
                return false;
            },
        }

    }
</script>

<style scoped>
    span.required {
        color: red;
    }
    div.col-md-12{
        padding-left: 0px;
        padding-right: 0px;
    }
</style>
