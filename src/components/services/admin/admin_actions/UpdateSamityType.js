import API from "@/shared/common/API.js";
import FormGenerator from "@/containers/form_generators/FormGenerator";
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import _ from 'underscore';
import FormError from "@/containers/FormError";
import router from "@/router/index.js";

let admin_actions_API = new API();
admin_actions_API.createEntity({name: "admin_actions"});
let apiEndPoint = admin_actions_API.endpoints.admin_actions;

export default {
    name: 'UpdateSamityType',
    components: {
        FormGenerator,
        VueBootstrapTypeahead,
        FormError
    },
    props:{
        id: String
    },
    data() {
        return {
            schema:{
                cbo_samity_type: {
                    fieldType: 'SelectList',
                    fieldName: 'cbo_samity_type',
                    label: this.$t("new") + this.$t("samity") + this.$t("gender"),
                    id: 'cbo_samity_type',
                    vvalidate: 'required'
                }
            },
            formData: {

            },
            txt_branch_id: '',
            txt_samity_id: '',
            samity_info: [],
            samity_search: [],
            single_samity_info: [],
            cbo_samity_type: [],
            validation_error: [],
            resetData: {},
            is_form_load:false,
            error_message:[],
            branch_name_list:[],
            loading_show:false,
            method:'',
            responseData:[],
            valid_star: '<span class="required">*</span>',
        }
    },
    mounted() {
        this.loadData();

    },
    methods:{
        loadData: function() {
            apiEndPoint.getRequest('update_samity_type')
                .then(response => {
                    //this.loading_show = false;
                    console.log(response.data);
                    const formData = {};
                    this.$set(formData,"cbo_samity_type", "");
                    this.schema['cbo_samity_type']['options'] = response.data.samity_type_options;
                    this.is_form_load = true;
                })
                .catch(function (error) {
                    //this.loading_show = false;
                    console.log(error.response);
                })
        },
        handleSubmit: function() {
            this.$validator.validateAll().then((valid) => {
                if(valid) {
                    let params = new FormData();
                    for (let key in this.formData) {
                        params.append(key, this.formData[key]);
                    }
                    params.append('txt_branch_id', this.txt_branch_id);
                    params.append('txt_samity_id', this.txt_samity_id);
                    this.$axios
                        .post("/admin_actions/update_samity_type", params)
                        .then(res => {
                            if(res.data.validation_error) {
                                this.error_message = res.data.validation_error;
                            } else {
                                this.flashMessage(res.data.status,res.data.message);
                                if(res.data.status == 'success') {
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
            if(this.id > 0) {
                const formData = {}
                this.$set(formData,"txt_message",this.responseData.row.notification_messege);
                this.$set(formData,"cbo_branch",this.responseData.row.id);
                this.formData = formData
            } else {
                this.formData = {};
            }
            this.errors.clear();
        },
        handleCancel: function () {
            router.push({
                path: '/admin/admin-actions/index'

            });
        },
        selectSamity: function(event) {
            let selectedSamity = event;
            this.txt_samity_id = selectedSamity.samity_id;
            this.txt_branch_id = selectedSamity.branch_id;

            let params = new FormData();
            params.append('branch_id', this.txt_branch_id);
            params.append('samity_id', this.txt_samity_id);
            this.$axios
                .post("samities/ajax_for_get_samity_info_by_id", params)
                .then(res => {
                    if(res.data.status == 'success') {
                        this.single_samity_info = res.data.samity;

                        /*let samity_type = {};
                        if (this.single_samity_info.samity_type == "M") {
                            samity_type = {
                                "F": "Female",
                                "B" : "Both"
                            }
                        } else if (this.single_samity_info.samity_type == "F") {
                            samity_type = {
                                "M": "Male",
                                "B" : "Both"
                            }
                        } else if (this.single_samity_info.samity_type == "B"){
                            samity_type = {
                                "M": "Male",
                                "F": "Female",
                            }
                        } else {
                            samity_type = {
                                "M": "Male",
                                "F": "Female",
                                "B" : "Both"
                            }
                        }
                        this.schema['cbo_samity_type']['options'] = samity_type;*/
                        //console.log(this.single_samity_info);
                    } else {
                        this.flashMessage(res.data.status, res.data.message);
                    }
                });
        },
        getSamities: function(query) {
            //console.log(query);
            let params = new FormData();
            params.append('q', query);
            params.append('limit', '10');
            this.$axios.post('samities/ajax_for_get_samity_auto_search/', params)
                .then((response) => {
                    //console.log(response);
                    this.samity_info = response.data.response_data
                }).catch(function (error) {
                    console.log("error", error);
            });
        }
    },
    watch: {
        samity_search: _.debounce(function(samity) { this.getSamities(samity) }, 500)
    }
};
