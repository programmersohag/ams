import FormError from "@/containers/FormError";
import router from '@/router/index.js'
import API from "@/shared/common/API.js"
import DatePicker from "@/containers/DatePicker";
var memberProductTransferAPI =new API()
memberProductTransferAPI.createEntity({name: "admin_actions"});
var restAPI = memberProductTransferAPI.endpoints.admin_actions;

var samityAPI =new API()
samityAPI.createEntity({name: "samities"});
var samityRestAPI = samityAPI.endpoints.samities;

var memberAPI =new API()
memberAPI.createEntity({name: "members"});
var memberRestAPI = memberAPI.endpoints.members;

export default {
    name: 'AdminMemberProductTransfer',
    components: {
        FormError,DatePicker
    },
    data() {
        return {
            cbo_branch: '',
            cbo_samity: '',
            cbo_current_primary_product:'',
            branch_options: [],
            samity_options: [],
            primary_product_list: [],
            new_product_list: [],
            member_list: [],
            txt_transfer_date: '',
            txt_code: '',
            cbo_product: '',
            txt_note: '',
            cbo_member: '',
            member_no_notification: '',
            txt_admission_date: '',
            txt_id_sequence_no: '',
            mirror_txt_code: '',
            txt_existing_product_id: '',
            txt_existing_member_code: '',
            errorMessage: []
        }
    },

    mounted: function () {

        restAPI.getRequest("member_product_transfer").then(response=>{

            this.branch_options = response.data.branch_options;
            let product_id = response.data.primary_product_list;

            this.primary_product_list = Object.keys(product_id).map(
                key => {
                    let key_pair_value = {
                        value: key,
                        text: product_id[key]
                    };
                    return key_pair_value;
                }
            );

           this.txt_transfer_date = response.data.current_software_date;

        }).catch(function (error) {

        })
    },
    methods: {
        branchChange: function(e) {
            this.samity_options = [];
            this.primary_product_list = [];
            this.member_no_notification = '';
            this.member_list = [];

            let params = new FormData();
            params.append('branch_id', e.target.value);

            samityRestAPI.postRequest("ajax_for_get_samity_list_by_branch", params).then(response => {
                if (response.data.status == 'success') {
                    let samities = response.data.samity_id;
                    this.samity_options = Object.keys(samities).map(
                        key => {
                            let key_pair_value = {
                                value: samities[key],
                                text: response.data.samity_name[key]
                            };
                            return key_pair_value;
                        }
                    );
                }
            })

            restAPI.postRequest("ajax_for_get_primary_product_list_by_branch", params).then(response => {

                let product_id = response.data.product_id;
                this.primary_product_list = Object.keys(product_id).map(
                    key => {
                        let key_pair_value = {
                            value: product_id[key],
                            text: response.data.product_code[key]+"-"+response.data.product_name[key]+"("+response.data.funding_org_name[key]+")"
                        };
                        return key_pair_value;
                    }
                );

            })
        }
        ,
        samityChange: function(e) {
            this.member_no_notification = '';
            this.member_list = [];

            let params = new FormData();
            params.append('branch_id', this.cbo_branch);
            params.append('samity_id', e.target.value);
            params.append('current_primary_product_id', this.cbo_current_primary_product);

            memberRestAPI.postRequest("ajax_for_get_samity_n_productwise_member_list",params).then(response=>{

                if(response.data.status == 'Success'){
                    let totalMember = response.data.member_id.length - 1;

                    let memberId = response.data.member_id;

                    this.member_list = Object.keys(memberId).map(
                        key => {
                            let key_pair_value ;
                            if(key == 0){
                                key_pair_value = {
                                    value: -1,
                                    text: "--All--"
                                }
                            }else{
                                key_pair_value ={
                                    value: memberId[key],
                                    text: response.data.member_name[key]+"-"+response.data.member_code[key]
                                }
                            }
                            return key_pair_value;
                        }
                    );
                    this.member_no_notification = "Total "+totalMember+" member(s) found";
                }

            })

        },
        productChange: function(e) {
            this.member_no_notification = '';
            this.member_list = [];

            let params = new FormData();
            params.append('branch_id', this.cbo_branch);
            params.append('samity_id', this.cbo_samity);
            params.append('current_primary_product_id', e.target.value);

            memberRestAPI.postRequest("ajax_for_get_samity_n_productwise_member_list",params).then(response=>{

                if(response.data.status == 'Success'){
                    let totalMember = response.data.member_id.length - 1;

                    let memberId = response.data.member_id;

                    this.member_list = Object.keys(memberId).map(
                        key => {
                            let key_pair_value ;
                            if(key == 0){
                                key_pair_value = {
                                    value: -1,
                                    text: "--All--"
                                }
                            }else{
                                key_pair_value ={
                                    value: memberId[key],
                                    text: response.data.member_name[key]+"-"+response.data.member_code[key]
                                }
                            }
                            return key_pair_value;
                        }
                    );
                    this.member_no_notification = "Total "+totalMember+" member(s) found";
                }

            })

            let newParams = new FormData();
            newParams.append('product_id', e.target.value);

            if(this.cbo_member == -1 && e.target.value > 0){
                restAPI.postRequest("ajax_for_get_product_list_by_category",newParams).then(response=>{
                    let product_info = response.data.product_id;
                    this.new_product_list = Object.keys(product_info).map(
                        key => {
                            let key_pair_value ;
                            if(key == 0){
                                key_pair_value = {
                                    value: '',
                                    text: "--Select--"
                                }
                            }else if(key == this.cbo_current_primary_product){

                            }else{
                                key_pair_value ={
                                    value: product_info[key],
                                    text: response.data.product_code[key]+"-"+response.data.product_name[key]
                                }
                            }
                            return key_pair_value;
                        }
                    );

                })

            }
        },
        memberChange: function(e){
            let newParams = new FormData();
            newParams.append('product_id', this.cbo_current_primary_product);

            restAPI.postRequest("ajax_for_get_product_list_by_category",newParams).then(response=>{
                    let product_info = response.data.product_id;
                    this.new_product_list = Object.keys(product_info).map(
                        key => {
                            let key_pair_value ;
                            if(key == 0){
                                key_pair_value = {
                                    value: '',
                                    text: "--Select--"
                                }
                            }else if(key == this.cbo_current_primary_product){

                            }else{
                                key_pair_value ={
                                    value: product_info[key],
                                    text: response.data.product_code[key]+"-"+response.data.product_name[key]
                                }
                            }
                            return key_pair_value;
                        });
            })
        },

        generateAutoCode: function()
        {
            var selected_branch_id = this.cbo_branch;
            var selected_samity = this.cbo_samity;
            var admission_date = this.txt_admission_date;
            var product_id = this.cbo_product;
            var id_sequence_no = this.txt_id_sequence_no;

            let params = new FormData();
            params.append('samity_id',selected_samity);
            params.append('branch_id',selected_branch_id);
            params.append('txt_registration_date',admission_date);
            params.append('txt_product_id',product_id);
            params.append('txt_id_sequence', id_sequence_no);
            params.append('is_member_product_transfer',1)

            memberRestAPI.postRequest("ajax_for_get_member_auto_id_by_samity_id", params).then(response => {

               this.txt_code = response.data.members_code;
               this.mirror_txt_code = response.data.members_code;

                var existing_product_id = this.txt_existing_product_id
                var existing_member_code = this.txt_existing_member_code;
                if(existing_product_id == product_id){
                    this.txt_code = existing_member_code;
                    this.mirror_txt_code = existing_member_code;
                }
            })

        },

        postData: function(){
            var memberProductTransferParams = new FormData();
            memberProductTransferParams.append('cbo_member', this.cbo_member);
            memberProductTransferParams.append('cbo_current_primary_product', this.cbo_current_primary_product);
            memberProductTransferParams.append('txt_note', this.txt_note);
            memberProductTransferParams.append('cbo_branch', this.cbo_branch);
            memberProductTransferParams.append('cbo_samity', this.cbo_samity);
            memberProductTransferParams.append('cbo_product', this.cbo_product);
            memberProductTransferParams.append('txt_transfer_date', this.txt_transfer_date);

            if(this.cbo_member > 0 ){
                if(this.txt_admission_date){
                    memberProductTransferParams.append('txt_admission_date', this.txt_admission_date);
                    memberProductTransferParams.append('txt_code', this.txt_code);
                    memberProductTransferParams.append('txt_existing_member_code', this.txt_existing_member_code);
                    memberProductTransferParams.append('mirror_txt_code', this.mirror_txt_code);
                    memberProductTransferParams.append('txt_id_sequence_no', this.txt_id_sequence_no);
                    restAPI.postRequest('member_product_transfer',memberProductTransferParams).then(response=>{
                        //console.log(response.data);return;
                        if(response.data.status == "success"){
                            this.flashMessage(response.data.status,response.data.message);
                            //this.refresh();
                        }else if(response.data.error){
                            this.errorMessage = response.data.error;
                        }else{

                            this.flashMessage('warning','Member Not Transfered');
                            this.cbo_branch = '-2';
                            this.cbo_current_primary_product = '-2';
                            this.cbo_samity = '-2';
                            this.txt_code = '';
                            this.cbo_product = '-1';
                            this.txt_note = '';
                            this.cbo_member = '-1';
                            this.member_no_notification = '';
                            this.txt_admission_date = '';
                            this.txt_id_sequence_no = '';
                            this.mirror_txt_code ='';
                            this.txt_existing_product_id = '';
                            this.txt_existing_member_code = '';

                            this.errorMessage = [];
                            this.errors.clear();
                        }
                    })
                }
            }else if(this.cbo_member == -1){
                restAPI.postRequest('member_product_transfer',memberProductTransferParams).then(response=>{
                    if(response.data.status == "success"){
                        this.flashMessage(response.data.status,response.data.message);
                        this.refresh();
                    }else{
                        this.errorMessage = response.data.error;
                        this.flashMessage('warning','not saved');
                    }
                })
            }


        },

        handleSubmit: function () {
            let self = this;
            this.$validator.validate().then(valid => {
                if (valid) {
                    if(this.cbo_member != -1){
                        let params = new FormData();
                        params.append('member_id',this.cbo_member);
                        memberRestAPI.postRequest("ajax_for_get_member_info_by_id", params).then(response => {
                            //console.log(response.data);
                            if(response.data.status == 'success'){
                                this.txt_admission_date = response.data.member.admission_date;
                                this.txt_id_sequence_no = response.data.member.id_sequence_no;
                                this.txt_existing_product_id = response.data.product.id;
                                this.txt_existing_member_code = response.data.member.code;
                                this.mirror_txt_code = response.data.member.code;
                                this.txt_existing_product_id = response.data.product.id;
                                this.generateAutoCode();
                                this.postData();
                            }
                        })
                    }else{
                        this.postData();
                    }



                }
            });

        },

        handleReset: function (event) {

                this.cbo_branch = '-2';
                this.cbo_current_primary_product = '-2';
                this.cbo_samity = '-2';
                this.txt_code = '';
                this.cbo_product = '';
                this.txt_note = '';
                this.cbo_member = '';
                this.member_no_notification = '';
                this.txt_admission_date = '';
                this.txt_id_sequence_no = '';
                this.mirror_txt_code ='';
                this.txt_existing_product_id = '';
                this.txt_existing_member_code = '';

            this.errorMessage = [];
            this.errors.clear();
        },
        handleCancel: function () {
            router.push({ path: '/admin/admin-actions/index'});
        }
    }
}