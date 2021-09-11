import API from "@/shared/common/API.js"
import CommonIndex from '@/containers/CommonIndex';
import CustomModal from '@/containers/Modal';
import Pagination from '@/containers/Pagination';
import swal from 'sweetalert2';
import {ROW_PER_PAGE} from '@/shared/common/config'

var manageUserAPI = new API()
manageUserAPI.createEntity({name: "users"});
export default {
  components:
    {
      CommonIndex,
      CustomModal,
      Pagination,
      swal,
    },
  data() {
    return {
      user: {},

      search_form_data: {
        name: "",
        select_role: '',
        select_status: '',
        select_language: '',
        select_branch: ''
      },
      combo_data: {
        language_info: [],
        status_info: [],
        user_roles: [],
        user_branches: []
      },
      index_data: {
        user_info: [],
      },
      delete_info: [{
        url: '/ams-auth-api/users/',
        field_id: 'user_id',
        html: '',
        source: 'service'
      }],

      user_role_options: [],
      employee_list: [],
      login: "",
      total_rows: 0,
      current_page: 1,
      total_page: 1,
      offset: 0,
      isModalVisible: false,
      is_head_office: false,
      login_user_role_id: '',
      role_list: [],
      user_locked: [],
      is_lock_modal_visible: 0,
      unlock_user_id: 0,
      component_address: 'admin/manage_user/Save',
      title: 'Add User',
      edit_id: '',

      head_information: []

    };
  },
  mounted() {
    this.user = this.$store.getters['auth/userInfo'];
    this.login_user_role_id = this.user.role_id;
    /*this.$axios.post("/users/index")
        .then(response => {
            //console.log(esponse.data.status_info)
            this.combo_data.language_info = response.data.language_info;
            this.combo_data.status_info = response.data.status_info;
            //this.combo_data.user_roles = response.data.user_roles;
            this.combo_data.user_branches = response.data.user_branches;
            //this.role_list = response.data.role_list;
            this.loadData(0);
        });*/
    this.$http_service.get("/ams-auth-api/roles/")
      .then(res => {
        let parent_list = res.data._embedded.roleList;
        if (parent_list) {
          for (let key in parent_list) {
            this.combo_data.user_roles[parent_list[key].role_id] = parent_list[key].role_name;
            this.role_list[parent_list[key].role_id] = parent_list[key].role_id;
          }
        }
      });

    this.loadData(0);
  },
  methods: {
    loadData: function (offset = 0) {
      let branch_id = this.search_form_data.select_branch;
      if (this.user["is_head_office"] != 1) {
        branch_id = this.user["branch_id"];
      }
      const params = {
        size: ROW_PER_PAGE,
        page: offset / ROW_PER_PAGE,
        name: this.search_form_data.name,
        role_id: this.search_form_data.select_role,
        status: this.search_form_data.select_status,
        language: this.search_form_data.select_language,
        branch_id: branch_id,
      };
      this.$http_service.get("/ams-auth-api/users", {
        params: params
      }).then(response => {
        this.index_data.user_info = response.data._embedded != undefined ? response.data._embedded.userList : [];
        this.total_rows = response.data.page.totalElements;
        this.offset = response.data.page.size * response.data.page.number;
        for (var i = 0; i < this.index_data.user_info.length; i++) {
          if (this.index_data.user_info[i].currentStatus == "active") {
            this.index_data.user_info[i]["status"] = 1;
          } else if (this.index_data.user_info[i].currentStatus == "inactive") {
            this.index_data.user_info[i]["status"] = 0;
          } else if (this.index_data.user_info[i].currentStatus == "deleted") {
            this.index_data.user_info[i]["status"] = 2;
          }
          this.index_data.user_info[i]["defaultBranchId"] = this.getBranchName(this.index_data.user_info[i].defaultBranchId);
          this.index_data.user_info[i]["roleId"] = this.combo_data.user_roles[this.index_data.user_info[i].roleId];

          if (this.login_user_role_id == 1 && this.index_data.user_info[i].is_deleted == 1) {
            this.index_data.user_info[i]["edit"] = 1;
            this.index_data.user_info[i]["delete"] = 1;
          } else if (this.index_data.user_info[i].is_deleted != 1) {
            this.index_data.user_info[i]["edit"] = 1;
            this.index_data.user_info[i]["delete"] = 1;
          }

          if (typeof this.user_locked[this.index_data.user_info[i].id] != 'undefined') {
            this.index_data.user_info[i]["locked"] = 1;
          }
        }

        this.head_information = [
          {key: 'index', label: '#', sortable: false},
          {key: 'login', label: this.$t('user') + " " + this.$t('login'), sortable: false},
          {key: 'fullName', label: this.$t('full') + " " + this.$t('name'), sortable: false},
          {key: 'roleId', label: this.$t('user') + " " + this.$t('roles'), sortable: true},
          //{key: 'defaultBranchId', label: this.$t('users_branch'), sortable: true},
          {key: 'status', label: this.$t('current') + " " + this.$t('status'), sortable: true},
          {key: 'defaultLanguage', label: this.$t('user') + " " + this.$t('language'), sortable: true},
          {
            key: 'last_password_changed',
            label: this.$t('pass') + " " + this.$t('reset'),
            sortable: true,
            tdClass: "text-center"
          },
          {key: 'actions', label: this.$t('actions'), align: 'center', sortable: false},
        ]
      });
    },

    getFormData: function () {
      this.search_form_data.name = this.search_form_data.name != '' && this.search_form_data.name != null ? this.search_form_data.name : '';
      this.search_form_data.select_role = this.search_form_data.select_role != '' && this.search_form_data.select_role != null ? this.search_form_data.select_role : '';
      this.search_form_data.select_status = this.search_form_data.select_status != '' && this.search_form_data.select_status != null ? this.search_form_data.select_status : '';
      this.search_form_data.select_language = this.search_form_data.select_language != '' && this.search_form_data.select_language != null ? this.search_form_data.select_language : '';
      this.loadData(0);
    },
    openAddModal: function () {
      this.edit_id = '';
      this.title = this.$t("user") + " " + this.$t("add");
      this.isModalVisible = 1;
    },

    editUser: function (userdata) {
      this.edit_id = (userdata.id).toString();
      this.title = this.$t("user") + " " + this.$t("edit");
      this.isModalVisible = 1;
    },
    openUnlockModal: function (userdata) {
      this.unlock_user_id = userdata.id;

      swal({
        title: 'Sure to unlock this user?',
        text: "",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          const formData = new FormData();
          formData.append("id", this.unlock_user_id);
          this.$axios
            .post("/users/unlock", formData)
            .then(response => {
              //console.log(response.data.status);
              if (response.data.status == "success") {
                swal(
                  'Success',
                  'User has been unlocked successfully',
                  'success'
                )
                this.loadData(this.offset);
              } else {
                swal(
                  'Failed',
                  'Cannot unlock this user',
                  'error'
                )
              }

            })

        }
      })
    },
    closeModal: function (is_load_data) {
      this.isModalVisible = 0;
      //this.$router.go();
      this.loadData(0);
    },
    handleReset: function () {
      this.search_form_data = {
        name: "",
        select_role: "",
        select_status: "",
        select_language: "",
        select_branch: ""
      };
      this.loadData(0);
    },

    getBranchName: function (id) {
      let branchName = "";
      for (let branch in this.combo_data.user_branches) {
        if (this.combo_data.user_branches[branch].branch_id == id) {
          branchName = this.combo_data.user_branches[branch].branch_name;
          break
        }
      }
      return branchName
    }

  }
};
