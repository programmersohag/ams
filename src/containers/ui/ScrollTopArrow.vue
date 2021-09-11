<template>
  <ScrollTopComponent>
      <a >
        <b-button variant="primary" size="md" style="border-radius:48%; background:#8b5cf6;"><i class="fa fa-chevron-up" aria-hidden="true"></i></b-button>
      </a>
  </ScrollTopComponent>
</template>
<script>
import ScrollTopComponent from './ScrollTopComponent'
export default {
  components: {
    ScrollTopComponent
  }
}
</script>
<style scoped>
    .fa-arrow-up{
        color: white;
    }

</style>