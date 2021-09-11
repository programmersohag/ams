/**
 * Created by jahid on 2/4/19.
 */

import API from "@/shared/common/API.js";
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import _ from 'underscore'
import loading from 'vue-full-loading'
import DatePicker from "@/containers/DatePicker";
const axios = require('axios')
var memberAPI = new API();
memberAPI.createEntity({name: "members"});
let memberApiEndPoint = memberAPI.endpoints.members;

var savingsAPI = new API();
savingsAPI.createEntity({name: "Language_labels"});
let savingsApiEndPoint = savingsAPI.endpoints.Language_labels;



export default {
    components: {VueBootstrapTypeahead, loading,DatePicker},
    props: {id: String,},
    data() {
        return {
            valid_star: '<span class="required">*</span>',
            loading_show: false,
            loading_label: "Processing",
            inputForm: {
                module_name: '',
                label_name: '',
                lang_english:"",
                lang_bengali: '',
            },
            product_options: [],
            cbo_module_name_options: [
                { text: 'Dashboard', value: 'Dashboard' },
                { text: 'Admin', value: 'Admin' },
                { text: 'Ais', value: 'Ais' },
                { text: 'Config', value: 'Config' },
                { text: 'Employee', value: 'Employee' },
                { text: 'Samity', value: 'Samity' },
                { text: 'Member', value: 'Member' },
                { text: 'Savings', value: 'Savings' },
                { text: 'Loan', value: 'Loan' },
                { text: 'Process', value: 'Process' },
                { text: 'Report', value: 'Report' },
                { text: 'Other', value: 'Other' },
            ],
            formErrors: {
            },
        }
    },
    mounted () {


        this.method = 'add';
        if (this.id > 0) {
            this.method = 'edit/' + this.id;

        }
        this.loadData()

    },
    methods: {
        loadData: function () {
            savingsApiEndPoint.getRequest(this.method)
                .then(response => {
                console.log(response.data);
                 if(response.data.row)
                 {
                     this.inputForm.module_name=response.data.row.module_name
                     this.inputForm.label_name=response.data.row.label_name
                     this.inputForm.lang_english=response.data.row.lang_english
                     this.inputForm.lang_bengali=response.data.row.lang_bengali

                 }
                    //
                })
                .catch(function (error) {
                    console.log(error.response);
                })
        },
        //

        handleSubmit: function () {
            this.$validator.validateAll().then((valid) => {
                if(valid) {
                    let params = new FormData();
                    for (let key in this.inputForm) {
                        params.append(key, this.inputForm[key]);
                    }

                    if (this.id > 0) {
                        this.method = 'edit';
                        params.append("id",this.id);
                        params.append("submit", 'edit');

                    }else{
                        this.method = 'add';
                        params.append("submit", 'Save');
                    }

                    this.$axios
                        .post("/Language_labels/"+ this.method, params)
                        .then(res => {
                            if(res.data.error) {
                                this.formErrors = res.data.error;
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
        handleReset: function () {
            for (let key in this.inputForm) {
                this.inputForm[key] = ""
            }
            this.inputForm.cbo_mode_of_payment= "CASH",
                this.setFormDefaultData()
        },
        handleCancel: function () {
            this.$emit('close');
        },


    },
    watch: {
        memberSearch: _.debounce(function (member) {
            this.getMembers(member)
        }, 500)
    }
    //txt_opening_balance ,txt_one_time_dps_amount,txt_payable_amount,is_nominee_information_value,txt_opening_date_1,txt_matured_date,txt_bonus_amount
}


