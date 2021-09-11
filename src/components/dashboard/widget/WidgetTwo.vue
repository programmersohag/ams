<template>
    <div class="info-box bg-last-month other-box">
        <span class="info-box-icon">
            <i class="fa" :class="card_info['icon']"></i>
        </span>
        <div class="info-box-content">
            <span class="info-box-text">{{card_info['name']}}</span>
            <span class="info-box-number">{{card_info['value']}}</span>
            <div class="progress">
            <div class="progress-bar" style="width: 50%"></div>
            </div>
            <span class="progress-description">
                {{card_info['title']}}
            </span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'WidgetTwo',
  props:['card_info'],
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.other-box .info-box-number {
    margin: 0px 10px -8px 0px !important;
}
.info-box-number {
    font-size: 14px !important;
}
</style>

