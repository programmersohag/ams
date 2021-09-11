import SearchFormGenerator from "@/containers/report_search_forms/FormGenerator";
import ReportContainer from '@/containers/ReportContainer';

export default {
  name: "index",
  components: {
    SearchFormGenerator,
    ReportContainer
  },
  data() {
    return {

      user: {},
      title: '',

      SearchSchema: {
        txt_check_list_categories: {
          fieldType: "SelectList",
          fieldName: "checkListCategory",
          label: this.$t("check") + this.$t(" ") + this.$t("list") + this.$t(" ") + this.$t("category"),
          options: [],
          onChange: true,
        },
        txt_team_type: {
          fieldType: "SelectList",
          fieldName: "teamType",
          label: this.$t("team") + ' ' + this.$t("type"),
          options: [],
          // vvalidate: "required",
          onChange: true,
        }
      },

      SearchFormData: [],
      is_form_loaded: false,
      report_view: '',
      show_report: false,
      rows: {}


    }
  },
  mounted() {
    this.loadCheckListCategory();
    this.loadTeamTypes();
  },
  methods: {
    loadCheckListCategory: function () {
      let url = '/checkListCategories';
      this.$axios
        .get(url)
        .then(res => {
          if (res.data.statusCode === 200) {
            let group_list = [];
            group_list.push({
              text: "--" + this.$t("select check list category") + "--",
              value: ''
            })
            for (let i = 0; i < res.data.data.length; i++) {
              group_list.push({
                text: '[' + res.data.data[i].code + ']-' + res.data.data[i].name,
                value: res.data.data[i].id
              });
            }
            this.SearchSchema["txt_check_list_categories"]["options"] = group_list;
          }
        });
    },
    loadTeamTypes: function () {
      let url = '/team_types';
      this.$axios
        .get(url)
        .then(res => {
          if (res.data.statusCode === 200) {
            let team_type_list = [];
            team_type_list.push({
              text: "--" + this.$t("select team type") + "--",
              value: ''
            })
            for (let i = 0; i < res.data.data.length; i++) {
              team_type_list.push({text: res.data.data[i].name, value: res.data.data[i].id});
            }
            this.SearchSchema["txt_team_type"]["options"] = team_type_list;
          }
        });
    },
    getReport: function () {
      let param = new FormData();

      let checkListCategoryId = this.SearchFormData['checkListCategory'];
      let teamTypeId = this.SearchFormData['teamType'];
      if (checkListCategoryId) {
        param['checkListCategoryId'] = checkListCategoryId;
      }
      if (teamTypeId) {
        param['teamTypeId'] = teamTypeId;
      }
      const body = JSON.stringify(param);

      this.$axios.post("/check_lists/get-check-list-report", body, {
        headers: {'Content-Type': 'application/json'}
      }).then(response => {
        this.rows = response.data.data;
      }).catch(function (error) {
        console.log("error", error);
      });
    },

  },

}
