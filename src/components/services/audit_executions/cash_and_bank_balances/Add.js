import Stepper from '@/components/services/audit_executions/cash_and_bank_balances/Stepper.js';
import VueCkeditor from 'vue-ckeditor5'
import FormError from "@/containers/FormError";
import {$http_core_service} from '@/shared/common/core-service';
import StorageService from "@/shared/common/storage.service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: 'CashAndBank',
  mixins: [Stepper],
  components: {
    FormError, 'vue-ckeditor': VueCkeditor.component
  },

  data() {
    return {
      valid_star: '<span class="required">*</span>',
      comment: '',
      editors: {
        classic: ClassicEditor
      },
      class_header: [],
      title_class: [],
      header_info: [],
      original_tag: [],
      is_prev_button_disable: false,
      is_next_button_disable: false,
      is_save_button_show: false,
      cash_info: {
        id: null,
        cashInHand: null,
        denotationOneQuantity: 0,
        denotationTwoQuantity: 0,
        denotationFiveQuantity: 0,
        denotationTenQuantity: 0,
        denotationTwentyQuantity: 0,
        denotationFortyQuantity: 0,
        denotationFiftyQuantity: 0,
        denotationOneHundredQuantity: 0,
        denotationTwoHundredQuantity: 0,
        denotationFiveHundredQuantity: 0,
        denotationOneThousandQuantity: 0,
        denotationOneAmount: 0,
        denotationTwoAmount: 0,
        denotationFiveAmount: 0,
        denotationTenAmount: 0,
        denotationTwentyAmount: 0,
        denotationFortyAmount: 0,
        denotationFiftyAmount: 0,
        denotationOneHundredAmount: 0,
        denotationTwoHundredAmount: 0,
        denotationFiveHundredAmount: 0,
        denotationOneThousandAmount: 0,
        denotationCoinAmount: 0,
        denotationTotalAmount: 0,
        cashAmountDifference: 0,
        comment: '',
      },
      bank_info: {
        id: '',
        bankBookDetails: '',
        bankBookAmount: null,
        bankStatementAmount: null,
      },
      bank_infos: [],
      bankBookTotalAmount: null,
      bankStatementTotalAmount: null,
      cash_data: {},
      bank_data: [],
      errorMessage: [],
      total_steps: 3,
      current_step: 1,
      is_data_ready: false,
      callback_master_id: null,
      resetData: {},
      isMfiAudit: false,
      formErrors: [],
      core_cash_balance: {},
      core_bank_balances: [],
    };
  },
  mounted() {
    const data = StorageService.getGeneralConfig();
    this.isMfiAudit = !!Number(data['is_mfi_audit']);
    this.callback_master_id = this.$route.query.id;
    if (this.isMfiAudit && this.callback_master_id) {
      this.getCashFromCoreService();
      this.getBankFromCoreService();
      this.is_data_ready = false;
      this.isMfiAudit = true;
    } else if (this.isMfiAudit && typeof this.callback_master_id == 'undefined') {
      this.getCashFromCoreService();
      this.getBankFromCoreService();
      this.is_data_ready = true;
    } else {
      this.is_data_ready = true;
      this.isMfiAudit = false;
      this.loadData();
    }
  },

  methods: {
    loadData: function () {
      this.errorMessage = [];
      this.is_prev_button_disable = true;
      this.is_next_button_disable = false;
      this.header_info = [];
      this.header_info[1] = "Cash Information";
      this.header_info[2] = "Bank Information";
      this.header_info[3] = "Comment";
      this.original_tag[1] = '1';
      this.original_tag[2] = '2';
      this.original_tag[3] = '3';
      this.class_header = [];
      this.title_class = [];
      if (this.callback_master_id) {
        this.loanCashByMasterId(this.callback_master_id);
        this.loadBanksByMasterId(this.callback_master_id);
      }
      for (let i = 1; i <= this.total_steps; i++) {
        if (i === 1) {
          this.class_header[i] = 'md-step editable';
          this.title_class[i] = 'md-step-title editable';
        } else {
          this.class_header[i] = 'md-step';
          this.title_class[i] = 'md-step-title';
        }
      }
    },
    loanCashByMasterId: function (masterId) {
      this.$axios.post("/cash_and_bank/getCashByMasterId", null, {params: {masterId: masterId}}).then(resp => {
        this.cash_data = resp.data.data['cashBalance'];
        if (this.cash_data) {
          this.cash_info.id = this.cash_data['id'];
          this.cash_info.cashInHand = this.cash_data['cashInHand'];
          this.cash_info.denotationOneQuantity = this.cash_data['denotationOneQuantity'];
          this.cash_info.denotationTwoQuantity = this.cash_data['denotationTwoQuantity'];
          this.cash_info.denotationFiveQuantity = this.cash_data['denotationFiveQuantity'];
          this.cash_info.denotationTenQuantity = this.cash_data['denotationTenQuantity'];
          this.cash_info.denotationTwentyQuantity = this.cash_data['denotationTwentyQuantity'];
          this.cash_info.denotationFortyQuantity = this.cash_data['denotationFortyQuantity'];
          this.cash_info.denotationFiftyQuantity = this.cash_data['denotationFiftyQuantity'];
          this.cash_info.denotationOneHundredQuantity = this.cash_data['denotationOneHundredQuantity'];
          this.cash_info.denotationTwoHundredQuantity = this.cash_data['denotationTwoHundredQuantity'];
          this.cash_info.denotationFiveHundredQuantity = this.cash_data['denotationFiveHundredQuantity'];
          this.cash_info.denotationOneThousandQuantity = this.cash_data['denotationOneThousandQuantity'];
          this.cash_info.denotationOneAmount = this.cash_data['denotationOneAmount'];
          this.cash_info.denotationTwoAmount = this.cash_data['denotationTwoAmount'];
          this.cash_info.denotationFiveAmount = this.cash_data['denotationFiveAmount'];
          this.cash_info.denotationTenAmount = this.cash_data['denotationTenAmount'];
          this.cash_info.denotationTwentyAmount = this.cash_data['denotationTwentyAmount'];
          this.cash_info.denotationFortyAmount = this.cash_data['denotationFortyAmount'];
          this.cash_info.denotationFiftyAmount = this.cash_data['denotationFiftyAmount'];
          this.cash_info.denotationOneHundredAmount = this.cash_data['denotationOneHundredAmount'];
          this.cash_info.denotationTwoHundredAmount = this.cash_data['denotationTwoHundredAmount'];
          this.cash_info.denotationFiveHundredAmount = this.cash_data['denotationFiveHundredAmount'];
          this.cash_info.denotationOneThousandAmount = this.cash_data['denotationOneThousandAmount'];
          this.cash_info.denotationCoinAmount = this.cash_data['denotationCoinAmount'];
          this.cash_info.denotationTotalAmount = this.cash_data['denotationTotalAmount'];
          this.cash_info.cashAmountDifference = this.cash_data['cashAmountDifference'];
          this.cash_info.comment = this.cash_data['comment'];
          this.resetData = Object.assign({}, this.cash_info);
        }
      });
    },
    loadBanksByMasterId: function (masterId) {
      this.$axios.post("/cash_and_bank/getBankByMasterId", null, {params: {masterId: masterId}}).then(resp => {
        this.bank_data = resp.data.data['bankBalances'];
        if (this.bank_data) {
          for (let i = 0; i < this.bank_data.length; i++) {
            this.bank_data[i]['bankBookDetails'] = this.bank_data[i]['bankBookDetails'];
            this.bank_data[i]['bankBookAmount'] = this.bank_data[i]['bankBookAmount'];
            this.bank_data[i]['bankStatementAmount'] = this.bank_data[i]['bankStatementAmount'];
            this.bankBookTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankBookAmount']), 0)
            this.bankStatementTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankStatementAmount']), 0)
          }
        }
      });
    },
    addCash: function () {
      this.errors.clear();
      this.errorMessage = [];
      this.$validator.validate().then(valid => {
        if (valid) {
          const headers = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          let method = 'addCash';
          if (this.cash_info.id) {
            method = 'editCash';
            this.cash_info['auditExecutionMastersId'] = this.callback_master_id;
          }
          this.cash_info['scheduleId'] = localStorage.getItem('schedule');
          this.$axios.post("/cash_and_bank/" + method, JSON.stringify(this.cash_info), headers).then(res => {
            if (res.data.validation_error) {
              this.errorMessage = res.data.validation_error;
            } else {
              let status = 'failed';
              if (res.data.statusCode === 200) {
                status = 'success';
                this.resetPage();
                this.nextPage();
                if (this.isMfiAudit) {
                  this.getBankFromCoreService();
                } else {
                  this.loadBanksByMasterId(res.data.data.auditExecutionMastersId);
                }
              } else if (res.data.statusCode === 202) {
                status = 'warning';
              }
              this.flashMessage(status, res.data.message);
            }
          });
        }
      });
    },
    addBank: function () {
      this.errors.clear();
      this.errorMessage = [];
      if (this.bank_data.length > 0) {
        const headers = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        this.$axios.post("/cash_and_bank/addBanks", JSON.stringify(this.bank_data), headers).then(res => {
          if (res.data.validation_error) {
            this.errorMessage = res.data.validation_error;
          } else {
            let status = 'failed';
            if (res.data.statusCode === 200) {
              status = 'success';
              this.nextPage();
            } else if (res.data.statusCode === 202) {
              status = 'warning';
            }
            this.flashMessage(status, res.data.message);
          }
        });
      }
    },
    addBankData: function () {
      this.errors.clear();
      this.errorMessage = [];
      this.$validator.validate().then(valid => {
        if (valid) {
          const myData = {
            bankBookDetails: this.bank_info['bankBookDetails'],
            bankBookAmount: this.bank_info['bankBookAmount'],
            bankStatementAmount: this.bank_info['bankStatementAmount'],
            auditExecutionMastersId: this.callback_master_id
          }
          this.bank_data.unshift(myData);
          this.bankBookTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankBookAmount']), 0)
          this.bankStatementTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankStatementAmount']), 0)
          this.resetPage();
        } else {
          console.error('Validation error!')
        }
      });
    }
    ,
    editBank: function (data) {
      if(data['id']){
        this.bank_info.id = data['id'];
      }
      this.bank_info['bankBookDetails'] = data['bankBookDetails'];
      this.bank_info['bankBookAmount'] = data['bankBookAmount'];
      this.bank_info['bankStatementAmount'] = data['bankStatementAmount'];
      this.callback_master_id = data['auditExecutionMastersId'];
    }
    ,
    submitComment: function () {
      this.errors.clear();
      this.errorMessage = [];
      this.$validator.validate().then(valid => {
        if (valid) {
          const headers = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          let method = 'editCash';
          if (this.cash_data.id) {
            this.cash_info['auditExecutionMastersId'] = this.callback_master_id;
            this.cash_info['scheduleId'] = localStorage.getItem('schedule');
            this.$axios.post("/cash_and_bank/" + method, JSON.stringify(this.cash_info), headers).then(res => {
              if (res.data.validation_error) {
                this.errorMessage = res.data.validation_error;
              } else {
                let status = 'failed';
                if (res.data.statusCode === 200) {
                  status = 'success';
                  this.comment = res.data.data['comment'];
                  this.$router.push('/audit-execution/cash-and-bank-balances/index');
                } else if (res.data.statusCode === 202) {
                  status = 'warning';
                }
                this.flashMessage(status, res.data.message);
              }
            });
          }
        }
      });
    },
    deleteBank: function (data, key) {
      let delete_data = [{
        url: '/cash_and_bank/deleteBank',
        field_id: 'id'
      }];
      let id = data['id'];
      if (id) {
        this.confirmMessage(id, delete_data, false);
        this.callback_master_id = data['auditExecutionMastersId']
      } else {
        this.bank_data.splice(key, 1);
        this.bankBookTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankBookAmount']), 0);
        this.bankStatementTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankStatementAmount']), 0);
      }
    },
    handlePreviousPage: function () {
      this.current_step = 1;
      this.loanCashByMasterId(this.callback_master_id);
      this.previousPage();
    },
    resetPage: function () {
      if (this.current_step === 1) {
        this.$set(this.cash_info, 'cashInHand', this.cash_data['cashInHand']);
        this.$set(this.cash_info, 'denotationOneQuantity', this.cash_data['denotationOneQuantity']);
        this.$set(this.cash_info, 'denotationTwoQuantity', this.cash_data['denotationTwoQuantity']);
        this.$set(this.cash_info, 'denotationFiveQuantity', this.cash_data['denotationFiveQuantity']);
        this.$set(this.cash_info, 'denotationTenQuantity', this.cash_data['denotationTenQuantity']);
        this.$set(this.cash_info, 'denotationTwentyQuantity', this.cash_data['denotationTwentyQuantity']);
        this.$set(this.cash_info, 'denotationFortyQuantity', this.cash_data['denotationFortyQuantity']);
        this.$set(this.cash_info, 'denotationFiftyQuantity', this.cash_data['denotationFiftyQuantity']);
        this.$set(this.cash_info, 'denotationOneHundredQuantity', this.cash_data['denotationOneHundredQuantity']);
        this.$set(this.cash_info, 'denotationTwoHundredQuantity', this.cash_data['denotationTwoHundredQuantity']);
        this.$set(this.cash_info, 'denotationFiveHundredQuantity', this.cash_data['denotationFiveHundredQuantity']);
        this.$set(this.cash_info, 'denotationOneThousandQuantity', this.cash_data['denotationOneThousandQuantity']);
        this.$set(this.cash_info, 'denotationOneAmount', this.cash_data['denotationOneAmount']);
        this.$set(this.cash_info, 'denotationTwoAmount', this.cash_data['denotationTwoAmount']);
        this.$set(this.cash_info, 'denotationFiveAmount', this.cash_data['denotationFiveAmount']);
        this.$set(this.cash_info, 'denotationTenAmount', this.cash_data['denotationTenAmount']);
        this.$set(this.cash_info, 'denotationTwentyAmount', this.cash_data['denotationTwentyAmount']);
        this.$set(this.cash_info, 'denotationFortyAmount', this.cash_data['denotationFortyAmount']);
        this.$set(this.cash_info, 'denotationFiftyAmount', this.cash_data['denotationFiftyAmount']);
        this.$set(this.cash_info, 'denotationOneHundredAmount', this.cash_data['denotationOneHundredAmount']);
        this.$set(this.cash_info, 'denotationTwoHundredAmount', this.cash_data['denotationTwoHundredAmount']);
        this.$set(this.cash_info, 'denotationFiveHundredAmount', this.cash_data['denotationFiveHundredAmount']);
        this.$set(this.cash_info, 'denotationOneThousandAmount', this.cash_data['denotationOneThousandAmount']);
        this.$set(this.cash_info, 'denotationCoinAmount', this.cash_data['denotationCoinAmount']);
        this.$set(this.cash_info, 'denotationTotalAmount', this.cash_data['denotationTotalAmount']);
        this.$set(this.cash_info, 'cashAmountDifference', this.cash_data['cashAmountDifference']);
        this.$set(this.cash_info, 'comment', this.cash_data['comment']);
      } else if (this.current_step === 2) {
        this.bank_info.bankBookDetails = '';
        this.bank_info.bankBookAmount = '';
        this.bank_info.bankStatementAmount = '';
        this.bank_info.id = '';
      }
      this.errors.clear();
      this.$validator.reset();
    }
    ,
    onChangeCashInHand: function (event) {
      this.cash_info.cashAmountDifference = event - this.cash_info.denotationTotalAmount;
    }
    ,
    onChangeOne: function (event) {
      this.cash_info.denotationOneAmount = event * 1;
      this.cash_info.denotationTotalAmount = this.doSum();
      this.cash_info.cashAmountDifference = this.doSubtract();
    }
    ,
    onChangeTwo: function (event) {
      this.cash_info.denotationTwoAmount = event * 2;
      this.cash_info.denotationTotalAmount = this.doSum();
      this.cash_info.cashAmountDifference = this.doSubtract();
    }
    ,
    onChangeFive: function (event) {
      this.cash_info.denotationFiveAmount = event * 5;
      this.cash_info.denotationTotalAmount = this.doSum();
      this.cash_info.cashAmountDifference = this.doSubtract();
    }
    ,
    onChangeTen: function (event) {
      this.cash_info.denotationTenAmount = event * 10;
      this.cash_info.denotationTotalAmount = this.doSum();
      this.cash_info.cashAmountDifference = this.doSubtract();
    }
    ,
    onChangeTwenty: function (event) {
      this.cash_info.denotationTwentyAmount = event * 20;
      this.cash_info.denotationTotalAmount = this.doSum();
      this.cash_info.cashAmountDifference = this.doSubtract();
    }
    ,
    onChangeFifty: function (event) {
      this.cash_info.denotationFiftyAmount = event * 50;
      this.cash_info.denotationTotalAmount = this.doSum();
      this.cash_info.cashAmountDifference = this.doSubtract();
    }
    ,
    onChangeOneHundred: function (event) {
      this.cash_info.denotationOneHundredAmount = event * 100;
      this.cash_info.denotationTotalAmount = this.doSum();
      this.cash_info.cashAmountDifference = this.doSubtract();
    }
    ,
    onChangeTwoHundred: function (event) {
      this.cash_info.denotationTwoHundredAmount = event * 200;
      this.cash_info.denotationTotalAmount = this.doSum();
      this.cash_info.cashAmountDifference = this.doSubtract();
    }
    ,
    onChangeFiveHundred: function (event) {
      this.cash_info.denotationFiveHundredAmount = event * 500;
      this.cash_info.denotationTotalAmount = this.doSum();
      this.cash_info.cashAmountDifference = this.doSubtract();
    }
    ,
    onChangeOneThousand: function (event) {
      this.cash_info.denotationOneThousandAmount = event * 1000;
      this.cash_info.denotationTotalAmount = this.doSum();
      this.cash_info.cashAmountDifference = this.doSubtract();
    }
    ,
    onChangeCoin: function (event) {
      this.cash_info.denotationCoinAmount = event;
      this.cash_info.denotationTotalAmount = this.doSum();
      this.cash_info.cashAmountDifference = this.doSubtract();
    }
    ,
    doSum: function () {
      const denotationOneAmount = this.cash_info.denotationOneAmount ? parseInt(this.cash_info.denotationOneAmount) : 0;
      const denotationTwoAmount = this.cash_info.denotationTwoAmount ? parseInt(this.cash_info.denotationTwoAmount) : 0;
      const denotationFiveAmount = this.cash_info.denotationFiveAmount ? parseInt(this.cash_info.denotationFiveAmount) : 0;
      const denotationTenAmount = this.cash_info.denotationTenAmount ? parseInt(this.cash_info.denotationTenAmount) : 0;
      const denotationTwentyAmount = this.cash_info.denotationTwentyAmount ? parseInt(this.cash_info.denotationTwentyAmount) : 0;
      const denotationFiftyAmount = this.cash_info.denotationFiftyAmount ? parseInt(this.cash_info.denotationFiftyAmount) : 0;
      const denotationOneHundredAmount = this.cash_info.denotationOneHundredAmount ? parseInt(this.cash_info.denotationOneHundredAmount) : 0;
      const denotationTwoHundredAmount = this.cash_info.denotationTwoHundredAmount ? parseInt(this.cash_info.denotationTwoHundredAmount) : 0;
      const denotationFiveHundredAmount = this.cash_info.denotationFiveHundredAmount ? parseInt(this.cash_info.denotationFiveHundredAmount) : 0;
      const denotationOneThousandAmount = this.cash_info.denotationOneThousandAmount ? parseInt(this.cash_info.denotationOneThousandAmount) : 0;
      const denotationCoinAmount = this.cash_info.denotationCoinAmount ? parseInt(this.cash_info.denotationCoinAmount) : 0;
      return denotationOneAmount + denotationTwoAmount + denotationFiveAmount + denotationTenAmount + denotationTwentyAmount + denotationFiftyAmount + denotationOneHundredAmount + denotationTwoHundredAmount + denotationFiveHundredAmount + denotationOneThousandAmount + denotationCoinAmount;
    }
    ,
    doSubtract: function () {
      const cashInHand = this.cash_info.cashInHand ? parseInt(this.cash_info.cashInHand) : 0;
      const denotationTotalAmount = this.cash_info.denotationTotalAmount ? parseInt(this.cash_info.denotationTotalAmount) : 0;
      return cashInHand - denotationTotalAmount;
    }
    ,
    getCashFromCoreService: function () {
      const locationId = localStorage.getItem('api_location_id');
      const auditPeriodFromDate = localStorage.getItem('auditPeriodFromDate');
      const auditPeriodToDate = localStorage.getItem('auditPeriodToDate');
      const url = 'ams_staff_positions/get_cash_balance';
      $http_core_service.post(url, JSON.stringify({
        'locationId': locationId,
        'auditPeriodFromDate': auditPeriodFromDate,
        'auditPeriodToDate': auditPeriodToDate
      }))
        .then((response) => {
          if (response.data) {
            this.cash_info['cashInHand'] = response.data['cash_in_hand']
          }
        }).catch(function (error) {
        console.error("error", error);
      });
    }
    ,
    getBankFromCoreService: function () {
      const locationId = localStorage.getItem('api_location_id');
      const auditPeriodFromDate = localStorage.getItem('auditPeriodFromDate');
      const auditPeriodToDate = localStorage.getItem('auditPeriodToDate');
      $http_core_service.post("ams_staff_positions/get_bank_balances", JSON.stringify({
        'locationId': locationId,
        'auditPeriodFromDate': auditPeriodFromDate,
        'auditPeriodToDate': auditPeriodToDate
      })).then(resp => {
        this.bank_data = resp.data;
        if (this.bank_data.length > 0) {
          for (let i = 0; i < this.bank_data.length; i++) {
            this.bank_data[i]['bankBookDetails'] = this.bank_data[i]['bankBookDetails'];
            this.bank_data[i]['bankBookAmount'] = this.bank_data[i]['bankBookAmount'];
            this.bank_data[i]['bankStatementAmount'] = this.bank_data[i]['bankStatementAmount'];
            this.bankBookTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankBookAmount']), 0)
            this.bankStatementTotalAmount = this.bank_data.reduce((accum, item) => accum + parseInt(item['bankStatementAmount']), 0)
          }
          console.log(this.bank_data);
        }
      });
    }
    ,
    handleSubmitCoreData: function () {
      let userInfo = this.$store.getters['auth/userInfo'];
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          const formData = {};
          formData.createdBy = userInfo['id'];
          formData.scheduleId = localStorage.getItem('schedule');
          this.$axios
            .post("/staff_positions/addAll", JSON.stringify(formData))
            .then(res => {
              if (res.data.validation_error) {
                this.error_message = res.data.validation_error;
              } else {
                let status = 'failed';
                if (res.data.statusCode === 200) {
                  status = 'success';
                  // console.log('success', res.data.statusCode);
                  this.loadData(this.pagination.offset);
                  this.handleReset();
                } else if (res.data.statusCode === 202) {
                  status = 'warning';
                }
                this.flashMessage(status, res.data.message);
                if (status === 'success') {
                  this.$emit('close', true);
                }
              }
            });
        }
      }).catch(() => {
        this.$toast.error({title: 'error', message: "Invalid Field"});
      });
    }
  }
}
;
