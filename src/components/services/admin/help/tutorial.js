import CustomModal from '@/containers/Modal';
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';

export default {
  name: 'HelpPage',
    components: {
    CustomModal, CommonIndex, Pagination
  },
  data () {
    return {
      tutorial: [],
      offset: 0,
       title:this.$t("video_tutorial"),
      component_address: "admin/help/gif",
      id :'',
      isModalVisible: false,

      pagination: {
        offset: 0,
        total_rows: 21,
        row_per_page: 5
      },

    }
  },
  mounted() {
    this.user = this.$store.getters['auth/userInfo'];
    this.loadData(0);
  },
  methods:{
    loadData: function (offset = 0) {

      this.$http_service.get("/common-service/api/v1/tutorials")
        .then(response => {
          this.response_data = response.data;
          this.tutorial = this.response_data;

        })
        .catch(function (error) {
          console.log(error.response);
        })
    },
    customModal(itemdata) {
      this.id = itemdata;
      this.isModalVisible = true;
    },
    closeModal(is_load) {
      this.isModalVisible = false;
      if (is_load == 1) {
        this.loadData(0);
      }
    },
    thumbnailUrl:function(link) {
        this.videoThumb = 'http://img.youtube.com/vi/'+link+'/0.jpg';
        return this.videoThumb;
    },
  },
}


