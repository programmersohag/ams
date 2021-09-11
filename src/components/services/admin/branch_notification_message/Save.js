 import API from "@/shared/common/API.js";
import FormGenerator from "@/containers/form_generators/FormGenerator";
import {getBranchOptions}  from '@/shared/options/generate.js';

import { SOCKET_URL } from '@/shared/common/config';
//import io from 'socket.io-client';
import StorageService from "@/shared/common/storage.service";
// var socket = io.connect(SOCKET_URL, {
// query: {
//     token: StorageService.getToken()
//     }
// });
var branchNotificationAPI = new API();
branchNotificationAPI.createEntity({name: "branch_notification_messeges"});
let apiEndPoint = branchNotificationAPI.endpoints.branch_notification_messeges;

export default {
    name: "Save",
    components: {
        FormGenerator
    },
    props:{
        id: String,
    },
    data() {
        return {
            schema:{
                cbo_branch:{
                    fieldType: "SelectList",
                    fieldName: "cbo_branch",
                    label: this.$t("branch"),
                    id: "cbo_branch",
                    vvalidate: "required",
                    isDisabled:false
                },
                txt_message:{
                    fieldType: "TextAreaInput",
                    fieldName: "txt_message",
                    label: this.$t("message"),
                    id: "txt_message",
                    vvalidate: "required"
                }
            },
            formData: {

            },
            resetData: {},
            is_form_load:false,
            error_message:[],
            branch_name_list:[],
            loading_show:false,
            method:'',
            branchList:[],
            user: {},
            responseData:[]
        }
    },
    mounted() {
        this.user = this.$store.getters['auth/userInfo'];
        this.method = 'add';
        if(this.id > 0) {
            this.method = 'edit/'+this.id;
        }
        this.loadData();

    },
    methods:{
        loadData: function() {
            apiEndPoint.getRequest(this.method)
                .then(response => {
                    this.loading_show = false;
                    this.responseData = response.data;
                    
                    this.branch_name_list = response.data.branch_type == 'B' ? response.data.branches: response.data.branches_info;
                    this.schema["cbo_branch"]["options"] =getBranchOptions(this.branch_name_list,'');
                    if(response.data.branch_type == 'B') {
                        this.formData.cbo_branch = response.data.branch_id;
                        this.schema["cbo_branch"]["isDisabled"] = true;
                    }
                    if(this.id > 0) {
                        this.schema["cbo_branch"]["isDisabled"] = true;
                        const formData = {}
                        this.$set(formData,"txt_message",response.data.row.notifications);
                        this.$set(formData,"cbo_branch",response.data.row.branch_id);
                        this.formData = formData
                    }

                    this.is_form_load = true;
                })
                .catch(error => {
                    this.loading_show = false;
                    console.log(error.response);
                })
        },
        handleSubmit: function() {
            this.$validator.validateAll().then((valid) => {

                if(valid) {
                    let branch=[];
                    let params = new FormData();
                    for (let key in this.formData) {
                        params.append(key, this.formData[key]);
                    }
                    branch.push(this.formData.cbo_branch);

                    this.$axios
                        .post("/branch_notification_messeges/"+this.method, params)
                        .then(res => {
                            if(res.data.validation_error) {
                                this.error_message = res.data.validation_error;
                            } else {
                                this.flashMessage(res.data.status,res.data.message);
                                if(res.data.status == 'success') {
                                //   socket.emit('MESSEG',
                                //     {notificaiton: this.formData.txt_message },branch);
                                    this.$emit('close', true);
                                }
                            }
                        });
                }
            }).catch(() => {
                this.$toast.error({title:'error',message:"Invalid Field"});
            });
        },
        handleReset: function() {
            this.error_message = [];
            if(this.id > 0) {const formData = {}
                this.$set(formData,"txt_message",this.responseData.row.notifications);
                this.$set(formData,"cbo_branch",this.responseData.row.branch_id);
                this.formData = formData
            } else {
                this.formData = {};
            }
            this.errors.clear();
        },
        handleCancel: function () {
            this.$emit('close');
        }
    }
}
