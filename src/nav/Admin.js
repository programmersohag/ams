// import store from '@/store';
// import StorageService from "@/shared/common/storage.service";

export const getAdminNav = ($this) => {
  //let config = store.getters['config/generalConfigInfo'];
  /*let config = StorageService.getGeneralConfig();
  let user = store.getters['auth/userInfo'];
  let rearrange_member_code = (config['rearrange_member_code'] != undefined && config['rearrange_member_code']) ? true : false;
  let admin_action_privilege = (config['admin_action_privilege'] != undefined && config['admin_action_privilege']) ? true : false;*/
  let nav = [];
  nav.push({
      main_menu: "Admin",
      name: "Manage User",
      url: "/admin/users/index",
      is_child: false
    },
    {
      main_menu: "Admin",
      name: "Manage User Role",
      url: "/admin/user-roles/index",
      is_child: false
    },
    {
      main_menu: "Admin",
      name: "Change Password",
      url: "/admin/users/change-password",
      is_child: false
    },
  );

  return nav;
}
