import axios from 'axios';
import CustomModal from '@/containers/Modal';
import swal from "sweetalert2";
import { loadLanguageAsync } from '@/shared/lan/i18n-setup';

export default {
    components: { CustomModal },
    data() {
        return {
            records: [],
            items: [],
            fields: [
                { key: 'key', label: this.$t('serial'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'module_name', label: this.$t('module_name'),class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'label_name', label: this.$t('label_name'), sortable: true, class: 'text-center' },
                { key: 'lang_english', label: this.$t('english_label'), sortable: true, class: 'text-center' },
                { key: 'lang_bengali', label: this.$t('bangla_label'), sortable: true, class: 'text-center'},
                { key: 'actions', label: this.$t('action') ,tdClass:'text-center'}
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 20,
            pageOptions: [20, 25, 30],
            sortBy: null,
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            infoModal: {
                id: 'info-modal',
                title: '',
                content: ''
            },
            edit_id: '',
            isModalVisible: false,
            title: '',
            txt_name:'',
            component_address: "views/configs/languages/Save",

            delete_info:[{
                url:'/savings/delete',
                field_id:'product_interest_id',
                html:''
            }],
            userInfo: this.$store.getters['auth/userInfo']
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        }
    },
    mounted() {

       this.load_data();
        // Set the initial number of items
        this.totalRows = this.items.length
    },
    methods: {

        load_data(){


        },
        info(item) {

            this.title = this.$t('language_edit');
            this.edit_id = item.id;
            this.isModalVisible = true;
        },
        resetInfoModal() {
            this.infoModal.title = ''
            this.infoModal.content = ''
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        customModal(itemdata) {
            if (itemdata) {
                this.title = this.$t('language_edit');
            } else {
                this.title = this.$t('language_add');
            }

            this.edit_id = itemdata;
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.load_data();
        },
        sysc(){

            this.$axios
                .post('/Language_labels/sysc')
                .then(response => {
                    if (response.data.status == "success")
                    {
                        //console.log("====", this.userInfo)
                        loadLanguageAsync(this.userInfo['lan'])
                        this.flashMessage(response.data.status, response.data.message);

                    }else{
                        this.flashMessage(response.data.status, 'Data did not Sync Successfully');

                    }

                })
                .catch(function (error) {
                    console.log(error.response);
                });
        },


        deleteSavings: function (id) {
            //console.log(id)
            //const emp_id = itemdata.id;


            swal({
                title: 'Sure want delete this  Pass book entry ?',
                text: "",
                type: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {
                    let params = new FormData();


                    params.append("id", id);

                    this.$axios
                        .post('/Language_labels/delete/', params)
                        .then(response => {
                            if (response.data.status == "success") {

                                swal(
                                    response.data.status,
                                    response.data.message,
                                    'success'
                                )
                                this.load_data()
                            } else if (response.data.error) {
                                this.errorMessage = response.data.error;
                            } else if (response.data.status == "warning") {
                                swal(
                                    response.data.status,
                                    response.data.message,
                                    'success'
                                )
                            } else if (response.data.status == "failure") {
                                this.flashMessage(response.data.status, response.data.message);
                            }

                        })
                        .catch(function (error) {
                            console.log(error.response);
                        });

                }
            })


        }
    }
}
