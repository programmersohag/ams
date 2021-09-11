import Pagination from '@/containers/Pagination';
import CommonIndex from '@/containers/CommonIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';
import {ROW_PER_PAGE} from "@/shared/common/config";

export default {
  components: {CommonIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("team") + " " + this.$t("type"),
      search_schema: {
        name: {
          fieldType: "TextInput",
          fieldName: "searchText",
          label: this.$t("name"),
          placeholder: this.$t("name")
        }
      },
      search_form_data: {},

      //common index
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: "name", label: this.$t('name'), sortable: true},
        {key: "code", label: this.$t('code'), sortable: true},
        {key: "isActive", label: this.$t('status'), sortable: true},
        {key: 'actions', label: this.$t('actions'), sortable: false}
      ],

      teamTypes: [],
      //pagination
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "configs/team_types/Save",
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

      this.$axios.post("/team_types", null, {params: param})
        .then(res => {
          if (res.data.data) {
            this.pagination.total_rows = res.data.data['totalElements'];
            this.pagination.offset = res.data.data['pageable']['offset'];

            this.teamTypes = res.data.data.content;
            for (let i = 0; i < this.teamTypes.length; i++) {
              this.teamTypes[i]['code'] = this.teamTypes[i]['code'];
              this.teamTypes[i]['name'] = this.teamTypes[i]['name'];
              this.teamTypes[i]['isActive'] = this.teamTypes[i]['isActive'] ? 'Active' : 'Inactive';
              this.teamTypes[i]['edit'] = 1;
              this.teamTypes[i]['delete'] = 1;
            }
          } else {
            this.teamTypes = [];
          }

        });

    },
    customModal: function (data) {
      if (data.id) {
        this.modal_info.title = this.$t('Edit') + " " + this.$t('Team Type');
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      } else {
        this.modal_info.id = null;
        this.modal_info.title = this.$t('Add') + " " + this.$t('Team Type');
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
        url: '/team_types/delete',
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


