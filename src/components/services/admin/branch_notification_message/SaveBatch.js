import FormError from "@/containers/FormError";
import FormGenerator from "@/containers/form_generators/FormGenerator";

import { SOCKET_URL } from '@/shared/common/config';
//import io from 'socket.io-client';
import StorageService from "@/shared/common/storage.service";
// var socket = io.connect(SOCKET_URL, {
// query: {
//     token: StorageService.getToken()
//     }
// });

export default {
    name: 'SaveBatch',
    components: {
        FormGenerator,
        FormError,
    },
    props:{
        id: String,
    },
    data() {
        return {
            formData: {

            },
            resetData: {},
            is_form_load:false,
            error_message:[],
            branch_name_list:[],
            method:'',
            responseData:[],
            cbo_branch: {},
            validation_error: '',
            txt_message: '',
            branches: [],
            checkUncheck: 0,
            chk_all: '',
            branchList:[],
            check:false,
        }
    },
    mounted() {
        this.method = 'add';
        let uri = '/branch_notification_messeges/batch_save';
        this.$axios.get(uri)
            .then(response => {
                this.cbo_branch = {};
                this.branches = response.data.branches;
            })
            .catch(e => {
                console.log(e)
            });
        

    },
    methods:{
        handleSubmit: function() {
            this.$validator.validateAll().then((valid) => {
                if(valid) {
                    let params = new FormData();
                    for (let key in this.cbo_branch) {
                        if(typeof this.cbo_branch[key] !== 'undefined') {
                            params.append('cbo_branch['+key+']', this.branches[key].branch_id);
                            this.branchList.push(this.branches[key].branch_id);
                        }

                    }
                    params.append('txt_message', this.txt_message);
                    params.append('chk_all', this.chk_all);
                    this.$axios
                        .post("/branch_notification_messeges/batch_save", params)
                        .then(res => {
                            if(res.data.validation_error) {
                                this.error_message = res.data.validation_error;
                            } else {
                                this.flashMessage(res.data.status,res.data.message);
                                if(res.data.status == 'success') {
                                    // socket.emit('MESSEG', {
                                    //     notificaiton: this.txt_message,
                                    //   },this.branchList);
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
                this.$set(formData,"txt_message",this.responseData.row.notification_messege);
                this.$set(formData,"cbo_branch",this.responseData.row.id);
                this.formData = formData
            } else {
              this.txt_message=''
              for (let index in this.branches) {
                this.cbo_branch[index] = false;
            }
            }
            this.errors.clear();
        },
        handleCancel: function () {
            this.$emit('close');
        },
        checkAll: function(value) {
            this.cbo_branch ={};
            if (value == 1) {
                for (let index in this.branches) {
                    this.cbo_branch[index] = true;                 
                }
                this.chk_all = 'all';
            } else {
                this.cbo_branch = {};
                this.chk_all = '';
            }
        }
    }
};
