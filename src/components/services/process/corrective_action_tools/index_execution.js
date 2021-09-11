import Pagination from '@/containers/Pagination';
import CommonIndex from '@/containers/CommonIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';
import {ROW_PER_PAGE} from "@/shared/common/config";

export default {
  components: {CommonIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("corrective") + ' ' + this.$t("action") + ' ' + this.$t("tools") + ': ' + this.$t("audit") + ' ' + this.$t("executions"),

      members: '',
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: 'executionArea', label: this.$t('execution') + ' ' + this.$t('area'), sortable: false},
        {key: 'schedule', label: this.$t('schedule') + ' ' + this.$t('name'), sortable: false},
        {key: 'location', label: this.$t('location'), sortable: false},
        {key: 'team', label: this.$t('team'), sortable: false},
        {key: "html_1", label: this.$t('reply') + ' ' + this.$t('status'), sortable: true, tdClass: "text-center"},
        {key: 'actions', label: this.$t('actions'), sortable: false},
      ],
      response_review: [],
      response_schedule: [],
      pagination: {
        offset: 0,
        total_rows: 0
      },
    }
  },
  mounted() {
    this.loadData(this.pagination.offset);
  },
  methods: {
    loadData: function (offset = 0) {
      const page = (offset === 0) ? offset : (offset / ROW_PER_PAGE);
      const param = {'size': ROW_PER_PAGE, 'page': page};
      const scheduleId = this.$route.params.id;
      param['scheduleId'] = scheduleId;

      this.$axios.get('/corrective-action-tools/find-all-by-schedule-id', {params: param})
        .then(res => {
          this.response_review = res.data.review.body.data.content;
          this.response_schedule = res.data.schedule;
          this.pagination.total_rows = res.data.review.body.data['totalElements'];
          this.pagination.offset = res.data.review.body.data['pageable']['offset'];

          for (let i = 0; i <= this.response_review.length; i++) {
           console.log(this.response_review[i]['executionArea'])
            if (this.response_review[i]['executionArea'] == "GENERAL_INFO") {
              this.response_review[i]['executionArea'] = "General Info";
            }
            if (this.response_review[i]['executionArea'] == "STAFF_POSITION") {
              this.response_review[i]['executionArea'] = "Staff Position";
            }
            if (this.response_review[i]['executionArea'] == "FILED_OFFICER_WISE_PERFORMANCE_ANALYSIS") {
              this.response_review[i]['executionArea'] = "Field Officer Wise Performance Analysis";
            }
            if (this.response_review[i]['executionArea'] == "CASH_AND_BANK_BALANCE") {
              this.response_review[i]['executionArea'] = "Cash & Bank Balance";
            }
            if (this.response_review[i]['executionArea'] == "PASSBOOK_BALANCING") {
              this.response_review[i]['executionArea'] = "Passbook Balancing";
            }
            if (this.response_review[i]['executionArea'] == "BUDGET") {
              this.response_review[i]['executionArea'] = "Budget";
            }
            if (this.response_review[i]['executionArea'] == "TARGET_AND_ACHIEVEMENT") {
              this.response_review[i]['executionArea'] = "Target & Achievement";
            }
            if (this.response_review[i]['executionArea'] == "FIXED_ASSET") {
              this.response_review[i]['executionArea'] = "Fixed Asset";
            }
            if (this.response_review[i]['executionArea'] == "ONGOING_PROGRAM_AVERAGE_POSITION") {
              this.response_review[i]['executionArea'] = "Average Position of Ongoing Program";
            }
            if (this.response_review[i]['executionArea'] == "CHECK_POINT_EXECUTION") {
              this.response_review[i]['executionArea'] = "Check Point Execution";
            }
            this.response_review[i]['executionArea'] = this.response_review[i]['executionArea'];
            for (let j = 0; j < this.response_schedule.length; j++) {
              if (this.response_schedule[j].id == this.response_review[i].scheduleId) {
                this.response_review[i]['location'] = '[' + this.response_schedule[j]['location']['code'] + ']-' + this.response_schedule[j]['location']['name'];
                this.response_review[i]['team'] = this.response_schedule[j]['team']['name'];
                let member_list = "";
                for (let m = 0; m < this.response_schedule[j].team.members.length; m++) {
                  if (m != 0) {
                    member_list = member_list + ',';
                  }
                  member_list = member_list + this.response_schedule[j].team.members[m].memberName;
                }
                this.response_review[i]['team'] = this.response_review[i]['team'] + ' (' + member_list + ')';
                this.response_review[i]['schedule'] = this.response_schedule[j]['name'];
              }
            }
            this.response_review[i]["isCustomActionButton"] = 1;
            if (this.response_review[i].replyStatus === 'RESOLVED') {
              this.response_review[i]["status"] = '<div class="success">Resolved</div>';
            } else if (this.response_review[i].replyStatus === 'FEEDBACK') {
              this.response_review[i]["status"] = '<div class="danger">Feedback</div>';
            } else if (this.response_review[i].replyStatus === 'PENDING') {
              this.response_review[i]["status"] = '<div class="pending_tag">Pending</div>';
            } else if (this.response_review[i].replyStatus === 'DRAFT') {
              this.response_review[i]["status"] = '<div class="draft_tag">Draft</div>';
            } else if (this.response_review[i].replyStatus === 'IN_PROGRESS') {
              this.response_review[i]["status"] = '<div class="warning">In Progress</div>';
            } else if (this.response_review[i].replyStatus === 'CLOSE') {
              this.response_review[i]["status"] = '<div class="warning">Close</div>';
            }

            this.response_review[i]["html_1"] = this.response_review[i]["status"];
            this.response_review[i]["customActionButton"] = {
              btn_1: {
                name: 'Reply',
                name_show: true,
                //icon:'fa-plus',
                variant: 'info',
                icon: 'fa-circle',
                // style:'color:red'
              },
            };
          }
        });
    },

    customActionButton: function (itemData, key) {
      if (key === 'btn_1') {
        this.replyPage(itemData);
      }
    },
    replyPage: function (itemData) {
      let id = null;
      let auditExecutionMastersId = null;
      let scheduleId = null;
      if (itemData.id) {
        id = itemData.id;
        auditExecutionMastersId = itemData.auditExecutionMastersId;
        scheduleId = itemData.scheduleId;
      }
      if (itemData.executionArea === "General Info") {
        this.$router.push('/process/corrective-action-tools/general-info/' + auditExecutionMastersId + '/' + id);
      } else if (itemData.executionArea === "Staff Position") {
        this.$router.push('/process/corrective-action-tools/staff-position/' + auditExecutionMastersId + '/' + id);
      } else if (itemData.executionArea === "Field Officer Wise Performance Analysis") {
        this.$router.push('/process/corrective-action-tools/field-officer-wise-performance-analysis/' + auditExecutionMastersId + '/' + id);
      } else if (itemData.executionArea === "Average Position of Ongoing Program") {
        this.$router.push('/process/corrective-action-tools/ongoing-program-average-position/' + auditExecutionMastersId + '/' + id);
      } else if (itemData.executionArea === "Cash & Bank Balance") {
        this.$router.push('/process/corrective-action-tools/cash-and-bank-balance/' + auditExecutionMastersId + '/' + id);
      } else if (itemData.executionArea === "Passbook Balancing") {
        this.$router.push('/process/corrective-action-tools/passbook-balance/' + auditExecutionMastersId + '/' + id);
      } else if (itemData.executionArea === "Budget") {
        this.$router.push('/process/corrective-action-tools/budget/' + auditExecutionMastersId + '/' + id);
      } else if (itemData.executionArea === "Target & Achievement") {
        this.$router.push('/process/corrective-action-tools/target-and-achievement/' + auditExecutionMastersId + '/' + id);
      } else if (itemData.executionArea === "Fixed Asset") {
        this.$router.push('/process/corrective-action-tools/fixed-asset/' + auditExecutionMastersId + '/' + id);
      } else if (itemData.executionArea === "Check Point Execution") {
        this.$router.push('/process/corrective-action-tools/check-point-execution/' + scheduleId + '/' + auditExecutionMastersId + '/' + id);
      }
    },
  }
}
