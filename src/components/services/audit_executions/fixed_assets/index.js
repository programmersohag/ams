import Pagination from '@/containers/Pagination';
import AuditIndex from '@/containers/AuditIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CustomModal from '@/containers/Modal';

export default {
  components: {AuditIndex, Pagination, SearchFormGenerator, CustomModal},
  data() {
    return {
      page_title: this.$t("fixed") + " " + this.$t("assets"),
      search_schema: {
        name: {
          fieldType: "TextInput",
          fieldName: "name",
          label: this.$t("name"),
          placeholder: this.$t("name")
        }
      },
      search_form_data: {},

      fixedAsset: [],
      //pagination
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "audit_executions/fixed_assets/Save",
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
      const param = {params: {'locationId': locationId, 'executionArea': 'FA'}};
      this.$axios
        .get(url, param)
        .then(res => {
          if (res.data.statusCode === 200) {
            this.fixedAsset = res.data.data;
            for (let i = 0; i < this.fixedAsset.length; i++) {
              this.fixedAsset[i]['location'] = '[' + this.fixedAsset[i]['location_code'] + ']' + this.fixedAsset[i]['location_name'] + ', ' + this.fixedAsset[i]['location_address'];
              this.fixedAsset[i]['schedule'] = '[' + this.fixedAsset[i]['schedule_code'] + ']' + this.fixedAsset[i]['schedule_name'];
              this.fixedAsset[i]['auditPeriod'] = this.fixedAsset[i]['schedules_from_date'] + ' To ' + this.fixedAsset[i]['schedules_to_date'];
              this.fixedAsset[i]['members'] = this.fixedAsset[i]['members'];
              this.fixedAsset[i]['createdOn'] = this.fixedAsset[i]['created_on'];
              this.fixedAsset[i]['issueStatus'] = this.fixedAsset[i]['issue_status'];
            }
          } else {
            this.fixedAsset = [];
          }
        });
    },
    customModal: function (data) {
      let num = isNaN(data)
      if (!num) {
        this.modal_info.title = this.$t('edit') + " " + this.$t("fixed") + " " + this.$t("asset");
        this.modal_info.id = data;
        this.modal_info.isModalVisible = true;
      } else {
        this.modal_info.id = null;
        this.modal_info.title = this.$t('add') + " " + this.$t("fixed") + " " + this.$t("asset");
        this.modal_info.isModalVisible = true;
      }
      this.modal_info.component_address = "audit_executions/fixed_assets/Save"
    },
    customViewModal: function (id) {
      this.modal_info.title = this.$t('preview') + " " + this.$t("fixed") + " " + this.$t("asset");
      this.modal_info.id = id;
      this.modal_info.isModalVisible = true;
      this.modal_info.component_address = "audit_executions/fixed_assets/Show"
    },
    closeModal(is_reload = false) {
      this.modal_info.isModalVisible = false;
      if (is_reload === true) {
        this.loadData(0);
      }
    },
    customDelete(id) {
      let delete_data = [{
        url: '/fixed-asset/delete',
        field_id: 'id'
      }];
      this.confirmMessage(id, delete_data, false);
    },
    clear: function () {
      this.$set(this.search_form_data, 'name', '');
      this.loadData(0);
    },

    submit: function (id, load = false) {
      let url = '/audit_execution_masters/edit';
      let param = {};
      param['id'] = id;
      param['issueStatus'] = 'PENDING';

      this.$axios
        .post(url, JSON.stringify(param), {
          headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
          if (res.data.validation_error) {
            this.error_message = res.data.validation_error;
          } else {
            let status = 'failed';
            if (res.data.statusCode === 200) {
              status = 'success';
            } else if (res.data.statusCode === 202) {
              status = 'warning';
            }

            this.flashMessage(status, res.data.message);

            if (status === 'success') {
              this.$emit('close', true);
            }
            res.load = load;
            return res.data.data;
          }
        });


    }
  }
}


