import Pagination from '@/containers/Pagination';
import CommonIndex from '@/containers/CommonIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';
import {formatDate} from "@/shared/utils";
import {ROW_PER_PAGE} from "../../../../shared/common/config";
import StorageService from "@/shared/common/storage.service";

export default {
  components: {CommonIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("locations"),
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
        {key: "openingDate", label: this.$t('opening') + ' ' + this.$t('date'), sortable: true},
        {key: "address", label: this.$t('address'), sortable: true},
        {key: "contactNumber", label: this.$t('contact') + ' ' + this.$t('number'), sortable: true},
        {key: "email", label: this.$t('email'), sortable: true},
        {key: "isActive", label: this.$t('status')},
        {key: 'actions', label: this.$t('actions'), sortable: false}
      ],

      locations: [],
      //pagination
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: null,
      },
      isMfiAudit: false,
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: function (offset = 0) {
      const params = {
        size: ROW_PER_PAGE,
        page: offset === 0 ? offset : offset / ROW_PER_PAGE
      };

      let searchText = this.search_form_data['searchText'];
      let isActive = this.search_form_data['isActive'];

      if (searchText) {
        let removedSpaceString = searchText.replace(/\s+/g, '');
        if (removedSpaceString.length != 0) {
          params['searchText'] = searchText;
        }
      }
      if (isActive) {
        params['isActive'] = isActive;
      }

      this.$axios.post("/locations", null, {params: params})
        .then(res => {
          if (res.data.data) {
            this.pagination.total_rows = res.data.data['totalElements'];
            this.pagination.offset = res.data.data['pageable']['offset'];
            this.locations = res.data.data.content
            for (let i = 0; i < this.locations.length; i++) {
              this.locations[i]['code'] = this.locations[i]['code'];
              this.locations[i]['name'] = this.locations[i]['name'];
              this.locations[i]['openingDate'] = formatDate(this.locations[i]['openingDate']);
              this.locations[i]['address'] = this.locations[i]['address'];
              this.locations[i]['contactNumber'] = this.locations[i]['contactNumber'];
              this.locations[i]['email'] = this.locations[i]['email'];
              this.locations[i]['isActive'] = this.locations[i]['isActive'] ? 'Active' : 'Inactive';
              this.locations[i]['edit'] = 1;
              this.locations[i]['delete'] = 1;
            }
          } else {
            this.locations = [];
          }
        });
    },
    customModal: function (data) {
      const ss = StorageService.getGeneralConfig();
      this.isMfiAudit = !!Number(ss['is_mfi_audit']);
        if (data.id) {
          this.modal_info.component_address = "configs/locations/Save"
          this.modal_info.title = this.$t('edit') + " " + this.$t('location');
          this.modal_info.id = data.id;
          this.modal_info.isModalVisible = true;
        } else {
          if (this.isMfiAudit) {
            this.modal_info.component_address = "configs/locations/ApiSave"
            this.modal_info.title = this.$t('API') + " " + this.$t('locations');
            this.modal_info.isModalVisible = true;
          }else {
            this.modal_info.component_address = "configs/locations/Save"
            this.modal_info.id = null;
            this.modal_info.title = this.$t('add') + " " + this.$t('Location');
            this.modal_info.isModalVisible = true;
          }
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
        url: '/locations/delete',
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


