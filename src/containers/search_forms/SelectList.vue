<template>

     <b-form-select :class="formClass ? formClass : 'col-sm-1'"  v-if="isShow" 
        class="mr-md-2 form-control form-control-sm"
        :plain="true"
        :id="id"       
        :name="fieldName"
        :value="value"
        @input="$emit('input',$event)"
        @change="onChange"
        :title="errors.first(fieldName) || errorMsg"
        v-validate="vvalidate"
       
        :disabled="isDisabled" 
        :options="options">
    </b-form-select>

</template>
<script>
    import FormError from "@/containers/FormError";
    import Vue from 'vue';
    export default {
        components: {FormError},
        name: 'SelectList',
        inject: ['$validator'],
        props: {
            id: {},
            multi: {},
            options: {},
            placeholder: {type: String},
            label: {type: String},
            fieldName: {type: String, default: ''},
            value: {default: ''},
            vvalidate: {
                default: ''
            },
            errorMsg: {},
            isDisabled: {default: false},
            isShow: {default: true},
            formClass:{
                default: ''
            },
        },
        data() {
            return {
                valid_star: ''
            }
        },
        mounted: function () {
            this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
        },
        methods: {
            onChange: function (event) {
                //this.$emit('change', event);
                let _this = this;
                Vue.nextTick(function(){
                _this.$emit('change', event);
                })
            }
        }
    }
</script>