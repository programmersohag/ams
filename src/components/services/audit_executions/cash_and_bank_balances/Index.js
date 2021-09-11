import Pagination from '@/containers/Pagination';
import AuditIndex from '@/containers/AuditIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import Swal from "sweetalert2";

export default {
  components: {AuditIndex, Pagination, SearchFormGenerator},
  data() {
    return {
      page_title: this.$t("cash") + " " + this.$t("and") + " " + this.$t("bank") + " " + this.$t("list"),
      search_schema: {
        name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("name"),
          placeholder: this.$t("name")
        }
      },
      search_form_data: {},
      cash_and_banks: [],
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: function () {
      const locationId = localStorage.getItem('location_id');
      let url = '/audit_execution_masters/findByLocationAndExecutionArea';
      const param = {params: {'locationId': locationId, 'executionArea': 'CABB'}};
      this.$axios
        .get(url, param)
        .then(res => {
          if (res.data.statusCode === 200) {
            this.cash_and_banks = res.data.data;
            if (this.cash_and_banks.length > 0) {
              for (let i = 0; i < this.cash_and_banks.length; i++) {
                this.cash_and_banks[i]['location'] = '[' + this.cash_and_banks[i]['location_code'] + ']' + this.cash_and_banks[i]['location_name'] + ', ' + this.cash_and_banks[i]['location_address'];
                this.cash_and_banks[i]['schedule'] = '[' + this.cash_and_banks[i]['schedule_code'] + ']' + this.cash_and_banks[i]['schedule_name'];
                this.cash_and_banks[i]['auditPeriod'] = this.cash_and_banks[i]['schedules_from_date'] + ' To ' + this.cash_and_banks[i]['schedules_to_date'];
                this.cash_and_banks[i]['members'] = this.cash_and_banks[i]['members'];
                this.cash_and_banks[i]['createdOn'] = this.cash_and_banks[i]['created_on'];
                this.cash_and_banks[i]['issueStatus'] = this.cash_and_banks[i]['issue_status'];
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
    customDelete(id) {
      let delete_data = [{
        url: '/cash_and_bank/delete',
        field_id: id
      }];
      this.confirmMessage(id, delete_data, false);
    },
    clear: function () {
      this.$set(this.search_form_data, 'name', '');
      this.loadData(0);
    },
    add: function () {
      this.$router.push('/audit-execution/cash-and-bank-balances/add');
    },
    edit: function (id) {
      this.$router.push('/audit-execution/cash-and-bank-balances/edit?id=' + id);
    },
    view: function (id) {
      this.$router.push('/audit-execution/cash-and-bank-balances/view?id=' + id);
    },
  }
}
