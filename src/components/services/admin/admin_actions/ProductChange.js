import API from "@/shared/common/API.js";
import loading from 'vue-full-loading';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import CommonIndex from '@/containers/CommonIndex';

let admin_actions_API = new API();
admin_actions_API.createEntity({name: "admin_actions"});
let apiEndPoint = admin_actions_API.endpoints.admin_actions;

export default {
    name: 'ProductChange',
    components: {
        loading, SearchFormGenerator, CommonIndex
    },
    data() {
        return {
            title: 'Product Change',

            search_schema: [],
            search_form_data: {},

            status: {
                0: 'Closed',
                1: 'Open',
            },

            change_products: [],
            response_data: [],
            delete_info: [{
                url: '/admin_actions/product_change_delete',
                field_id: 'id'
            }],

            edit_id: "",
            loading_show: false,
            //pagination
            pagination: {
                offset: 0,
                total_page: 1,
                total_rows: 0,
                row_per_page: 20
            },
            //common index
            head_information: [
                {key: "index", label: '#', sortable: false},
                {key: "product_id_from", label: this.$t('from')+' '+this.$t('(product')+' '+this.$t('name)'), sortable: false},
                {key: "product_id_to", label: this.$t('to')+' '+this.$t('(product')+' '+this.$t('name)'), sortable: false},

                {key: "actions", label: this.$t('action'), sortable: false}
            ],
        }
    },
    mounted() {
        //  this.isMounted = true;
        this.loadData();
    },
    methods: {

        loadData: function () {
            this.loading_show = true;

            apiEndPoint.getRequest("product_change")
                .then(response => {
                    this.loading_show = false;
                    this.response_data = response.data;
                    this.change_products = [];
                    // console.log(response.data);
                    this.generateSearchForm();
                    let i = 0;
                    for (let index in response.data.change_products) {
                        this.change_products[i] = response.data.change_products[index];
                        this.change_products[i].product_id_from = this.response_data.product_list[response.data.change_products[index].product_id_from];
                        this.change_products[i].product_id_to = this.response_data.product_list[response.data.change_products[index].product_id_to];
                        this.change_products[i].delete = 1;
                    }
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
                cbo_current_primary_product: {
                    fieldType: "SelectList",
                    fieldName: "cbo_current_primary_product",
                    id: "cbo_current_primary_product",
                    label: this.$t("from")+' '+this.$t("product"),
                    options: this.response_data.product_list,
                    onChange: true,
                    vvalidate:'required',
                },
                cbo_new_product: {
                    fieldType: "SelectList",
                    fieldName: "cbo_new_product",
                    id: "cbo_new_product",
                    label: this.$t("to")+' '+this.$t("product"),
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
            params.append('cbo_current_primary_product', this.search_form_data.cbo_current_primary_product);
            params.append('cbo_new_product', this.search_form_data.cbo_new_product);

            this.$axios
                .post('admin_actions/product_change', params, {
                    timeout: 200000
                })
                .then(res => {
                    //console.log(res.data);
                    this.flashMessage(res.data.status, res.data.message);
                    this.loading_show = false;
                    this.loadData();
                })
                .catch(function (error) {
                        console.log("error", error);
                    }
                );
        },
        onChangeMethod: function(field, value) {
            if (field=="cbo_current_primary_product") {
                //console.log(value);
                let params = new FormData();
                params.append('product_id', value);
                this.$axios.post('admin_actions/ajax_for_get_primary_product_list_by_branch', params)
                    .then((response) => {
                        if (response.data.status == 'success') {
                            this.search_schema['cbo_new_product']['options'] = {};
                            this.search_schema['cbo_new_product']['options'][''] = '--Select--';
                            for (let index in response.data.product_id) {
                                if (response.data.product_id[index] != value) {
                                    this.search_schema['cbo_new_product']['options'][response.data.product_id[index]] = response.data.product_name[index]+'-'+response.data.product_code[index]+'('+response.data.funding_org_name[index]+')';
                                }
                            }
                        } else {
                            this.search_schema['cbo_new_product']['options'] = {};
                            this.search_schema['cbo_new_product']['options'][''] = '--Select--';
                        }
                    }).catch(function (error) {
                        console.log("error", error);
                    }
                );
            }
        },
    }
};
