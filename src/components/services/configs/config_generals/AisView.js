import moment from 'moment';
import Loading from 'vue-full-loading';
import ConfigGeneral from '@/components/configs/config_generals/AisConfigGeneral'
import API from "@/shared/common/API.js"
var configGeneralAPI =new API();
configGeneralAPI.createEntity({name:"ais_config_generals"});
export default {
  name: 'tabs',
  components: { ConfigGeneral, Loading },
  data () {
    return {
      tabIndex: [0, 0],
      IsActiveTabView: true,
      IsActiveTabOthers: false,
      purposes:[],
      purpose:[],
      loading_show: false,
    }
  },
  mounted:function() { 
    this.loading_show = true;  
    configGeneralAPI.endpoints.ais_config_generals.getRequest("view")
    .then(response => {
      this.loading_show = false
      this.purposes=response.data.purposes
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