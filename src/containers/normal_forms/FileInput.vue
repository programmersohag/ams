<template>
  <b-col :class="formClass ? formClass : 'col-md-4'">
    <b-form-group
      :label="label + this.valid_star"
      label-for="label"
      label-size="sm">
      <div class="custom-file">
        <input
          type="file"
          class="custom-file-input"
          :id="id"
          :plain="true"
          :placeholder="placeholder"
          :name="fieldName"
          v-validate="photo_validation"
          ref="pic"
          accept="image/*"
          @change="onChange"/>
        <label class="custom-file-label" for="id">Choose file</label>
      </div>
      <form-error :message="errors.first(fieldName) || errorMsg"></form-error>
    </b-form-group>
  </b-col>

</template>
<script>
import FormError from "@/containers/FormError";

export default {
  components: {FormError},
  name: 'FileInput',
  props: {
    placeholder: {type: String},
    label: {type: String},
    fieldName: {type: String, default: ''},
    formClass: {
      default: ''
    },
    value: {
      default: ''
    },
    vvalidate: {
      default: ''
    },
    errorMsg: {},
    id: {},
    labelClass: ''
  },
  data() {
    return {
      valid_star: '',
      pic: '',
      photo_validation: ''
    }
  },
  mounted: function () {
    if (this.value) {
      let val = this.value.replace(/^data:image\/[a-z]+;base64,/, "");
      this.$emit('input', val);
    }
    this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
  },
  methods: {
    onChange: function (event) {
      this.pic = this.$refs.pic.files[0];
      if (/\.(jpg|jpeg|png|gif)$/i.test(this.pic.name)) {
      } else {
        alert('please upload image file');
      }
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        this.pic = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
        this.$emit('change', this.pic);
      }.bind(this), false);

      if (this.pic) {
        if (/\.(jpe?g|png|gif)$/i.test(this.pic.name)) {
          reader.readAsDataURL(this.pic);
        }
      }
      //this.$emit('change', this.pic);
    }
  }
}
</script>

<style scoped>
div.base64_pic img {
  width: 100px;
  min-height: 10px;
}

div.base64_pic span {
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 28%;
  font-size: 20px;
  cursor: pointer;
  color: #b11a1a;
}
</style>
