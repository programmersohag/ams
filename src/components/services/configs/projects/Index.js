import Pagination from '@/containers/Pagination';
import CommonIndex from '@/containers/CommonIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';
import {ROW_PER_PAGE} from "@/shared/common/config";

export default {
  components: {CommonIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("projects"),
      search_schema: {
        txt_name: {
          fieldType: "TextInput",
          fieldName: "searchText",
          label: this.$t("name"),
          placeholder: this.$t("name")
        }
      },
      search_form_data: {},
      head_information: [
        {key: "index", label: '#', sortable: false, tdClass: "text-center"},
        {key: "name", label: this.$t('name'), sortable: true},
        {key: "code", label: this.$t('code'), sortable: true},
        {key: "isActive", label: this.$t('status'), sortable: true},
        {key: 'actions', label: this.$t('actions'), sortable: false, thStyle: "width:10%;"}
      ],
      projects: [],
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "configs/projects/Save",
      },
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: function (offset = 0) {
      const page = (offset === 0) ? offset : (offset / ROW_PER_PAGE);
      const param = {'size': ROW_PER_PAGE, 'page': page};

      let searchText = this.search_form_data['searchText'];
      if (searchText) {
        let removedSpaceString = searchText.replace(/\s+/g, '');
        if (removedSpaceString.length != 0) {
          param['searchText'] = searchText;
        }
      }

      this.$axios.post("/projects", null, {params: param})
        .then(res => {
          if (res.data.data) {
            this.pagination.total_rows = res.data.data['totalElements'];
            this.pagination.offset = res.data.data['pageable']['offset'];

            this.projects = res.data.data.content;
            for (let i = 0; i < this.projects.length; i++) {
              this.projects[i]['code'] = this.projects[i]['code'];
              this.projects[i]['name'] = this.projects[i]['name'];
              this.projects[i]['isActive'] = this.projects[i]['isActive'] ? 'Active' : 'Inactive';
              this.projects[i]['edit'] = 1;
              this.projects[i]['delete'] = 1;
            }
          } else {
            this.projects = [];
          }
        });
    },
    customModal: function (data) {
      if (data.id) {
        this.modal_info.title = this.$t('edit') + " " + this.$t('project');
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      } else {
        this.modal_info.id = null;
        this.modal_info.title = this.$t('add') + " " + this.$t('project');
        this.modal_info.isModalVisible = true;
      }
    },
    closeModal(is_reload = false) {
      this.modal_info.isModalVisible = false;
      if (is_reload === true) {
        this.loadData(0);
      }
    },
    customDelete(itemData) {
      let delete_data = [{
        url: '/projects/delete',
        field_id: 'id'
      }];
      let id = itemData['id'];
      this.confirmMessage(id, delete_data, false);
    },
    clear: function () {
      this.$set(this.search_form_data, 'searchText', '');
      this.loadData(0);
    }
  }
}


