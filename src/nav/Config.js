export const getConfigNav = ($this) => {
    //let config = store.getters['config/generalConfigInfo'];
    let nav = [];
    nav.push({
            main_menu: "Configuration",
            name: "General Configuration",
            url: "/config/config-generals/view",
            is_child: false
        },
        {
            main_menu: "Configuration",
            name: "Team Type",
            url: "/config/team_types/index",
            is_child: false
        },
        {
            main_menu: "Configuration",
            name: "Project",
            url: "/config/projects/index",
            is_child: false
        },
        {
            main_menu: "Configuration",
            name: "Department",
            url: "/config/departments/index",
            is_child: false
        },
        {
            main_menu: "Configuration",
            name: "Check List Category",
            url: "/config/check_list_category/index",
            is_child: false
        },
        {
            main_menu: "Configuration",
            name: "Check List",
            url: "/config/check_lists/index",
            is_child: false
        },
        {
            main_menu: "Configuration",
            name: "Location",
            url: "/config/locations/index",
            is_child: false
        },
        {
            main_menu: "Configuration",
            name: "Report Configuration",
            url: "#",
            is_child: false
        },
    );

    return nav;
}
