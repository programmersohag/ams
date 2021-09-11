<template>
    <date-picker class=" mr-sm-2 form-control form-control-sm" 
        date-format="yy-mm-dd"
                 :placeholder="placeholder"
                 :name="fieldName"
                 :value="value"
                 v-validate="vvalidate"
                 :title="errors.first(fieldName) || errorMsg"
                 :data-vv-as="label"
                 v-if="isShow"
                 :disabled="isDisabled"
                 :class="{[formClass]: true, 'is-invalid': errors.has(fieldName) || errorMsg}"
                 @input="formatDate(fieldName, $event)">

    </date-picker>
</template>
<script>
    import DatePicker from "@/containers/DatePicker";
    import FormError from "@/containers/FormError";

    export default {
        components: {DatePicker, FormError},
        name: 'DateInput',
        inject: ['$validator'],
        props: {
            placeholder: {type: String},
            label: {type: String},
            fieldName: {type: String, default: ''},
            value: {},
            vvalidate: {default:''},
            errorMsg: {},
            id: {},
            isDisabled: {},
            isShow: {default: true},
            formClass:{
               default: 'col-sm-1'
            },
        },
        methods: {
            formatDate(fieldName, fieldValue) {
                this.$emit("input", fieldValue)
                this.$emit('change', fieldValue);
            }
        }
    }
</script>
