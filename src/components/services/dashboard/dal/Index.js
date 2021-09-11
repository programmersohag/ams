
import WidgetOne from '@/components/dashboard/widget/WidgetOne';
import Chart from '@/components/dashboard/dal/Chart';
import {numberFormat} from '@/shared/utils';

export default {
  name: 'tabs',
  components: {
    WidgetOne,
    Chart
  },
  data () {
    return {
        isLoad:false,
        dalCard:[
          {
            icon:'fa-braille',
            name:this.$t('MFI Rating'),
            value:this.$numberConverter(numberFormat(20))
          },
          {
              icon:'fa-map-marker',
              name:this.$t('Branch Rating(avg)'),
              value:this.$numberConverter(numberFormat(2))
          },
          {
              icon:'fa-male',
              name:this.$t('Current NPL'),
              value:"Q1-17"
          },
          {
              icon:'fa-female',
              name:this.$t('NPL(avg)'),
              value:"None"
          }
        ]
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