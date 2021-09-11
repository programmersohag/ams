import API from "@/shared/common/API.js";
import loading from 'vue-full-loading';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";

let admin_actions_API = new API();
admin_actions_API.createEntity({name: "admin_actions"});
let apiEndPoint = admin_actions_API.endpoints.admin_actions;

export default {
    name: 'UpdateInvalidTransactions',
    components: {
        loading, SearchFormGenerator
    },
    data() {
        return {
            title: 'Update Invalid Transactions',

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

            apiEndPoint.getRequest("update_invalid_transactions")
                .then(response => {
                    this.loading_show = false;
                    this.response_data = response.data;
                    this.generateSearchForm();
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
                    options: this.response_data.branches_options,
                    onChange: true,
                    vvalidate:'required',
                },
                txt_date:{
                    fieldType: "DateInput",
                    fieldName: "txt_date",
                    id: "txt_date",
                    label: this.$t("date"),
                    placeholder: this.$t("date"),
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
        invalidTransactionsUpdate: function() {
            this.loading_show = true;

            let params = new FormData();
            params.append('cbo_branch', this.search_form_data.cbo_branch);
            params.append('txt_date', this.search_form_data.txt_date);

            this.$axios
                .post('admin_actions/update_invalid_transactions', params, {
                    timeout: 200000
                })
                .then(res => {
                    console.log(res.data);
                    this.flashMessage(res.data.status, res.data.message);
                    this.loading_show = false;
                })
                .catch(function (error) {
                        console.log("error", error);
                    }
                );
        },
    }
};
