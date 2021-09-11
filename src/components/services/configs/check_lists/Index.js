import Pagination from '@/containers/Pagination';
import CommonIndex from '@/containers/CommonIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';
import {ROW_PER_PAGE} from "@/shared/common/config";

export default {
  components: {CommonIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("check") + " " + this.$t("list"),
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
        {
          key: "group",
          label: this.$t('check') + this.$t(' ') + this.$t('list') + this.$t(' ') + this.$t('category'),
          sortable: true
        },
        {key: "teamType", label: this.$t('team') + ' ' + this.$t('type'), sortable: true},
        // {key: "description", label: this.$t('description'), sortable: true},
        {key: "isActive", label: this.$t('status'), sortable: true},
        {key: 'actions', label: this.$t('actions'), sortable: false}
      ],

      check_lists: [],
      //pagination
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "configs/check_lists/Save",
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

      // this.$axios.get("/check_lists")
      this.$axios.post("/check_lists", null, {params: param})
        .then(res => {
          if (res.data.data) {
            this.pagination.total_rows = res.data.data['totalElements'];
            this.pagination.offset = res.data.data['pageable']['offset'];

            this.check_lists = res.data.data.content;
            for (let i = 0; i < this.check_lists.length; i++) {
              this.check_lists[i]['code'] = this.check_lists[i]['code'];
              this.check_lists[i]['name'] = this.check_lists[i]['name'];
              this.check_lists[i]['group'] = '[' + this.check_lists[i]['checkListCategory']['code'] + ']-' + this.check_lists[i]['checkListCategory']['name'];
              this.check_lists[i]['teamType'] = this.check_lists[i]['teamType']['name'];
              // this.check_lists[i]['description'] = this.check_lists[i]['description'];
              this.check_lists[i]['isActive'] = this.check_lists[i]['isActive'] ? 'Active' : 'Inactive';
              this.check_lists[i]['edit'] = 1;
              this.check_lists[i]['delete'] = 1;
            }
          } else {
            this.check_lists = [];
          }
        });

    },
    customModal: function (data) {
      if (data.id) {
        this.modal_info.title = this.$t('edit') + " " + this.$t('check') + " " + this.$t('list');
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      } else {
        this.modal_info.id = null;
        this.modal_info.title = this.$t('add') + " " + this.$t('check') + " " + this.$t('list');
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
        url: '/check_lists/delete',
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


