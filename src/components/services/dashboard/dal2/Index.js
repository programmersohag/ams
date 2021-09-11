import RatingTable from '@/components/dashboard/dal2/RatingTable';

export default {
  name: 'tabs',
  components: {
    RatingTable
  },
  data () {
    return {
        isLoad:false
    }
  },
  mounted:function() {
    //this.isLoad = true;
      this.$store.dispatch('dataAnalisis/login').then((resp) => {
        if(resp && resp.status == 200) {
          this.isLoad = true;
        }
      })
  }
}