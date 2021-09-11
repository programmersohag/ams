import API from "@/shared/common/API.js";
import CustomModal from '@/containers/Modal';
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import loading from 'vue-full-loading';
import router from "@/router/index.js";
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";

let admin_actions_API = new API();
admin_actions_API.createEntity({name: "admin_actions"});
let apiEndPoint = admin_actions_API.endpoints.admin_actions;

export default {
    name: 'GetInvalidRepaymentAmount',
    components: {
        CustomModal, CommonIndex, Pagination, loading, SearchFormGenerator
    },
    data() {
        return {
            title: 'Invalid Repayment Amount',

            search_schema: [],
            search_form_data: {},

            //pagination
            pagination: {
                offset: 0,
                total_page: 1,
                total_rows: 0,
                row_per_page: 20
            },
            status: {
                0: 'Closed',
                1: 'Open',
            },

            //common index
            head_information: [
                {key: "index", label: '#', sortable: false},
                {key: "customized_loan_no", label: this.$t('loan')+' '+this.$t('code'), sortable: false},
                {key: "member_code", label: this.$t('member')+' '+this.$t('code'), sortable: false},
                {key: "member_name", label: this.$t('member')+' '+this.$t('name'), sortable: false},
                {key: "loan_amount", label: this.$t('loan')+' '+this.$t('amount'), sortable: false},
                {key: "total_payable_amount", label: this.$t('total')+' '+this.$t('repay')+' '+this.$t('amount'), sortable: false},
                {key: "actual_repayment_amount", label: this.$t('actual')+' '+this.$t('repay')+' '+this.$t('amount'), sortable: false},
                {key: "disburse_date", label: this.$t('disburse')+' '+this.$t('date'), sortable: false},
                {key: "first_repayment_date", label: this.$t('first')+' '+this.$t('repay')+' '+this.$t('amount'), sortable: false},
                {key: "number_of_installment", label: this.$t('no')+' '+this.$t('of')+' '+this.$t('inst'), sortable: false},
                {key: "status", label: this.$t('loan')+' '+this.$t('status'), sortable: false},

                {key: "actions", label: this.$t('action'), sortable: false}
            ],

            invalid_repayment_info: [],
            response_data: [],

            edit_id: "",
            loading_show: false,

            modal_info: {
                id: '',
                isModalVisible: false,
                title: '',
                component_address: "loans/donor_loans/Save",
            },
        }
    },
    mounted() {
        //  this.isMounted = true;
        this.loadData(0);
    },
    methods: {

        loadData: function (offset = 0) {
            this.loading_show = true;
            let params = {};
            this.pagination.offset = offset;
            //params['limit'] = this.pagination.row_per_page;
            params['cbo_branch'] = this.search_form_data.cbo_branch;
            params['cbo_samity'] = this.search_form_data.cbo_samity;

            apiEndPoint.getRequest("get_invalid_repayment_amount", params)
                .then(response => {
                    this.loading_show = false;
                    this.response_data = response.data;
                    this.invalid_repayment_info = [];

                    this.generateSearchForm();
                    //console.log(response.data);return;
                    //this.pagination.total_rows = response.data.total;

                    let i = 1;
                    if (typeof response.data.loan_lists != 'undefined') {
                        //this.invalid_repayment_info = response.data.loan_lists;
                        for (let index in this.response_data.loan_lists) {
                            let row = this.response_data.loan_lists[index];
                            //console.log(this.response_data.members[row.member_id].code);
                            this.invalid_repayment_info[i] = row;
                            this.invalid_repayment_info[i]["member_code"] = this.response_data.members[row.member_id].code;
                            this.invalid_repayment_info[i]["member_name"] = this.response_data.members[row.member_id].name;
                            this.invalid_repayment_info[i]["status"] = this.status[row.current_status];
                            this.invalid_repayment_info[i]["view"] = 1;

                            this.invalid_repayment_info[i]["isCustomActionButton"] = 1;
                            this.invalid_repayment_info[i]["customActionButton"] = {
                                btn_1:{
                                    name:'Fix',
                                    name_show:true,
                                },
                            };
                            i++;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error.response);
                })

        },

        generateSearchForm: function () {
            this.search_schema = {
                cbo_branch: {
                    fieldType: "SelectList",
                    fieldName: "cbo_branch",
                    label: this.$t('branch'),
                    options: this.response_data.branch_options,
                    onChange: true
                },
                cbo_samity: {
                    fieldType: "SelectList",
                    fieldName: "cbo_samity",
                    label: this.$t('samity'),
                    options: this.response_data.samity_options
                },
            };
            this.search_schema['cbo_samity']['options']['-1'] = '--All--';
            //console.log(this.search_schema);
            //this.$set(this.search_schema, 'cbo_product_category', '-1');
        },
        handleReset: function () {
            this.search_form_data = {};
            // this.$set(this.search_form_data, "txt_date_to", this.current_date);
            this.loadData(0);
        },
        onChangeMethod: function(field, value) {
            if (field=="cbo_branch") {
                //console.log(value);
                let params = new FormData();
                params.append('branch_id', value);
                this.$axios.post('samities/ajax_for_get_samity_list_by_branch', params)
                    .then((response) => {
                        if (response.data.status == 'success') {
                            this.search_schema['cbo_samity']['options'] = {};
                            this.search_schema['cbo_samity']['options']['-1'] = '--All--';
                            for (let index in response.data.samity_id) {
                                this.search_schema['cbo_samity']['options'][response.data.samity_id[index]] = response.data.samity_name[index];
                            }
                        } else {
                            this.search_schema['cbo_samity']['options'] = {};
                            this.search_schema['cbo_samity']['options']['-1'] = '---All---';
                        }
                    }).catch(function (error) {
                        console.log("error", error);
                    }
                );
            }
        },
        loanDetails: function(itemdata) {
            //route to load details view
            /*router.push({
                path: "/loans/donor-loans/view/"+itemdata.id,
            });*/
        },
        customAction: function(itemData, key) {
            if (key == 'btn_1') {
                console.log(itemData);
                //$sch_interest_amount=$loan->actual_repayment_amount-$loan->loan_amount;
                //$day=(strtotime($loan->first_repayment_date)-strtotime($loan->disburse_date))/(3600*24);
                //'admin_actions/fix_repayment_amount/'.$loan->id.'/'.$loan->interest_amount.'/'.$sch_interest_amount.'/'.$day
                apiEndPoint.getRequest("fix_repayment_amount/"+ itemData.id+"/"+itemData.interest_amount+"/"+itemData.sch_interest_amount+"/"+itemData.day)
                    .then(response => {
                        //route to load details view
                        /*router.push({
                            path: "/loans/donor-loans/view/"+itemdata.id,
                        });*/
                    })
                    .catch(function (error) {
                        console.log(error.response);
                    })
            }

        }
    }
};
