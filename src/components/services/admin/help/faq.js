import Pagination from '@/containers/Pagination';
export default {
    components: {
        Pagination
    },
    name: 'HelpPage',
    data () {
        return {
            FAQ: [],
            //pagination
            pagination: {
                total_rows: 0,
                offset: 1,
                row_per_page:100,
                total_page:4,
            },
            title:this.$t("frequently_asked_questions"),
        }
    },
    mounted() {
        this.user = this.$store.getters['auth/userInfo'];
        this.loadData(1);
    },
    methods:{
        loadData: function (offset=1) {
            //let row_per_page = this.$constants.ROW_PER_PAGE;
            let params = {}
            this.pagination.offset = offset;

            params['pageSize'] = this.pagination.row_per_page;
            params['pageNo'] = this.pagination.offset;
            params['language'] = this.user.default_language;
            this.$http_service.get("/common-service/api/v1/faqs/getByLanguage", {
                params:params
            })
                .then(response => {
                    this.response_data = response.data;
                    this.FAQ = this.response_data.content;
                    this.pagination.total_rows = response.data.totalElements;
                })
                .catch(function (error) {
                    console.log(error.response);
                })

        },

    }
}
