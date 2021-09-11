<template>
  <div>
  <b-modal 
    class="modal-primary"  
    :visible="is_visible" 
    :noCloseOnEsc="true" 
    :noCloseOnBackdrop="true" 
    :hideFooter="true"
    @cancel-disabled="false"
    :size="size">
  <div slot="modal-header"><i class="" aria-hidden="true"></i>
      <h5 class="modal-title">{{title}}</h5>
      <span @click="close" style="position: absolute;right: 11px;top: 5px;cursor: pointer;"><i style="font-size: 20px;" class="fa fa-times-circle" aria-hidden="true"></i></span>
  </div>
  <component 
    :is="component" 
    @close="close" 
    :id="id" 
    :data="data" 
    class="large-2"
    :extra_param="extra_param"/>
  </b-modal>
  <mf-loader v-if="isLoad" :loaderStyle="loaderStyle" />
  </div>
</template>

<script>
  export default {
    name: 'CustomModal',
    props: {
      title: String,
      componentAddress: String,
      id: null,
      extra_param: Object,
      data: Object,
      size: {
        type: String,
        default: 'md'
      }
    },
    data() {
        return {
          component: null ,
          is_visible: false,
          loaderStyle: {
            "z-index":"99999999",
            "position" : "absolute",
            "top": "10%",
            "left": "38%"
          },
         isLoad:false,
        }
    },
    mounted() {
      this.$store.dispatch('auth/setLoadingShow', false);
      this.isLoad = true;
      this.is_visible = true;
      let self = this;
        return new Promise((resolve, reject) => {
          self.component = require("@/components/"+self.componentAddress+".vue").default;
          resolve(true);
        }).then(() => {
          setTimeout(function () {
            self.isLoad = false;
          }, 1000);
        })
      
    },
    methods: {
      close(is_load_data) {
        this.is_visible = false;
        this.$store.dispatch('auth/setLoadingShow', true);
        this.$emit('close',is_load_data);
      }
    }
  };
</script>
<style>
 div.modal-primary .modal-mdlg {
    max-width: 700px;
  }
 div.modal-primary  .modal-body{
   overflow-y: scroll;
   height: auto;
   max-height: 450px;
 }

.modal-body::-webkit-scrollbar {
  width: 7px;
}

.modal-body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #737272;
  border: 1px solid #737272;
}
.modal-body::-webkit-scrollbar-thumb:hover {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #3a3838;
  border: 1px solid #3a3838;
}

</style>
<style scoped>
  .close {display: none;}
  .modal-body{
    min-height: 96px;
  }
  
</style>
