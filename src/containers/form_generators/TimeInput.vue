<template>
    <b-form-group
        :label="label + this.valid_star"
        :label-cols="labelClass ? labelClass : 3"
        label-size="sm"
        class="c-timepicker"
        :horizontal="true">
        <vue-timepicker 
            v-if="load"
            format="hh:mm A" 
            :minute-interval="15" 
            lang="en"
            :placeholder="placeholder"
            :id="id"
            :name="fieldName"
            v-validate="vvalidate"
            @change="onChange"
            :data-vv-as="label"
            :class="{'': true, 'is-invalid': errors.has(fieldName) }" 
            :disabled="isDisabled"
            :value="yourTimeValue">
        </vue-timepicker>
        <form-error :message="errors.first(fieldName) || errorMsg"></form-error>
    </b-form-group>
</template>
<script>
    import VueTimepicker from 'vue2-timepicker'
    import FormError from "@/containers/FormError";
    export default {
        components: {VueTimepicker, FormError},
        name: 'TimeInput',
        inject: ['$validator'],
        props: {
            placeholder: {type: String},
            label: {type: String},
            fieldName: {type: String, default: ''},
            value: {},
            vvalidate: {},
            errorMsg: {},
            id: {},
            isDisabled: {},
            labelClass:{
                default:''
            },
            formClass:{ default:"col-md-4"},
        },
        data() {
            return{
                yourTimeValue: {},
                valid_star: '',
                load: false
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            loadData: function(isReset = false) {
                this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
                var fullTime = this.value ?this.value.split(" "):"";
                if(fullTime && !isReset) {
                    this.yourTimeValue = {
                        hh: fullTime[0].split(":")[0],
                        mm: fullTime[0].split(":")[1] ? (fullTime[0].split(":")[1]==="0"? "00": fullTime[0].split(":")[1]):"00",
                        A: fullTime[1]
                    }
                } else {
                    this.yourTimeValue = {};
                }
                this.load = true;
            },
            onChange (eventData) {
               // console.log("evenData", eventData);
                this.$emit('change', eventData.data.hh+":"+eventData.data.m+" "+eventData.data.A);
            }
        }
    }
</script>
<style>
    .c-timepicker .time-picker{width: 100%;}
   .c-timepicker .time-picker .display-time{width: 100%;}
</style>
