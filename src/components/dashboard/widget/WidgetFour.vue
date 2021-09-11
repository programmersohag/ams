<template>
    <div class="brand-card">
      <div class="brand-card-header">
        <i :class="card_info['icon']" class="fa"></i>
      </div>
      <div class="brand-card-body">
        <div>
          <div class="text-value">{{card_info['value1']}}</div>
          <div class="text-uppercase small">{{card_info['name1']}}</div>
        </div>
        <div>
          <div class="text-value">{{card_info['value2']}}</div>
          <div class="text-uppercase small">{{card_info['name2']}}</div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'WidgetFour',
  props:['card_info'],
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.brand-card{
    background-color: var(--dashboard_deep_color);
    color: #fff;
}
.brand-card-header{
    background-color: linear-gradient(45deg, rgba(216,67,21,1) 6%, rgba(255,171,145,1) 100%);
    height: 2rem;
}
</style>

