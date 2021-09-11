import API from "@/shared/common/API.js"
import loading from 'vue-full-loading';
import DatePicker from "@/containers/DatePicker";

var RequestAPI = new API()
RequestAPI.createEntity({name: "notification_message_for_ho_users"});
let apiEndPoint = RequestAPI.endpoints.notification_message_for_ho_users;

export default {
    name: 'Save',
    props: {
        id: String
    },
    components: {
        loading,
        DatePicker
    },
    data() {
        return {
            methodName: '',
            method: '',
            title: '',
            txt_title: '',
            txt_description: '',
            description: '',
            txt_to_date: '',
            from_date: '',
            error_message: [],
            loading_show: false
        }
    },

    mounted: function () {
        this.loadData();
    },
    methods: {
        loadData: function() {
            this.loading_show = true;
            this.method = "index";
            apiEndPoint.getRequest('index')
                .then(response=> {
console.log("date",response.data.row.to_date)
                    let date = new Date();
                    let current_date = '';
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    if (month < 10 && day < 10) {
                        current_date = date.getFullYear() + '-0' + month + '-0' + day;
                    } else {
                        current_date = date.getFullYear() + '-' + month + '-' + day;
                    }


                    this.loading_show = false;
                    this.title = response.data.title;
                    this.txt_title = response.data.row.title;
                    this.txt_to_date = current_date;
                    this.description = response.data.row.description;
                    this.from_date = response.data.row.from_date;
                })
                .catch((error) => {
                    this.loading_show = false;
                    console.log(error.response);
                })
        },
        handleSubmit: function () {
            let self = this;
            this.$validator.validate().then(valid => {
                if (valid) {
                    var params = new FormData();
                    params.append('txt_title', self.txt_title);
                    params.append('txt_to_date', self.txt_to_date);
                    params.append('txt_description', self.txt_description);
                    params.append('from_date', self.from_date);
                    this.$axios.post('notification_message_for_ho_users/add', params)
                        .then(function (response) {
                            if (response.data.status == "success") {
                                self.flashMessage(response.data.status, response.data.message);
                                self.$emit('close');
                            } else if (response.data.error) {
                                self.error_message = response.data.error;
                            }
                        }).catch(function (error) {
                        console.log("error", error);
                    });

                } else {

                }
            });

        },
        handleReset: function (event) {

            this.error_message = [];
            //this.loadData(this.offset)

        },
        handleCancel: function () {
            this.$emit('close');
        },
    }
}