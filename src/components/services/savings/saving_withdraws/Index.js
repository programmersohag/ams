/**
 * Created by jahid on 2/4/19.
 */

import API from "@/shared/common/API.js";
import CustomModal from '@/containers/Modal';
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import loading from 'vue-full-loading';
//import router from "@/router/Index.js";
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import {getCommonOptions,getFormatForNameAndId,getBranchOptions,getNewCommonOptions} from "@/shared/options/generate.js";

var savingwithdrawAPI = new API();
savingwithdrawAPI.createEntity({name: "saving_withdraws"});
let apiEndPoint = savingwithdrawAPI.endpoints.saving_withdraws;


export default {
    components: {CustomModal, CommonIndex, Pagination, loading, SearchFormGenerator},

    data() {
        return {
            title: '',

            search_schema: [],
            search_form_data: {
                cbo_saving_products_id:-1
            },

            //pagination
            offset: 0,
            total_rows: 0,

            response_data: [],
            savingWithdraws:[],
            edit_id: "",
            loading_show: false,
            is_form_load:  false,
            delete_info: [{
                url: '/saving_withdraws/delete',
                field_id: 'saving_withdraw_id'
            }],

            modal_info: {
                id: '',
                isModalVisible: false,
                title: '',
                component_address: "savings/saving_withdraws/save",
            },

            //common index
            head_information: [
                {key: "index", label: '#', sortable: false},
                {key: "member_name", label: this.$t('member_name'), sortable: false},
                {key: "member_code", label: this.$t('member_code'), sortable: true},
                {key: "savings_code", label: this.$t('savings_code'), sortable: true},
                {key: "member_primary_product_id", label: this.$t('primary_product'), sortable: false},
                {key: "transaction_date", label: this.$t('transaction_date'), sortable: false},
                {key: "transaction_type", label: this.$t('transaction_type'), sortable: true},
                {key: "mode_of_payment", label: this.$t('mode_of_payment'), sortable: true},
                {key: "amount", label: this.$t('amount'), sortable: false},
                {key: "user_name", label: this.$t('entry_by'), sortable: false},
                {key: "status", label: this.$t('status'), sortable: true},
                {key: "actions", label: this.$t('action'), sortable: false}

            ],
            isSearch: false,
            show_add:1
        }
    },
    mounted () {
        this.user = this.$store.getters['auth/userInfo'];
        if (this.user['is_head_office'] == 1)
        {
            this.show_add=0
        }
        this.loadData();
    },
    methods: {
        loadData: function (offset = 0) {
            this.loading_show = true;
            let params = {}
            this.offset = offset;
            params['limit'] = this.$constants.ROW_PER_PAGE;
            params['offset'] = this.offset;
            params['search'] = this.isSearch ? 1 : 0;
            params['txt_name'] = this.search_form_data.txt_name;
            params['cbo_samity'] = this.search_form_data.cbo_samity;
            params['cbo_branch'] = this.search_form_data.cbo_branch;
            params['txt_date_from'] = this.search_form_data.txt_date_from;
            params['txt_date_to'] = this.search_form_data.txt_date_to;
            params['cbo_saving_products_id'] = this.search_form_data.cbo_saving_products_id;
            params['cbo_payment_type'] = this.search_form_data.cbo_payment_type;

            apiEndPoint.getRequest("index", params)
                .then(response => {
                    this.loading_show = false;
                    this.response_data = response.data;
                    this.savingWithdraws = response.data.saving_withdraws;

                    //console.log("jikiji",response.data);

                    this.total_rows = response.data.total_rows;
                    this.savingWithdraws = [];

                    let i = 0;
                    for (let index  in response.data.saving_withdraws) {

                        let row = response.data.saving_withdraws[index];

                        this.savingWithdraws[i] = row;

                        if(response.data.saving_withdraws[index]['is_authorized'] == 0 && response.data.current_date==response.data.saving_withdraws[index]['transaction_date'])
                        {
                            if(response.data.saving_withdraws[index]['mode_of_payment']=="CASH"||response.data.saving_withdraws[index]['mode_of_payment']=="BANK" ) {
                                this.savingWithdraws[i]["edit"] = 1;
                                this.savingWithdraws[i]["delete"] = 1;
                            }
                        }else
                            {
                                if(response.data.current_date==response.data.saving_withdraws[index]['transaction_date'] && (response.data.saving_withdraws[index]['transaction_type']=="Interest"||response.data.saving_withdraws[index]['mode_of_payment']=="INT")) {

                                    this.savingWithdraws[i]["delete"] = 1
                                }else{
                                    this.savingWithdraws[i]["edit"] = 0;
                                    this.savingWithdraws[i]["delete"] = 0;
                                }
                        }
                        this.savingWithdraws[i]["member_primary_product_id"] = response.data.loan_products[row.member_primary_product_id];
                        this.savingWithdraws[i]["mode_of_payment"] = response.data.mode_of_payments[row.mode_of_payment];
                        this.savingWithdraws[i]["status"] = row.is_authorized;
                        i++
                    }


                    this.generateSearchForm();
                })
                .catch(function (error) {
                    //this.loading_show = false;
                    console.log(error.response);
                })
        },
        generateSearchForm: function () {

            if(this.response_data.branch_type == 'B') {
                this.$set(this.search_form_data,"cbo_branch",this.response_data.session_data.cbo_branch),
                    this.is_branch_option_enable = true;
            }
            this.search_form_data.txt_date_from = this.response_data.session_data.txt_date_from
            this.search_form_data.txt_date_to = this.response_data.session_data.txt_date_to

            let search_schema_temp = [];
            if(!this.is_branch_option_enable) {
                let branchList= getBranchOptions(this.response_data.branches,'');
                search_schema_temp.push({
                    fieldType: "SelectList",
                    fieldName: "cbo_branch",
                    label: "Branch",
                    isDisabled: this.is_branch_option_enable,
                    options: branchList,
                    onChange: true,

                });
            }

            let samityList=getNewCommonOptions(this.response_data.samities,'',1);

            search_schema_temp.push({
                fieldType: "SelectList",
                fieldName: "cbo_samity",
                label: "Samity",
                options: samityList
            });

            search_schema_temp.push({
                fieldType: "DateInput",
                fieldName: "txt_date_from",
                placeholder: this.$t("date_from"),
                label: this.$t("date_from"),
                id: "txt_date_from",
                onChange: false,
                vvalidate: ""
            });

            search_schema_temp.push({
                fieldType: "DateInput",
                fieldName: "txt_date_to",
                placeholder: this.$t("date_to"),
                label: this.$t("date_to"),
                id: "txt_date_to",
                onChange: false,
                vvalidate: ""
            });
            let productList=getCommonOptions(this.response_data.saving_products,'-1');

            search_schema_temp.push({
                fieldType: "SelectList",
                fieldName: "cbo_saving_products_id",
                label: "Savings Product",
                placeholder: "Saving Product",
                options: productList
            });

            search_schema_temp.push({
                fieldType: "TextInput",
                fieldName: "txt_name",
                label: this.$t("by")+' '+this.$t("member_code"),
                placeholder: this.$t("by")+' '+this.$t("member_code")
            });


            let paymentTypeList = {};
            paymentTypeList[''] = "Mode Of Payment";
            for (let row_id in this.response_data.mode_of_payments) {
                let type = this.response_data.mode_of_payments[row_id];
                paymentTypeList[row_id] = type;
            }

            search_schema_temp.push({
                fieldType: "SelectList",
                fieldName: "cbo_payment_type",
                label: "Payment Type",
                options: paymentTypeList
            });
            this.search_schema = search_schema_temp;
            this.is_form_load = true;



        },

        customModal(itemdata) {
            if (itemdata.id > 0) {
                this.modal_info.title = this.$t('edit') + " " + this.$t('saving_withdraw');
            } else {
                this.modal_info.title = this.$t('add') + " " + this.$t('saving_withdraw');
            }
            this.modal_info.id = itemdata.id;
            this.modal_info.isModalVisible = true;
        },
        closeModal(is_reload = false) {
            //console.log(is_reload)
            this.modal_info.isModalVisible = false;
            if (is_reload == true) {
                this.loadData();
            }
        },
        handleReset: function () {
            this.search_form_data = {
                cbo_saving_products_id:-1
            };

            this.isSearch = false;
            // this.$set(this.search_form_data, "txt_date_to", this.current_date);
            this.loadData(0);
        },
        onChange(field, value) {
            if (field=="cbo_branch") {
                //console.log(value);
                let params = new FormData();
                params.append('branch_id', value);
                this.$axios.post('samities/ajax_for_get_samity_list_by_branch', params)
                    .then((response) => {
                        //console.log("Samity",this.search_schema[1]['options']);
                        this.search_schema[1]['options'] = {};
                        if (response.data.status == 'success') {
                            this.search_schema[1]['options']=getFormatForNameAndId(response.data.samity_id,response.data.samity_name,'');
                        } else {
                            this.search_schema[1]['options'][''] = '--Select--';
                        }
                    }).catch(function (error) {
                        console.log("error", error);
                    }
                );
            }
        },
        search: function () {
            this.isSearch = true;
            this.loadData();
        }
    }
}


