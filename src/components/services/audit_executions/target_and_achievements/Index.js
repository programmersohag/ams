import Pagination from '@/containers/Pagination';
import AuditIndex from '@/containers/AuditIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import Swal from "sweetalert2";

export default {
  components: {AuditIndex, Pagination, SearchFormGenerator},
  data() {
    return {
      page_title: this.$t("Target") + ' ' + this.$t("And") + ' ' + this.$t("Achievements"),
      search_schema: {
        name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("name"),
          placeholder: this.$t("name")
        }
      },
      search_form_data: {},
      target_and_achievements: [],
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
      let param = {params: {'locationId': locationId, 'executionArea': 'TAA'}};
      this.$axios
        .get(url, param)
        .then(res => {
          if (res.data.statusCode === 200) {
            this.target_and_achievements = res.data.data;
            if (this.target_and_achievements.length > 0) {
              for (let i = 0; i < this.target_and_achievements.length; i++) {
                this.target_and_achievements[i]['location'] = '[' + this.target_and_achievements[i]['location_code'] + ']' + this.target_and_achievements[i]['location_name'] + ', ' + this.target_and_achievements[i]['location_address'];
                this.target_and_achievements[i]['schedule'] = '[' + this.target_and_achievements[i]['schedule_code'] + ']' + this.target_and_achievements[i]['schedule_name'];
                this.target_and_achievements[i]['auditPeriod'] = this.target_and_achievements[i]['schedules_from_date'] + ' To ' + this.target_and_achievements[i]['schedules_to_date'];
                this.target_and_achievements[i]['members'] = this.target_and_achievements[i]['members'];
                this.target_and_achievements[i]['createdOn'] = this.target_and_achievements[i]['created_on'];
                this.target_and_achievements[i]['issueStatus'] = this.target_and_achievements[i]['issue_status'];
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
      this.$router.push('/audit-execution/target-and-achievements/add');
    },
    edit: function (id) {
      this.$router.push('/audit-execution/target-and-achievements/add?id=' + id);
    },
    customDelete(id) {
      let delete_data = [{
        url: '/budgets/delete',
        field_id: 'id'
      }];
      this.confirmMessage(id, delete_data, false);
    },
    view: function (id) {
      this.$router.push('/audit-execution/target-and-achievements/view?id=' + id);
    },
  }
}


