import SearchFormGenerator from "@/containers/report_search_forms/FormGenerator";
import ReportContainer from '@/containers/ReportContainer';
import API from "@/shared/common/API.js";

let reportAPI = new API();
reportAPI.createEntity({name: "report"});
let restAPI = reportAPI.endpoints.report
export default {
  name: "budget",
  components: {
    SearchFormGenerator,
    ReportContainer
  },
  data() {
    return {
      user: {},
      params: {title: 'Budget Report', url: '', data: null},
      error_message: [],
      SearchSchema: {
        txt_location: {
          fieldType: "SelectList",
          fieldName: "locationId",
          label: this.$t("location"),
          options: {'': '--Select Location--'},
          onChange: true
        },
        txt_schedule: {
          fieldType: "SelectList",
          fieldName: "scheduleId",
          label: this.$t("schedule"),
          options: {'': '--Select Schedule--'},
          onChange: true
        }
      },
      SearchFormData: {},
      is_form_loaded: false,
      report_view: '',
      show_report: false,
    }
  },
  mounted() {
    this.user = this.$store.getters['auth/userInfo'];
    this.is_form_loaded = true;
    this.getLocation();
  },
  methods: {
    getReport: function () {
      const url = 'budget';
      const outputFileName = 'budget';
      const params = new FormData();
      params.append("outputFileName", outputFileName);
      params.append("reportType", "HTML");
      params.append("mimeType", "HTML");
      params.append("scheduleId", this.SearchFormData['scheduleId']);
      restAPI.postRequest('budget', params)
        .then((response) => {
          this.report_view = response.data;
          this.show_report = true;
          this.params.url = url;
          this.params.data = this.SearchFormData;
          this.params.data['outputFileName'] = 'budget';
        }).catch(function (error) {
        console.log("error", error);
      });
    },
    getLocation() {
      const url = '/schedules/locations';
      const userId = this.user.id;
      this.$axios
        .get(url, {params: {"userId": userId}})
        .then(res => {
          if (res.data.statusCode === 200) {
            const data = [{value: '', text: 'Select'}];
            data.push(...res.data.data);
            this.SearchSchema.txt_location['options'] = data;
          }
        });
    },
    loadSchedules: function (locationId) {
      this.$axios
        .get('/schedules/find_all_by_location', {params: {'locationId': locationId}})
        .then(res => {
          if (res.data.statusCode === 200) {
            const schedule_list = [];
            schedule_list.push({
              text: "--" + this.$t("select") + this.$t(" ") + this.$t("schedule") + "--",
              value: ''
            });
            for (let i = 0; i < res.data.data.length; i++) {
              schedule_list.push({
                value: res.data.data[i].id,
                text: res.data.data[i].name
              });
            }
            this.SearchSchema["txt_schedule"]["options"] = schedule_list;
          }
        });
    },
    onChangeMethod: function (field, value) {
      if (field === 'locationId' && value) {
        this.loadSchedules(value);
      }
      if (field === 'locationId' && value === '') {
        this.SearchSchema["txt_schedule"]["options"] = [{value: '', text: 'select'}];
      }
    },
  }
}
