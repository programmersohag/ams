<template>
  <b-col :class="formClass ? formClass+' select-search' : 'col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 select-search'"
         v-if="isShow">
    <b-form-group
      :label="label + this.valid_star"
      :label-cols="labelClass ? labelClass : 3"
      label-size="sm"
      :horizontal="true">
      <b-input-group>
        <multiselect v-model="value"
                     tag-placeholder="Add this as new tag"
                     placeholder="Search or add a tag"
                     label="name"
                     track-by="code"

                     :options="options"
                     :multiple="true"
                     :taggable="true"
                     :searchable="searchable"
                     :showPointer="showPointer"
                     :showLabels="showLabels"
                     @input="updateValueAction"
                     @tag="addTag">
        </multiselect>
      </b-input-group>

      <!--      <p>======value====</p>-->
      <!--      <pre class="language-json"><code>{{ value }}</code></pre>-->
      <!--      <p>======selectedVals====</p>-->
      <!--      <pre><code>{{ selectedVals }}</code></pre>-->


      <form-error :message="errors.first(fieldName) || errorMsg"></form-error>
    </b-form-group>
  </b-col>
</template>


<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {Multiselect},
  inject: ['$validator'],
  props: {
    isShow: {default: true},
    label: {type: String},
    labelClass: {default: ''},
    formClass: {default: "col-md-12"},
    searchable: true,
    showPointer: true,
    showLabels: false,
    vvalidate: {
      default: ''
    },
    options: {},
    selectedVals: {}
  },
  data() {
    return {
      valid_star: '',
      value: []

      // options: [
      //   {name: 'Vue.js', code: 'vu'},
      //   {name: 'Javascript', code: 'js'},
      //   {name: 'Open Source', code: 'os'}
      // ]
    }
  },
  mounted: function () {
    this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
    this.value = this.selectedVals;
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    updateValueAction: function () {
      this.$emit('input', this.value)
    }
  }
}
</script>


<style>

.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  line-height: 1;
  background: #9C9C9C;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}

</style>
