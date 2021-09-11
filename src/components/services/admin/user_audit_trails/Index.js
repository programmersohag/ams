import API from "@/shared/common/API.js";
import CustomModal from '@/containers/Modal';
import DatePicker from '@/containers/DatePicker.vue';
import CommonIndex from '@/containers/CommonIndex';
import Pagination from '@/containers/Pagination';
var RequestAPI = new API();
RequestAPI.createEntity({name: "user_audit_trails"});
export default {
    name: "UserAuditTrailsIndex",
    components: {DatePicker, CustomModal, CommonIndex, Pagination},
    data() {
        return {
            userAuditTrails: [],
            //pagination
            total_rows: 0,
            row_per_page: 25,
            offset: 0,
            // modal
            viewInfo:{
                id: '',
                isModalVisible: false,
                component_address: "admin/user_audit_trails/View",
                title:""
            },
           
            user_data: [],
            Branch_list: [],
            branchData:[],
            user_list: [{
                text: 'Select User',
                value: ''
            }],
            action_info: [],
            tables_options: [],
            search:{
                cbo_entity: -1,
                cbo_action: -1,
                cbo_user: '',
                cbo_branch: '',
                date_to: '',
                date_from: ''
            },
            cbo_entity: -1,
            cbo_user: '',
            cbo_action: -1,
            tables: [],
            userbranch: '',
            cbo_branch: '',
            is_head_office: '',
            date_from: '',
            date_to: '',

            //common index
            head_information: [
                {
                    key: "index", label_name: '#', sortable: false
                },
                {
                    key: "timeStamp", label_name: this.$t("time_stamp"), sortable: true
                },
                {
                    key: "user", label_name: this.$t("user"), sortable: false
                },
                {
                    key: "branch", label_name: this.$t("branch"), sortable: false
                },
                {
                    key: "ipAddress", label_name: 'IP Address', sortable: false
                },
                {
                    key: "entity", label_name: 'Entity', sortable: false
                },
                {
                    key: "action", label_name: 'User Action', sortable: false
                },
                {
                    key: "actions", label_name: 'ACTION', sortable: false
                }
            ]
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        viewModal(itemdata) {
            this.viewInfo.title = 'User Audit Trial view';
            this.viewInfo.id = itemdata._id;
            this.viewInfo.isModalVisible = true;
        },
        closeModal() {
            this.viewInfo.isModalVisible = false;
            this.loadData();
        },
        getData(offset = 0) {
            var self = this;
            self.offset = offset;
            var params = {limit: self.row_per_page, offset: self.offset};
            params['branchId'] = self.search.cbo_branch;
            params['userId'] = self.search.cbo_user;
            params['actionType'] = self.search.cbo_action;
            params['entity'] = self.search.cbo_entity;
            params['fromDate'] = self.search.date_from;
            params['toDate'] = self.search.date_to;

            this.$http_uat_service.get("/api/user-audit-trials", {params})
            .then(resp => {
                if(resp && resp.status == 200){
                    console.log("resss", resp.data)
                    this.total_rows = resp.data.total;
                    let userAuditTrails = resp.data.results;
                    this.userAuditTrails = userAuditTrails;
                    if(userAuditTrails.length > 0){
                        for(let key in userAuditTrails) {
                            let timeStamp = self.user_data[userAuditTrails[key]['timeStamp']];
                            console.log("timeStamp", timeStamp)
                            this.userAuditTrails[key]["timeStamp"] = self.$moment(timeStamp).format('h:m A');
                            this.userAuditTrails[key]["user"] = self.user_data[userAuditTrails[key]['userId']];
                            this.userAuditTrails[key]["branch"]= self.branchData[userAuditTrails[key]['branchId']];
                            this.userAuditTrails[key]["entity"] = this.get_formated_table_name(userAuditTrails[key]['tableName'])
                            
                            this.userAuditTrails[key]["view"] = true;
                        }
                    }
                   
                }
            })
        },
        getUserlist: function(userList) {
            if(userList.length > 0) {
                for (var key in userList) {
                    this.user_list.push({
                        text: userList[key].full_name,
                        value: userList[key].id
                    });
                    this.user_data[userList[key].id] = userList[key].full_name;
                }
            }
        },
        getTableList: function(dbName, tables){
            this.tables_options.push({
                text: 'Select Entity',
                value: -1
            });
            for (var i in tables) {
                this.tables_options.push({
                    value: tables[i]["Tables_in_" + dbName],
                    text: this.get_formated_table_name(tables[i]["Tables_in_" + dbName])
                });
            }
        },
        getBranchList: function(branchList){
            this.Branch_list.push({
                text: 'Select Branch',
                value: ''
            });
            if (branchList) {
                for (var key in branchList) {
                    this.Branch_list.push({
                        text: branchList[key].code + "-" + branchList[key].name,
                        value: branchList[key].id
                    });
                    this.branchData[branchList[key].id] = branchList[key].code + "-" + branchList[key].name;
                }
            }
        },
        loadData: function () {
            let self = this;
            RequestAPI.endpoints.user_audit_trails.getRequest("index").then(function (resp) {
                if(resp && resp.status == 200) {
                    return resp.data;
                }
            }).then(function(data) {
                if(data) {
                    self.getUserlist(data.user_lists);
                    self.action_info = data.action_info;
                    self.getTableList(data.db_name, data.tables);
                    self.getBranchList(data.user_branches);
                    self.getData();
                }
            });
        },
        getSearch: function () {
            this.current_page = 1;
            this.getData(0);
        },
        get_formated_table_name: function (table_name) {
            var tmp = table_name.split("_");
            switch (tmp[0]) {
                case 'po':
                    tmp[0] = "Organization:";
                    break;
                case 'acc':
                    tmp[0] = "Accounting:";
                    break;
                case 'config':
                    tmp[0] = "Configuration:";
                    break;
                case 'user':
                    tmp[0] = "Security: " + tmp[0];
                    break;
                case 'users':
                    tmp[0] = "Security: " + tmp[0];
                    break;
                default:
                    tmp[0] = tmp[0].charAt(0).toUpperCase() + tmp[0].slice(1);
                    break;
            }
            var str = tmp.join(" ");
            return str;
        },
        handleReset: function() {
            this.search={
                cbo_entity: -1,
                cbo_action: -1,
                cbo_user: '',
                cbo_branch: '',
                date_to: '',
                date_from: ''};
           // this.$set(this.search_form_data,"txt_date_to",this.current_date);
            this.loadData();
        }

    },
    computed: {
        isSearch: function () {
            if (this.txt_name) {
                return false
            }
            if (this.cbo_samity) {
                return false
            }
            return true
        }
    }
}
