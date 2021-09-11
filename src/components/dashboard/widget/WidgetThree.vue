<template>
        <b-card no-body class="widget-three">
        <b-card-body class="pb-0">
                <i :class="card_info['icon']" class="fa float-right"></i>
            <h4 class="mb-0">{{card_info['value']}}</h4>
            <p>{{card_info['name']}}</p>
        </b-card-body>
        </b-card>
</template>
<script>
export default {
  name: 'WidgetThree',
  props:['card_info'],
  data () {
    return {
    }
  }
}
</script>
<style scoped>
div.widget-three{
    background: var(--widget-three-color);
    border: 1px solid var(--widget-three-color);
    color: #fff;
}
div.widget-three div.card-body i{
  font-size: 20px;
}
</style>

