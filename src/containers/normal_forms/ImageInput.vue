<template>
<b-col :class="formClass ? formClass : 'col-md-4'" v-if="isShow">
    <b-form-group
        :label="label + this.valid_star"
        label-for="label"
        label-size="sm">
        <div class="base64_pic">
        <img v-if="pic_location" v-bind:src="pic_location"/>
        <img v-else v-bind:src="'/img/pro_pic.png'"/>
        </div>
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
                    @change="onChange" />
                <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
    <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
  </b-form-group>
</b-col>

</template>
<script>
import FormError from "@/containers/FormError";
export default {
  components: { FormError },
  name: 'ImageInput',
  props: {
    placeholder: { type: String },
    label: { type: String },
    fieldName: { type: String, default: '' },
    formClass:{
      default: ''
    },
    value: {
         default:''
    },
      vvalidate: {
          default:''
      },
      default: {
          type: String,
          default:'/img/img-icon.jpg'
      },
    errorMsg: {},
    id: {},
      isShow: { default: true },
      labelClass: ''
  },
    data() {
        return{
            valid_star: '',
            pic: '',
            pic_location: '',
            is_pic_show: '',
            photo_validation: ''
        }
    },
    mounted: function() {
        if(this.value) {
           let val = this.value.replace(/^data:image\/[a-z]+;base64,/, "");
           this.$emit('input', val);
        }
        console.log("default===", this.default)
        this.pic_location = this.default;
        this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
    },
    methods:{
        onChange: function(event) {
            this.pic = this.$refs.pic.files[0];
            if (/\.(jpe?g|png|gif)$/i.test(this.pic.name)) {

            } else {
                this.is_pic_show = false;
                this.pic_location = '';
                alert('please upload image file');
            }
            let reader = new FileReader();
            reader.addEventListener("load", function () {
                this.is_pic_show = true;
                this.pic_location = reader.result;
                this.pic = this.pic_location.replace(/^data:image\/[a-z]+;base64,/, "");
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
    div.base64_pic{
        /* width: 100%;*/
        padding: 10px 5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        margin-bottom: 2px;
    }
     div.base64_pic img{
         width: 100%;
        min-height: 201px;
     }
    div.base64_pic span{
        display: block;
        margin: 0 auto;
        position: absolute;
        top: 0px;
        left: 28%;
        font-size: 20px;
        cursor: pointer;
        color: #b11a1a;
    }
</style>
