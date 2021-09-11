<template>
  <b-col :class="formClass ? formClass : 'col-md-12'" v-if="isShow">
      <div v-if="htmlDesign">{{htmlDesign}}</div>
      <div v-else><hr></div>
  </b-col>
</template>
<script>
export default {
  name: 'Style',
  props: {
    formClass:{
      default: ''
    },
    htmlDesign:{
        default:''
    },
    isShow: { default: true }
  }
}
</script>