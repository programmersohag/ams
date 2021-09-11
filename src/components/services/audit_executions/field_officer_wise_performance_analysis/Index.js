import Pagination from '@/containers/Pagination';
import AuditIndex from '@/containers/AuditIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import Swal from "sweetalert2";

export default {
  components: {AuditIndex, Pagination, SearchFormGenerator},
  data() {
    return {
      page_title: this.$t("field") + " " + this.$t("officer") + " " + this.$t("wise") + " " + this.$t("performance") + " " + this.$t("analysis"),
      search_schema: {
        name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("name"),
          placeholder: this.$t("name")
        }
      },
      search_form_data: {},
      performanceAnalysis: [],
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: function () {
      const locationId = localStorage.getItem('location_id');
      let url = '/audit_execution_masters/findByLocationAndExecutionArea';
      const param = {params: {'locationId': locationId, 'executionArea': 'FOWPA'}};
      this.$axios
        .get(url, param)
        .then(res => {
          if (res.data.statusCode === 200) {
            this.performanceAnalysis = res.data.data;
            if (this.performanceAnalysis.length > 0) {
              for (let i = 0; i < this.performanceAnalysis.length; i++) {
                this.performanceAnalysis[i]['location'] = '[' + this.performanceAnalysis[i]['location_code'] + ']' + this.performanceAnalysis[i]['location_name'] + ', ' + this.performanceAnalysis[i]['location_address'];
                this.performanceAnalysis[i]['schedule'] = '[' + this.performanceAnalysis[i]['schedule_code'] + ']' + this.performanceAnalysis[i]['schedule_name'];
                this.performanceAnalysis[i]['auditPeriod'] = this.performanceAnalysis[i]['schedules_from_date'] + ' To ' + this.performanceAnalysis[i]['schedules_to_date'];
                this.performanceAnalysis[i]['members'] = this.performanceAnalysis[i]['members'];
                this.performanceAnalysis[i]['createdOn'] = this.performanceAnalysis[i]['created_on'];
                this.performanceAnalysis[i]['issueStatus'] = this.performanceAnalysis[i]['issue_status'];
              }
            }
          }
        });
    },
    customDelete(id) {
      let delete_data = [{
        url: '/field_officer_performance_analysis/deleteAll',
        field_id: 'id'
      }];
      this.confirmMessage(id, delete_data, false);
    },
    submit: function (id, load = false) {
      const url = '/audit_execution_masters/edit';
      const param = {};
      param['id'] = id;
      param['issueStatus'] = 'PENDING';
      const options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      Swal.fire({
        title: 'Are you sure?',
        html: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Submit!',
        showLoaderOnConfirm: true,
        preConfirm: (result) => {
          if (result) {
            return this.$axios
              .post(url, JSON.stringify(param), options)
              .then(res => {
                if (res['data']['statusCode'] !== 200) {
                  throw new Error(res.data.message)
                }
                res.load = load;
                return res.data;
              }).catch(error => {
                Swal.showValidationMessage(
                  `Request failed: ${error}`
                )
              })
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          let data = result.value;
          let status = 'success';
          let status_name = 'Deleted!';
          let message = data.message;
          if (data.statusCode === 200) {
            if (load === true) {
              this.$emit("delete");
            } else {
              this.loadData();
            }
          } else {
            status = 'error';
            status_name = 'Error!';
          }
          Swal(status_name, message, status);
        }
      });
    },
    clear: function () {
      this.$set(this.search_form_data, 'name', '');
      this.loadData(0);
    },
    add: function (id) {
      this.$router.push('/audit-execution/field-officer-wise-performance-analysis/add/' + id);
    },
    view: function (id) {
      this.$router.push('/audit-execution/field-officer-wise-performance-analysis/view?id=' + id);
    },
  }
}


