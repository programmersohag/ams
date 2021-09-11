import API from "@/shared/common/API.js";
import CustomModal from '@/containers/Modal';
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import router from "@/router/index.js";
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import Swal from "sweetalert2";
import {getBranchOptions}  from '@/shared/options/generate.js';

var branchNotificationAPI = new API();
branchNotificationAPI.createEntity({name: "branch_notification_messeges"});
let apiEndPoint = branchNotificationAPI.endpoints.branch_notification_messeges;

export default {
    name: "Index",
  components: {
        CustomModal, CommonIndex, Pagination, SearchFormGenerator
    },
  data() {
        return {
          title: '',
          search_schema: [],
          search_form_data: {
            cbo_branch : '',
          },


            //pagination
            pagination: {
                offset: 0,
                total_page: 1,
                total_rows: 10,
                row_per_page: 20
            },
            //common index
            head_information: [
                {key: "index", label: '#',tdClass:"text-center", sortable: false},
                {key: "name", label: this.$t('name'), sortable: false},
                {key: "notifications", label: this.$t('message'), sortable: false},
                {key: "actions", label: this.$t('action'), sortable: false}

            ],

            notifications: [],
            response_data: [],
            is_form_loaded: false,

            edit_id: "",

            delete_info: [{
                url: '/branch_notification_messeges/delete',
                field_id: 'branch_id'
            }],

            modal_info: {
                id: '',
                isModalVisible: false,
                title: '',
                component_address: "admin/branch_notification_message/Save",
            },
            showBatchEntry: false,
            showDeleteAll: false,

        }
    },
    mounted() {

        this.loadData(0);
    },
    methods: {

        loadData: function (offset=0) {

            let params = {}
           this.pagination.offset = offset;
            params['limit'] = this.pagination.row_per_page;
            params['offset'] = this.pagination.offset;
            params['cbo_branch'] = this.search_form_data.cbo_branch;

            apiEndPoint.getRequest("index",params)
                .then(response => {
                    this.response_data = response.data;
                    this.notifications = response.data.row
                    this.showBatchEntry = response.data.branch_type == 'B' ? false : true;
                    this.showDeleteAll = response.data.branch_type == 'B' ? false : true;
                    this.generateSearchForm();
                    this.pagination.total_rows = response.data.total_rows;
                    for (let i = 0; i < this.notifications.length; i++) {
                        let row = this.notifications[i];
                        this.notifications[i]["edit"] = 1;
                        this.notifications[i]["delete"] = 1;
                    }
                })
                .catch(function (error) {
                    console.log(error.response);
                })

        },
      generateSearchForm: function () {
            let search_schema_temp = [];
            let  branch_list=getBranchOptions(this.response_data.branch_infos,'');
            search_schema_temp.push({
                fieldType: "SelectList",
                fieldName: "cbo_branch",
                label: "Branch",
                options: branch_list,
                isDisabled: this.response_data.branch_type == 'B' ? true : false
            });
            this.search_schema = search_schema_temp;
          this.is_form_loaded = true;
        },

        customModal(itemdata) {
            this.modal_info.component_address = "admin/branch_notification_message/Save";
            if (itemdata.id) {
                this.modal_info.title = this.$t('edit_branch_notification_message');
            } else if (itemdata === 'show_batch_modal') {
                this.modal_info.title = this.$t('add_branch_notification_message');
                this.modal_info.component_address = "admin/branch_notification_message/SaveBatch";
            } else {
                this.modal_info.title = this.$t('add_branch_notification_message');
            }
            this.modal_info.id = itemdata.id;
            this.modal_info.isModalVisible = true;
        },
        closeModal(is_reload = false) {
            this.modal_info.isModalVisible = false;
            if (is_reload == true) {
                this.loadData();
            }
        },
      clear: function() {
            this.search_form_data.cbo_branch = '';
            this.loadData(0);
        },
         deleteBatch() {
             Swal({
                 title: "Are you sure?",
                html: '',
                 type: 'warning',
                showCancelButton: true,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'Yes, delete all!',
             }).then((result) => {
                if (result.value) {
                    let uri = '/branch_notification_messeges/delete_all';
                     this.$axios
                        .post(uri)
                         .then(res => {
                             if(res.data.status == 'success') {
                                this.loadData();
                             }
                             this.flashMessage(res.data.status,res.data.message);
                         })
                 }
             })
        }

    }

}
