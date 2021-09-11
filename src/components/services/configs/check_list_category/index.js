import Pagination from '@/containers/Pagination';
import CommonIndex from '@/containers/CommonIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';
import {ROW_PER_PAGE} from "@/shared/common/config";

export default {
  components: {CommonIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("check") + " " + this.$t("list") + " " + this.$t("categories"),
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
        {key: "index", label: '#', sortable: false},
        {key: "name", label: this.$t('name'), sortable: true},
        {key: "code", label: this.$t('code'), sortable: true},
        {key: "department", label: this.$t('department'), sortable: true},
        {key: "isActive", label: this.$t('status'), sortable: true},
        {key: 'actions', label: this.$t('actions'), sortable: false}
      ],

      checkListCategory: [],
      //pagination
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "configs/check_list_category/Save",
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

      this.$axios.post("/checkListCategories", null, {params: param})
        .then(res => {
          if (res.data.data) {
            this.pagination.total_rows = res.data.data['totalElements'];
            this.pagination.offset = res.data.data['pageable']['offset'];
            this.checkListCategory = res.data.data.content;
            for (let i = 0; i < this.checkListCategory.length; i++) {
              this.checkListCategory[i]['code'] = this.checkListCategory[i]['code'];
              this.checkListCategory[i]['name'] = this.checkListCategory[i]['name'];
              this.checkListCategory[i]['isActive'] = this.checkListCategory[i]['isActive'] ? 'Active' : 'Inactive';
              this.checkListCategory[i]['department'] = '[' + this.checkListCategory[i]['department']['code'] + ']-' + this.checkListCategory[i]['department']['name'];
              this.checkListCategory[i]['edit'] = 1;
              this.checkListCategory[i]['delete'] = 1;
            }
          } else {
            this.checkListCategory = [];
          }
        });
    },
    customModal: function (data) {
      if (data.id) {
        this.modal_info.title = this.$t('edit') + " " + this.$t("check") + " " + this.$t("list") + " " + this.$t("category");
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      } else {
        this.modal_info.id = null;
        this.modal_info.title = this.$t('add') + " " + this.$t("check") + " " + this.$t("list") + " " + this.$t("category");
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
        url: '/checkListCategories/delete',
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


