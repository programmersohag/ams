import Pagination from '@/containers/Pagination';
import CommonIndex from '@/containers/CommonIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';
import {ROW_PER_PAGE} from "@/shared/common/config";
import {formatDate} from "@/shared/utils";

export default {
  components: {CommonIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("corrective") + ' ' + this.$t("action") + ' ' + this.$t("tools") + ': ' + this.$t("schedules") + ' ',
      search_schema: {
        name: {
          fieldType: "TextInput",
          fieldName: "searchText",
          label: this.$t("name"),
          placeholder: this.$t("name")
        },

      },
      search_form_data: {},
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: "name", label: 'name', sortable: true},
        {key: 'location', label: 'location', sortable: false},
        {key: 'teamType', label: 'team' + ' ' + 'type', sortable: false},
        {key: 'team', label: 'team', sortable: false},
        {key: 'project', label: 'project', sortable: false},
        {key: 'duration', label: 'duration', sortable: false},
        {key: "scheduleStatus", label: 'status', sortable: true},
        {key: 'actions', label: 'actions', sortable: false},
      ],
      schedules: [],
      pagination: {
        offset: 0,
        total_rows: 0
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: function (offset = 0) {
      const page = (offset === 0) ? offset : (offset / ROW_PER_PAGE);
      const param = {'size': ROW_PER_PAGE, 'page': page, 'sort': 'createdOn,desc'}
      let searchText = this.search_form_data['searchText'];

      if (searchText) {
        param['searchText'] = searchText;
      }

      this.$axios.post('/corrective-action-tools/schedule-list', null, {params: param})
        .then(res => {
            if (res.data) {
              this.pagination.total_rows = res.data.totalElements;
              this.pagination.offset = res.data.offset;
              this.schedules = res.data.schedulIdList;

              for (let i = 0; i < this.schedules.length; i++) {
                this.schedules[i]['name'] = '[' + this.schedules[i]['schedule_code'] + ']-' + this.schedules[i]['schedule_name'];
                this.schedules[i]['location'] = '[' + this.schedules[i]['location_code'] + ']-' + this.schedules[i]['location_name'];
                this.schedules[i]['teamType'] = '[' + this.schedules[i]['team_type_code'] + ']-' + this.schedules[i]['team_type_name'];
                this.schedules[i]['team'] = '[' + this.schedules[i]['team_code'] + ']-' + this.schedules[i]['team_name'];
                this.schedules[i]['project'] = '[' + this.schedules[i]['project_code'] + ']-' + this.schedules[i]['project_name'];
                this.schedules[i]['duration'] = formatDate(this.schedules[i]['audit_period_from_date'])
                  + ' To ' + formatDate(this.schedules[i]['audit_period_to_date']) + ' [' + this.schedules[i]['audit_duration_day'] + ' day(s)]';
                this.schedules[i]['scheduleStatus'] = this.schedules[i]['schedule_status'];
                this.schedules[i]['view'] = 1;
              }
            } else {
              this.schedules = [];
            }
          }
        );
    },

    customView: function (data) {
      const id = data['id'];
      if (id) {
        // this.$router.push('/audit-execution/budgets/view?id=' + id);
        this.$router.push('/process/corrective-action-tools/executions/' + id);
      }
    },
    clear: function () {
      this.search_form_data.description = '';
      this.loadData(0);
    }

  }
}
