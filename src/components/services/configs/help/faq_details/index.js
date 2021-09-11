import API from "@/shared/common/API.js";
import CustomModal from '@/containers/Modal';;
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import {ROW_PER_PAGE} from '@/shared/common/config'
export default {
     name: "Index",
    components: {CustomModal, SearchFormGenerator, ROW_PER_PAGE, CommonIndex,Pagination,},
    data() {
        return {
            page_title: this.$t('FAQ'),
            FAQ: [],
            //pagination
            total_rows: 0,
            offset: 1,
            row_per_page:100,
            total_page:4,
            //delete
            modal_delete_data: '',
            indexing_serial: '',
            dangerModal: false,
            //error message
            redirectMessage: '',
            showDismissibleAlert: true,
            variantColor: "",
            // modal
            user: {},
            formData:{},
            edit_data: {},

            // modal
            isModalVisible: false,
            title: '',
            component_address: "configs/help/faq_details/save",
            //delete
            delete_info:[{
                url:'/common-service/api/v1/faqs/',
                field_id:'id',
                source:"service",
                //load:"true",
            }],
            //common index
            head_information: [
                {key: "index", label: this.$t('Index'),thClass:"text-left",trClass:"text-left",sortable: false},
                {key: "header", label: this.$t('Qustion'),thClass:"text-left",trClass:"text-left", sortable: true},
                {key: "answer", label: this.$t('Answer'),thClass:"text-left", trClass:"text-left",sortable: true},
                {key: "status", label: this.$t('Status'),thClass:"text-left", trClass:"text-left",sortable: false},
                {key: "language", label: this.$t('language'),thClass:"text-left", trClass:"text-left",sortable: false},
                {key: "actions", label: this.$t('actions'),thClass:"text-left", trClass:"text-left",sortable: false}
            ],
            info_for_index_data: []
        };
    },
    mounted() {
        this.user = this.$store.getters['auth/userInfo'];

        this.loadData(1);
    },

    methods: {

        customModal(itemdata) {
            this.edit_data = {};
            if (itemdata.id >0) {
                this.edit_data = itemdata;
                this.title = this.$t('edit');
            } else {
                this.title = this.$t('add');
            }
            this.isModalVisible = true;
        },
        closeModal(is_load) {
            this.isModalVisible = false;
            if (is_load == 1) {
                this.loadData(1);
            }
        },

        loadData: function (offset=1) {
            //let row_per_page = this.$constants.ROW_PER_PAGE;
            let params = {}

            this.offset = offset;

            params['pageSize'] = this.row_per_page;
            params['pageNo'] = this.offset;
            this.$http_service.get("/common-service/api/v1/faqs", {
                params:params
            })
                .then(response => {
                    console.log("res",response.data);
                    this.response_data = response.data;
                    this.total_rows = response.data.totalElements;
                    //this.total_page = response.data.totalPages;
                    this.FAQ = this.response_data.content;
                    for (let i = 0; i < this.FAQ.length; i++) {
                        let row = this.FAQ[i];
                        //this.FAQ[i]["view"] = 1;
                        this.FAQ[i]["edit"] = 1;
                        this.FAQ[i]["delete"] = 1;
                    }

                    //this.offset = response.data.offset;
                })
                .catch(function (error) {
                    console.log(error.response);
                })
        },

        timeOutMethod: function () {
            let self = this;
            setTimeout(function () {
                self.showDismissibleAlert = false;
            }, 3000);

        }
    }

}
