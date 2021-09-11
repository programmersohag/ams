import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import Pagination from '@/containers/Pagination';
import AuditIndex from '@/containers/AuditIndex';
import Swal from 'sweetalert2';
import {formatDate} from "../../../../shared/utils";

export default {
  components: {SearchFormGenerator, AuditIndex, Pagination},
  data() {
    return {
      page_title: this.$t("staff") + " " + this.$t("position"),
      search_schema: {
        txt_name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("name"),
          placeholder: this.$t("name")
        }
      },
      search_form_data: {},
      staff_positions: [],
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
      const param = {params: {'locationId': locationId, 'executionArea': 'SP'}};
      this.$axios
        .get(url, param)
        .then(res => {
          if (res.data.statusCode === 200) {
            this.staff_positions = res.data.data;
            if (this.staff_positions.length > 0) {
              for (let i = 0; i < this.staff_positions.length; i++) {
                this.staff_positions[i]['location'] = '[' + this.staff_positions[i]['location_code'] + ']' + this.staff_positions[i]['location_name'] + ', ' + this.staff_positions[i]['location_address'];
                this.staff_positions[i]['schedule'] = '[' + this.staff_positions[i]['schedule_code'] + ']' + this.staff_positions[i]['schedule_name'];
                this.staff_positions[i]['auditPeriod'] = formatDate(this.staff_positions[i]['schedules_from_date']) + ' To ' + formatDate(this.staff_positions[i]['schedules_to_date']);
                this.staff_positions[i]['members'] = this.staff_positions[i]['members'];
                this.staff_positions[i]['createdOn'] = this.staff_positions[i]['created_on'];
                this.staff_positions[i]['issueStatus'] = this.staff_positions[i]['issue_status'];
              }
            }
          }
        });
    },
    clear: function () {
      this.search_form_data.name = '';
    },
    add: function (id) {
      this.$router.push('/audit-execution/staff-positions/add/'+id);
    },
    view: function (id) {
      this.$router.push('/audit-execution/staff-positions/view?id=' + id);
    },
    customDelete(id) {
      let delete_data = [{
        url: '/staff_positions/deleteAll',
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
  }
}
