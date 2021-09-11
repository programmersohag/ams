import Pagination from '@/containers/Pagination';
import CommonIndex from '@/containers/CommonIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';
import {ROW_PER_PAGE} from "@/shared/common/config";

export default {
  components: {CommonIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("team"),
      search_schema: {
        name: {
          fieldType: "TextInput",
          fieldName: "searchText",
          label: this.$t("search"),
          placeholder: this.$t("search")
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
        {key: "members", label: this.$t('members'), sortable: false},
        {key: "teamType", label: this.$t('team') + ' ' + this.$t('type'), sortable: true},
        // {key: "note", label: this.$t('note'), sortable: true},
        {key: "isActive", label: this.$t('status'), sortable: true},
        {key: 'actions', label: this.$t('actions'), sortable: false}
      ],

      teams: [],
      //pagination
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "schedules/schedule_team/Save",
      }
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

      this.$axios.post("/teams", null, {params: param})
        .then(res => {
          if (res.data.data) {
            this.pagination.total_rows = res.data.data['totalElements'];
            this.pagination.offset = res.data.data['pageable']['offset'];
            this.teams = res.data.data.content
            for (let i = 0; i < this.teams.length; i++) {
              this.teams[i]['code'] = this.teams[i]['code'];
              this.teams[i]['name'] = this.teams[i]['name'];
              // this.teams[i]['note'] = this.teams[i]['note'];
              this.teams[i]['members'] = '[' + Array.prototype.map.call(this.teams[i]['members'], s => s.memberName).toString() + ']';
              this.teams[i]['teamType'] = this.teams[i]['teamType'] != null ? this.teams[i]['teamType']['name'] : ' ';
              this.teams[i]['isActive'] = this.teams[i]['isActive'] === true ? 'Active' : 'Inactive';
              this.teams[i]['edit'] = 1;
              this.teams[i]['delete'] = 1;
            }
          } else {
            this.teams = [];
          }
        });

    },
    customModal: function (data) {
      if (data.id) {
        this.modal_info.title = this.$t('edit') + " " + this.$t('team');
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      } else {
        this.modal_info.id = null;
        this.modal_info.title = this.$t('add') + " " + this.$t('team');
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
        url: '/teams/delete',
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


