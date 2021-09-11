import Pagination from '@/containers/Pagination';
import CommonIndex from '@/containers/CommonIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';
import {schedule_head} from "@/components/services/schedules/schedule/Common";
import {ROW_PER_PAGE} from "../../../../shared/common/config";
import {formatDate, formatMonth} from "../../../../shared/utils";
import {getScheduleStatus} from "../schedule/Common";

export default {
  components: {CommonIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("schedule") + ' ' + this.$t("approve"),
      search_schema: {
        txt_name: {
          fieldType: "TextInput",
          fieldName: "searchText",
          label: this.$t("search"),
          placeholder: this.$t("search")
        },
        txt_status_text: {
          fieldType: "SelectList",
          fieldName: "scheduleStatus",
          options: [],
          onChange: true,
        }
      },
      search_form_data: {},
      head_information: schedule_head,
      schedules: [],
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: '',
        isModalVisible: false,
        title: '',
        component_address: '',
      },
    }
  },
  mounted() {
    this.loadData(this.pagination.offset);
    this.search_schema.txt_status_text.options = getScheduleStatus();
  },
  methods: {
    loadData: function (offset = 0) {
      const page = (offset === 0) ? offset : (offset / ROW_PER_PAGE);
      const param = {'size': ROW_PER_PAGE, 'page': page, 'sort': 'createdOn,desc'}
      let searchText = this.search_form_data['searchText'];
      if (searchText) {
        let removedSpaceString = searchText.replace(/\s+/g, '');
        if (removedSpaceString.length != 0) {
          param['searchText'] = searchText;
        }
      }

      const status = this.search_form_data['scheduleStatus']
      if (status) {
        param['scheduleStatus'] = status;
      }
      this.$axios.post('/schedules', null, {params: param})
        .then(res => {
          if (res.data.data) {
            this.pagination.total_rows = res.data.data['totalElements'];
            this.pagination.offset = res.data.data['pageable']['offset'];
            this.schedules = res.data.data.content;
            for (let i = 0; i < this.schedules.length; i++) {
              this.schedules[i]['name'] = '[' + this.schedules[i]['code'] + ']-' + this.schedules[i]['name'];
              this.schedules[i]['location'] = '[' + this.schedules[i]['location']['code'] + ']-' + this.schedules[i]['location']['name'];
              this.schedules[i]['teamType'] = '[' + this.schedules[i]['teamType']['code'] + ']-' + this.schedules[i]['teamType']['name'];
              this.schedules[i]['team'] = '[' + this.schedules[i]['team']['code'] + ']-' + this.schedules[i]['team']['name'];
              this.schedules[i]['project'] = '[' + this.schedules[i]['project']['code'] + ']-' + this.schedules[i]['project']['name'];
              this.schedules[i]['duration'] = formatDate(this.schedules[i]['auditingFromDate']) + ' To ' + formatDate(this.schedules[i]['auditingToDate']) + ' [' + this.schedules[i]['auditDurationDay'] + ' day(s)]';
              this.schedules[i]['period'] = formatMonth(this.schedules[i]['auditPeriodFromDate']) + ' To ' + formatMonth(this.schedules[i]['auditPeriodToDate']);
              this.schedules[i]['scheduleStatus'] = this.schedules[i]['scheduleStatus'];
              if (this.schedules[i]['scheduleStatus'] === 'APPROVED') {
                this.schedules[i]['edit'] = 0;
                this.schedules[i]['delete'] = 0;
              } else {
                this.schedules[i]['modify'] = 0;
                this.schedules[i]['approve'] = 1;
              }
              this.schedules[i]['view'] = 1;
            }
          } else {
            this.schedules = [];
          }
        });

    },
    customApprove: function (data) {
      const id = data['id'];
      if (id) {
        this.modal_info.title = this.$t('approved') + " " + this.$t('schedule');
        this.modal_info.id = id;
        this.modal_info.isModalVisible = true;
        this.modal_info.component_address = "schedules/schedule_approve/Save";
      }
    },
    customView: function (data) {
      const id = data['id'];
      if (id) {
        this.modal_info.title = this.$t('view') + " " + this.$t('schedule');
        this.modal_info.id = id;
        this.modal_info.isModalVisible = true;
        this.modal_info.component_address = "schedules/schedule_approve/View";
      }
    },
    closeModal(is_reload = false) {
      this.modal_info.isModalVisible = false;
      if (is_reload === true) {
        this.loadData(0);
      }
    },
    customDelete(itemData) {
      const delete_data = {};
      delete_data['url'] = 'schedules/delete'
      delete_data['schedule_id'] = itemData['scheduleId']
      this.confirmationMessage(delete_data, false);
    },
    clear: function () {
      this.$set(this.search_form_data, 'searchText', '');
      this.loadData(0);
    }
  }
}
