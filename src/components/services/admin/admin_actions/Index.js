import '@/shared/common/confirm-message.js';
import API from "@/shared/common/API.js";
import router from "@/router/index.js";
import swal from "sweetalert2";
import CustomModal from '@/containers/Modal';
import Loading from 'vue-full-loading';
import { swalConfirm } from '@/shared/common/sweet-alert';

var adminActionAPI = new API();
adminActionAPI.createEntity({name: "admin_actions"});
var restAPI = adminActionAPI.endpoints.admin_actions;

var cronJobAPI = new API();
cronJobAPI.createEntity({name: "cron_jobs"});
var rest1API = cronJobAPI.endpoints.cron_jobs;

export default {
    components:
        {
            swal,
            CustomModal,Loading
        },
    name: "adminAction",

    data() {
        return {
            rows: [],
            isModalVisible: false,
            //component_address: 'admin/admin_actions/ResetMigrationDate',
            component_address: '',
            title: 'Reset Migration Date',
            edit_id: '',
            loading_show: false
        };
    },
    mounted() {
        this.isModalVisible = false;
        restAPI.getRequest("index")
            .then(response => {
                this.rows = response.data.rows;
            });
    },

    methods: {
        controller_action: function (action, component_name, _title) {
            this.isModalVisible = false;

            let action_with_hipen = action.replace(/_/g, '-');

            if (action == 'cron_job_for_single_dashboard') {
                swal({
                    title: 'Are you sure want to execute the Dashboard data update process?',
                    text: "",
                    type: 'warning',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok',
                    showCancelButton: true,
                }).then((result) => {
                    if (result.value) {
                        this.loading_show = true;
                        rest1API.postRequest('cron_job_for_single_dashboard')
                            .then(response => {
                                this.loading_show = false;
                                this.flashMessage(response.data.status, response.data.message);
                            });
                    }
                })

            } else {
                swalConfirm('Are you sure?')
                .then((result) => {
                    if (result.value) {
                        if(component_name == undefined) {
                            /*    for page    */
                            router.push({
                                path: '/admin/admin-actions/' + action_with_hipen + '/'
                            });
                        } else {
                            /*  for modal  */
                            this.title = _title;
                            this.component_address = 'admin/admin_actions/'+component_name;
                            this.isModalVisible = true;
                           console.log("component_address", this.component_address)
                        }
                    }
                    else {
                        this.isModalVisible = false;
                    }
                })
            }

        },

    }
}