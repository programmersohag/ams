import Pagination from '@/containers/Pagination';
import AuditIndex from '@/containers/AuditIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';
import Swal from "sweetalert2";

export default {
  components: {AuditIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("general") + " " + this.$t("info"),
      search_schema: {
        name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("name"),
          placeholder: this.$t("name")
        }
      },
      search_form_data: {},

      generalInfo: [],
      //pagination
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "audit_executions/general_info/Save",
      },
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: function () {
      let url = ''
      const param = {params: {'executionArea': 'GI'}};
      const locationId = localStorage.getItem('location_id');

      if (locationId != null) {  // normal user
        param.params.locationId = locationId;
        url = '/audit_execution_masters/findByLocationAndExecutionArea';
      } else { // admin user
        url = '/audit_execution_masters/findAllByExecutionArea';
      }

      this.$axios
        .get(url, param)
        .then(res => {
          if (res.data.statusCode === 200) {
            this.generalInfo = res.data.data;
            if (this.generalInfo.length > 0) {
              for (let i = 0; i < this.generalInfo.length; i++) {
                this.generalInfo[i]['location'] = '[' + this.generalInfo[i]['location_code'] + ']' + this.generalInfo[i]['location_name'] + ', ' + this.generalInfo[i]['location_address'];
                this.generalInfo[i]['schedule'] = '[' + this.generalInfo[i]['schedule_code'] + ']' + this.generalInfo[i]['schedule_name'];
                this.generalInfo[i]['auditPeriod'] = this.generalInfo[i]['schedules_from_date'] + ' To ' + this.generalInfo[i]['schedules_to_date'];
                this.generalInfo[i]['members'] = this.generalInfo[i]['members'];
                this.generalInfo[i]['createdOn'] = this.generalInfo[i]['created_on'];
                this.generalInfo[i]['issueStatus'] = this.generalInfo[i]['issue_status'];
              }
            }
          }
        });
    },
    customModal: function (id) {
      let num = isNaN(id)
      if (!num) {
        this.modal_info.title = this.$t('edit') + " " + this.$t("general") + " " + this.$t("info");
        this.modal_info.id = id;
        this.modal_info.isModalVisible = true;
      } else {
        this.modal_info.id = null;
        this.modal_info.title = this.$t('add') + " " + this.$t("general") + " " + this.$t("info");
        this.modal_info.isModalVisible = true;
      }
      this.modal_info.component_address = "audit_executions/general_info/Save"
    },
    customViewModal: function (id) {
      this.modal_info.title = this.$t('show') + " " + this.$t("general") + " " + this.$t("info");
      this.modal_info.id = id;
      this.modal_info.isModalVisible = true;
      this.modal_info.component_address = "audit_executions/general_info/Show"

    },
    closeModal(is_reload = false) {
      this.modal_info.isModalVisible = false;
      if (is_reload === true) {
        this.loadData(0);
      }
    },
    customDelete(id) {
      let delete_data = [{
        url: '/general_info/delete',
        field_id: 'id'
      }];
      this.confirmMessage(id, delete_data, false);
    },
    clear: function () {
      this.$set(this.search_form_data, 'name', '');
      this.loadData(0);
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
    }
  }
}


