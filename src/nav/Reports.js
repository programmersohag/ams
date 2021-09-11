export const getReportsNav = ($this) => {
  //let config = store.getters['config/generalConfigInfo'];
  let nav = [];
  nav.push(
    {
      main_menu: "Reports",
      name: "Audit Execution Report",
      url: "/reports/audit-execution",
      is_child: false
    },
    {
      main_menu: "Reports",
      name: "Check List Report",
      url: "/reports/check-list",
      is_child: false
    },
    {
      main_menu: "Reports",
      name: "Staff Position",
      url: "/reports/staff-position",
      is_child: false
    },
    {
      main_menu: "Reports",
      name: "Field Officer Wise Performance Analysis",
      url: "/reports/fo-wise-performance-analysis",
      is_child: false
    },
    {
      main_menu: "Reports",
      name: "Average Position of Ongoing Program",
      url: "/reports/ongoing-program-average-position",
      is_child: false
    },
    {
      main_menu: "Reports",
      name: "Cash and Bank Balance",
      url: "/reports/cash-and-bank-balance",
      is_child: false
    },
    {
      main_menu: "Reports",
      name: "Budget Report",
      url: "/reports/budget",
      is_child: false
    },
    {
      main_menu: "Reports",
      name: "Target & Achievement Report",
      url: "/reports/target-and-achievement",
      is_child: false
    },
    {
      main_menu: "Reports",
      name: "Fixed Assets Report",
      url: "/reports/fixed-assets",
      is_child: false
    },
    {
      main_menu: "Reports",
      name: 'Check Point Execution',
      url: '/reports/check-point-execution',
      is_child: false
    },
    {
      main_menu: "Reports",
      name: "Compliance Report",
      url: "/error/under-construction",
      is_child: false
    },
    {
      main_menu: "Reports",
      name: "Auditor Evaluation",
      url: "/error/under-construction",
      is_child: false
    },
  );
  return nav;
}
