<template>
  <div class="animated fadeIn">
    <iframe  width="475" height="375"
             :src="mySrc"
             frameborder="0"
             allow="accelerometer; autoplay;
                encrypted-media; gyroscope; picture-in-picture"
             allowfullscreen>

    </iframe>
  </div>
</template>
<script>
export default {
    name: 'Tutorials',
    props: {
      id: ''
    },
    data() {
        return {
        };
    },

    mounted: function() {
    },
  computed: {
    mySrc: {
      get: function() {
        return `https://www.youtube.com/embed/${this.id}`
      }
    }
  }
};

</script>





