import Loading from 'vue-full-loading';
import {swalConfirm, swalAlert} from "@/shared/common/sweet-alert";

export default {
    name: "Index",
    components: {
        Loading
      },
    data() {
      return {
          current_date:'',
          unauthorization_detail_member_wise:[],
          is_SKT_required:0,
          loading_show: false,
          id:0,
          is_unauthorization:false

      }
    },
    mounted() {
        this.id = this.$route.params.id;
        this.loadData();
    },
    methods: {
        loadData: function() {
            this.loading_show = true;
            this.$axios.get("/transaction_unauthorizations/unauthorization_detail_member_wise/"+this.id)
            .then(res => {
                if(Object.keys(res.data.unauthorization_detail_member_wise).length > 0) {
                    this.is_unauthorization = true;
                    this.current_date = res.data.current_date;
                    this.unauthorization_detail_member_wise = res.data.unauthorization_detail_member_wise;
                    this.is_SKT_required = res.data.is_SKT_required;
                }
                this.loading_show = false;
            });
        },
        authorize: function() {
            let title = 'Are you sure you want to unauthorize these data?';
            swalConfirm(title).then((result) => {
                if (result.value) {
                    this.loading_show = true;
                    let params = new FormData();
                    let i =1;
                    let samity_id = (this.unauthorization_detail_member_wise[0].samity_id) ? this.unauthorization_detail_member_wise[0].samity_id : 0;
                    for(let key in this.unauthorization_detail_member_wise){
                        params.append("transactiondata["+i+"][member_id]", this.unauthorization_detail_member_wise[key].member_id);
                        params.append("transactiondata["+i+"][samity_id]", this.unauthorization_detail_member_wise[key].samity_id);
                        params.append("transactiondata["+i+"][saving_deposit_id]", this.unauthorization_detail_member_wise[key].saving_deposit_id);
                        params.append("transactiondata["+i+"][saving_withdraw_id]", this.unauthorization_detail_member_wise[key].saving_withdraw_id);
                        params.append("transactiondata["+i+"][skt_collection_id]", this.unauthorization_detail_member_wise[key].skt_collection_id);
                        params.append("transactiondata["+i+"][skt_withdraw_id]", this.unauthorization_detail_member_wise[key].skt_withdraw_id);
                        params.append("transactiondata["+i+"][loan_id]", this.unauthorization_detail_member_wise[key].loan_id);
                        params.append("transactiondata["+i+"][loan_transaction_id]", this.unauthorization_detail_member_wise[key].loan_transaction_id);
                        i++;
                    }
                    this.$axios
                        .post("/transaction_unauthorizations/ajax_unauthorization_index", params)
                        .then(res => {
                            if(res.data) {
                                //swalAlert('Deleted!', 'Your file has been deleted.', 'success')
                                this.flashMessage(res.data.status,res.data.message);
                                if(res.data.status == 'success') {
                                    this.$router.push('/process/transaction-unauthorizations/unauthorization-detail/'+samity_id);
                                }
                            }
                        this.loading_show = false;
                    });
                }
              })
              return;
        },
        singleAuthorize: function(row) {
            let title = 'Are you sure you want to unauthorize these data?';
            swalConfirm(title).then((result) => {
                if (result.value) {
                    this.loading_show = true;
                    let params = new FormData();
                    params.append("samity_id", row.samity_id);
                    params.append("member_id", row.member_id);
                    params.append("saving_deposit_id", row.saving_deposit_id);
                    params.append("saving_withdraw_id", row.saving_withdraw_id);
                    params.append("skt_collection_id", row.skt_collection_id);
                    params.append("skt_withdraw_id", row.skt_withdraw_id);
                    params.append("loan_id", row.loan_id);
                    params.append("loan_transaction_id", row.loan_transaction_id);
                    this.$axios
                        .post("/transaction_unauthorizations/ajax_unauthorization_index", params)
                        .then(res => { 
                            console.log('res',res.data)
                            if(res.data) {
                                this.flashMessage(res.data.status,res.data.message);
                                if(res.data.status == 'success') {
                                    this.unauthorization_detail_member_wise = [];
                                    this.loadData();
                                }
                            }
                        this.loading_show = false;
                    });
                }
            });
        }
    }
}