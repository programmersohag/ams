import API from "@/shared/common/API.js";
import CustomModal from '@/containers/Modal';
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import router from "@/router/index.js";
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";

// var branchNotificationAPI = new API();
// branchNotificationAPI.createEntity({name: "branch_notification_messeges"});
// let apiEndPoint = branchNotificationAPI.endpoints.branch_notification_messeges;

export default {
  name: "Index",
  components: {
    CustomModal, CommonIndex, Pagination, SearchFormGenerator
  },
  data() {
    return {
      title: '',
      search_schema: [],
      search_form_data: {},


      //pagination
      pagination: {
        offset: 0,
        total_page: 1,
        total_rows: 10,
        row_per_page: 20
      },
      //common index

      head_information: [
        {key: "index", label: '#',tdClass:"text-center", sortable: false},
        {key: "fullName", label: this.$t('name'), sortable: false},
        {key: "email", label: this.$t('email'), sortable: false},
      ],

      notifications: [],
      response_data: [],
      is_form_loaded: false,

      modal_info: {
        id: '',
        isModalVisible: false,
        title: '',
      },
    }
  },
  mounted() {
    this.loadData(0);
  },
  methods: {

    loadData: function (offset=0) {
      let params = {}
      this.pagination.offset = offset;
      params['limit'] = this.pagination.row_per_page;
      params['offset'] = this.pagination.offset;

      this.$http_service.get("/ams-auth-api/users/contacts",{
        params:params
      })
        .then(response => {
          this.response_data = response.data;
          this.notifications = this.response_data._embedded.userList
          this.pagination.total_rows = response.data.page.totalElements;
        })
        .catch(function (error) {
          console.log(error.response);
        })
    },
    closeModal(is_reload = false) {
      this.modal_info.isModalVisible = false;
      if (is_reload == true) {
        this.loadData();
      }
    },

  }
}
