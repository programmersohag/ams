<template>

    <div class="info-box">
        <span class="info-box-icon info-box-icon-design" style="border-radius: 50px; margin-top: 11px; margin-left: 6px;">
            <i class="fa" :class="card_info['icon']"></i>
        </span>
        <div class="info-box-content">
            <span class="info-box-text " style="color:var(--font-color);">{{card_info['name']}}</span>
            <span class="info-box-number " style="color:var(--font-color);">{{card_info['value']}}</span>

            <span class="progress-description" style="margin-left:11px;color:var(--font-color);"">
                {{card_info['title']}}
            </span>
        </div>
    </div>


    <!--<div class="info-box bg-last-month other-box">-->
        <!--<span class="info-box-icon">-->
            <!--<i class="fa" :class="card_info['icon']"></i>-->
        <!--</span>-->
        <!--<div class="info-box-content">-->
            <!--<span class="info-box-text">{{card_info['name']}}</span>-->
            <!--<span class="info-box-number">{{card_info['value']}}</span>-->
            <!--<div class="progress">-->
                <!--<div class="progress-bar" style="width: 50%"></div>-->
            <!--</div>-->
            <!--<span class="progress-description">-->
                <!--{{card_info['title']}}-->
            <!--</span>-->
        <!--</div>-->
    <!--</div>-->
</template>
<script>
    export default {
        name: 'WidgetSeven',
        props:['card_info'],
        data () {
            return {
            }
        }
    }
</script>
<style>
    .info-box info-box-icon-design{
      border-radius: 50px;
      margin-top: 27px;
      margin-left: 1px;
  }

    /*.tab-content .info-box{*/
        /*border-radius: 6px;*/
        /*margin-bottom: 11px;*/
        /*!*background-color: white;*!*/
        /*box-shadow: 0px 0px 0px 2px #eae9e9;*/
        /*min-height: 154px;*/
    /*}*/
    .other-box .info-box-number {
        margin: 0px 10px -8px 0px !important;
    }
    .info-box-number {
        font-size: 14px !important;
    }
</style>

