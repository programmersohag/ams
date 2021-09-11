//import store from '@/store';
//import StorageService from "@/shared/common/storage.service";

export const getAuditExecutionNav = ($this) => {
  //let config = store.getters['config/generalConfigInfo'];
  //let config = StorageService.getGeneralConfig();
  //let user = store.getters['auth/userInfo'];
  let nav = [];
  nav.push(
    /*{
      main_menu: "Audit Execution",
      name: "Basic Info",
      url: "#",
      is_child: false
    },*/
    {
      main_menu: "Audit Execution",
      name: "General Info",
      url: "/audit-execution/general-info/Index",
      is_child: false
    },
    {
      main_menu: "Audit Execution",
      name: "Staff Position",
      url: "/audit-execution/staff-positions/index",
      is_child: false
    },
    {
      main_menu: "Audit Execution",
      name: "Field Officer Wise Performance Analysis",
      url: "/audit-execution/field-officer-wise-performance-analysis/Index",
      is_child: false
    },
    {
      main_menu: "Audit Execution",
      name: "Average Position Of Ongoing Program",
      url: "/audit-execution/ongoing-program-average-positions/index",
      is_child: false
    },
    {
      main_menu: "Audit Execution",
      name: "Cash & Bank Balance",
      url: "/audit-execution/cash-and-bank-balances/index",
      is_child: false
    },
    {
      main_menu: "Audit Execution",
      name: "Passbook Balancing",
      url: "/audit-execution/passbook-balances/index",
      is_child: false
    },
    {
      main_menu: "Audit Execution",
      name: "Budget",
      url: "/audit-execution/budgets/Index",
      is_child: false
    },
    {
      main_menu: "Audit Execution",
      name: "Target & Achievements",
      url: "/audit-execution/target-and-achievements/index",
      is_child: false
    },
    {
      main_menu: "Audit Execution",
      name: "Fixed Asset",
      url: "/audit-execution/fixed-assets/index",
      is_child: false
    },
    {
      main_menu: "Audit Execution",
      name: "Check Point Execution",
      url: "/audit-execution/check-point-executions/index",
      is_child: false
    },
  );

  return nav;
}
