import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import AuditIndex from '@/containers/AuditIndex';
import Swal from "sweetalert2";

export default {
  components: {AuditIndex, SearchFormGenerator},
  data() {
    return {
      page_title: this.$t("check") + " " + this.$t("point") + " " + this.$t("execution"),
      search_schema: {
        txt_name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("name"),
          placeholder: this.$t("name")
        }
      },
      search_form_data: {},
      check_point_executions: [],
      pagination: {
        offset: 0,
        total_rows: 0
      },
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: function () {
      const locationId = localStorage.getItem('location_id');
      let url = '/audit_execution_masters/findByLocationAndExecutionArea';
      const param = {params: {'locationId': locationId, 'executionArea': 'CPE'}};
      this.$axios
        .get(url, param)
        .then(res => {
          if (res.data.statusCode === 200) {
            this.check_point_executions = res.data.data;
            if (this.check_point_executions.length > 0) {
              for (let i = 0; i < this.check_point_executions.length; i++) {
                this.check_point_executions[i]['location'] = '[' + this.check_point_executions[i]['location_code'] + ']' + this.check_point_executions[i]['location_name'] + ', ' + this.check_point_executions[i]['location_address'];
                this.check_point_executions[i]['schedule'] = '[' + this.check_point_executions[i]['schedule_code'] + ']' + this.check_point_executions[i]['schedule_name'];
                this.check_point_executions[i]['auditPeriod'] = this.check_point_executions[i]['schedules_from_date'] + ' To ' + this.check_point_executions[i]['schedules_to_date'];
                this.check_point_executions[i]['members'] = this.check_point_executions[i]['members'];
                this.check_point_executions[i]['createdOn'] = this.check_point_executions[i]['created_on'];
                this.check_point_executions[i]['issueStatus'] = this.check_point_executions[i]['issue_status'];
              }
            }
          }
        });
    },
    customDelete(id) {
      let delete_data = [{
        url: '/check_point_executions/deleteAll',
        field_id: 'id'
      }];
      this.confirmMessage(id, delete_data, false);
    },
    clear: function () {
      this.$set(this.search_form_data, 'name', '');
      this.loadData(0);
    },
    add: function (id) {
      this.$router.push('/audit-execution/check-point-executions/add/' + id);
    },
    view: function (data) {
      this.$router.push('/audit-execution/check-point-executions/view?id=' + data);
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
  }
}
