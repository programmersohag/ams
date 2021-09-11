import CustomModal from '@/containers/Modal';
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";


export default {
  name: "Tutorials",
  components: {
    CustomModal, CommonIndex, Pagination, SearchFormGenerator
  },
  data() {
    return {

      //pagination
      pagination: {
        offset: 0,
        total_rows: 0,
        row_per_page: 10
      },
      //common index

      head_information: [
        {key: "index", label: '#',tdClass:"text-center", sortable: false},
        {key: "header", label: this.$t('question'),tdClass:"text-center", sortable: false},
        {key: "link", label: this.$t('link'),tdClass:"text-center", sortable: false},
        {key: "description", label: this.$t('Description'),tdClass:"text-center", sortable: false},
        {key: "status", label_name: this.$t('status'),tdClass:"text-center", sortable: false},
        {key: "actions", label_name: this.$t('action'),tdClass:"text-center", sortable: false}
      ],

      tutorials: [],
      response_data: [],
      is_form_loaded: false,
      delete_info:[{
        url:'/common-service/api/v1/tutorials/',
        field_id:'id',
        source:"service",
      }],
      component_address: "configs/help/tutorial_details/save",
      edit_id: '',
      isModalVisible: false,
      title: '',
    }
  },
  mounted() {
    this.loadData(0);
  },
  methods: {

    loadData: function (offset=0) {
      // const params = {
      //   pageSize: this.pagination.row_per_page,
      //   pageNo: offset / pageSize,
      // };
      let params = {}
      // this.pagination.offset = offset;
      // params['pageSize'] = this.pagination.row_per_page;
      // // params['pageNo'] = this.pagination.offset == 0 ? this.pagination.offset : this.pagination.offset/this.pagination.row_per_page;
      // params['pageNo']= this.pagination.offset+1;
      // this.$http_service.get("/common-service/api/v1/tutorials", {
      //   params:params
      // })

      this.$http_service.get("/common-service/api/v1/tutorials")
        .then(response => {
           this.response_data = response.data;
           // this.tutorials = this.response_data.content;
          this.tutorials = this.response_data;

          this.pagination.total_rows = response.data.totalElements;
          for (let i = 0; i <  this.tutorials.length; i++) {
            this.tutorials[i]["edit"] = 1;
            this.tutorials[i]["delete"] = 1;
            this.tutorials[i]["status"] =this.tutorials[i].status;
          }
        })
        .catch(function (error) {
          console.log(error.response);
        })
    },

    customModal(itemdata) {
      if (itemdata.id > 0) {
        this.title = this.$t("edit") + ' '+this.$t("question");
      } else {
        this.title = this.$t("add") + ' ' +this.$t("new")+' ' +this.$t("question");
      }
      this.edit_id = itemdata.id;
      this.isModalVisible = true;
    },
    closeModal(is_load) {
      this.isModalVisible = false;
      if (is_load == 1) {
        this.loadData(0);
      }
    },

  }
}
