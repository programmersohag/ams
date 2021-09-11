<template>
  <b-form-group v-if="isShow"
                :label="label + valid_star"
                :label-cols="labelClass ? labelClass : 3"
                :horizontal="true">

    <textarea class="form-control form-control-sm"
              :id="id"
              :textarea="true"
              :rows="3"
              :placeholder="placeholder"
              :name="fieldName"
              :value="value"
              @input="$emit('input',$event.target.value)"
              v-validate="vvalidate"
              :data-vv-as="label"
              :class="{[formClass]: true, 'is-invalid': errors.has(fieldName) }"
              :disabled="isDisabled"
    >
    </textarea>
    <form-error :message="errors.first(fieldName) || errorMsg"></form-error>
  </b-form-group>
</template>
<script>
    import FormError from '@/containers/FormError';

    export default {
        components: {FormError},
        name: 'TextAreaInput',
        inject: ['$validator'],
        props: {
            placeholder: {type: String},
            label: {type: String},
            fieldName: {type: String, default: ''},
            value: {},
            vvalidate: {default: ''},
            errorMsg: {},
            id: {},
            isDisabled: {},
            labelClass: {
                default: ''
            },
            formClass:{ default:"col-md-12"},
            isShow: {default: true}
        },
        data() {
            return {
                valid_star: ''
            };
        },
        mounted: function() {
            this.valid_star = this.vvalidate.includes('required') ? '<span class="required">*</span>' : '';
        }
    };
</script>
