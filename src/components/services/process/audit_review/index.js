import Pagination from '@/containers/Pagination';
import CommonIndex from '@/containers/CommonIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';
import {ROW_PER_PAGE} from "@/shared/common/config";

export default {
  components: {CommonIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("audit") + " " + this.$t("review"),
      search_schema: {
        txt_location: {
          fieldType: "SelectList",
          fieldName: "txt_location",
          options: {},
          //onChange: true
        },
      },
      search_form_data: {},
      members: '',
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: 'executionArea', label: this.$t('execution') + ' ' + this.$t('area'), sortable: false},
        {key: 'schedule', label: this.$t('schedule') + ' ' + this.$t('name'), sortable: false},
        {key: 'location', label: this.$t('location'), sortable: false},
        {key: 'team', label: this.$t('team'), sortable: false},
        {
          key: 'html_1',
          tdClass: "text-center",
          label: this.$t('review') + ' ' + this.$t('status'),
          sortable: false
        },
        {key: 'actions', label: this.$t('actions'), sortable: false},
      ],
      response_execution: [],
      response_schedule: [],
      response_review: [],
      pagination: {
        offset: 0,
        total_rows: 0
      },
    }
  },
  mounted() {
    this.$set(this.search_form_data, "txt_location", "");
    this.loadData(this.pagination.offset);
  },
  methods: {
    loadData: function (offset = 0) {
      const page = (offset === 0) ? offset : (offset / ROW_PER_PAGE);
      const param = {'size': ROW_PER_PAGE, 'page': page};
      param['locationId'] = this.search_form_data.txt_location;
      this.$axios.get('/reviews/findAllForReview', {params: param})
        .then(res => {
          if (res.data) {
            this.response_execution = res.data.executionArea.body.data.content;
            this.response_schedule = res.data.schedule;
            this.response_review = res.data.reviews;
            this.pagination.total_rows = res.data.executionArea.body.data['totalElements'];
            this.pagination.offset = res.data.executionArea.body.data['pageable']['offset'];
            let location_list = [];
            location_list.push({
              text: "--Select Location--",
              value: ''
            });
            for (let row_id in res.data.locations) {
              location_list.push({
                text: res.data.locations[row_id].name,
                value: res.data.locations[row_id].id
              });
            }
            this.search_schema['txt_location']['options'] = location_list;
            for (let i = 0; i < this.response_execution.length; i++) {
              this.response_execution[i]['html_1'] = '<div class="infoR">Pending</div>';
              for (let p = 0; p < this.response_review.length; p++) {
                if (this.response_review[p] != null) {
                  if (this.response_review[p].auditExecutionMastersId === this.response_execution[i].id && this.response_review[p].executionArea === this.response_execution[i]['executionArea']) {
                    if (this.response_review[p]['reviewStatus'] === 'FEEDBACK') {
                      this.response_execution[i]['html_1'] = '<div class="dangerR">Feedback</div>';
                    } else if (this.response_review[p]['reviewStatus'] === 'REVIEWED') {
                      this.response_execution[i]['html_1'] = '<div class="successR">Reviewed</div>';
                    }
                  }
                }
              }
              if (this.response_execution[i]['executionArea'] === "GENERAL_INFO") {
                this.response_execution[i]['executionArea'] = "General Info";
              }
              if (this.response_execution[i]['executionArea'] === "STAFF_POSITION") {
                this.response_execution[i]['executionArea'] = "Staff Position";
              }
              if (this.response_execution[i]['executionArea'] === "FILED_OFFICER_WISE_PERFORMANCE_ANALYSIS") {
                this.response_execution[i]['executionArea'] = "Field Officer Wise Performance Analysis";
              }
              if (this.response_execution[i]['executionArea'] === "ONGOING_PROGRAM_AVERAGE_POSITION") {
                this.response_execution[i]['executionArea'] = "Average Position of Ongoing Program";
              }
              if (this.response_execution[i]['executionArea'] === "CASH_AND_BANK_BALANCE") {
                this.response_execution[i]['executionArea'] = "Cash & Bank Balance";
              }
              if (this.response_execution[i]['executionArea'] === "PASSBOOK_BALANCING") {
                this.response_execution[i]['executionArea'] = "Passbook Balancing";
              }
              if (this.response_execution[i]['executionArea'] === "BUDGET") {
                this.response_execution[i]['executionArea'] = "Budget";
              }
              if (this.response_execution[i]['executionArea'] === "TARGET_AND_ACHIEVEMENT") {
                this.response_execution[i]['executionArea'] = "Target & Achievement";
              }
              if (this.response_execution[i]['executionArea'] === "FIXED_ASSET") {
                this.response_execution[i]['executionArea'] = "Fixed Asset";
              }
              if (this.response_execution[i]['executionArea'] === "CHECK_POINT_EXECUTION") {
                this.response_execution[i]['executionArea'] = "Check Point Execution";

              }
              this.response_execution[i]['executionArea'] = this.response_execution[i]['executionArea'];
              for (let j = 0; j < this.response_schedule.length; j++) {
                if (this.response_schedule[j].id === this.response_execution[i].scheduleId) {
                  this.response_execution[i]['location'] = '[' + this.response_schedule[j]['location']['code'] + ']-' + this.response_schedule[j]['location']['name'];
                  this.response_execution[i]['team'] = this.response_schedule[j]['team']['name'];
                  let member_list = "";
                  for (let m = 0; m < this.response_schedule[j].team.members.length; m++) {
                    if (m !== 0) {
                      member_list = member_list + ',';
                    }
                    member_list = member_list + this.response_schedule[j].team.members[m].memberName;
                  }
                  this.response_execution[i]['team'] = this.response_execution[i]['team'] + ' (' + member_list + ')';
                  this.response_execution[i]['schedule'] = this.response_schedule[j]['name'];
                  this.response_execution[i]["isCustomActionButton"] = 1;
                  this.response_execution[i]["customActionButton"] = {
                    btn_1: {
                      name: 'Review',
                      name_show: true,
                      variant: 'info',
                      icon: 'fa-circle',
                    },
                  };

                }
              }
            }
          } else {
            this.response_execution = [];
          }
        });
    },

    clear: function () {
      this.$set(this.search_form_data, "txt_location", "");
      this.loadData(this.offset);
    },
    customActionButton: function (itemData, key) {
      if (key === 'btn_1') {
        this.reviewPage(itemData);
      }
    },
    reviewPage: function (itemData) {
      let id = null;
      let scheduleId = null;
      if (itemData.id) {
        id = itemData.id;
        scheduleId = itemData.scheduleId;
      }
      if (itemData.executionArea === "General Info") {
        this.$router.push('/process/audit-review/general-info/' + scheduleId + '/' + id);
      }
      if (itemData.executionArea === "Staff Position") {
        this.$router.push('/process/audit-review/staff-position/' + scheduleId + '/' + id);
      }
      if (itemData.executionArea === "Field Officer Wise Performance Analysis") {
        this.$router.push('/process/audit-review/field-officer-wise-performance-analysis/' + scheduleId + '/' + id);
      }
      if (itemData.executionArea === "Average Position of Ongoing Program") {
        this.$router.push('/process/audit-review/ongoing-program-average-position/' + scheduleId + '/' + id);
      }
      if (itemData.executionArea === "Cash & Bank Balance") {
        this.$router.push('/process/audit-review/cash-and-bank-balance/' + scheduleId + '/' + id);
      }
      if (itemData.executionArea === "Passbook Balancing") {
        this.$router.push('/process/audit-review/passbook-balance/' + scheduleId + '/' + id);
      }
      if (itemData.executionArea === "Budget") {
        this.$router.push('/process/audit-review/budget/' + scheduleId + '/' + id);
      }
      if (itemData.executionArea === "Target & Achievement") {
        this.$router.push('/process/audit-review/target-and-achievement/' + scheduleId + '/' + id);
      }
      if (itemData.executionArea === "Fixed Asset") {
        this.$router.push('/process/audit-review/fixed-asset/' + scheduleId + '/' + id);
      }
      if (itemData.executionArea === "Check Point Execution") {
        this.$router.push('/process/audit-review/check-point-execution/' + scheduleId + '/' + id);
      }
    },
  }
}
