export const getProcessNav = ($this) => {
  let nav = [];
  nav.push({
      main_menu: "Process",
      name: "Audit Review",
      url: "/process/audit-review/index",
      is_child: false
    },
    {
      main_menu: "Process",
      name: "Audit Reply",
      url: "/process/audit-reply/index",
      is_child: false
    },
    {
      main_menu: "Process",
      name: "Corrective Action Tools",
      url: "/process/corrective-action-tools/schedules",
      is_child: false
    },
    {
      main_menu: "Process",
      name: "Automatic Audit Tracking System",
      url: "/error/under-construction",
      is_child: false
    }
  );
  return nav;
}
