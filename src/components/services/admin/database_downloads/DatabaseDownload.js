import '@/shared/common/confirm-message.js';
import API from "@/shared/common/API.js";
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
import Loading from 'vue-full-loading';
import DatePicker from "@/containers/DatePicker";

var databaseDownloadsAPI = new API();
databaseDownloadsAPI.createEntity({ name: "database_downloads" });
var restAPI = databaseDownloadsAPI.endpoints.database_downloads;

export default {
    name: "Database Download",
    components: { CommonIndex,Pagination, Loading,DatePicker },
    data() {
        return {
            //seraching field
            txt_date_from: '',
            txt_date_to: '',
            database_list: [],
            branch_id: '',
            current_date: '',
            path:'',
            //pagination
            total_rows: 0,
            offset: 0,
            is_branch: false,
            has_error: false,
            modal_html: '',
            //delete

            loading_show: false,
            error_message: []
        };
    },
    mounted() {
        this.error_message = [];
        this.loadData(0);
    },

    methods: {
        loadData: function (offset=0) {
            this.error_message = [];
            this.loading_show = true;
            this.offset= offset;
            let row_per_page = this.$constants.ROW_PER_PAGE;
            var params = { limit: row_per_page, offset: this.offset , txt_date_from: this.txt_date_from,
                txt_date_to: this.txt_date_to
            };

            restAPI.getRequest("index", params)
                .then(response => {

                    this.loading_show = false;
                    this.total_rows = response.data.total_rows;
                    this.database_list = response.data.database_list;
                    this.path=response.data.path;
                    if(this.database_list == undefined){
                        this.database_list = [];
                    }

                });

        }
    }
}
