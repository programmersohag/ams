<template>
    <b-form-group v-if="isShow"
                  :label="label + this.valid_star"
                  :label-cols="labelClass ? labelClass : 3"
                  label-size="sm"
                  :horizontal="true">
        <vue-bootstrap-typeahead
                :data="options"
                :id="id"
                :name="fieldName"
                :v-validate="vvalidate"
                size="sm"
                :serializer="s => s.name"
                :minMatchingChars="minMatchingChars"
                placeholder="Type a name or code..."
                @hit="onChangeHit($event)"
                v-model="memberSearch"
                ref="typeahead"
                class="v-autocomplete"
        >
            <template slot="suggestion" slot-scope="{ data, htmlText }">
                <span v-html="htmlText"></span>
                <template v-for="(index, field) in data">
                    <template v-if="field !== 'id'">
                        <br>
                        <small> {{field}}: {{index}}</small>
                    </template>
                </template>
            </template>
        </vue-bootstrap-typeahead>
        <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
    </b-form-group>


</template>
<script>
    import FormError from "@/containers/FormError";
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
    import _ from 'underscore'
    export default {
        components: { FormError, VueBootstrapTypeahead },
        name: 'AutoComplete',
        inject: ['$validator'],
        props: {
            placeholder: { type: String },
            label: { type: String },
            fieldName: { type: String, default: '' },
            value: {},
            defaultValue: '',
            defaultName:{default: ''},
            vvalidate: {default:''},
            errorMsg: {},
            id: {},
            isDisabled: {},
            labelClass:{
                default:''
            },
            isShow: { default: true },
            isReadOnly: { default: false },
            options: {
                type: Array,
                required: true
            },
        },
        data() {
            return{
                valid_star: '',
                members: [],
                memberSearch: '',
                selectedMember: null,
                formErrors: {
                    finger:""
                },
                minMatchingChars: 1,
            }
        },
        mounted: function() {
            this.loadData();
        },
        methods:{
            loadData: function() {
                this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
                this.$refs.typeahead.inputValue = this.defaultName;
            },
            onChange: function(event) {
                this.$emit('change', event);
            },
            onChangeHit: function(event) {
                this.$emit('input', event.id);
                this.$emit('hit', event);
            }
        },
        watch: {
            memberSearch: _.debounce(function (member) {
                this.onChange(member)
            }, 500)
        }
    }
</script>
<style>
 .v-autocomplete a.list-group-item{
     padding: 3px 7px;
     font-size: 12px;
 }
 .v-autocomplete.is-invalid input.form-control{
         border-color: red;
 }
 div[disabled].v-autocomplete{
     pointer-events: none;
 }
 div[disabled].v-autocomplete input{
         background: #f1eaea;
 }
</style>