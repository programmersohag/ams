<template>
  <div class="app">

    <AppHeader fixed>
      <div class="col-sm-12">
         <b-link class="navbar-brand " @click="goToDashboard" >
        <!-- <img class="navbar-brand-full" src="img/auditLogo.jpeg" alt="Microfin360 Next Logo" style="margin-left: 40%" width="20px" height="20px"> -->
        <img class="navbar-brand-full" src="img/auditLogo.jpeg" width="120" height="50" alt="Microfin360 Next Logo">
      </b-link>
   
      </div>
      <div class="col-sm-12" style="background:#282828;">
      <b-navbar-nav class="NavBarTopMenu">

                                   <!-- Admin DropDown -->
       

        <template>

           <!-- Start Admin DropDown -->

                 <div >
            <b-dropdown id="dropdown-1" ref="dropdown1" icon="fa fa-user">  
            <template slot="button-content">
                <i class="py-0 fa fa-user fa_resize"></i>
                Admin
            </template>
              <b-dropdown-item @click="ManageUser">Manage User</b-dropdown-item>
              <b-dropdown-item disabled>Manage User Role</b-dropdown-item>
              <b-dropdown-item @click="ChangePassword" >Change Password</b-dropdown-item>
              <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-dropdown>
          </div>

           <!-- End Admin DropDown -->

              <!-- Configuration DropDown -->


          <div >
            
            <b-dropdown id="dropdown-2" ref="dropdown2" >
               <template slot="button-content">
                <i class="py-0 fa fa-cog fa_resize"></i>&nbsp;Configuration
            </template>
              <b-dropdown-item @click="GeneralConfiguration">General Configuration</b-dropdown-item>
              <b-dropdown-item disabled> Basic Info Config</b-dropdown-item>
              <b-dropdown-item @click="Project">Project</b-dropdown-item>
              <b-dropdown-item @click="Department">Department</b-dropdown-item>
              <b-dropdown-item @click="group">Group</b-dropdown-item>
              <b-dropdown-item @click="teamTypes">Team Type</b-dropdown-item>
              <b-dropdown-item @click="checkList">Check List</b-dropdown-item>
              <b-dropdown-item @click="location">Location/Branch</b-dropdown-item>
              <b-dropdown-item disabled>Report Configuration</b-dropdown-item>
            </b-dropdown>
            
          </div>

           <!-- End Configuration DropDown -->

           <!-- Scheduling DropDown -->


          <div>
            <b-dropdown id="dropdown-2" ref="dropdown2" >
              <template slot="button-content">
                <i class="fa fa-calendar fa_resize"></i>&nbsp;Scheduling
            </template>
              <b-dropdown-item @click="teamCreation" >Team Creation</b-dropdown-item>
              <b-dropdown-item @click="schedule">Schedule</b-dropdown-item>
              <b-dropdown-item @click="scheduleApproved">Schedule Approved</b-dropdown-item>
              <b-dropdown-item disabled>Schedule Modify</b-dropdown-item>
            </b-dropdown>
          </div>

          <!-- End Scheduling DropDown -->

          <!-- Audit Execution DropDown -->


          <div>
            <b-dropdown id="dropdown-2" ref="dropdown2" >
              <template slot="button-content">
                <i class="fa fa-file-text-o fa_resize" aria-hidden="true"></i>&nbsp;Audit Execution
            </template>

              <b-dropdown-item disabled>Basic Info</b-dropdown-item>
              <b-dropdown-item disabled>Cash & Bank Balance</b-dropdown-item>
              <b-dropdown-item disabled>Passbook Balancing</b-dropdown-item>
              <b-dropdown-item disabled>Budget</b-dropdown-item>
              <b-dropdown-item disabled>Target Acheivement</b-dropdown-item>
              <b-dropdown-item disabled>Fixed Asset</b-dropdown-item>
              <b-dropdown-item disabled>General Checkpoint</b-dropdown-item>
            </b-dropdown>
          </div>

          <!-- End Audit Execution DropDown -->

          <!-- Process DropDown -->

          <div>
            <b-dropdown id="dropdown-2" text="Dropdown2" ref="dropdown2" >
              <template slot="button-content">
                <i class="fa fa-spinner fa_resize" aria-hidden="true"></i>&nbsp;Process
            </template>
            
              <b-dropdown-item disabled>Audit Review</b-dropdown-item>
              <b-dropdown-item disabled>Audit Reply</b-dropdown-item>
              <b-dropdown-item disabled>Corrective Action Tools</b-dropdown-item>
              <b-dropdown-item disabled>Automatic Audit Tracking System</b-dropdown-item>
            </b-dropdown>
          </div>

          <div>
            <b-dropdown id="dropdown-2" text="Dropdown2" ref="dropdown2" >
              <template slot="button-content">
                <i class="fa fa-line-chart fa_resize" aria-hidden="true"></i>&nbsp;Report
            </template>
            
              <b-dropdown-item disabled>Checklist Report</b-dropdown-item>
              <b-dropdown-item disabled>Report</b-dropdown-item>
              <b-dropdown-item disabled>Compliance Report</b-dropdown-item>
              <b-dropdown-item disabled>Auditor Evaluation</b-dropdown-item>
            </b-dropdown>
          </div>
        </template>
        

                                <!-- End Report DropDown -->

 
      </b-navbar-nav></div>

    </AppHeader>


    <div class="app-body">
      <!-- <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>

        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar> -->

      <main class="main">
        <!-- <div @click="socketClick">message</div> -->
      

<br><br>
     <div class="container-fluid">

       <div class="mt-3" v-if="($route.name)=='AIS Dashboard' || ($route.name)=='MIS Dashboard'">
          <div class="row">
            <div class="col-sm-3">
              <div class="atGlanceseeBox">
                <div class="row">
                  <div class="col-sm-5 text-center icon_atGlanceseeBox">
                    <!-- <i class="fa fa-users fa-3x"></i> -->
                    <img src="/img/img1.png" width="70px" height="70px" style="margin-top:-5px !important;">
                  </div>
                  <div class="col-sm-7 mt-1">
                    <span class="title_atGlanceseeBox">Total Audit</span><br>
                    <h5 class="value_atGlanceseeBox">2,000</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="atGlanceseeBox">
                <div class="row">
                  <div class="col-sm-5 text-center icon_atGlanceseeBox">
                    <!-- <i class="fa fa-building-o fa-3x"></i> -->
                    <img src="/img/img2.png" width="70px" height="70px" style="margin-top:-5px !important;">
                  </div>
                  <div class="col-sm-7 mt-1">
                    <span class="title_atGlanceseeBox">Scheduled</span><br>
                    <h5 class="value_atGlanceseeBox">200</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="atGlanceseeBox">
                <div class="row">
                  <div class="col-sm-5 text-center icon_atGlanceseeBox">
                    <!-- <i class="fa fa-money fa-3x"></i> -->
                    <img src="/img/img3.png" width="70px" height="70px" style="margin-top:-5px !important;">
                  </div>
                  <div class="col-sm-7 mt-1">
                    <span class="title_atGlanceseeBox">Total Defects</span><br>
                    <h5 class="value_atGlanceseeBox">500</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="atGlanceseeBox">
                <div class="row">
                  <div class="col-sm-5 text-center icon_atGlanceseeBox">
                    <!-- <i class="fa fa-line-chart fa-3x"></i> -->
                    <img src="/img/img4.png" width="70px" height="70px" style="margin-top:-5px !important;">
                  </div>
                  <div class="col-sm-7 mt-1">
                    <span class="title_atGlanceseeBox">Defects Resolved</span><br>
                    <h5 class="value_atGlanceseeBox">200</h5>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


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
        <span class="ml-1">Microfin360 Next v 4.0.0. &copy; 2001-{{current_year}} <a href="http://datasoft-bd.com/">DataSoft</a>. All rights reserved.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://microfin360.com/web/" style="text-decoration:none;"> DataSoft Systems Bangladesh Limited</a>&nbsp;
        <span v-if="$root['serverName']"><span>{{$root['serverName'][0]}}</span>&nbsp;
        <span v-if="$root['serverName'].length > 1">
          <b-button id="tooltip-button-interactive" style="border: none;padding: 0px;background: none;">more...</b-button>
          <b-tooltip target="tooltip-button-interactive">
            <ul class="list-group">
              <li v-for="(row, key) in $root['serverName']" :key="key">{{row}}</li>
            </ul>
          </b-tooltip>
        </span>
        </span>
      </div>
    </TheFooter>
  </div>
</template>

<script>
    import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
    import DefaultAside from './DefaultAside'
    import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt';
    import MegaMenu from './MegaMenu';
    import { getLeftMenu } from '@/nav/Generate';
    import Button from "./ui/Button";
    import { SOCKET_URL } from '@/shared/common/config';
   // import io from 'socket.io-client';
    import StorageService from "@/shared/common/storage.service";
    import { API_URL } from '@/shared/common/config';
    import store from './../store'
    const axios = require('axios');
    import ModalIdle from '@/components/ModalIdle.vue';
    import Vue from 'vue';
    import Dropdown from 'bp-vuejs-dropdown';
    // var socket = io.connect(SOCKET_URL, {
    // query: {
    //     token: StorageService.getToken()
    //   }
    // });

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
            Dropdown
        },
        data () {
            return {
                nav:[],
                isAdmin: false,
                isShowMegaMenu: false,
                module: 'MIS',
                variant: 'success',
                rest_nav:{},
                isHidden: false,
                user_info: {},
                isActive:false,
                show_hrm_link:false,
                search_value:'',
                current_year: '',
                notifyCount:0,
                notifications:[],
                row:[],
                result:[],
                module_name:"",
                route_name:'/admin/notifications/index'
            }
        },
        mounted: function() {
          this.user_info = this.$store.getters['auth/userInfo'];
          this.isAdmin = this.user_info['name'] == 'Admin' ? true : false;
        //  socket.emit("joinBranch",this.user_info['branch_id']);
          this.getNotifications();
          //this.getSocketNotifications();
         this.getExpireTimeWiseTokenUpdate();
          this.$root.disableInterceptor();
          if(this.isAdmin){
            this.lastUpdateDashboard('MIS');
          }

          this.module = this.user_info.module ? this.user_info.module : "MIS";
          var d = new Date();
          this.current_year = d.getFullYear();
         // this.general_config = this.$store.getters['config/generalConfigInfo'];
          this.general_config = StorageService.getGeneralConfig();
          if(this.general_config.hrm_web_url !== ''){
              this.show_hrm_link = true;
          }
          this.$root.enableInterceptor();
        },
        created () {
            document.addEventListener('click', this.documentClick)
        },
        destroyed () {
            document.removeEventListener('click', this.documentClick)
        },
        methods: {
          getExpireTimeWiseTokenUpdate(){
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
        logout: function () {
                //console.log('logout')
                this.$store.dispatch('auth/logout')
                    .then(() => {
                        this.$router.push('/login')
                    });
                this.$store.dispatch('search/resetState');
        },
          lastUpdateDashboard: function(module_name) {
            //let module_name = this.user_info.module;
            console.log("ModuleName",module_name);
          this.$axios
          .get("/dashboard/last_update_time", {
                        params:{
                            id: module_name
                        }
                    })
          .then(res => {
            this.result = res.data.row;


          });
     },

          getNotifications: function() {
            this.$store.dispatch("admin/getNotifications").then(() => {
              let notificationList = this.$store.getters['admin/getNotificationInfo'];
              this.notifyCount = 0;
              this.notifications = [];
              if(notificationList.length > 0) {
                for(let key in notificationList) {
                  //this.notifications.push(notificationList[key])
                  this.notifications.push({
                    id: notificationList[key]['id'],
                    branch_id: notificationList[key]['branch_id'],
                    notifications: notificationList[key]['notifications'],
                    view_status: notificationList[key]['view_status'],
                    created_at: notificationList[key]['created_at'],
                    created_by: notificationList[key]['created_by'],
                  })
                  if(notificationList[key]['view_status'] == 0) {
                    this.notifyCount++;
                  }
                }
                console.log("notificaiton", this.notifications)
              }
            })
          },
          getSocketNotifications: function() {
            socket.on('RESP', (res) => {
              console.log("res......", res)
              this.getNotifications();
            })
          },
            setSoftwareDate: function() {
                this.software_date = this.user_info.software_date;
                if(this.module != "MIS") {
                    this.software_date = this.user_info.software_date_ais;
                }
            },
            goToDashboard: function() {
                let module_name = (this.$store.getters['auth/userInfo']['module'] == "MIS") ? "mis" : "ais";
                this.$router.push('/'+module_name+'/dashboard');

            },
            themeChanger:function() {
                $(".sidebar-minimizer").click();
                $(".theme_change_default_icon").click();
                $(".theme_changer").hide();
            },
            documentClick(e){
                var el = this.$refs.childComponent
                let target = e.target
                if ((target.innerHTML != 'Mega Menu'))
                {
                    if((target.id!='main_menu')){
                        this.isShowMegaMenu=false
                    }
                }
            },
            searchMegaMenu: function(){

                this.isShowMegaMenu = true;
                this.$refs.childComponent.getSearchMenu(this.search_value);
            },
            outside:function(){
                this.isShowMegaMenu = false;
            },
            setMenu:function(menu, subModule = "Admin", type = "1"){
                if(this.module=='MIS'){
                    this.variant = 'success';
                }else if(this.module=='AIS'){
                    this.variant = 'primary';
                }else{
                    this.variant = 'warning';
                }
               this.nav = getLeftMenu(menu, subModule, type, this.module);
            },
            showMegaMenu:function() {
                this.isShowMegaMenu = !this.isShowMegaMenu;
            },
            showModule: function(moduleName){
                if(moduleName == 'TS'){
                    window.open('http://182.163.112.210/rigs/', '_blank');
                    return;
                }
                if(moduleName == 'DM'){
                    window.open('http://edoc.ismebd.com/login/', '_blank');
                    return;
                }
                if(moduleName == 'HRM'){
                    window.open(this.general_config.hrm_web_url, '_blank');
                    return;
                }
                this.module = moduleName;
                this.$store.dispatch('auth/updateUserInfo', {module:this.module})
                this.lastUpdateDashboard(moduleName);
                this.$refs.childComponent.setModule(this.module);
                this.$refs.childComponent.getMenuList();
                let route_name = (this.module == 'MIS') ? 'mis' : 'ais';
                this.$router.push('/'+route_name+'/dashboard');
            },
            showMessage:function(){
              return false;
              $(".sidebar-minimizer").click();
                this.$router.push('/message-center/message/index');
            },
            getFullMessege:function(){
               $(".sidebar-minimizer").click();
                this.$router.push('/admin/notifications/index');
            },
            getTutorial:function(){
              this.$router.push('/admin/help/tutorial');
            },
            getFAQ:function(){
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
            //dropdown link
            ManageUser:function(){
              this.$router.push('/admin/notifications/index')
            },
            ChangePassword:function(){
              this.$router.push('/admin/users/change-password')
            },
            logout: function () {
                //console.log('logout')
                this.$store.dispatch('auth/logout')
                    .then(() => {
                        this.$router.push('/login')
                    });
                this.$store.dispatch('search/resetState');
            },
            GeneralConfiguration:function(){
              this.$router.push('/config/config-generals/view')
            },
            Project:function(){
              this.$router.push('/config/projects/Index')
            },
            Department:function(){
              this.$router.push('/config/departments/index')
            },
            group:function(){
              this.$router.push('/config/groups/index')
            },
            teamTypes:function(){
              this.$router.push('/config/team_types/index')
            },
            checkList:function(){
              this.$router.push('/config/check_lists/index')
            },
            location:function(){
              this.$router.push('/config/locations/index')
            },
            teamCreation:function(){
              this.$router.push('/config/teams/index')
            },
            schedule:function(){
              this.$router.push('/config/schedules/Index')
            },
            scheduleApproved:function(){
              this.$router.push('/config/schedule_approved/index')
            },

            //End here

            
        },
        computed: {
            name () {
                return this.$route.name
            },
            list () {
                return this.$route.matched.filter((route) => route.name || route.meta.label )
            },

        },
        directives: {
            'click-outside': {
                bind: function(el, binding, vNode) {
                    // Provided expression must evaluate to a function.
                    if (typeof binding.value !== 'function') {
                        const compName = vNode.context.name
                        let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
                        if (compName) { warn += `Found in component '${compName}'` }

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

                unbind: function(el, binding) {
                    // Remove Event Listeners
                    document.removeEventListener('click', el.__vueClickOutside__)
                    el.__vueClickOutside__ = null

                }
            }
        }
    }

</script>
<style scoped>
.timer{
    font-size: 15px;
    color: white;
    font-weight: bold;
    margin-top: -2px;
    background: #8b5cf6;
    padding: 1px 3px;
    border-radius: 5px;
}
.ml-auto{
  float: center !important;
}

</style>
