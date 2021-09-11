import Pagination from '@/containers/Pagination';
import CommonIndex from '@/containers/CommonIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';
import {ROW_PER_PAGE} from "@/shared/common/config";

export default {
  components: {CommonIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("department") + " " + this.$t("info"),
      search_schema: {
        name: {
          fieldType: "TextInput",
          fieldName: "searchText",
          label: this.$t("name"),
          placeholder: this.$t("name")
        },
        cbo_isActive: {
          fieldType: "SelectList",
          fieldName: "isActive",
          label: this.$t("status"),
          id: "isActive",
          formClass: 'col col-md-12',
          options: {'true': "Active", 'false': "Inactive"}
        }
      },
      search_form_data: {},

      //common index
      head_information: [
        {key: "index", label: '#', sortable: false, tdClass: "text-center"},
        {key: "name", label: this.$t('name'), sortable: true},
        {key: "code", label: this.$t('code'), sortable: true},
        {key: "project", label: this.$t('project'), sortable: true},
        // {key: "note", label: this.$t('note')},
        {key: "isActive", label: this.$t('status')},
        {key: 'actions', label: this.$t('actions'), sortable: false, thStyle: "width:10%;"}
      ],

      departments: [],
      //pagination
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "configs/departments/Save",
      },
    }
  },
  mounted() {
    // this.loadProjects();
    this.loadData();
  },
  methods: {
    loadData: function (offset = 0) {
      const page = (offset === 0) ? offset : (offset / ROW_PER_PAGE);
      const param = {'size': ROW_PER_PAGE, 'page': page};

      let searchText = this.search_form_data['searchText'];
      let isActive = this.search_form_data['isActive'];


      if (searchText) {
        let removedSpaceString = searchText.replace(/\s+/g, '');
        if (removedSpaceString.length != 0) {
          param['searchText'] = searchText;
        }
      }
      if (isActive) {
        param['isActive'] = isActive;
      }


      this.$axios.post("/departments", null, {params: param})
        .then(res => {
          if (res.data.data) {
            this.pagination.total_rows = res.data.data['totalElements'];
            this.pagination.offset = res.data.data['pageable']['offset'];

            this.departments = res.data.data.content;
            for (let i = 0; i < this.departments.length; i++) {
              this.departments[i]['code'] = this.departments[i]['code'];
              this.departments[i]['name'] = this.departments[i]['name'];
              this.departments[i]['project'] = this.departments[i]['project'] ? '[' + this.departments[i]['project']['code'] + ']-' + this.departments[i]['project']['name'] : 'All Project';
              // this.departments[i]['note'] = this.departments[i]['note'];
              this.departments[i]['isActive'] = this.departments[i]['isActive'] ? 'Active' : 'Inactive';
              this.departments[i]['edit'] = 1;
              this.departments[i]['delete'] = 1;
            }
          } else {
            this.departments = [];
          }
        });

    },
    customModal: function (data) {
      if (data.id) {
        this.modal_info.title = this.$t('edit') + " " + this.$t('department');
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      } else {
        this.modal_info.id = null;
        this.modal_info.title = this.$t('add') + " " + this.$t('department');
        this.modal_info.isModalVisible = true;
      }

    },
    closeModal(is_reload = false) {
      this.modal_info.isModalVisible = false;
      if (is_reload === true) {
        this.loadData(0);
      }
    },
    CustomDelete(itemData) {
      let delete_data = [{
        url: '/departments/delete',
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


