<template>
<!-- :label-cols="labelClass ? labelClass : ''" -->
    <!-- <b-form-group v-if="isShow"
                  :label="label + this.valid_star"
                  :label-cols="1"
                  label-size="sm"
                  :horizontal="true"> -->
                  <b-row>
                      <b-col class="col col-md-8" style="padding-left: 16px;">
                          <div class="custom-file" style="width:100%">
                            <input
                                type="file"
                                class="custom-file-input"
                                :id="id"
                                :plain="true"
                                :placeholder="placeholder"
                                :name="fieldName"
                                v-validate="photo_validation"
                                ref="pic"
                                :accept="accept"
                                @change="onChange" />
                            <label class="custom-file-label" for="customFile">Choose file</label>
                        </div>
                      </b-col>
                      <b-col class="col col-md-4">
                          <div class="image-upload">
                            <span @click="removeDoc" class="remove"><i class="fa fa-trash"></i></span>
                            <div class="base64_pic" v-if="imgType">
                                <img v-if="pic_location" v-bind:src="pic_location"  width="165" height="180"/>
                                <em v-else><i class="fa fa-image"></i></em>
                            </div>
                            <div class="base64_pic" v-else>
                                <embed v-if="pic_location" :src="pic_location" type="application/pdf" width="165" height="180" />
                                <em v-else><i class="fa fa-file"></i></em>
                            </div>
                        </div>
                      </b-col>
                  </b-row>
    <!-- <form-error :message="errors.first(fieldName) || errorMsg"> </form-error>
  </b-form-group> -->

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
      isImg:{
         default: true
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
            photo_validation: '',
            imgType:'',
            imgExtension:"",
            accept: "image/*,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }
    },
    mounted() {
        this.imgType = this.isImg;
        if(this.value) {
           let val = this.value.replace(/^data:image\/[a-z]+;base64,/, "");
           this.$emit('input', val);
        }
        this.pic_location = this.default;
       // console.log("====", this.pic_location)
        this.valid_star = this.vvalidate.includes("required") ? '<span class="required">*</span>' : '';
    },
    methods:{
        removeDoc: function(){
            this.pic_location = "";
            this.pic = "";
            this.$emit('removeDoc', "");
        },
        onChange: function(event) {
            this.pic = this.$refs.pic.files[0];
            let pic_ext = this.pic['type'].split("/");
           // console.log("pic ext", pic_ext)
            this.imgExtension = pic_ext[1];
            if(pic_ext[0] == "image") {
                this.imgType = true;
            } else {
                this.imgType = false;
            }
            if (/\.(jpe?g|png|gif|pdf|doc|docx)$/i.test(this.pic.name)) {

            } else {
                this.is_pic_show = false;
                this.pic_location = '';
                alert('please upload image file');
            }
            let reader = new FileReader();
            reader.addEventListener("load", function () {
                this.is_pic_show = true;
                this.pic_location = reader.result;
                if(pic_ext[0] == "image") {
                    this.pic = this.pic_location.replace(/^data:image\/[a-z]+;base64,/, "");
                } else {
                    this.pic = this.pic_location.replace(/^data:application\/[a-z]+;base64,/, "");
                }
                //this.$emit('change', this.$refs.pic.files[0]);
                let data = {
                    0: this.$refs.pic.files[0],
                    1: this.pic
                }
                console.log("===", data[0])
                this.$emit('change', data);
            }.bind(this), false);

            if (this.pic) {
                if (/\.(jpe?g|png|gif|pdf|doc|docx)$/i.test(this.pic.name)) {
                    reader.readAsDataURL(this.pic);
                }
            }
        }
    }

}
</script>

<style scoped>
    div.base64_pic{
        width: 175px;
        height: auto;
        padding: 10px 5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        margin-bottom: 2px;
    }
    div.base64_pic em i.fa-file{
        font-size: 180px;
        margin-left: 5px;
    }
    div.base64_pic em i.fa-image{
        font-size: 148px;
        margin-left: 5px;
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
    div.image-upload:hover span.remove{
        display: block;
        background: #E64A19;
        width: 30px;
        height: 30px;
        border-radius: 500px;
        text-align: center;
        padding: 5px;
    }
    span.remove{
        display: none;
        position: absolute;
        right: 0%;
        top: -6%;
        cursor: move;
        width: 20px;
        height: 20px;
        padding: 1px;
        text-align: center;
    }
    span.remove i{
        color: #F0F4C3;
        font-size: 20px;
     }
</style>
