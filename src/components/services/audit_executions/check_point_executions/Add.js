import FormGenerator from "@/containers/form_generators/FormGenerator";
import NormalForm from "@/containers/normal_forms/FormGenerator";
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import {ROW_PER_PAGE} from "@/shared/common/config";
import CustomModal from '@/containers/Modal';

const axios = require('axios');

export default {
  components: {FormGenerator, NormalForm, CommonIndex, Pagination, CustomModal},
  data() {
    return {
      page_title: this.$t("check") + " " + this.$t("point"),
      parent_schema: {
        txt_group: {
          fieldType: "SelectList",
          fieldName: "group",
          labelClass: 7,
          class: 'col-md-5',
          label: this.$t("check") + " " + this.$t("list") + " " + this.$t("category"),
          options: {'': "--" + this.$t("select") + "--"},
          onChange: true,
          vvalidate: "required"
        }
      },
      child_schema: {
        txt_check_list: {
          fieldType: "SelectList",
          fieldName: "checkList",
          class: 'col-md-3',
          label: this.$t("check") + " " + this.$t("list"),
          options: {'': "--" + this.$t("select") + "--"},
          onChange: true,
          vvalidate: "required"
        },
        txt_expected_action: {
          fieldType: "SelectList",
          fieldName: "expectedAction",
          label: this.$t("expected") + " " + this.$t("action"),
          options: {'': "--" + this.$t("select") + "--"},
          onChange: true,
          vvalidate: "required"
        },
        txt_satisfaction_ratio: {
          fieldType: "SelectList",
          fieldName: "satisfactionRatio",
          label: this.$t("satisfaction") + " " + this.$t("ratio"),
          options: {'': "--" + this.$t("select") + "--"},
          onChange: true,
          vvalidate: "required"
        },
        txt_risk_level: {
          fieldType: "SelectList",
          fieldName: "riskLevel",
          label: this.$t("risk") + " " + this.$t("level"),
          options: {'': "--" + this.$t("select") + "--"},
          onChange: true,
          vvalidate: "required"
        },
        txt_comment: {
          fieldType: "TextEditor",
          fieldName: "comment",
          label: this.$t("comments"),
          vvalidate: "required",
        },
        txt_evidence: {
          fieldType: "ImageInput",
          fieldName: "evidence",
          label: this.$t("evidence"),
          onChange: true,
          vvalidate: ""
        }
      },
      is_parent_form_load: true,
      is_child_form_load: false,
      parent_error_message: [],
      child_error_message: [],
      parent_form_data: {},
      child_form_data: {},
      form_data: {},
      reset_data: {},
      locationName: '',
      scheduleName: '',
      id: '',
      head_information: [
        {key: "index", label: '#', sortable: false},
        {key: "checkList", label: this.$t('check') + ' ' + this.$t('list'), sortable: true},
        {key: "expectedAction", label: this.$t('expected') + ' ' + this.$t('action'), sortable: true},
        {key: "satisfactionRatio", label: this.$t('satisfaction') + ' ' + this.$t('ratio'), sortable: true},
        {key: "riskLevel", label: this.$t('risk') + ' ' + this.$t('level'), sortable: true},
        {key: "html_1", label: this.$t('comment'), sortable: true},
        {key: 'actions', label: this.$t('actions'), sortable: false}
      ],
      pagination: {
        offset: 0,
        total_rows: 0
      },
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "audit_executions/check_point_executions/Edit",
      },
      check_list_execution: [],
    }
  },
  mounted() {
    this.loadData(this.pagination.offset);
    this.getScheduleById();
    this.getCheckListCategories();
    this.getExpectedActions();
    this.getSatisfactionRatio();
    this.getRiskLevel();
    this.is_form_load = true;
  },
  methods: {
    loadData: function (offset = 0) {
      const auditExecutionMastersId = this.$route.params.auditExecutionMastersId;
      if (!isNaN(auditExecutionMastersId)) {
        const page = (offset === 0) ? offset : (offset / ROW_PER_PAGE);
        const param = {
          'size': ROW_PER_PAGE,
          'page': page,
          'sort': 'createdOn,desc',
          'auditExecutionMastersId': auditExecutionMastersId
        }
        this.$axios.post("/check_point_executions", null, {params: param})
          .then(res => {
            if (res.data.data) {
              this.check_list_execution = res.data.data.content;
              this.pagination.total_rows = res.data.data['totalElements'];
              this.pagination.offset = res.data.data['pageable']['offset'];
              for (let i = 0; i < this.check_list_execution.length; i++) {
                this.check_list_execution[i]['checkList'] = this.check_list_execution[i]['checkList']['name'];
                this.check_list_execution[i]['expectedAction'] = this.check_list_execution[i]['expectedAction'];
                this.check_list_execution[i]['satisfactionRatio'] = this.getSatisfactionRatioValue(this.check_list_execution[i]['satisfactionRatio']);
                this.check_list_execution[i]['riskLevel'] = this.check_list_execution[i]['riskLevel'];
                this.check_list_execution[i]['html_1'] = this.check_list_execution[i]['comment'];
                this.check_list_execution[i]['edit'] = 1;
                this.check_list_execution[i]['delete'] = 1;
              }
            } else this.check_list_execution = []
          });
      }
    },
    getScheduleById: function () {
      const scheduleId = localStorage.getItem('schedule');
      if (scheduleId) {
        let params = {id: scheduleId};
        let url = 'schedules/findById/' + scheduleId;
        this.$axios
          .get(url, params)
          .then(res => {
            this.locationName = res.data.data['location']['name'];
            this.parent_form_data['locationId'] = res.data.data['location']['id'];
            this.scheduleName = res.data.data['name'];
            this.parent_form_data['scheduleId'] = scheduleId;
          });
      }
    },
    getCheckListCategories: function () {
      this.$axios.get("checkListCategories")
        .then(res => {
          let array = [{
            text: "--" + this.$t("select") + "--",
            value: ''
          }];
          if (res.data.data) {
            const groups = res.data.data;
            for (let key in groups) {
              array.push({value: groups[key].id, text: groups[key].name});
            }
          }
          this.parent_schema['txt_group']['options'] = array;
        });
    },
    getCheckList: function (params) {
      this.$axios.get("schedules/check_lists", {params: params})
        .then(res => {
          let array = [{
            text: "--" + this.$t("select") + " " + this.$t("check") + " " + this.$t("list") + "--",
            value: ''
          }];
          if (res.data.data) {
            const check_list = res.data.data;
            for (let key in check_list) {
              array.push({value: check_list[key].id, text: check_list[key].name});
            }
            this.is_child_form_load = true;
          }
          this.child_schema['txt_check_list']['options'] = array;
        });
    },
    getExpectedActions: function () {
      this.child_schema['txt_expected_action']['options'] = [
        {
          text: "--" + this.$t("select") + "--",
          value: ''
        },
        {
          text: "Verified",
          value: 'VERIFIED'
        },
        {
          text: "Not Verified",
          value: 'NOT_VERIFIED'
        },
        {
          text: "Not Applicable",
          value: 'NOT_APPLICABLE'
        }
      ];
    },
    getSatisfactionRatio: function () {
      this.child_schema['txt_satisfaction_ratio']['options'] = [
        {
          text: "--" + this.$t("select") + "--",
          value: ''
        },
        {
          text: "Fully done",
          value: 'FULLY_DONE'
        },
        {
          text: "Partially done",
          value: 'PARTIALLY_DONE'
        },
        {
          text: "Not done",
          value: 'NOT_DONE'
        }
      ];
    },
    getSatisfactionRatioValue: function (ratioName) {
      if (ratioName === 'FULLY_DONE') {
        return 1;
      } else if (ratioName === 'PARTIALLY_DONE') {
        return 0.50;
      } else if (ratioName === 'NOT_DONE') {
        return 0;
      }
    },
    getRiskLevel: function () {
      this.child_schema['txt_risk_level']['options'] = [
        {
          text: "--" + this.$t("select") + "--",
          value: ''
        },
        {
          text: "High",
          value: 'HIGH'
        },
        {
          text: "Medium",
          value: 'MEDIUM'
        },
        {
          text: "Low",
          value: 'LOW'
        },
        {
          text: "Not Applicable",
          value: 'NOT_APPLICABLE'
        }
      ];
    },
    onChangeMethod(field, value) {
      if (field === "group" && value) {
        const group = {"groupId": value}
        this.getCheckList(group);
      }
      if (field === 'evidence') {
        //console.log(value)
      }
    },
    handleSubmit: function () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          const scheduleId = localStorage.getItem('schedule');
          const check_list_id = this.child_form_data['checkList'];
          let userInfo = this.$store.getters['auth/userInfo'];
          const general_config = this.$store.getters['config/generalConfigInfo'];
          const orgName = general_config['organization_short_name'];
          const checkListCategory = this.parent_form_data['group'];
          const auditExecutionMastersId = this.$route.params.auditExecutionMastersId;
          if (!isNaN(auditExecutionMastersId)) {
            this.form_data['auditExecutionMastersId'] = auditExecutionMastersId;
          }
          this.form_data["scheduleId"] = scheduleId;
          this.form_data["auditBy"] = userInfo['id'];
          this.form_data["checkList"] = {id: check_list_id};
          this.form_data["expectedAction"] = this.child_form_data['expectedAction'];
          this.form_data["satisfactionRatio"] = this.child_form_data['satisfactionRatio'];
          this.form_data["riskLevel"] = this.child_form_data['riskLevel'];
          this.form_data["comment"] = this.child_form_data['comment'];
          let docFileName = orgName + "_" + "check_point_evidence" + "_" + checkListCategory + "_" + scheduleId + "_" + check_list_id + "." + "jpg";
          if (this.child_form_data['evidence']) {
            this.form_data["imageIdentity"] = docFileName;
          }
          let headers = {
            headers: {
              'Content-Type': `application/json`
            }
          }
          this.$axios
            .post("check_point_executions/add", JSON.stringify(this.form_data), headers)
            .then(res => {
              if (res.data.validation_error) {
                this.child_error_message = res.data.validation_error;
              } else {
                let status = 'failed';
                if (res.data.statusCode === 200) {
                  this.$router.replace({
                    params: {auditExecutionMastersId: res.data.data.auditExecutionMastersId}
                  });
                  status = 'success';
                  if (this.child_form_data['evidence']) {
                    this.handleUpload(docFileName);
                  }
                  this.loadData(this.pagination.offset);
                  this.handleReset();
                }
                this.flashMessage(status, res.data.message);
                if (status === 'success') {
                  this.$emit('close', true);
                }
              }
            });
        }
      }).catch(() => {
        this.$toast.error({title: 'error', message: "Invalid Field"});
      });
    },
    handleUpload: function (docFileName) {
      this.$validator.validate().then(valid => {
          if (valid) {
            let userInfo = this.$store.getters['auth/userInfo'];
            let tags = ['ams', "checklist", 'evidence']
            //file info
            let fileInfo = {
              "fileName": docFileName,
              "folderPath": 'employee_signature',
              "drivePath": "mfin-" + "demonext",
              "projectPath": 'branch-2',
              "description": "This is transfer file",
              "categories": ['5d9da10d5e37c5114c717623'],
              "tags": tags,
              "references": {
                "UploadBy": userInfo['id']
              },
            }
            let params = {
              "file": this.child_form_data['evidence'],
              "fileName": fileInfo['fileName'],
              "file_info": JSON.stringify(fileInfo)
            }
            let headers = {
              headers: {
                'Authorization': 'Bearer 4d4ceb93-47ad-48c2-8372-1fc981af66cf',
                'Content-Type': 'application/json'
              }
            }
            let url = 'http://192.168.1.97:8765/filemanager-service/uploads/';
            axios.post(url, JSON.stringify(params), headers).then(resp => {
              if (resp.status === 200) {
                this.flashMessage(resp.data.status, resp.data.message);
                this.$emit('close', true);
              }
            })
          }
        }
      );
    },
    handleReset: function () {
      this.child_error_message = [];
      this.$set(this.child_form_data, "checkList", this.reset_data.checkList);
      this.$set(this.child_form_data, "expectedAction", this.reset_data.expectedAction);
      this.$set(this.child_form_data, "satisfactionRatio", this.reset_data.satisfactionRatio);
      this.$set(this.child_form_data, "riskLevel", this.reset_data.riskLevel);
      this.$set(this.child_form_data, "comment", this.reset_data.comment);
      this.errors.clear();
      this.$validator.reset();
    },
    customEdit: function (data) {
      if (data.id) {
        this.modal_info.title = this.$t('edit') + " " + this.$t('check') + " " + this.$t('point');
        this.modal_info.id = data.id;
        this.modal_info.isModalVisible = true;
      }
    },
    customDelete(itemData) {
      let delete_data = [{
        url: '/check_point_executions/delete',
        field_id: 'id'
      }];
      let id = itemData['id'];
      this.confirmMessage(id, delete_data, false);
    },
    closeModal(is_reload = false) {
      this.modal_info.isModalVisible = false;
      if (is_reload === true) {
        this.loadData(this.pagination.offset);
      }
    },
    handleBack: function () {
      this.$router.push('/audit-execution/check-point-executions/index');
    }
  }
}
