import {getAdminNav} from '@/nav/Admin';
import {getConfigNav} from '@/nav/Config';
import {getSchedulingNav} from '@/nav/Scheduling';
import {getAuditExecutionNav} from '@/nav/AuditExecution';
import {getProcessNav} from '@/nav/Process';
import {getReportsNav} from '@/nav/Reports';
import store from '@/store';
import {URL_INFO} from '@/shared/common/constants';

export const getMenu = ($this) => {
  let user = store.getters['auth/userInfo'];
  let mergeMenu = getMergeMenu($this);
  /*if(user['is_super_admin'] == 1) {
      return mergeMenu;
  }*/
  //console.log('mergeMenu', mergeMenu);
  let menu = getMergeGenerateMenu(mergeMenu, user['is_super_admin']);
  return menu;
}

export const getMergeMenu = ($this) => {
  let mergeMenu = [];
  mergeMenu = [
    ...getAdminNav($this),
    ...getConfigNav($this),
    ...getSchedulingNav($this),
    ...getAuditExecutionNav($this),
    ...getProcessNav($this),
    ...getReportsNav($this),
  ];
  //console.log('mergeMenu ',mergeMenu);
  return mergeMenu;
}

export const getMergeGenerateMenu = (mergeMenu, is_super_admin) => {
  let comboPolicyData = getHashingPolicy();
  //console.log('comboPolicyData', comboPolicyData);
  //console.log('mergeMenu',mergeMenu);
  let generateMenu = {};
  if (comboPolicyData.length > 0 || Object.keys(comboPolicyData).length > 0) {
    for (let key in mergeMenu) {
      if (mergeMenu[key]['is_child'] == false) {
        if (!is_super_admin) {
          let _url = mergeMenu[key]['url'].split("/");
          let _url_ = _url[2] +"/"+_url[3];
          if (comboPolicyData[_url_]) {
            if (!generateMenu[mergeMenu[key]['main_menu']]) {
              generateMenu[mergeMenu[key]['main_menu']] = [];
            }
            generateMenu[mergeMenu[key]['main_menu']].push(mergeMenu[key]);
          }
        } else {
          if (!generateMenu[mergeMenu[key]['main_menu']]) {
            generateMenu[mergeMenu[key]['main_menu']] = [];
          }
          generateMenu[mergeMenu[key]['main_menu']].push(mergeMenu[key]);
        }

      } else {
        let generateSubMenu = [];
        for (let key2 in mergeMenu[key]['is_child']) {
          if (!is_super_admin) {
            let __url = mergeMenu[key]['is_child'][key2]['url'].split("/");
            let __url__ = __url[2] +"/"+__url[3];
            if (comboPolicyData[__url__]) {
              generateSubMenu.push(mergeMenu[key]['is_child'][key2]);
            }
          } else {
            generateSubMenu.push(mergeMenu[key]['is_child'][key2]);
          }

        }
        if (!generateMenu[mergeMenu[key]['main_menu']]) {
          generateMenu[mergeMenu[key]['main_menu']] = [];
        }
        generateMenu[mergeMenu[key]['main_menu']].push({
          main_menu: mergeMenu[key]['main_menu'],
          name: mergeMenu[key]['name'],
          url: mergeMenu[key]['url'],
          is_child: generateSubMenu
        });
      }
    }
  }
  return generateMenu;
}

export const getGenterateMenu = (menu, subModule, url = "", isChild = false) => {
  let generateMenu = [];
  for (let key in menu) {
    let main_menu = menu[key]["main_menu"];
    let _url = (menu[key]["url"]).trim();
    if (!isChild && subModule == main_menu) {
      generateMenu.push(menu[key]);
    }
    if (isChild && subModule == main_menu && url.trim() == _url) {
      generateMenu.push(menu[key]['is_child']);
    }
  }
  if (isChild) {
    return generateMenu[0];
  }
  return generateMenu;
}

export const getSearchGenerateMenu = (menu, searchValue = "") => {
  let searchVal = searchValue.toLowerCase();
  let searchMenu = [];
  if (menu.length > 0) {
    for (let key in menu) {
      if (menu[key]['is_child'] == false) {
        let _name = menu[key]['name'].toLowerCase();
        if (_name.includes(searchVal)) {
          searchMenu.push({
            url: menu[key]['url'],
            name: menu[key]['name']
          })
        }
      } else {
        for (let key2 in menu[key]['is_child']) {
          let _name_ = menu[key]['is_child'][key2]['name'].toLowerCase();
          if (_name_.includes(searchVal)) {
            searchMenu.push({
              url: menu[key]['is_child'][key2]['url'],
              name: menu[key]['is_child'][key2]['name']
            })
          }
        }
      }
    }
  }
  return searchMenu;
}

export const getHashingPolicy = () => {   // Check role wise permission 
  let user = store.getters['auth/userInfo'];
  let policyData = store.getters['users/policyInfo'];
  //console.log('policyData ',policyData);
  let comboPolicyData = [];
  let globalPermission = getGlobalPermission();
  let globalDisallowedPermissionForHo = getGlobalDisallowedPermissionForHO();
  if (policyData.length > 0) {
    for (let key in policyData) {
      let action = policyData[key];
      comboPolicyData[action] = action;
    }
  }
  let mergePermission = [];
  if (user["is_head_office"] == 1) {
    mergePermission = {
      ...comboPolicyData,
      ...globalPermission
    };
  } else {
    mergePermission = {
      ...comboPolicyData,
      ...globalPermission,
      ...globalDisallowedPermissionForHo
    };
  }
  return mergePermission;
}

export const getGlobalDisallowedPermissionForHO = () => {  // For Admin Action 
  let permission = [];
  permission["member_migrations_index"] = "member_migrations_index";
  permission["member_migrations_add"] = "member_migrations_add";
  permission["member_migrations_edit"] = "member_migrations_edit";
  permission["member_migrations_save"] = "member_migrations_save";

  return permission;
}

export const getGlobalPermission = () => {
  let permission = [];
  permission['users/change-password'] = 'users/change-password';

  permission['pages_access_denied'] = 'pages_access_denied';
  permission['pages_enable_javascript'] = 'pages_enable_javascript';
  permission['pages_no_data_found'] = 'pages_no_data_found';
  permission['pages_404'] = 'pages_404';

  permission['auths_login'] = 'auths_login';
  permission['auths_logout'] = 'auths_logout';
  permission['auths_two_step_verification'] = 'auths_two_step_verification';
  permission['user_roles_access_denied'] = 'user_roles_access_denied';
  permission['reports_show_print_friendly'] = 'reports_show_print_friendly';
  permission['reports_export_to_excel'] = 'reports_export_to_excel';
  permission['mobile_apps_index'] = 'mobile_apps_index';
  permission['#'] = '#';
  return permission;
}

export const getLeftMenu = (menu, subModule, type, moduleName = "MIS") => {
  let module_route_name = (moduleName == 'MIS') ? "/mis/dashboard" : "/ais/dashboard";
  let module_name = (moduleName == 'MIS') ? "MIS Dashboard" : "AIS Dashboard";
  let generateMenu = [];
  generateMenu.unshift(
    {
      icon: "fa fa-dashboard",
      name: module_name,
      url: module_route_name,
    },
    {
      title: true,
      wrapper: {
        element: '',
        attributes: {}
      },
      name: subModule,
      class: 'module_class',
    }
  );
  if (menu.length > 0 && type == 1) {
    for (let key in menu) {
      let main_menu = menu[key]["main_menu"];
      let isChild = menu[key]["is_child"];
      if (!isChild && subModule == main_menu) {
        generateMenu.push({
          url: menu[key]['url'],
          name: menu[key]['name'],
          icon: "icon-cursor"
        })
      }
    }
  }
  if (menu.length > 0 && (type == 2 || type == 3)) {
    for (let key in menu) {
      let isChild = menu[key]["is_child"];
      if (!isChild) {
        generateMenu.push({
          url: menu[key]['url'],
          name: menu[key]['name'],
          icon: "icon-cursor"
        })
      }
    }
  }
  return generateMenu;
}

export const getMisMainMenu = ($this) => {
  return [
    {
      text: "Dashboard",
      icon: "fa-dashboard"
    },
    {
      text: "Admin",
      icon: "fa-user-o"
    },
    {
      text: "Config",
      icon: "fa-cog"
    },
    {
      text: "Employees",
      icon: "fa-users"
    },
    {
      text: "Process",
      icon: "fa-spinner"
    },
    {
      text: "Reports",
      icon: "fa-bar-chart"
    }
  ];
}
