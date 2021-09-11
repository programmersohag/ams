import API from "@/shared/common/API.js";
import loading from 'vue-full-loading';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";

let admin_actions_API = new API();
admin_actions_API.createEntity({name: "admin_actions"});
let apiEndPoint = admin_actions_API.endpoints.admin_actions;

export default {
    name: 'ChangeNonPrimaryLoanProducts',
    components: {
        loading, SearchFormGenerator
    },
    data() {
        return {
            title: 'Change Non Primary Loan Products',

            search_schema: [],
            search_form_data: {},

            status: {
                0: 'Closed',
                1: 'Open',
            },

            invalid_repayment_info: [],
            response_data: [],

            edit_id: "",
            loading_show: false,
        }
    },
    mounted() {
        //  this.isMounted = true;
        this.loadData();
    },
    methods: {

        loadData: function () {
            this.loading_show = true;

            apiEndPoint.getRequest("change_non_primary_loan_products")
                .then(response => {
                    this.loading_show = false;
                    this.response_data = response.data;
                    this.generateSearchForm();
                    this.$set(this.search_form_data, 'cbo_branch', '-1');
                    //console.log(response.data);return;
                    //this.pagination.total_rows = response.data.total;
                })
                .catch(function (error) {
                    console.log(error.response);
                })

        },

        generateSearchForm: function () {
            //console.log(this.$axios.timeout(200000));
            this.search_schema = {
                cbo_branch: {
                    fieldType: "SelectList",
                    fieldName: "cbo_branch",
                    label: this.$t('branch'),
                    options: this.response_data.branch_options,
                    onChange: true,
                    vvalidate:'required',
                },
                cbo_current_loan_product: {
                    fieldType: "SelectList",
                    fieldName: "cbo_current_loan_product",
                    id: "cbo_current_loan_product",
                    label: this.$t("current")+' '+this.$t("loan")+' '+this.$t("product"),
                    options: {'': '--Select--'},
                    onChange: true,
                    vvalidate:'required',
                },
                cbo_product: {
                    fieldType: "SelectList",
                    fieldName: "cbo_product",
                    id: "cbo_product",
                    label: this.$t("new")+' '+this.$t("loan")+' '+this.$t("product"),
                    options: {'': '--Select--'},
                    vvalidate:'required',
                },
            };
            //this.search_schema['cbo_samity']['options']['-1'] = '--All--';
            //console.log(this.search_schema);
            //this.$set(this.search_schema, 'cbo_product_category', '-1');
        },
        handleReset: function () {
            this.search_form_data = {};
            // this.$set(this.search_form_data, "txt_date_to", this.current_date);
            this.loadData(0);
        },
        handleSubmit: function() {
            this.loading_show = true;

            let params = new FormData();
            params.append('cbo_branch', this.search_form_data.cbo_branch);
            params.append('cbo_current_loan_product', this.search_form_data.cbo_current_loan_product);
            params.append('cbo_product', this.search_form_data.cbo_product);

            this.$axios
                .post('admin_actions/change_non_primary_loan_products', params, {
                    timeout: 200000
                })
                .then(res => {
                    //console.log(res.data);
                    this.flashMessage(res.data.status, res.data.message);
                    this.loading_show = false;
                })
                .catch(function (error) {
                        console.log("error", error);
                    }
                );
        },
        onChangeMethod: function(field, value) {
            if (field=="cbo_branch") {
                //console.log(value);
                let params = new FormData();
                params.append('branch_id', value);
                this.$axios.post('admin_actions/ajax_for_get_non_primary_product_list_by_branch', params)
                    .then((response) => {
                        if (response.data.status == 'success') {
                            this.search_schema['cbo_current_loan_product']['options'] = {};
                            this.search_schema['cbo_current_loan_product']['options'][''] = '--Select--';
                            for (let index in response.data.product_id) {
                                this.search_schema['cbo_current_loan_product']['options'][response.data.product_id[index]] = response.data.product_code[index]+'-'+response.data.product_name[index]+'('+response.data.funding_org_name[index]+')';
                            }
                        } else {
                            this.search_schema['cbo_current_loan_product']['options'] = {};
                            this.search_schema['cbo_current_loan_product']['options'][''] = '--Select--';
                        }
                    }).catch(function (error) {
                        console.log("error", error);
                    }
                );
            }

            if (field=="cbo_current_loan_product") {
                //console.log(value);
                let params = new FormData();
                params.append('branch_id', this.search_form_data.cbo_branch);
                params.append('product_id', value);
                this.$axios.post('admin_actions/ajax_for_get_non_primary_product_list_by_branch', params)
                    .then((response) => {
                        if (response.data.status == 'success') {
                            this.search_schema['cbo_product']['options'] = {};
                            this.search_schema['cbo_product']['options'][''] = '--Select--';
                            for (let index in response.data.product_id) {
                                if (response.data.product_id[index] != value) {
                                    this.search_schema['cbo_product']['options'][response.data.product_id[index]] = response.data.product_code[index]+'-'+response.data.product_name[index]+'('+response.data.funding_org_name[index]+')';
                                }
                            }
                        } else {
                            this.search_schema['cbo_product']['options'] = {};
                            this.search_schema['cbo_product']['options'][''] = '--Select--';
                        }
                    }).catch(function (error) {
                        console.log("error", error);
                    }
                );
            }
        },
    }
};
