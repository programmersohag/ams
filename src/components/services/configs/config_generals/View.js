//import moment from 'moment';

import ConfigGeneral from '@/components/configs/config_generals/ConfigGeneral'

export default {
  name: 'tabs',
  components: { ConfigGeneral },
  data () {
    return {
      tabIndex: [0, 0],
      IsActiveTabView: true,
      IsActiveTabOthers: false,
      purposes:[],
      purpose:[],
    }
  },
  mounted:function() {
    this.$axios.get("config-generals")
    .then(response => {
      this.purposes=response.data.data.purposes;
      //console.log(this.purposes);
    })
    .catch(error=> {
      console.log(error);
    })

  },
  methods:{
    setActiveTab: function () {
      this.IsActiveTabView = true;
      this.IsActiveTabOthers = false;
    },
  }
}
