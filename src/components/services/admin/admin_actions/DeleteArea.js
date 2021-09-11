import CustomModal from '@/containers/Modal';
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import API from "@/shared/common/API.js"
var requestAPI =new API()
requestAPI.createEntity({name: "po_areas"});
let restAPI=requestAPI.endpoints.po_areas;
import loading from 'vue-full-loading'

export default {
    name: "Index",
    components: { CustomModal, CommonIndex, Pagination, loading },
    data() {
        return {
            title: '',
            search_form_data:{},
            search_schema:[],
            designation_names: {},
            category_options: {},
            valid_star: '<span class="required">*</span>',
            table_data: [],
            //pagination
            total_rows: 0,
            offset: 0,
            row_per_page: this.$constants.ROW_PER_PAGE,
            //delete
            modal_delete_data: '',
            indexing_serial: '',
            danger_modal: false,
            // modal
            edit_id: '',
            is_sync: 0,
            selected_branch: '',
            is_modal_visible: false,
            //common index
            head_information: [
                {
                    key: "index", label: '#',sortable: false
                },
                {
                    key: "name", label: this.$t("name"),sortable: true
                },
                {
                    key: "code", label: this.$t("code"), sortable: true
                },
                {
                    key: "branch_list", label: this.$t("branch_list"), sortable: false
                },
                {
                    key: "actions", label: this.$t("action"),sortable: false
                }
            ],
            users: [],
            formData: {},
            delete_info:[{
                url:'/po_areas/ajax_delete',
                field_id:'id',
                html:''
            }],
            loading_label: 'Please Wait',
            loading_show: false
        }
    },
    mounted() {
        this.loadData(this.offset);
    },
    methods: {
        customModal(itemdata) {
            if (itemdata.id >0) {
                this.title = this.$t('loan_purpose') + ' ' + this.$t('edit');
            } else {
                this.title = this.$t('loan_purpose') + ' ' + this.$t('add');
            }
            this.edit_id = itemdata.id;
            this.is_modal_visible = true;
        },
        closeModal() {
            this.is_modal_visible = false;
            this.loadData(this.offset);
        },
        openModal(data, index) {
            this.dangerModal = true;
            this.modal_delete_data = data.id;
            this.indexing_serial = index;
        },
        loadData: function (offset=0) {
            this.offset = offset;

            this.loading_show = true;
            var params = new FormData();
            params["limit"] = this.row_per_page;
            params["offset"] = this.offset;
            params["cbo_category"] = this.search_form_data.cbo_product_type;
            params["txt_name"] = this.search_form_data.txt_name;
            //console.log(params)
            this.table_data = [];
            restAPI.getRequest("admin_area_delete",params)
                .then(response => {
                    this.table_data = response.data.po_areas_info;
                    this.total_rows = response.data.total_rows;
                    this.loading_show = false;
                    for (let i = 0; i < this.table_data.length; i++) {
                        this.table_data[i]["delete"] = 1;
                    }
                }).catch((error) => {
                //console.log(error)
                this.loading_show = false;
            });
        },
        handleReset: function() {
            this.search_form_data = {};
            this.loadData(this.offset);
        }
    },
    computed: {
        isSearch: function() {
            //return true;
        }
    }
}
