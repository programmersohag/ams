<template>
    
    <div class="info-box">
        <span class="info-box-icon">
            <i class="fa" :class="card_info['icon']"></i>
        </span>
        <div class="info-box-content">
            <span class="info-box-text">{{card_info['name']}}</span>
            <span class="info-box-number">{{card_info['value']}}</span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'WidgetOne',
  props:['card_info'],
  data () {
    return {
    }
  }
}
</script>



