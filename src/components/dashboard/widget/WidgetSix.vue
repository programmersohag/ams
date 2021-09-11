<template>
       


      <!--<b-card class="card widget-three">-->
        <!--<b-card-body class="card-body pl-1 pt-3 pb-3 d-flex align-items-center">-->
          <!--<i :class="card_info['icon']" class="fa fa-cogs bg-primary p-3 font-2xl mr-3"></i>-->
          <!--<div>-->
          <!--<div class="text-value-sm text-primary">{{card_info['value']}}</div>-->
          <!--<div class="text-muted text-uppercase font-weight-bold small">{{card_info['name']}}</div>-->
          <!--</div>-->
        <!--</b-card-body>-->
      <!--</b-card>-->


    <div class="info-box">
        <span class="info-box-icon info-box-icon-design" style="border-radius: 50px; margin-top: 11px; margin-left: 6px;">
            <i class="fa" :class="card_info['icon']"></i>
        </span>
        <div class="info-box-content">
            <span class="info-box-text " style="color:var(--font-color);">{{card_info['value']}}</span>
            <span class="info-box-number " style="color:var(--font-color);">{{card_info['name']}}</span>


        </div>
    </div>

       



</template>
<script>
export default {
  name: 'WidgetSix',
  props:['card_info'],
  data () {
    return {
    }
  }
}
</script>
<style>


</style>

