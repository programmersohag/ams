<template>
  <div class="app">

    <AppHeader fixed>
      <div class="col-sm-12" style="margin-bottom: -5px;">
        <div class="row" style="background:#282828;">
          <div class="col-sm-2">
            <b-link class="navbar-brand " @click="goToDashboard">
              <img class="navbar-brand-full" src="img/auditLogo.jpeg" width="120" height="50"
                   alt="Audit Management System">
            </b-link>
          </div>
          <div class="col-sm-10" style="display:flex;">

            <b-navbar-nav class="ml-auto">
              <div v-if="!this.isAdmin">
                <b-button
                  variant="info"
                  size="sm"
                  style="background: #8b5cf6 !important; border: 1px solid #8b5cf6; color:white !important;"
                  @click.prevent="popUpScheduleCard()">
                  <i class="fa fa-handshake-o" aria-hidden="true"></i> Auditing branch:&nbsp;{{ this.pp }}
                </b-button>&nbsp;&nbsp;
              </div>
              <div style="color: #f6f8f9;margin-right: 5px;">
                <i class="fa fa-calendar" aria-hidden="true" style="margin: 5px;"> {{ todayDate }} </i>
              </div>
              <div style="color: #f6f8f9;margin-right: 5px;">
                <i class="fa fa-connectdevelop" aria-hidden="true" style="margin: 5px;"> {{ organizationName }} </i>
              </div>
              <div style="color: #f6f8f9;margin-right: 5px;">
                <i class="fa fa-building-o" aria-hidden="true" style="margin: 5px;"> {{ user_info['branch_name'] }} </i>
              </div>
              <div style="color: #f6f8f9;margin-right: 5px">
                <i class="fa fa-user-circle-o" aria-hidden="true"> Welcome, {{ user_info['name'] }} </i>
              </div>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch1" @click="themeChanger">
                <label class="custom-control-label" for="customSwitch1"></label>
              </div>

              <div class="envelop">
                <i class="fa fa-bell" style="cursor: pointer;"></i>
              </div>

              <div class="envelop">
                <i class="fa fa-arrows-alt" aria-hidden="true"></i>
              </div>
              <!--              <div class="logout_new_version" @click="logout">-->
              <!--                <i class="fa fa-power-off" aria-hidden="true"></i>-->
              <!--              </div>-->
              <div>
                <b-button
                  variant="info"
                  size="sm"
                  style="background: #8b5cf6 !important; border: 1px solid #8b5cf6; color:white !important;"
                  @click.prevent="logout()">
                  <i class="fa fa-power-off" aria-hidden="true"></i> Logout
                </b-button>&nbsp;&nbsp;
              </div>

              <!-- <DefaultHeaderDropdownAccnt/> -->
            </b-navbar-nav>
          </div>
        </div>

      </div>
      <div class="col-sm-12 second_Top_menu">
        <b-navbar-nav class="NavBarTopMenu">
          <template>
            <!-- Start Menu DropDown -->
            <div v-for="(urls, main_menu) in nav">
              <b-dropdown id="dropdown-1" ref="dropdown1" icon="fa fa-user">
                <template slot="button-content">
                  <i :class="menu_classes[main_menu]"></i>
                  {{ main_menu }}
                </template>
                <template v-for="(url,key) in urls">
                  <template v-if="url.url == '#'">
                    <b-dropdown-item disabled>{{ url.name }}</b-dropdown-item>
                  </template>
                  <template v-else>
                    <b-dropdown-item @click="gotoLink(url.url)">{{ url.name }}</b-dropdown-item>
                  </template>
                </template>
              </b-dropdown>
            </div>
            <!-- End Menu DropDown -->
          </template>
        </b-navbar-nav>
      </div>
      <AsideToggler class="theme_change_default_icon " style="display:none;"/>

    </AppHeader>
    <div>
      <custom-modal v-if="modal_info.isModalVisible"
                    :componentAddress="modal_info.component_address" :title="modal_info.title"
                    :id="modal_info.id"></custom-modal>
    </div>


    <div class="app-body">


      <main class="main">
        <!-- <div @click="socketClick">message</div> -->


        <br><br>
        <div class="container-fluid">
          <router-view></router-view>
        </div>


      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <!-- <Bot></Bot> -->
      <!--footer-->
      <div>
        <span class="ml-1">Next Audit v 03.2021. &copy; 2020-{{ current_year }} <a
          href="http://datasoft-bd.com/">DataSoft</a>. All rights reserved.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="http://datasoft-bd.com/" style="text-decoration:none;"> DataSoft Systems Bangladesh Limited</a>&nbsp;
        <span v-if="$root['serverName']"><span>{{ $root['serverName'][0] }}</span>&nbsp;
        <span v-if="$root['serverName'].length > 1">
          <b-button id="tooltip-button-interactive"
                    style="border: none;padding: 0px;background: none;">more...</b-button>
          <b-tooltip target="tooltip-button-interactive">
            <ul class="list-group">
              <li v-for="(row, key) in $root['serverName']" :key="key">{{ row }}</li>
            </ul>
          </b-tooltip>
        </span>
        </span>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import {
  Aside as AppAside,
  AsideToggler,
  Breadcrumb,
  Footer as TheFooter,
  Header as AppHeader,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  SidebarToggler
} from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt';
import MegaMenu from './MegaMenu';
import {getLeftMenu} from '@/nav/Generate';
import Button from "./ui/Button";
import StorageService from "@/shared/common/storage.service";
import CustomModal from '@/containers/Modal';
import ModalIdle from '@/components/ModalIdle.vue';
import Dropdown from 'bp-vuejs-dropdown';
import ScheduleCard from '@/components/services/schedules/schedule_popup/scheduleCards';
import {
  getMenu,
} from '@/nav/Generate';

const axios = require('axios');

export default {
  name: 'DefaultContainer',
  components: {
    Button,
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    MegaMenu,
    ModalIdle,
    Dropdown,
    CustomModal,
    ScheduleCard
  },
  //el:'#app',
  data() {
    return {
      nav: [],
      isAdmin: false,
      isShowMegaMenu: false,
      module: 'MIS',
      variant: 'success',
      rest_nav: {},
      isHidden: false,
      user_info: {},
      isActive: false,
      show_hrm_link: false,
      search_value: '',
      current_year: '',
      notifyCount: 0,
      notifications: [],
      row: [],
      result: [],
      module_name: "",
      isDropdown2Visible: false,
      route_name: '/admin/notifications/index',
      menu_classes: {},
      menu: [
        {title: 'one'},
        {title: 'two'},
        {
          title: 'three', showSubMenu: false,
          children: [
            {title: 'four'},
            {title: 'five'},
          ]
        },
      ],
      modal_info: {
        id: null,
        isModalVisible: false,
        title: '',
        component_address: "schedules/schedule_popup/scheduleCards",
      },
      pp: window.localStorage.getItem("location_name"),
      todayDate: "",
      organizationName: "",
    }
  },
  mounted: function () {
    this.nav = getMenu(this);
    let today = new Date();
    let weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    let dayOfWeek = weekday[today.getDay()];
    let months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    let curMonth = months[today.getMonth()];
    this.todayDate = dayOfWeek + ', ' + today.getDate() + ' ' + curMonth + ' ' + today.getFullYear();
    this.user_info = this.$store.getters['auth/userInfo'];
    this.isAdmin = this.user_info['name'] == 'Admin' ? true : false;
    this.getNotifications();
    this.setMenuWiseClasses();
    //this.getSocketNotifications();
    this.getExpireTimeWiseTokenUpdate();
    this.$root.disableInterceptor();

    this.module = this.user_info.module ? this.user_info.module : "MIS";
    var d = new Date();
    this.current_year = d.getFullYear();
    this.general_config = StorageService.getGeneralConfig();
    if (this.general_config.hrm_web_url !== '') {
      this.show_hrm_link = true;
    }
    this.$root.enableInterceptor();

    this.$root.$on('bv::dropdown::show', bvEvent => {
      if (bvEvent.componentId === 'dropdown-2') {
        this.isDropdown2Visible = true;
      }
    })
    this.$root.$on('bv::dropdown::hide', bvEvent => {
      if (bvEvent.componentId === 'dropdown-2') {
        this.isDropdown2Visible = false;
      }
      if (this.isDropdown2Visible) {
        bvEvent.preventDefault()
      }
    })
    let general_config_decode = JSON.parse(Buffer.from(localStorage.getItem('general_config'), 'base64').toString('ascii'));
    this.organizationName = general_config_decode.po_name;
  },
  created() {
    document.addEventListener('click', this.documentClick)
  },
  destroyed() {
    document.removeEventListener('click', this.documentClick)
  },
  methods: {

    getExpireTimeWiseTokenUpdate() {
      /*if(store.getters['auth/isLoggedIn']){
          let tokenExperiesTime = StorageService.getTokenExpiresTime();
          let experisTime = (tokenExperiesTime - 60) * 1000;
          let self = this;
          setTimeout(function(){
            if(store.getters['auth/isLoggedIn']){
                if(Object.keys(self.user_info).length > 0){
                let refreshToken = 'refresh_token ' +StorageService.getRefreshToken();
                // let paramsObj = {'refresh_token':refreshToken};

              const requestBody = JSON.stringify({
                refresh_token : refreshToken
              });

              const config = {
                    headers: {
                    'Content-Type': 'application/json'
                  }
              }
                axios.post(API_URL+"auth-api/oauth/refresh_token",requestBody,config)
                  .then(response => {
                    if(response.data) {
                    let tokens = response.data.access_token;
                    delete axios.defaults.headers.common["Authorization"];
                    axios.defaults.headers.common['Content-Type'] = 'application/json';
                      axios.defaults.headers.common['Authorization'] = 'Bearer '+tokens;
                      StorageService.saveToken(tokens);
                      StorageService.saveTokenExpiresTime(response.data.expires_in);
                    // debugger;
                      if(response.data.expires_in != undefined) {
                        StorageService.saveTokenExpiresTime(response.data.expires_in);
                        self.getExpireTimeWiseTokenUpdate();
                      } else {
                        self.$store.dispatch('auth/logout')
                            .then(() => {
                                self.$router.push('/login')
                            });
                        self.$store.dispatch('search/resetState');
                      }
                    }
                  })
              }
            }
          }, experisTime);
      }*/

    },
    lastUpdateDashboard: function (module_name) {
      this.$axios
        .get("/dashboard/last_update_time", {
          params: {
            id: module_name
          }
        })
        .then(res => {
          this.result = res.data.row;
        });
    },

    getNotifications: function () {
      this.$store.dispatch("admin/getNotifications").then(() => {
        let notificationList = this.$store.getters['admin/getNotificationInfo'];
        this.notifyCount = 0;
        this.notifications = [];
        if (notificationList.length > 0) {
          for (let key in notificationList) {
            //this.notifications.push(notificationList[key])
            this.notifications.push({
              id: notificationList[key]['id'],
              branch_id: notificationList[key]['branch_id'],
              notifications: notificationList[key]['notifications'],
              view_status: notificationList[key]['view_status'],
              created_at: notificationList[key]['created_at'],
              created_by: notificationList[key]['created_by'],
            })
            if (notificationList[key]['view_status'] == 0) {
              this.notifyCount++;
            }
          }
          console.log("notificaiton", this.notifications)
        }
      })
    },
    getSocketNotifications: function () {
      socket.on('RESP', (res) => {
        console.log("res......", res)
        this.getNotifications();
      })
    },
    setSoftwareDate: function () {
      this.software_date = this.user_info.software_date;
      if (this.module != "MIS") {
        this.software_date = this.user_info.software_date_ais;
      }
    },
    goToDashboard: function () {
      let module_name = (this.$store.getters['auth/userInfo']['module'] == "MIS") ? "mis" : "ais";
      this.$router.push('/' + module_name + '/dashboard');

    },
    themeChanger: function () {
      $(".sidebar-minimizer").click();
      $(".theme_change_default_icon").click();
      $(".theme_changer").hide();
    },
    documentClick(e) {
      var el = this.$refs.childComponent
      let target = e.target
      if ((target.innerHTML != 'Mega Menu')) {
        if ((target.id != 'main_menu')) {
          this.isShowMegaMenu = false
        }
      }
    },
    searchMegaMenu: function () {
      this.isShowMegaMenu = true;
      this.$refs.childComponent.getSearchMenu(this.search_value);
    },
    outside: function () {
      this.isShowMegaMenu = false;
    },
    setMenu: function (menu, subModule = "Admin", type = "1") {
      if (this.module == 'MIS') {
        this.variant = 'success';
      } else if (this.module == 'AIS') {
        this.variant = 'primary';
      } else {
        this.variant = 'warning';
      }
      this.nav = getLeftMenu(menu, subModule, type, this.module);
    },
    showMegaMenu: function () {
      this.isShowMegaMenu = !this.isShowMegaMenu;
    },
    showMessage: function () {
      return false;
      $(".sidebar-minimizer").click();
      this.$router.push('/message-center/message/index');
    },
    getFullMessege: function () {
      $(".sidebar-minimizer").click();
      this.$router.push('/admin/notifications/index');
    },
    getTutorial: function () {
      this.$router.push('/admin/help/tutorial');
    },
    getFAQ: function () {
      this.$router.push('/admin/help/faq');
    },
    onOver() {
      this.$refs.dropdown1.visible = true;
      this.$refs.dropdown2.visible = true;
      this.$refs.dropdown3.visible = true;
      this.$refs.dropdown4.visible = true;
    },
    onLeave() {
      this.$refs.dropdown.visible = false;
    },
    gotoLink: function (url) {
      this.$router.push(url)
    },
    logout: function () {
      //console.log('logout')
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push('/login')
        });
      this.$store.dispatch('search/resetState');
    },
    generalInfo: function () {
      this.$router.push('/config/general_info/index')
    },
    popUpScheduleCard: function () {
      console.log('sssssssssssssss')
      this.modal_info.id = null;
      this.modal_info.title = 'Please Select a Schedule';
      this.modal_info.isModalVisible = true;
      this.modal_info.component_address = "schedules/schedule_popup/scheduleCards",
        console.log("this.modal_info.isModalVisible===", this.modal_info.isModalVisible)
    },
    setMenuWiseClasses: function () {
      this.menu_classes = {
        'Admin': 'fa fa_resize fa-user',
        'Configuration': 'fa fa_resize fa-cog',
        'Scheduling': 'fa fa_resize fa-calendar',
        'Audit Execution': 'fa fa_resize fa-file-text-o',
        'Process': 'fa fa_resize fa-spinner',
        'Reports': 'fa fa_resize fa-line-chart',
      };
    },
  },
  computed: {
    name() {
      return this.$route.name
    },
    list() {
      return this.$route.matched.filter((route) => route.name || route.meta.label)
    },

  },
  directives: {
    'click-outside': {
      bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) {
            warn += `Found in component '${compName}'`
          }
          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },

      unbind: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

      }
    }
  }
}

</script>
<style scoped>
.timer {
  font-size: 15px;
  color: white;
  font-weight: bold;
  margin-top: -2px;
  background: #8b5cf6;
  padding: 1px 3px;
  border-radius: 5px;
}

.ml-auto {
  float: center !important;
}

</style>
