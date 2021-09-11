import Pagination from '@/containers/Pagination';
import AuditIndex from '@/containers/AuditIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import Swal from "sweetalert2";

export default {
  components: {AuditIndex, Pagination, SearchFormGenerator},
  data() {
    return {
      page_title: this.$t("budgets"),
      search_schema: {
        name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("name"),
          placeholder: this.$t("name")
        }
      },
      search_form_data: {},
      budgets: [],
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
      let param = {params: {'locationId': locationId, 'executionArea': 'BG'}};
      this.$axios
        .get(url, param)
        .then(res => {
          if (res.data.statusCode === 200) {
            this.budgets = res.data.data;
            if (this.budgets.length > 0) {
              for (let i = 0; i < this.budgets.length; i++) {
                this.budgets[i]['location'] = '[' + this.budgets[i]['location_code'] + ']' + this.budgets[i]['location_name'] + ', ' + this.budgets[i]['location_address'];
                this.budgets[i]['schedule'] = '[' + this.budgets[i]['schedule_code'] + ']' + this.budgets[i]['schedule_name'];
                this.budgets[i]['auditPeriod'] = this.budgets[i]['schedules_from_date'] + ' To ' + this.budgets[i]['schedules_to_date'];
                this.budgets[i]['members'] = this.budgets[i]['members'];
                this.budgets[i]['createdOn'] = this.budgets[i]['created_on'];
                this.budgets[i]['issueStatus'] = this.budgets[i]['issue_status'];
              }
            }
          }
        });
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
        showLoaderOnConfirm: false,
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
          let status_name = 'Submitted!';
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
    add: function () {
      this.$router.push('/audit-execution/budgets/add');
    },
    edit: function (id) {
      this.$router.push('/audit-execution/budgets/add?id=' + id);
    },
    customDelete(id) {
      let delete_data = [{
        url: '/budgets/delete',
        field_id: 'id'
      }];
      this.confirmMessage(id, delete_data, false);
    },
    view: function (id) {
      this.$router.push('/audit-execution/budgets/view?id=' + id);
    },
  }
}


