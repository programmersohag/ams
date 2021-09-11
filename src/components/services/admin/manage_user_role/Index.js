import router from "@/router/index.js";
import API from "@/shared/common/API.js";
import CustomModal from '@/containers/Modal';
import Swal from 'sweetalert2';
import loading from 'vue-full-loading';
import Pagination from '@/containers/Pagination';
import {ROW_PER_PAGE} from '@/shared/common/config'

var userRoleAPI = new API();
userRoleAPI.createEntity({name: "user_roles"});

var userRolePrivilegeAPI = new API();
userRolePrivilegeAPI.createEntity({name: "user_role_wise_privileges"});

export default {
  name: "userRole",
  components: {CustomModal, Swal, loading, Pagination},
  data() {
    return {
      userRoles: {},
      // modal parameter
      isModalVisible: false,
      loading_show: false,
      role_id: '',
      edit_data: {},
      title: '',
      component_address: "admin/manage_user_role/Save",
      total_rows: 0,
      user: {},
    };
  },
  mounted: function () {
    this.user = this.$store.getters['auth/userInfo'];
    this.loadData();
  },
  methods: {
    customModal(item) {
      this.edit_data = {};
      if (item.id > 0) {
        this.edit_data = item;
        this.title = this.$t('user_role_edit');
      } else {
        this.title = this.$t('user_role_add');
      }

      this.isModalVisible = true;
    },
    closeModal(load_data) {
      this.isModalVisible = false;
      this.loadData();
      if (load_data == 1) {
        this.loadData();
      }
    },
    loadData: function (offset = 0) {
      let params = {
        size: ROW_PER_PAGE,
        page: offset / ROW_PER_PAGE,
        roleId: this.user.role_id,
      };
      this.$http_service.get("/ams-auth-api/roles/tree/", {
        params: params
      }).then(res => {
        this.total_rows = res.data.page.totalElements;
        this.userRoles = res.data._embedded.tupleBackedMapList;
        //this.resourceData = res.data.resources;
      }).then(() => {
        this.loading_show = false;
      });
    },
    deleteButton: function (item) {
      Swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          let id = item.role_id;
          let params = new FormData();
          params.append('role_id', id);
          this.$http_service.delete("/ams-auth-api/roles/" + id)
            .then(res => {
              if (res.data.status == "warning") {
                Swal(
                  'Warning!',
                  res.data.message,
                  'warning'
                )
              } else if (res.data.status == 'failure') {
                Swal(
                  'Failure!',
                  res.data.message,
                  'error'
                )
              } else {
                Swal(
                  'Deleted!',
                  'Your data has been deleted.',
                  'success'
                )
                this.loadData();
              }
            })
        }
      })
    },
    permissionButton: function (item) {
      router.push({
        name: "Role Wise Privileges",
        params: {role_id: item.role_id}
      });

    }
  }
};
