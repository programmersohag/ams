import API from "@/shared/common/API.js";
import swal from "sweetalert2";
import CommonIndex from '@/containers/CommonIndex';
import CustomModal from '@/containers/Modal';
import Pagination from '@/containers/Pagination';
import loading from 'vue-full-loading'
import {ROW_PER_PAGE} from '@/shared/common/config'
import DatePicker from "@/containers/DatePicker";
import router from "@/router/index.js";
const axios = require('axios')
var LoansAPI = new API()
LoansAPI.createEntity({name: "loans"});
let loansApiEndPoint = LoansAPI.endpoints.loans;

export default {
    props: ['itemdata'],
    components:
        {
            DatePicker,
            CommonIndex,
            CustomModal,
            Pagination,
            loading,
            swal
        },
    data() {
        return {

            head_information: [
                {key: 'index', label: '#', sortable: false},
                {key: 'loan_code', label: this.$t('loan_code'), sortable: false},
                {key: 'member_code', label: this.$t('member_code'), sortable: false},
                {key: 'member_name', label: this.$t('member_name'), sortable: false},
                {key: 'loan_amount', label: this.$t('loan_amount'), sortable: true},
                {key: 'total_payable_amount', label: this.$t('total_repay_amount'), sortable: true},
                {key: 'interest_rate', label: this.$t('interest_rate'), sortable: true},
                {key: 'disburse_date', label: this.$t('disburse_date'), sortable: true},
                {key: 'first_repayment_date', label: this.$t('first_repay_date'), sortable: true},
                {key: 'number_of_installment', label: this.$t('number_of_installment'), sortable: true,thStyle:"width:75px"},
                {key: 'status', label: this.$t('auth_status'), sortable: true,thStyle:"width:50px"},
                {key: 'current_status', label: this.$t('loan_status'), sortable: true},
                {key: 'disburse_by', label: this.$t('entry_by'), sortable: true},
                {key: 'actions', label: this.$t('actions'), sortable: false},
            ],
            branch_type: '',
            branch_id: '',
            samity_id:'',
            product_id:'',
            date_from: '',
            date_to: '',
            name: '',
            loan_status:'',
            repayment_frequency:'',
            gender:'',
            amount_from:'',
            amount_to:'',

            branches: [],
            samities:[],
            products:[],
            loans_info:[],
            loans_array:[],
            reparment_frequencies:[],
            genders:[],
            loan_statuses:[],
            session_data: [],
            general_configuration:[],
            members:[],
            users:[],
            total_rows: '',
            total_page: '',
            current_date: '',
            software_start_date:'',
            offset: 0,
            isModalVisible: false,
            component_address: 'loans/loans/Save',
            title: 'Add Loan',
            edit_id: '',
            delete_index: 0,
            loading_show: false,
            loading_label: "Processing",
            delete_info: [{
                url: '/loans/delete',
                field_id: 'loan_id',
                html: ''
            }],
            is_data_ready:false,
            is_open_date_change:false,
            is_first_repay_edit:false,
            first_repay_date:'',
            open_date_picker_number:-1,
            prev_index:'',
            is_head_office:0,

        };
    },

    mounted() {
        this.edit_id="";
        this.loadData(0);
    },

    methods: {
        loadData: function (offset = 0) {

            this.is_head_office=0;

            this.prev_index=-1;
            this.open_date_picker_number=-1;
            this.is_first_repay_edit=false;
            this.is_open_date_change=false;
            this.is_data_ready=false;
            this.loading_show = true;
            this.branches = [];
            this.samities = [];
            this.products = [];
            this.loan_statuses = [];
            this.reparment_frequencies = [];

            this.session_data = [];
            this.offset = offset;
            this.loans_info = [];
            this.members = [];
            this.users = [];
            this.loans_array = [];

            this.general_configuration = [];


            var params = {
                txt_name: this.name,
                cbo_branch: this.branch_id,
                cbo_samity: this.samity_id,
                cbo_loan_status: this.loan_status,
                cbo_loan_product: this.product_id,
                cbo_loan_repayment_frequency: this.repayment_frequecy,
                txt_date_from: this.date_from,
                txt_date_to: this.date_to,
                cbo_gender: this.gender,
                amount_from: this.amount_from,
                amount_to: this.amount_to,
                limit: ROW_PER_PAGE,
                offset: this.offset

            };
            LoansAPI.endpoints.loans.getRequest("index", params)
                .then(response => {

                    console.log(response.data);

                    this.loading_show = false;
                    this.total_rows = response.data.total_rows;
                    this.branches = response.data.branches;
                    this.reparment_frequencies = response.data.cbo_repayment_frequencies;
                    this.products = response.data.products_info;
                    this.loans_info = response.data.loans;
                    this.session_data = response.data.user;
                    this.branch_id = response.data.session_data.cbo_branch;
                    this.branch_type = response.data.branch_type;
                    this.samities = response.data.samities;
                    this.loan_statuses = response.data.current_status;
                    this.members = response.data.loans.members;
                    this.users = response.data.loans.users;
                    this.general_configuration = response.data.general_configuration;
                    this.current_date = response.data.current_date;
                    this.software_start_date = response.data.sw_start_date_of_operation;

                    this.is_head_office=response.data.user.is_head_office;

                    var i = 0;
                    this.loans_array = [];
                    for (var key in this.loans_info) {

                        if (key != 'members' && key != 'users') {
                            this.loans_array[key] = [];
                            this.loans_array[key]['loan_code'] = this.loans_info[key].customized_loan_no;
                            this.loans_array[key]['member_code'] = this.members[this.loans_info[key].member_id].code;
                            this.loans_array[key]['member_name'] = this.members[this.loans_info[key].member_id].name;
                            this.loans_array[key]['loan_amount'] = this.loans_info[key].loan_amount;
                            this.loans_array[key]['total_payable_amount'] = this.loans_info[key].total_payable_amount;
                            if (this.general_configuration.show_interest_rate_monthwise == 1) {
                                this.loans_array[key]['interest_rate'] = parseFloat(this.loans_info[key].interest_rate) / parseFloat(12) + " %" + this.loans_info[key].interest_calculation_method;
                            }
                            else {
                                this.loans_array[key]['interest_rate'] = this.loans_info[key].interest_rate + ' % ' + this.loans_info[key].interest_calculation_method;
                            }

                            this.loans_array[key]['disburse_date'] = this.loans_info[key].disburse_date;
                            this.loans_array[key]['first_repayment_date'] = this.loans_info[key].first_repayment_date;
                            this.loans_array[key]['number_of_installment'] = this.loans_info[key].number_of_installment;

                            this.loans_array[key]['disburse_by'] = this.users.name;

                            if (this.loans_info[key].is_authorized == 0) {
                                this.loans_array[key]['status'] = 0;
                            }
                            else {
                                this.loans_array[key]['status'] = 1;
                            }
                            if (this.loans_info[key].current_status == 0 && this.loans_info[key].transfer_out_date == null) {
                                this.loans_array[key]['current_status'] = 'Closed';
                            }
                            else if (this.loans_info[key].current_status == 1 && this.loans_info[key].transfer_out_date != null) {
                                this.loans_array[key]['current_status'] = 'transferred';
                            }
                            else {
                                this.loans_array[key]['current_status'] = 'Open';
                            }

                            this.loans_array[key]['view'] = 1;
                            if(this.loans_info[key].is_authorized != 0){
                                this.loans_array[key]['edit'] = 1;
                            }

                            if(this.loans_info[key].current_status == 0 && this.loans_info[key].transfer_out_date == null || this.general_configuration.is_first_repayment_date_editable==0)
                            {
                                this.loans_array[key]['first_repay_edit'] = 0;
                            }
                            else{
                                this.loans_array[key]['first_repay_edit'] = 1;
                            }

                            this.loans_array[key]['id'] = this.loans_info[key].id;
                            this.loans_array[key]['branch_id'] = this.loans_info[key].branch_id;
                            this.loans_array[key]['samity_id'] = this.loans_info[key].samity_id;
                        }
                        else {
                            break;
                        }
                    }
                    this.loading_show = false;
                    this.is_data_ready=true;

                });
        },

        openRegularLoanAdd: function () {
            this.errorMessage = [];
            this.errors.clear();
            var  id=""
            var action="admin"
            // router.push({ path: `/loans/loans/save/${action}/${id}` })

            this.$router.push('/loans/loans/save/'+action);

        },
        openModal: function (itemdata) {

            this.dangerModal = true;
            this.delete_index = itemdata.index;
            this.samity_transfer_id = itemdata.id;
            this.to_delete_old_branch = itemdata.old_branch;
            this.to_delete_new_branch = itemdata.new_branch;
            this.to_delete_old_samity = itemdata.old_samity;
            this.to_delete_new_samity = itemdata.new_samity;
        },
        closeModal(is_load_data) {
            this.errorMessage = [];
            this.isModalVisible = false;
            if (is_load_data == 1) {
                this.loadData(0);
            }
        },

        GetFormData: function () {
            this.branch_id = this.branch_id != null && this.branch_id != '' ? this.branch_id : "";
            this.samity_id = this.samity_id != null && this.samity_id != '' ? this.samity_id : "";
            this.product_id = this.product_id != null && this.product_id != '' ? this.product_id : "";
            this.date_from = this.date_from != null && this.date_from != '' ? this.date_from : "";
            this.date_to = this.date_to != null && this.date_to != '' ? this.date_to : "";
            this.name = this.name != null && this.name != '' ? this.name : "";
            this.loan_status = this.loan_status != null && this.loan_status != '' ? this.loan_status : "";
            this.repayment_frequency = this.repayment_frequency != null && this.repayment_frequency != '' ? this.repayment_frequency : "";
            this.gender = this.gender != null && this.gender != '' ? this.gender : "";
            this.amount_from = this.amount_from != null && this.amount_from != '' ? this.amount_from : "";
            this.amount_to = this.amount_to != null && this.amount_to != '' ? this.amount_to : "";
            this.loadData(0);
        },
        resetSearch: function (event) {
            this.samity_id = "";
            this.product_id = "";
            this.date_from = "";
            this.date_to = "";
            this.name = "";
            this.loan_status = "";
            this.repayment_frequency = "";
            this.gender = "";
            this.amount_from = "";
            this.amount_to = "";
            if (this.branch_type != 'B') {
                this.branch_id = "";
            }
            //console.log(this.date_from,123);
            this.loadData(0);
        },
        getRelativeSamity: function () {

            this.samities=[];

            var formData = new FormData();
            formData.append("branch_id", this.branch_id);

            this.$axios
                .post("samities/ajax_for_get_samity_list_by_branch", formData)
                .then(response => {

                    if(response.data.status=='success')
                    {

                        var samity_ids=response.data.samity_id;
                        var samity_names=response.data.samity_name;

                        for(var i=1;i<samity_ids.length;i++)
                        {
                            this.samities.push({
                                id:samity_ids[i],
                                code:samity_names[i],
                                name:'',
                            })
                        }


                    }
                });
        },
        changeFirstRepayDate:function (actual_date,changed_date,id,b_id,s_id,index) {

            if(actual_date==changed_date)
            {
                return;
            }
            var text="";
            text="Previous: "+actual_date;
            text=text+"Current: "+changed_date;

            swal({
                title: 'Sure to Change?',
                text: text,
                type: 'warning',
                customClass: 'swal-wide',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {
                    const formData = new FormData();
                    formData.append("id", id);
                    formData.append("branch_id", b_id);
                    formData.append("samity_id", s_id);
                    formData.append("txt_first_repayment_date", changed_date);
                    formData.append("txt_previous_first_repayment_date", actual_date);

                    this.$axios
                        .post("/loans/ajax_edit_first_repayment_date/", formData)
                        .then(response => {
                            //
                            // console.log(response.data.status);
                            if (response.data.status == "success") {
                                swal(
                                    'Success',
                                    'First Repayment Date Updated Successfully',
                                    'success'
                                )
                                this.open_date_picker_number=-1;
                                this.loans_array[index]['first_repayment_date']=changed_date;
                            }
                            else {
                                var message=response.data.message;
                                swal(
                                    'Failed',
                                    message,
                                    'error'
                                )
                                this.open_date_picker_number=-1;
                                this.first_repay_date=actual_date;
                            }

                        })

                }
            })

        },
        openInput:function (actual_date,index) {

            if(this.prev_index==index)
            {
                this.open_date_picker_number=-1;
                this.first_repay_date=actual_date;
                return;
            }
            else {
                this.open_date_picker_number=index;
                this.first_repay_date=actual_date;
            }


            this.prev_index=index;


        },
        dodelete:function (itemdata) {
            swal({
                title: 'Sure to Delete?',
                text: text,
                type: 'warning',
                customClass: 'swal-wide',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {
                    const formData = new FormData();
                    formData.append("loan_id", itemdata.id);

                    this.$axios
                        .post("/loans/delete/", formData)
                        .then(response => {
                            //console.log(response.data.status);
                            if (response.data.status == "success") {
                                swal(
                                    'Success',
                                    'Successfully Deleted',
                                    'success'
                                )

                                this.loadData(0);
                            }
                            else {
                                var message=response.data.message;
                                swal(
                                    'Failed',
                                    message,
                                    'error'
                                )
                                this.loadData(0);
                            }
                        })
                }
            })
        },
        doedit:function (rowdata) {

            if(rowdata.id !='' && rowdata.id !=null)
            {
                this.$router.push('/loans/loans/admin-edit/'+rowdata.id);
            }
        },
        emitView(itemdata) {
            this.$router.push('/loans/loans/view/'+itemdata);
        },
    }
}


