import store from '@/store';
import StorageService from "@/shared/common/storage.service";

export const getSchedulingNav = ($this) => {
  //let config = store.getters['config/generalConfigInfo'];
  let config = StorageService.getGeneralConfig();
  let user = store.getters['auth/userInfo'];
  let nav = [];
  nav.push(
    {
      main_menu: "Scheduling",
      name: "Team Creation",
      url: "/scheduling/teams/index",
      is_child: false
    },
    {
      main_menu: "Scheduling",
      name: "Schedule",
      url: "/scheduling/schedule/index",
      is_child: false
    },
    {
      main_menu: "Scheduling",
      name: "Schedule Approved",
      url: "/scheduling/approve/index",
      is_child: false
    }
  );

  return nav;
}
