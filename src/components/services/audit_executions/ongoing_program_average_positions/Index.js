import Pagination from '@/containers/Pagination';
import AuditIndex from '@/containers/AuditIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import Swal from "sweetalert2";

export default {
  components: {AuditIndex, Pagination, SearchFormGenerator},
  data() {
    return {
      page_title: this.$t("ongoing") + " " + this.$t("program") + " " + this.$t("average") + " " + this.$t("position"),
      search_schema: {
        name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("name"),
          placeholder: this.$t("name")
        }
      },
      search_form_data: {},
      ongoing_program_average_positions: [],
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: function () {
      const locationId = localStorage.getItem('location_id');
      let url = '/audit_execution_masters/findByLocationAndExecutionArea';
      const param = {params: {'locationId': locationId, 'executionArea': 'OPAP'}};
      this.$axios
        .get(url, param)
        .then(res => {
          if (res.data.statusCode === 200) {
            this.ongoing_program_average_positions = res.data.data;
            if (this.ongoing_program_average_positions.length > 0) {
              for (let i = 0; i < this.ongoing_program_average_positions.length; i++) {
                this.ongoing_program_average_positions[i]['location'] = '[' + this.ongoing_program_average_positions[i]['location_code'] + ']' + this.ongoing_program_average_positions[i]['location_name'] + ', ' + this.ongoing_program_average_positions[i]['location_address'];
                this.ongoing_program_average_positions[i]['schedule'] = '[' + this.ongoing_program_average_positions[i]['schedule_code'] + ']' + this.ongoing_program_average_positions[i]['schedule_name'];
                this.ongoing_program_average_positions[i]['auditPeriod'] = this.ongoing_program_average_positions[i]['schedules_from_date'] + ' To ' + this.ongoing_program_average_positions[i]['schedules_to_date'];
                this.ongoing_program_average_positions[i]['members'] = this.ongoing_program_average_positions[i]['members'];
                this.ongoing_program_average_positions[i]['createdOn'] = this.ongoing_program_average_positions[i]['created_on'];
                this.ongoing_program_average_positions[i]['issueStatus'] = this.ongoing_program_average_positions[i]['issue_status'];
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
          let status_name = 'Submitted!';
          let message = data.message;
          if (data.statusCode === 200) {
            if (load === true) {
              this.$emit("submit");
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
        url: '/ongoing_program_average_positions/delete',
        field_id: id
      }];
      this.confirmMessage(id, delete_data, false);
    },
    clear: function () {
      this.$set(this.search_form_data, 'name', '');
      this.loadData(0);
    },
    add: function () {
      this.$router.push('/audit-execution/ongoing-program-average-positions/add');
    },
    edit: function (id) {
      console.log('grilwelihq');
      this.$router.push('/audit-execution/ongoing-program-average-positions/edit?id=' + id);
    },
    view: function (id) {
      this.$router.push('/audit-execution/ongoing-program-average-positions/view?id=' + id);
    }
  }
}


