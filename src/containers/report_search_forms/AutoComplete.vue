<template>
<b-col :class="formClass ? formClass : 'col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2'" v-if="isShow">
    <b-form-group
      :label="label + this.valid_star"
      label-for="label"
      label-size="sm">
        <vue-bootstrap-typeahead
                :data="options"
                :id="id"
                :name="fieldName"
                v-validate="vvalidate"
                :data-vv-as="label"
                size="sm"
                :serializer="s => s.name"
                :maxMatches="maxMatches"
                :minMatchingChars="minMatchingChars"
                :placeholder="placeholder"
                :disabled="isDisabled"
                :readonly="isReadOnly"
                @hit="onChangeHit($event)"
                v-model="searchModel"
                :title="errors.first(fieldName) || errorMsg"
                v-bind:class="{'v-autocomplete': true, 'is-invalid': errors.has(fieldName) || errorMsg}"
                ref="typeahead"
        >
            <template slot="suggestion" slot-scope="{ data, htmlText }">
                <span v-html="htmlText"></span>&nbsp;<small v-if="data.html != undefined">{{ data.html }}</small>
            </template>
        </vue-bootstrap-typeahead>
      
    </b-form-group>
  </b-col>
</template>
<script>
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
    import _ from 'underscore'
    export default {
        components: {VueBootstrapTypeahead },
        name: 'AutoComplete',
        inject: ['$validator'],
        props: {
            placeholder: { 
                type: String, 
                default: '' 
            },
            label: { type: String },
            fieldName: { type: String, default: '' },
            value: {},
            defaultValue: '',
            defaultName:{default: ''},
            itemLength:{default: -1},
            vvalidate: {default:''},
            errorMsg: {},
            id: {},
            isDisabled: {default: false},
            labelClass:{
                default:''
            },
            isShow: { default: true },
            isReadOnly: { default: false },
            options: {
                type: Array,
                required: true
            },
            formClass:{
                default: ''
            }
        },
        data() {
            return{
                valid_star: '',
                searchModel: '',
                minMatchingChars: 1,
                maxMatches: this.itemLength
            }
        },
        mounted: function() {
            this.loadData();
        },
        methods:{
            loadData: function(isParent = false){
                this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
                this.$refs.typeahead.inputValue = this.defaultName;
            },
            onChange: function(event) {
                this.$emit('change', event);
            },
            onChangeHit: function(event) {
                this.$emit('input', event.id);
                this.$emit('hit', event);
            },
        },
        watch: {
            searchModel: _.debounce(function (event) {
                this.onChange(event)
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
