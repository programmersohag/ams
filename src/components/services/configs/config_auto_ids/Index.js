
// import IdConfiguration from '@/components/configs/config_auto_ids/IdConfiguration'
import FormGenerator from "@/containers/form_generators/FormGenerator";
import API from "@/shared/common/API.js";
import {getCommonOptions} from "@/shared/options/generate.js";

let cAPI = new API();
cAPI.createEntity({ name: "config_auto_ids" });
export default {
  name: 'tabs',
  components: {
    FormGenerator,
    // IdConfiguration,
  },
  data () {
    return {
      tabIndex: [0, 0],
      tabs: {
        branch_id_configuration:'Branch',
        samity_id_configuration:'Samity',
        member_id_configuration: 'Member',
        savings_id_configuration: 'Savings',
        loan_id_configuration: 'Loan',
        employee_id_configuration: 'Employee',
        voucher_id_configuration: 'Voucher'
      },
      tabs_icons: {
        branch_id_configuration:'fa fa-home',
        samity_id_configuration:'fa fa-building',
        member_id_configuration: 'fa fa-users',
        savings_id_configuration: 'fa fa-money',
        loan_id_configuration: 'fa fa-handshake-o',
        employee_id_configuration: 'fa fa-user',
        voucher_id_configuration: 'fa fa-credit-card'
      },
      tab_label: {
        branch_id_configuration:'Branch ID Configuration',
        samity_id_configuration:'Samity ID Configuration',
        member_id_configuration: 'Member ID Configuration',
        savings_id_configuration: 'Savings ID Configuration',
        loan_id_configuration: 'Loan ID Configuration',
        employee_id_configuration: 'Employee ID Configuration',
        voucher_id_configuration: 'Voucher ID Configuration'
      },
      childLoad: false,
      schema: {
        branch_id_configuration: {
          rdo_is_branch_auto_code_need: {
            fieldType: "RadioList",
            fieldName: "rdo_is_branch_auto_code_need",
            label: this.$t("is_branch_auto_code_need"),
            id: "rdo_is_branch_auto_code_need",
            options: {1:'Yes', 0:'No'},
            onChange: true,
            vvalidate: "required",
            formClass: "col-md-4"
          },
          branch_code_length: {
            fieldType: "SelectList",
            fieldName: "branch_code_length",
            label: this.$t("branch_code_length"),
            id: "branch_code_length",
            onChange: true,
            isShow: false,
            vvalidate: "required"
          }
        },
        samity_id_configuration: {
          rdo_is_samity_auto_code_need: {
            fieldType: "RadioList",
            fieldName: "rdo_is_samity_auto_code_need",
            label: this.$t("is_samity_auto_code_need"),
            id: "rdo_is_samity_auto_code_need",
            options: {1:'Yes', 0:'No'},
            onChange: true,
            vvalidate: "required"
          },
          samity_code_segment_1: {
            fieldType: "SelectList",
            fieldName: "samity_code_segment_1",
            label: this.$t("samity")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('1'),
            id: "samity_code_segment_1",
            onChange: true,
            isShow: false,
          },
          samity_code_segment_2: {
            fieldType: "SelectList",
            fieldName: "samity_code_segment_2",
            label: this.$t("samity")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('2'),
            id: "samity_code_segment_2",
            onChange: true,
            isShow: false,
          },
          samity_code_length: {
            fieldType: "SelectList",
            fieldName: "samity_code_length",
            label:this.$t("samity")+' '+this.$t("code")+' '+this.$t("length"),
            id: "samity_code_length",
            onChange: true,
            isShow: false,
          },
          samity_code_separator: {
            fieldType: "SelectList",
            fieldName: "samity_code_separator",
            label:this.$t("samity")+' '+this.$t("code")+' '+this.$t("separator"),
            id: "samity_code_separator",
            onChange: true,
            isShow: false,
          }
        },
        member_id_configuration: {
          rdo_is_member_auto_code_need: {
            fieldType: "RadioList",
            fieldName: "rdo_is_member_auto_code_need",
            label: this.$t("is_member_auto_code_need"),
            id: "rdo_is_member_auto_code_need",
            options: {1:'Yes', 0:'No'},
            onChange: true,
            vvalidate: "required"
          },
          member_code_segment_1: {
            fieldType: "SelectList",
            fieldName: "member_code_segment_1",
            label:this.$t("member")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('1'),
            id: "member_code_segment_1",
            onChange: true,
            isShow: false,
          },
          member_code_segment_2: {
            fieldType: "SelectList",
            fieldName: "member_code_segment_2",
            label:this.$t("member")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('2'),
            id: "member_code_segment_2",
            onChange: true,
            isShow: false,
          },
          member_code_segment_3: {
            fieldType: "SelectList",
            fieldName: "member_code_segment_3",
            label:this.$t("member")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('3'),
            id: "member_code_segment_3",
            onChange: true,
            isShow: false,
          },
          member_code_segment_4: {
            fieldType: "SelectList",
            fieldName: "member_code_segment_4",
            label: this.$t("member")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('4'),
            id: "member_code_segment_4",
            onChange: true,
            isShow: false,
          },
          member_code_segment_5: {
            fieldType: "SelectList",
            fieldName: "member_code_segment_5",
            label: this.$t("member")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('5'),
            id: "member_code_segment_5",
            onChange: true,
            isShow: false,
          },
          member_code_length: {
            fieldType: "SelectList",
            fieldName: "member_code_length",
            label:this.$t("member")+' '+this.$t("code")+' '+this.$t("length"),
            id: "member_code_length",
            onChange: true,
            isShow: false,
          },
          cbo_auto_increament_option: {
            fieldType: "SelectList",
            fieldName: "cbo_auto_increament_option",
            label: this.$t("auto_increament_option"),
            id: "cbo_auto_increament_option",
            onChange: true,
            isShow: false,
          },
          member_code_separator: {
            fieldType: "SelectList",
            fieldName: "member_code_separator",
            label: this.$t("samity_code_length"),
            id: "member_code_separator",
            onChange: true,
            isShow: false,
          },
          closed_member_code_reusable: {
            fieldType: "RadioList",
            fieldName: "closed_member_code_reusable",
            label: this.$t("closed_member_code_reusable"),
            id: "closed_member_code_reusable",
            isShow: false,
          },
        },
        savings_id_configuration: {
          rdo_is_savings_auto_code_need: {
            fieldType: "RadioList",
            fieldName: "rdo_is_savings_auto_code_need",
            label: this.$t("is_savings_auto_code_need"),
            id: "rdo_is_savings_auto_code_need",
            options: {1:'Yes', 0:'No'},
            onChange: true,
            vvalidate: "required"
          },
          savings_code_segment_1: {
            fieldType: "SelectList",
            fieldName: "savings_code_segment_1",
            label:this.$t("savings")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('1'),
            id: "savings_code_segment_1",
            onChange: true,
            isShow: false,
          },
          savings_code_segment_2: {
            fieldType: "SelectList",
            fieldName: "savings_code_segment_2",
            label:this.$t("savings")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('2'),
            id: "savings_code_segment_2",
            onChange: true,
            isShow: false,
          },
          savings_code_segment_3: {
            fieldType: "SelectList",
            fieldName: "savings_code_segment_3",
            label:this.$t("savings")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('3'),
            id: "savings_code_segment_3",
            onChange: true,
            isShow: false,
          },
          savings_code_segment_4: {
            fieldType: "SelectList",
            fieldName: "savings_code_segment_4",
            label: this.$t("savings")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('4'),
            id: "savings_code_segment_4",
            onChange: true,
            isShow: false,
          },
          savings_code_separator: {
            fieldType: "SelectList",
            fieldName: "savings_code_separator",
            label: this.$t("samity_code_length"),
            id: "savings_code_separator",
            onChange: true,
            isShow: false,
          },
        },
        loan_id_configuration: {
          rdo_is_loan_auto_code_need: {
            fieldType: "RadioList",
            fieldName: "rdo_is_loan_auto_code_need",
            label: this.$t("is_loan_auto_code_need"),
            id: "rdo_is_loan_auto_code_need",
            options: {1:'Yes', 0:'No'},
            onChange: true,
            vvalidate: "required"
          },
          loan_code_segment_1: {
            fieldType: "SelectList",
            fieldName: "loan_code_segment_1",
            label:this.$t("loan")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('1'),
            id: "loan_code_segment_1",
            onChange: true,
            isShow: false,
          },
          loan_code_segment_2: {
            fieldType: "SelectList",
            fieldName: "loan_code_segment_2",
            label:this.$t("loan")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('2'),
            id: "loan_code_segment_2",
            onChange: true,
            isShow: false,
          },
          loan_code_segment_3: {
            fieldType: "SelectList",
            fieldName: "loan_code_segment_3",
            label:this.$t("loan")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('3'),
            id: "loan_code_segment_3",
            onChange: true,
            isShow: false,
          },
          loan_code_segment_4: {
            fieldType: "SelectList",
            fieldName: "loan_code_segment_4",
            label:this.$t("loan")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('4'),
            id: "loan_code_segment_4",
            onChange: true,
            isShow: false,
          },
          loan_code_segment_5: {
            fieldType: "SelectList",
            fieldName: "loan_code_segment_5",
            label:this.$t("loan")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('5'),
            id: "loan_code_segment_5",
            onChange: true,
            isShow: false,
          },
          loan_cyle_option: {
            fieldType: "SelectList",
            fieldName: "loan_cyle_option",
            label: this.$t("loan_cyle_option"),
            id: "loan_cyle_option",
            onChange: true,
            isShow: false,
          },
          loan_code_separator: {
            fieldType: "SelectList",
            fieldName: "loan_code_separator",
            label:this.$t("loan")+' '+this.$t("code")+' '+this.$t("separator"),
            id: "loan_code_separator",
            onChange: true,
            isShow: false,
          }
        },
        employee_id_configuration: {
          rdo_is_employee_auto_code_need: {
            fieldType: "RadioList",
            fieldName: "rdo_is_employee_auto_code_need",
            label: this.$t("is_employee_auto_code_need"),
            id: "rdo_is_employee_auto_code_need",
            options: {1:'Yes', 0:'No'},
            onChange: true,
            vvalidate: "required"
          },
          employee_code_length: {
            fieldType: "SelectList",
            fieldName: "employee_code_length",
            label:this.$t("employee")+' '+this.$t("code")+' '+this.$t("length"),
            id: "employee_code_length",
            onChange: true,
            isShow: false,
            vvalidate: "required"
          }
        },
        voucher_id_configuration: {
          rdo_is_voucher_auto_code_need: {
            fieldType: "RadioList",
            fieldName: "rdo_is_voucher_auto_code_need",
            label: this.$t("is_voucher_auto_code_need"),
            id: "rdo_is_voucher_auto_code_need",
            options: {1:'Yes', 0:'No'},
            onChange: true,
            vvalidate: "required"
          },
          txt_payment_voucher_prefix: {
            fieldType: "TextInput",
            fieldName: "txt_payment_voucher_prefix",
            label: this.$t("payment_voucher"),
            id: "txt_payment_voucher_prefix",
            isReadOnly: true,
            isShow: false,
          },
          txt_receipt_voucher_prefix: {
            fieldType: "TextInput",
            fieldName: "txt_receipt_voucher_prefix",
            label: this.$t("receipt_voucher"),
            id: "txt_receipt_voucher_prefix",
            isReadOnly: true,
            isShow: false,
          },
          txt_journal_voucher_prefix: {
            fieldType: "TextInput",
            fieldName: "txt_journal_voucher_prefix",
            label: this.$t("journal_voucher"),
            id: "txt_journal_voucher_prefix",
            isReadOnly: true,
            isShow: false,
          },
          txt_contra_voucher_prefix: {
            fieldType: "TextInput",
            fieldName: "txt_contra_voucher_prefix",
            label: this.$t("contra_voucher"),
            id: "txt_contra_voucher_prefix",
            isReadOnly: true,
            isShow: false,
          },
          txt_fund_transfer_voucher_prefix: {
            fieldType: "TextInput",
            fieldName: "txt_fund_transfer_voucher_prefix",
            label: this.$t("fund_transfer_voucher"),
            id: "txt_fund_transfer_voucher_prefix",
            isReadOnly: true,
            isShow: false,
          },
          voucher_code_segment_1: {
            fieldType: "SelectList",
            fieldName: "voucher_code_segment_1",
            label:this.$t("voucher")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('1'),
            id: "voucher_code_segment_1",
            onChange: true,
            isShow: false,
          },
          voucher_code_segment_2: {
            fieldType: "SelectList",
            fieldName: "voucher_code_segment_2",
            label:this.$t("voucher")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('2'),
            id: "voucher_code_segment_2",
            onChange: true,
            isShow: false,
          },
          voucher_code_segment_3: {
            fieldType: "SelectList",
            fieldName: "voucher_code_segment_3",
            label:this.$t("voucher")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('3'),
            id: "voucher_code_segment_3",
            onChange: true,
            isShow: false,
          },
          voucher_code_segment_4: {
            fieldType: "SelectList",
            fieldName: "voucher_code_segment_4",
            label:this.$t("voucher")+' '+this.$t("code")+' '+this.$t("segment")+' '+this.$t('4'),
            id: "voucher_code_segment_4",
            onChange: true,
            isShow: false,
          },
          voucher_auto_increment_length: {
            fieldType: "SelectList",
            fieldName: "voucher_auto_increment_length",
            label:this.$t("voucher")+' '+this.$t("code")+' '+this.$t("length"),
            id: "voucher_code_length",
            onChange: true,
            isShow: false,
          },
          voucher_code_separator: {
            fieldType: "SelectList",
            fieldName: "voucher_code_separator",
            label:this.$t("voucher")+' '+this.$t("code")+' '+this.$t("separator"),
            id: "voucher_code_separator",
            onChange: true,
            isShow: false,
          }
        }

      },
      formData: {
        branch_id_configuration:{rdo_is_branch_auto_code_need:0},
        samity_id_configuration:{rdo_is_samity_auto_code_need:0},
        member_id_configuration:{
          rdo_is_member_auto_code_need:0,
          closed_member_code_reusable:0
        },
        savings_id_configuration:{rdo_is_savings_auto_code_need:0},
        loan_id_configuration:{rdo_is_loan_auto_code_need:0},
        employee_id_configuration:{rdo_is_employee_auto_code_need:0},
        voucher_id_configuration:{
          rdo_is_voucher_auto_code_need:0,
          txt_payment_voucher_prefix: "PV",
          txt_receipt_voucher_prefix: "RV",
          txt_journal_voucher_prefix: "JV",
          txt_contra_voucher_prefix: "CV",
          txt_fund_transfer_voucher_prefix: "FT",
        }
      },
      resetData: {},
      id: '',
      is_show_sample_code: {},
      sample_code: {},
      errorMessage: [],
      segment_options: {'' : '----Select----','branch_code' : 'Branch Code [BC]','primary_product_category_short_name' : 'Primary Product Category Short Name [PCSN]','loan_product_code' : 'Product Code [PC]'},
      member_segment_options: {'' : '----Select----','branch_code' : 'Branch Code [BC]','samity_code' : 'Samity Code [SC]','primary_product_category_short_name' : 'Primary Product Category Short Name [PCSN]','loan_product_short_name':'Primary Product Short Name [PSN]','loan_product_code':'Primary Product Code [PPC]','admission_year' : 'Admission Year [YYYY]','admission_month' : 'Admission Month [MM]','samity_group_code' : 'Samity Group Code [SGC]'},
      auto_increament_options: {'' : '----Select----','branch_wise' : 'Branch Wise', 'samity_wise' : 'Samity Wise', 'product_category_wise' : 'Product Category Wise','product_wise' : 'Product Wise' },
      savings_segment_options: {'' : '----Select----', 'member_code':'Member Code [MC]','savings_product_code' : 'Product Code [PC]','savings_product_short_name' : 'Product Short Name [PSN]', 'cycle' : 'Savings Cycle [1]'},
      loan_segment_options: {'' : '----Select----','member_code':'Member Code [MC]','loan_product_code' : 'Product Code [PC]','loan_product_short_name' : 'Product Short Name [PSN]','funding_org_short_name':'Funding Org. Short Name [FO]','cycle':'Loan Cycle [1]'},
      loan_cycle_option:  {'' : '----Select----', 'loan_product_wise' : 'Product Wise', 'loan_product_category_wise' : 'Product Category Wise', 'member_wise' : 'Member Wise'},
      voucher_segment_options: {'' : '-----Select------', 'voucher_code_prefix' : 'Voucher Code Prefix [VCP] ', 'branch_code' : 'Branch Code [BC]','fund_code' : 'Fund Code [FC]','voucher_year_and_month' : 'Year Month [YYYYMM]'},
    }
  },
  mounted:function() {
   let params;
   cAPI.endpoints.config_auto_ids
   .getRequest('index',params)
   .then(res=>{
      this.schema['branch_id_configuration']['branch_code_length']['options'] =getCommonOptions(res.data.config_code_length,'');
      this.schema['samity_id_configuration']['samity_code_length']['options'] =getCommonOptions(res.data.config_code_length,'');
      this.schema['samity_id_configuration']['samity_code_separator']['options'] = res.data.config_code_separator;

      this.schema['member_id_configuration']['member_code_length']['options'] =getCommonOptions( res.data.config_code_length,'');
      this.schema['member_id_configuration']['member_code_separator']['options'] = res.data.config_code_separator;

      this.schema['savings_id_configuration']['savings_code_separator']['options'] = res.data.config_code_separator;

      this.schema['loan_id_configuration']['loan_code_separator']['options'] = res.data.config_code_separator;
      this.schema['employee_id_configuration']['employee_code_length']['options'] =getCommonOptions(res.data.config_code_length,'');

      this.schema['voucher_id_configuration']['voucher_auto_increment_length']['options'] =getCommonOptions(res.data.config_code_length,'');
      this.schema['voucher_id_configuration']['voucher_code_separator']['options'] = res.data.config_code_separator;

      if(res.data.row.id>0){
        let row = res.data.row;
        this.id = row.id;
        const form_data = {
          branch_id_configuration:{rdo_is_branch_auto_code_need:0},
          samity_id_configuration:{rdo_is_samity_auto_code_need:0},
          member_id_configuration:{
            rdo_is_member_auto_code_need:0,
            closed_member_code_reusable:0
          },
          savings_id_configuration:{rdo_is_savings_auto_code_need:0},
          loan_id_configuration:{rdo_is_loan_auto_code_need:0},
          employee_id_configuration:{rdo_is_employee_auto_code_need:0},
          voucher_id_configuration:{
            rdo_is_voucher_auto_code_need:0,
            txt_payment_voucher_prefix: "PV",
            txt_receipt_voucher_prefix: "RV",
            txt_journal_voucher_prefix: "JV",
            txt_contra_voucher_prefix: "CV",
            txt_fund_transfer_voucher_prefix: "FT",
          }
        };
        this.$set(form_data['branch_id_configuration'], "rdo_is_branch_auto_code_need", row.is_branch_auto_code_need);
        this.$set(form_data['branch_id_configuration'], "branch_code_length", row.branch_code_length);
        this.onChangeMethod("rdo_is_branch_auto_code_need", row.is_branch_auto_code_need);

        this.$set(form_data['samity_id_configuration'], "rdo_is_samity_auto_code_need", row.is_samity_auto_code_need);
        this.$set(form_data['samity_id_configuration'], "samity_code_segment_1", row.samity_code_segment_1);
        this.$set(form_data['samity_id_configuration'], "samity_code_segment_2", row.samity_code_segment_2);
        this.$set(form_data['samity_id_configuration'], "samity_code_length", row.samity_code_length);
        this.$set(form_data['samity_id_configuration'], "samity_code_separator", row.samity_code_separator);
        this.onChangeMethod("rdo_is_samity_auto_code_need", row.is_samity_auto_code_need);

        this.$set(form_data['member_id_configuration'], "rdo_is_member_auto_code_need", row.is_member_auto_code_need);
        this.$set(form_data['member_id_configuration'], "member_code_segment_1", row.member_code_segment_1);
        this.$set(form_data['member_id_configuration'], "member_code_segment_2", row.member_code_segment_2);
        this.$set(form_data['member_id_configuration'], "member_code_segment_3", row.member_code_segment_3);
        this.$set(form_data['member_id_configuration'], "member_code_segment_4", row.member_code_segment_4);
        this.$set(form_data['member_id_configuration'], "member_code_segment_5", row.member_code_segment_5);
        this.$set(form_data['member_id_configuration'], "cbo_auto_increament_option", row.auto_increament_option);
        this.$set(form_data['member_id_configuration'], "member_code_separator", row.member_code_separator);
        this.$set(form_data['member_id_configuration'], "closed_member_code_reusable", row.closed_member_code_reusable);
        this.onChangeMethod("rdo_is_member_auto_code_need", row.is_member_auto_code_need);

        this.$set(form_data['savings_id_configuration'], "rdo_is_savings_auto_code_need", row.is_savings_auto_code_need);
        this.$set(form_data['savings_id_configuration'], "savings_code_segment_1", row.savings_code_segment_1);
        this.$set(form_data['savings_id_configuration'], "savings_code_segment_2", row.savings_code_segment_2);
        this.$set(form_data['savings_id_configuration'], "savings_code_segment_3", row.savings_code_segment_3);
        this.$set(form_data['savings_id_configuration'], "savings_code_segment_4", row.savings_code_segment_4);
        this.$set(form_data['savings_id_configuration'], "savings_code_separator", row.savings_code_separator);
        this.onChangeMethod("rdo_is_savings_auto_code_need", row.is_savings_auto_code_need);

        this.$set(form_data['loan_id_configuration'], "rdo_is_loan_auto_code_need", row.is_loan_auto_code_need);
        this.$set(form_data['loan_id_configuration'], "loan_code_segment_1", row.loan_code_segment_1);
        this.$set(form_data['loan_id_configuration'], "loan_code_segment_2", row.loan_code_segment_2);
        this.$set(form_data['loan_id_configuration'], "loan_code_segment_3", row.loan_code_segment_3);
        this.$set(form_data['loan_id_configuration'], "loan_code_segment_4", row.loan_code_segment_4);
        this.$set(form_data['loan_id_configuration'], "loan_code_segment_5", row.loan_code_segment_5);
        this.$set(form_data['loan_id_configuration'], "loan_cyle_option", row.loan_cyle_option);
        this.$set(form_data['loan_id_configuration'], "loan_code_separator", row.loan_code_separator);
        this.onChangeMethod("rdo_is_loan_auto_code_need", row.is_loan_auto_code_need);

        this.$set(form_data['employee_id_configuration'], "rdo_is_employee_auto_code_need", row.is_employee_auto_code_need);
        this.$set(form_data['employee_id_configuration'], "employee_code_length", row.employee_code_length);
        this.onChangeMethod("rdo_is_employee_auto_code_need", row.is_employee_auto_code_need);

        this.$set(form_data['voucher_id_configuration'], "rdo_is_voucher_auto_code_need", row.is_voucher_auto_code_need);
        this.$set(form_data['voucher_id_configuration'], "txt_payment_voucher_prefix", row.payment_voucher_prefix);
        this.$set(form_data['voucher_id_configuration'], "txt_receipt_voucher_prefix", row.receipt_voucher_prefix);
        this.$set(form_data['voucher_id_configuration'], "txt_journal_voucher_prefix", row.journal_voucher_prefix);
        this.$set(form_data['voucher_id_configuration'], "txt_contra_voucher_prefix", row.contra_voucher_prefix);
        this.$set(form_data['voucher_id_configuration'], "txt_fund_transfer_voucher_prefix", row.fund_transfer_voucher_prefix);
        this.$set(form_data['voucher_id_configuration'], "voucher_code_segment_1", row.voucher_code_segment_1);
        this.$set(form_data['voucher_id_configuration'], "voucher_code_segment_2", row.voucher_code_segment_2);
        this.$set(form_data['voucher_id_configuration'], "voucher_code_segment_3", row.voucher_code_segment_3);
        this.$set(form_data['voucher_id_configuration'], "voucher_code_segment_4", row.voucher_code_segment_4);
        this.$set(form_data['voucher_id_configuration'], "voucher_auto_increment_length", row.voucher_auto_increment_length);
        this.$set(form_data['voucher_id_configuration'], "voucher_code_separator", row.voucher_code_separator);
        this.onChangeMethod("rdo_is_voucher_auto_code_need", row.is_voucher_auto_code_need);

        this.formData = form_data;
        this.resetData = Object.assign({}, form_data);
      }
      this.childLoad = true
    })
    .catch(function (error) {
      console.log(error.res);
    })

  },

  methods: {
    handleSubmit: function(selected_tab) {

      this.$validator.validate().then(valid => {
        if (valid) {
          const params = new FormData();
          const submited_data = this.formData[selected_tab];
          params.append("txt_config_auto_id", this.id);
          for (let  key in submited_data) {
            params.append(key, submited_data[key]);
          }

          this.$axios.post('/config_auto_ids/'+selected_tab,params,
          ).then(res => {
                if(res.data.status=='success'){
                  this.flashMessage(res.data.status,res.data.message);
                }else if (res.data.error) {
                  this.errorMessage = res.data.error;
                }else if(res.data.status=='warning'){
                  this.flashMessage(res.data.status,res.data.message);
                }

            }).catch(function (error) {
                console.log(error);
            });
        }
      });
    },

    handleReset: function (e) {
      this.errorMessage = [];
      this.errors.clear();
      this.formData = Object.assign({}, this.resetData);
    },

    onChangeMethod(field, value) {
      this.generate_sample_code('branch_id_configuration','','','','','',this.formData['branch_id_configuration']['branch_code_length'],'');
      this.generate_sample_code('samity_id_configuration', this.formData['samity_id_configuration']['samity_code_segment_1'],this.formData['samity_id_configuration']['samity_code_segment_2'],'','','',this.formData['samity_id_configuration']['samity_code_length'],this.formData['samity_id_configuration']['samity_code_separator']);
      this.generate_sample_code('member_id_configuration', this.formData['member_id_configuration']['member_code_segment_1'],this.formData['member_id_configuration']['member_code_segment_2'],this.formData['member_id_configuration']['member_code_segment_3'],this.formData['member_id_configuration']['member_code_segment_4'],this.formData['member_id_configuration']['member_code_segment_5'],this.formData['member_id_configuration']['member_code_length'],this.formData['member_id_configuration']['member_code_separator']);
      this.generate_sample_code('savings_id_configuration', this.formData['savings_id_configuration']['savings_code_segment_1'],this.formData['savings_id_configuration']['savings_code_segment_2'],this.formData['savings_id_configuration']['savings_code_segment_3'],this.formData['savings_id_configuration']['savings_code_segment_4'],'','',this.formData['savings_id_configuration']['savings_code_separator']);
      this.generate_sample_code('loan_id_configuration', this.formData['loan_id_configuration']['loan_code_segment_1'],this.formData['loan_id_configuration']['loan_code_segment_2'],this.formData['loan_id_configuration']['loan_code_segment_3'],this.formData['loan_id_configuration']['loan_code_segment_4'],this.formData['loan_id_configuration']['loan_code_segment_5'],'',this.formData['loan_id_configuration']['loan_code_separator']);
      this.generate_sample_code('employee_id_configuration','','','','','',this.formData['employee_id_configuration']['employee_code_length'],'');
      this.generate_sample_code('voucher_id_configuration', this.formData['voucher_id_configuration']['voucher_code_segment_1'],this.formData['voucher_id_configuration']['voucher_code_segment_2'],this.formData['voucher_id_configuration']['voucher_code_segment_3'],this.formData['voucher_id_configuration']['voucher_code_segment_4'],'',this.formData['voucher_id_configuration']['voucher_auto_increment_length'],this.formData['voucher_id_configuration']['voucher_code_separator']);
      if(field=="rdo_is_branch_auto_code_need"){
        if(value == true){
          this.schema['branch_id_configuration']['branch_code_length']['isShow'] = true;
          this.is_show_sample_code['branch_id_configuration'] = true;
        }else{
          this.schema['branch_id_configuration']['branch_code_length']['isShow'] = false;
          this.is_show_sample_code['branch_id_configuration'] = false;
        }
      }

      if(field=="rdo_is_samity_auto_code_need"){
        if(value == true){
          this.schema['samity_id_configuration']['samity_code_segment_1']['isShow'] = true;
          this.schema['samity_id_configuration']['samity_code_segment_2']['isShow'] = true;
          this.schema['samity_id_configuration']['samity_code_length']['isShow'] = true;
          this.schema['samity_id_configuration']['samity_code_separator']['isShow'] = true;
          this.schema['samity_id_configuration']['samity_code_segment_1']['options'] = this.segment_options;
          this.schema['samity_id_configuration']['samity_code_segment_2']['options'] = this.segment_options;
          this.is_show_sample_code['samity_id_configuration'] = true;
        }else{
          this.schema['samity_id_configuration']['samity_code_segment_1']['isShow'] = false;
          this.schema['samity_id_configuration']['samity_code_segment_2']['isShow'] = false;
          this.schema['samity_id_configuration']['samity_code_length']['isShow'] = false;
          this.schema['samity_id_configuration']['samity_code_separator']['isShow'] = false;
          this.is_show_sample_code['samity_id_configuration'] = false;
        }
      }

      if(field=="rdo_is_member_auto_code_need"){
        if(value == true){
          this.schema['member_id_configuration']['member_code_segment_1']['isShow'] = true;
          this.schema['member_id_configuration']['member_code_segment_2']['isShow'] = true;
          this.schema['member_id_configuration']['member_code_segment_3']['isShow'] = true;
          this.schema['member_id_configuration']['member_code_segment_4']['isShow'] = true;
          this.schema['member_id_configuration']['member_code_segment_5']['isShow'] = true;
          this.schema['member_id_configuration']['member_code_length']['isShow'] = true;
          this.schema['member_id_configuration']['cbo_auto_increament_option']['isShow'] = true;
          this.schema['member_id_configuration']['member_code_separator']['isShow'] = true;
          this.schema['member_id_configuration']['closed_member_code_reusable']['isShow'] = true;
          this.schema['member_id_configuration']['member_code_segment_1']['options'] = this.member_segment_options;
          this.schema['member_id_configuration']['member_code_segment_2']['options'] = this.member_segment_options;
          this.schema['member_id_configuration']['member_code_segment_3']['options'] = this.member_segment_options;
          this.schema['member_id_configuration']['member_code_segment_4']['options'] = this.member_segment_options;
          this.schema['member_id_configuration']['member_code_segment_5']['options'] = this.member_segment_options;
          this.schema['member_id_configuration']['cbo_auto_increament_option']['options'] = this.auto_increament_options;
          this.schema['member_id_configuration']['closed_member_code_reusable']['options'] = {1:'Yes', 0:'No'};
          this.is_show_sample_code['member_id_configuration'] = true;
        }else{
          this.schema['member_id_configuration']['member_code_segment_1']['isShow'] = false;
          this.schema['member_id_configuration']['member_code_segment_2']['isShow'] = false;
          this.schema['member_id_configuration']['member_code_segment_3']['isShow'] = false;
          this.schema['member_id_configuration']['member_code_segment_4']['isShow'] = false;
          this.schema['member_id_configuration']['member_code_segment_5']['isShow'] = false;
          this.schema['member_id_configuration']['member_code_length']['isShow'] = false;
          this.schema['member_id_configuration']['cbo_auto_increament_option']['isShow'] = false;
          this.schema['member_id_configuration']['member_code_separator']['isShow'] = false;
          this.schema['member_id_configuration']['closed_member_code_reusable']['isShow'] = false;
          this.is_show_sample_code['member_id_configuration'] = false;
        }
      }

      if(field=="rdo_is_savings_auto_code_need"){
        if(value == true){
          this.schema['savings_id_configuration']['savings_code_segment_1']['isShow'] = true;
          this.schema['savings_id_configuration']['savings_code_segment_2']['isShow'] = true;
          this.schema['savings_id_configuration']['savings_code_segment_3']['isShow'] = true;
          this.schema['savings_id_configuration']['savings_code_segment_4']['isShow'] = true;
          this.schema['savings_id_configuration']['savings_code_separator']['isShow'] = true;
          this.schema['savings_id_configuration']['savings_code_segment_1']['options'] = this.savings_segment_options;
          this.schema['savings_id_configuration']['savings_code_segment_2']['options'] = this.savings_segment_options;
          this.schema['savings_id_configuration']['savings_code_segment_3']['options'] = this.savings_segment_options;
          this.schema['savings_id_configuration']['savings_code_segment_4']['options'] = this.savings_segment_options;
          this.is_show_sample_code['savings_id_configuration'] = true;
        }else{
          this.schema['savings_id_configuration']['savings_code_segment_1']['isShow'] = false;
          this.schema['savings_id_configuration']['savings_code_segment_2']['isShow'] = false;
          this.schema['savings_id_configuration']['savings_code_segment_3']['isShow'] = false;
          this.schema['savings_id_configuration']['savings_code_segment_4']['isShow'] = false;
          this.schema['savings_id_configuration']['savings_code_separator']['isShow'] = false;
          this.is_show_sample_code['savings_id_configuration'] = false;
        }
      }

      if(field=="rdo_is_loan_auto_code_need"){
        if(value == true){
          this.schema['loan_id_configuration']['loan_code_segment_1']['isShow'] = true;
          this.schema['loan_id_configuration']['loan_code_segment_2']['isShow'] = true;
          this.schema['loan_id_configuration']['loan_code_segment_3']['isShow'] = true;
          this.schema['loan_id_configuration']['loan_code_segment_4']['isShow'] = true;
          this.schema['loan_id_configuration']['loan_code_segment_5']['isShow'] = true;
          this.schema['loan_id_configuration']['loan_cyle_option']['isShow'] = true;
          this.schema['loan_id_configuration']['loan_code_separator']['isShow'] = true;
          this.schema['loan_id_configuration']['loan_code_segment_1']['options'] = this.loan_segment_options;
          this.schema['loan_id_configuration']['loan_code_segment_2']['options'] = this.loan_segment_options;
          this.schema['loan_id_configuration']['loan_code_segment_3']['options'] = this.loan_segment_options;
          this.schema['loan_id_configuration']['loan_code_segment_4']['options'] = this.loan_segment_options;
          this.schema['loan_id_configuration']['loan_code_segment_5']['options'] = this.loan_segment_options;
          this.schema['loan_id_configuration']['loan_cyle_option']['options'] = this.loan_cycle_option;
          this.is_show_sample_code['loan_id_configuration'] = true;
        }else{
          this.schema['loan_id_configuration']['loan_code_segment_1']['isShow'] = false;
          this.schema['loan_id_configuration']['loan_code_segment_2']['isShow'] = false;
          this.schema['loan_id_configuration']['loan_code_segment_3']['isShow'] = false;
          this.schema['loan_id_configuration']['loan_code_segment_4']['isShow'] = false;
          this.schema['loan_id_configuration']['loan_code_segment_5']['isShow'] = false;
          this.schema['loan_id_configuration']['loan_cyle_option']['isShow'] = false;
          this.schema['loan_id_configuration']['loan_code_separator']['isShow'] = false;
          this.is_show_sample_code['loan_id_configuration'] = false;
        }
      }

      if(field=="rdo_is_employee_auto_code_need"){
        if(value == true){
          this.schema['employee_id_configuration']['employee_code_length']['isShow'] = true;
          this.is_show_sample_code['employee_id_configuration'] = true;
        }else{
          this.schema['employee_id_configuration']['employee_code_length']['isShow'] = false;
          this.is_show_sample_code['employee_id_configuration'] = false;
        }
      }

      if(field=="rdo_is_voucher_auto_code_need"){
        if(value == true){
          this.schema['voucher_id_configuration']['txt_payment_voucher_prefix']['isShow'] = true;
          this.schema['voucher_id_configuration']['txt_receipt_voucher_prefix']['isShow'] = true;
          this.schema['voucher_id_configuration']['txt_journal_voucher_prefix']['isShow'] = true;
          this.schema['voucher_id_configuration']['txt_contra_voucher_prefix']['isShow'] = true;
          this.schema['voucher_id_configuration']['txt_fund_transfer_voucher_prefix']['isShow'] = true;
          this.schema['voucher_id_configuration']['voucher_code_segment_1']['isShow'] = true;
          this.schema['voucher_id_configuration']['voucher_code_segment_2']['isShow'] = true;
          this.schema['voucher_id_configuration']['voucher_code_segment_3']['isShow'] = true;
          this.schema['voucher_id_configuration']['voucher_code_segment_4']['isShow'] = true;
          this.schema['voucher_id_configuration']['voucher_auto_increment_length']['isShow'] = true;
          this.schema['voucher_id_configuration']['voucher_code_separator']['isShow'] = true;
          this.schema['voucher_id_configuration']['voucher_code_segment_1']['options'] = this.voucher_segment_options;
          this.schema['voucher_id_configuration']['voucher_code_segment_2']['options'] = this.voucher_segment_options;
          this.schema['voucher_id_configuration']['voucher_code_segment_3']['options'] = this.voucher_segment_options;
          this.schema['voucher_id_configuration']['voucher_code_segment_4']['options'] = this.voucher_segment_options;
          this.is_show_sample_code['voucher_id_configuration'] = true;
        }else{
          this.schema['voucher_id_configuration']['txt_payment_voucher_prefix']['isShow'] = false;
          this.schema['voucher_id_configuration']['txt_receipt_voucher_prefix']['isShow'] = false;
          this.schema['voucher_id_configuration']['txt_journal_voucher_prefix']['isShow'] = false;
          this.schema['voucher_id_configuration']['txt_contra_voucher_prefix']['isShow'] = false;
          this.schema['voucher_id_configuration']['txt_fund_transfer_voucher_prefix']['isShow'] = false;
          this.schema['voucher_id_configuration']['voucher_code_segment_1']['isShow'] = false;
          this.schema['voucher_id_configuration']['voucher_code_segment_2']['isShow'] = false;
          this.schema['voucher_id_configuration']['voucher_code_segment_3']['isShow'] = false;
          this.schema['voucher_id_configuration']['voucher_code_segment_4']['isShow'] = false;
          this.schema['voucher_id_configuration']['voucher_auto_increment_length']['isShow'] = false;
          this.schema['voucher_id_configuration']['voucher_code_separator']['isShow'] = false;
          this.is_show_sample_code['voucher_id_configuration'] = false;
        }
      }

    },

    // GENERATE SAMPLE CODE
    generate_sample_code(tab,segment_1,segment_2,segment_3,segment_4,segment_5,auto_increment_length,separator)
    {
        let sample_code = '';
        const sample_code_array= {};

        sample_code_array['branch_code'] = '[BC]';
        sample_code_array['samity_code'] = '[SC]';
        sample_code_array['loan_product_code'] = '[PC]';
        sample_code_array['loan_product_short_name'] = '[PSN]';
        sample_code_array['primary_product_category_short_name'] = '[PCSN]';
        sample_code_array['funding_org_short_name'] = '[FO]';
        sample_code_array['savings_product_code'] = '[PC]';
        sample_code_array['savings_product_short_name'] = '[PSN]';
        sample_code_array['member_code'] = '[MC]';
        sample_code_array['cycle'] = '[1]';
        sample_code_array['admission_year'] = '[YYYY]';
        sample_code_array['samity_group_code'] = '[SGC]';
        sample_code_array['voucher_year_and_month'] = '[YYYYMM]';
        sample_code_array['admission_month'] = '[MM]';
        sample_code_array['voucher_code_prefix'] = '[VCP]';
        sample_code_array['fund_code'] = '[FC]';

        const segment_array = [];
        if(segment_1 != '')
        {
            segment_array.push(segment_1);
        }
        if(segment_2 != '')
        {
            segment_array.push(segment_2);
        }
        if(segment_3 != '')
        {
            segment_array.push(segment_3);
        }
        if(segment_4 != '')
        {
            segment_array.push(segment_4);
        }
        if(segment_5 != '')
        {
            segment_array.push(segment_5);
        }


      if(segment_array.length > 0){
          for(let i=0 ; i < segment_array.length; i++){
              if(segment_array[i] in sample_code_array){
                    sample_code += sample_code_array[segment_array[i]] + separator;
              }
          }
      }

        if(separator != ''){
            sample_code = sample_code.slice(0, -1);
        }

        let auto_increment_code = '';
        if(auto_increment_length != ''){
            let zeros = '';
            let ones = '';
            for(let i = 0; i < auto_increment_length - 1; i++)
                {
                    zeros += '0';
                }
                if(auto_increment_length > 0){
                    ones += '1'
                }
            auto_increment_code = zeros + ones;
        }

        if (sample_code != '' && auto_increment_code !=''){
            sample_code = sample_code +separator + '[' + auto_increment_code + ']';
        }
        if (sample_code == '' && auto_increment_code !=''){
            sample_code = '[' + auto_increment_code + ']';
        }

      this.sample_code[tab] = sample_code;
    }

  }


}
