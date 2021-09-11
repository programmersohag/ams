<template>
    <b-col :class="formClass ? formClass : 'col-md-4'">
    <b-form-group
        :label="label + this.valid_star"
        label-for="label"
        label-size="sm">
        <vue-timepicker format="hh:mm A" :minute-interval="15" lang="en"
            :placeholder="placeholder"
            :id="id"
            :name="fieldName"
            v-validate="vvalidate"
            @change="onChange"
            :data-vv-as="label"
            v-bind:class="{'error': errors.has(fieldName) }"
            :disabled="isDisabled"
            :value="yourTimeValue">
        </vue-timepicker>
        <form-error :message="errors.first(fieldName) || errorMsg"></form-error>

    </b-form-group>
    </b-col>
</template>
<script>
    import VueTimepicker from 'vue2-timepicker'
    import FormError from "@/containers/FormError";
    export default {
        components: {VueTimepicker, FormError},
        name: 'TimeInput',
        props: {
            placeholder: {type: String},
            label: {type: String},
            fieldName: {type: String, default: ''},
            value: {},
            vvalidate: {default:''},
            errorMsg: {},
            id: {},
            isDisabled: {},
            formClass:{default:''}
        },
        data() {
            return{
                yourTimeValue: {},
                valid_star: ''
            }

        },
        mounted() {
            this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
            var fullTime = this.value ?this.value.split(" "):""
            if(fullTime) {
                this.yourTimeValue = {
                    hh: fullTime[0].split(":")[0],
                    mm: fullTime[0].split(":")[1],
                    A: fullTime[1]
                }
            }
        },
        methods: {
            onChange (eventData) {
                this.$emit('change', eventData.data.H%12+":"+eventData.data.m+" "+eventData.data.A);
            }
        }

    }
</script>