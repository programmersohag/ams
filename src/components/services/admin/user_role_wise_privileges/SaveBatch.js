import loading from 'vue-full-loading';
import StorageService from "@/shared/common/storage.service";

export default {
  name: "forms",
  components: {loading},
  data() {
    return {
      roleId: this.$route.params.role_id,
      loading_show:false,
      resourceData:[],
      policyData:[],
      resourcePolicyData:{},
      isLoad:false
    };
  },
  mounted() {
      this.loadData();
  },
  methods: {
    loadData: function(){
        this.loading_show = true;
        this.$http_service.get("/ams-auth-api/authorizations/resources/")
            .then(res => {
                if(res.data.code == "200") {
                    this.resourceData = res.data.resources;
                }
        }).then(() => {
            this.$http_service.get("/ams-auth-api/authorizations/policies?role_id="+this.roleId)
            .then(res => {
                if(res.data.code == "200") {
                    this.policyData = res.data.policyRuleModels;
                }
                this.getMergeData();
                this.loading_show = false;
            })
        });
    },
    getMergeData: function(){
        let dPermission = this.getGlobalDisallowedPermission();
        //console.log("ssss", dPermission)
        let hPolicyData = [];
        let actionList = [];
        let isCheck = false;
        if(this.policyData.length > 0) {
            for(let key in this.policyData) {
                hPolicyData[this.policyData[key]['action']] = this.policyData[key]['action'];
            }
        }
        if(this.resourceData.length > 0) {
            for(let key in this.resourceData) {
                let _id = this.resourceData[key]['id'];
                let _action = this.resourceData[key]['action'];
                let _name = this.resourceData[key]['name'];
                let _subgroupName = this.resourceData[key]['subgroupName'];
                let _groupName = this.resourceData[key]['groupName'];
                let _actionType = this.resourceData[key]['actionType'];
                if(!dPermission.includes(_action)) {
                    if(!this.resourcePolicyData[_groupName]) {
                        this.resourcePolicyData[_groupName] = {};
                    }
                    if(!this.resourcePolicyData[_groupName][_subgroupName]) {
                        this.resourcePolicyData[_groupName][_subgroupName] = {};
                    }
                    if(!this.resourcePolicyData[_groupName][_subgroupName][_name]) {
                        this.resourcePolicyData[_groupName][_subgroupName][_name] = {};
                    }
                    if(!this.resourcePolicyData[_groupName][_subgroupName][_name][_actionType]) {
                        this.resourcePolicyData[_groupName][_subgroupName][_name][_actionType] = {};
                        actionList = [];
                        isCheck = false;
                    }
                    actionList.push({
                        action:_action
                    });
                    isCheck = actionList.find(ac => ac.action === hPolicyData[ac.action]);
                    this.resourcePolicyData[_groupName][_subgroupName][_name][_actionType] = {
                            id: _id,
                            groupName:_groupName,
                            subgroupName:_subgroupName,
                            action:_action,
                            name:_name,
                            isCheck:(isCheck == undefined) ? false : true,
                            actionType:_actionType,
                            actionList:actionList
                        };
                }
            }
        }
        this.isLoad = true;
    },
    getGlobalDisallowedPermission: function() {
        //let config = this.$store.getters['config/generalConfigInfo'];
        let config = StorageService.getGeneralConfig();
        let user = this.$store.getters['auth/userInfo'];
        let permission = [];
        let admin_action_privilege = (config['admin_action_privilege'] != undefined && config['admin_action_privilege']) ? true : false;
        if(!(user['login'] == "admin" && admin_action_privilege)) {
            permission.push('admin_panels_index');
            permission.push('process_day_ends_admin_day_end_process_within_period');
            permission.push('process_month_ends_admin_month_end_process_within_period');
        }

        let rearrange_member_code= (config['rearrange_member_code'] != undefined && config['rearrange_member_code'] == 1) ? true : false;
        if (!rearrange_member_code ) {
            permission.push('member_code_changes_index');
        }

        let is_sms_service_active= (config['is_sms_service_active'] != undefined && config['is_sms_service_active']) ? true : false;
        if (!is_sms_service_active) {
            permission.push('sms_service_configs_index');
            permission.push('sms_service_configs_view');
            permission.push('sms_service_configs_sms_service_configuration');
            permission.push('sms_alert_services_add');
            permission.push('sms_alert_services_index');
            permission.push('sms_alert_services_send_sms');
            permission.push('sms_reports_index');
            permission.push('sms_reports_purpose_wise_sms_number');
        }

        let is_loan_proposal_form_mandatory= (config['is_loan_proposal_form_mandatory'] != undefined && config['is_loan_proposal_form_mandatory']) ? true : false;
        if(!is_loan_proposal_form_mandatory) {
            permission.push('loan_proposal_forms_index');
            permission.push('loan_proposal_forms_view');
            permission.push('loan_proposal_forms_get_loan_product_details');
            permission.push('loan_proposal_forms_see_amendment');
            permission.push('loan_proposal_forms_print_amendment');
            permission.push('loan_proposal_forms_add');
            permission.push('loan_proposal_forms_is_regular_or_one_time');
            permission.push('loan_proposal_forms_edit');
            permission.push('loan_proposal_forms_delete');
            permission.push('loan_proposal_forms_delete_for_different_user');
            permission.push('loan_proposal_forms_reject');
            permission.push('loan_proposal_forms_unreject');
            permission.push('loan_proposal_forms_approved');
        }

        let is_extra_service_charge_allowed_overdue_loanee = (config['is_extra_service_charge_allowed_overdue_loanee'] != undefined && config['is_extra_service_charge_allowed_overdue_loanee']) ? true : false;
        if(!is_extra_service_charge_allowed_overdue_loanee) {
            permission.push('overdue_loan_extra_service_charges_index');
            permission.push('overdue_loan_extra_service_charges_add');
            permission.push('overdue_loan_extra_service_charges_delete');
        }

        let is_o_o_loan_auto_process_enable = (config['is_o_o_loan_auto_process_enable'] != undefined && config['is_o_o_loan_auto_process_enable'] == 1) ? true : false;
        if(!is_o_o_loan_auto_process_enable) {
            permission.push('onetime_loan_auto_process_auto_process');
            permission.push('onetime_loan_auto_process_auto_process_save');
        }
        let show_carb_collection_sheet = (config['show_carb_collection_sheet'] != undefined && config['show_carb_collection_sheet'] == 1) ? true : false;
        if(!show_carb_collection_sheet) {
            permission.push('carb_collection_sheets_index');
            permission.push('carb_collection_sheets_ajax_generate_carb_collection_sheet');
        }

        let is_show_achievement_report = (config['is_show_achievement_report'] != undefined && config['is_show_achievement_report'] == 1) ? true : false;
        if(!is_show_achievement_report) {
            permission.push('progress_reports_index');
            permission.push('progress_reports_ajax_for_progress_reports');
        }

        let show_monthly_target_achievement_report = (config['show_monthly_target_achievement_report'] != undefined && config['show_monthly_target_achievement_report'] == 1) ? true : false;
        if(!show_monthly_target_achievement_report) {
            permission.push('target_achievement_reports_index');
            permission.push('target_achievement_reports_ajax_for_generate_reports');
        }

        let show_peridoical_mis_ais_report = (config['show_peridoical_mis_ais_report'] != undefined && config['show_peridoical_mis_ais_report'] == 1) ? true : false;
        if(!show_peridoical_mis_ais_report) {
            permission.push('periodical_mis_ais_progress_reports_index');
            permission.push('periodical_mis_ais_progress_reports_ajax_for_generate_report');
        }

        let show_client_location_report = (config['show_client_location_report'] != undefined && config['show_client_location_report'] == 1) ? true : false;
        if(!show_client_location_report) {
            permission.push('client_location_reports_index');
            permission.push('client_location_reports_ajax_for_generate_report');
        }

        let show_individual_loan_data_report = (config['show_individual_loan_data_report'] != undefined && config['show_individual_loan_data_report'] == 1) ? true : false;
        if(!show_individual_loan_data_report) {
            permission.push('individual_loan_data_reports_index');
            permission.push('individual_loan_data_reports_ajax_for_generate_report');
        }

        let show_at_a_glance_monthly_monitoring_report = (config['show_at_a_glance_monthly_monitoring_report'] != undefined && config['show_at_a_glance_monthly_monitoring_report'] == 1) ? true : false;
        if(!show_at_a_glance_monthly_monitoring_report) {
            permission.push('monthly_monitoring_reports_index');
            permission.push('monthly_monitoring_reports_ajax_for_generate_report');
        }

        let show_daily_monitoring_report = (config['show_daily_monitoring_report'] != undefined && config['show_daily_monitoring_report'] == 1) ? true : false;
        if(!show_daily_monitoring_report) {
            permission.push('daily_monitoring_reports_index');
            permission.push('daily_monitoring_reports_ajax_for_generate_report');
        }
        return permission;
    },
    checkAll: function(e, actionType) {
        if(Object.keys(this.resourcePolicyData).length > 0) {
            this.isLoad = false;
            for(let key in this.resourcePolicyData) {
                for(let key1 in this.resourcePolicyData[key]) {
                    this.checkSubgroupAll(e, key, key1, actionType);
                }
            }
        }
        this.isLoad = true;
    },
    checkSubgroupAll: function(e, key, key1, actionType) {
        let subGroup = this.resourcePolicyData[key][key1];
        if(Object.keys(subGroup).length > 0) {
            this.isLoad = false;
            for(let key2 in subGroup) {
                this.checkActionType(e, key, key1, key2, actionType);
            }
        }
        this.isLoad = true;
    },
    checkActionType: function(e, key, key1, key2, actionType){
        let name = this.resourcePolicyData[key][key1][key2];
        let actionKey = name[actionType];
        if(actionKey != undefined) {
            if(e) {
                actionKey["isCheck"] = true;
            } else {
                actionKey["isCheck"] = false;
            }
        }
    },
    handleSubmit() {
        let userRolePrivilegeData = [];
        if(Object.keys(this.resourcePolicyData).length > 0) {
            for(let key in this.resourcePolicyData) {
                for(let key1 in this.resourcePolicyData[key]) {
                    for(let key2 in this.resourcePolicyData[key][key1]) {
                        for(let key3 in this.resourcePolicyData[key][key1][key2]) {
                            let actionKey =  this.resourcePolicyData[key][key1][key2][key3];
                            let actionList = actionKey["actionList"];
                            let len = actionList.length;
                            if(actionKey["isCheck"] && len > 0) {
                                for(let listKey in actionList) {
                                    userRolePrivilegeData.push(actionList[listKey])
                                }
                            }
                        }
                    }
                }
            }
        }
        //console.log("userRolePrivilegeData", userRolePrivilegeData);return;
        let params = {};
        params["role_id"]  = this.roleId;
        params["privileges"]  = userRolePrivilegeData;
        if(userRolePrivilegeData.length > 0) {
            this.loading_show = true;
            this.$http_service.post("/ams-auth-api/authorizations/", JSON.stringify(params))
            .then(res => {
                if(res.data.code == 201) {
                    this.flashMessage("success",res.data.message);
                    this.$router.push('/admin/user-roles/index');
                    if(this.$store.getters['auth/userInfo']['role_id'] == this.roleId) {
                        //this.$store.dispatch('config/getGeneralConfig');
                        this.$store.dispatch("users/getPolicy");
                    }
                } else {
                    this.flashMessage("failure",res.data.message);
                }
                this.loading_show = false;
            });
        }
    },
    handleReset: function() {
       this.loadData();
    }
  }
};
