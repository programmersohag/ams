<template>
    
    <div class="info-box">
        <span class="info-box-icon info-box-icon-design">
            <i class="fa" :class="card_info['icon']"></i>
        </span>
        <div class="info-box-content">
            <span class="info-box-text ">{{card_info['name']}}</span>
            <span class="info-box-number ">{{card_info['value']}}</span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'WidgetFive',
  props:['card_info'],
  data () {
    return {
    }
  }
}
</script>
<style scoped>
    .tab-content .info-box .info-box-icon{
        font-size: 35px;
        border-radius:50px;
        /*background-color: whitesmoke;*/
        margin-top: 27px;
        margin-left: 4px;
        color: darkgray;
    }
    .info-box-text, .info-box-number{
        color:var(--font-color);
    }
    
   
</style>

