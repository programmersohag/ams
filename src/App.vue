<template>
  <div>
    <component v-if="this.$store.getters['auth/userInfo'].theme == 'default'" :is="require('@/default.vue').default"/>
    <!-- <component v-if="this.$store.getters['auth/userInfo'].theme == 'prottoy'" :is="require('@/prottoy.vue').default"/>
    <component v-if="this.$store.getters['auth/userInfo'].theme == 'bijoy'" :is="require('@/bijoy.vue').default"/> -->

                          <!-- Comment this for Black design -->

    <div :style="{
          '--background-color':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][800],
          '--font-color2':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][70],
          '--background-color-light':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][50],
          '--table_thead_color': $theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][200],
          '--search_and_add_button_color':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][100],
          '--mega_menu_background_color':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][900],
          '--dark_background_color':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][300],
          '--shadow_color_light':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][700],
          '--shadow_color_light2':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][900],
          '--dashboard_deep_color':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][700],
          '--background-color_stepper_circle':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][600],
          '--widget-three-color':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][1000],
          '--font-color':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][400],
          '--header_colors':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default'][500],
          '--box_shadow_light_color':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default']['a100'],
          '--box_shadow_dark_color':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default']['a200'],
          '--table_nth_child_color':$theme_colors[(this.$store.getters['auth/userInfo'].theme) ? this.$store.getters['auth/userInfo'].theme : 'default'][(this.$store.getters['auth/userInfo'].theme_color) ? this.$store.getters['auth/userInfo'].theme_color : 'default']['a700']

      }">

                      <!-- End Comment this for Black design -->


      
      <!--<div :style="{-->
          <!--'&#45;&#45;background-color':$theme_colors[(this.$store.getters['auth/userInfo'].theme][this.$store.getters['auth/userInfo'].theme_color][800],-->
          <!--'&#45;&#45;background-color-light':$theme_colors[this.$store.getters['auth/userInfo'].theme][this.$store.getters['auth/userInfo'].theme_color][50],-->
          <!--'&#45;&#45;table_thead_color': $theme_colors[this.$store.getters['auth/userInfo'].theme][this.$store.getters['auth/userInfo'].theme_color][200],-->
          <!--'&#45;&#45;search_and_add_button_color':$theme_colors[this.$store.getters['auth/userInfo'].theme][this.$store.getters['auth/userInfo'].theme_color][300],-->
          <!--'&#45;&#45;mega_menu_background_color':$theme_colors[this.$store.getters['auth/userInfo'].theme][this.$store.getters['auth/userInfo'].theme_color][800],-->
          <!--'&#45;&#45;dashboard_deep_color':$theme_colors[this.$store.getters['auth/userInfo'].theme][this.$store.getters['auth/userInfo'].theme_color][900],-->
          <!--'&#45;&#45;background-color_stepper_circle':$theme_colors[this.$store.getters['auth/userInfo'].theme][this.$store.getters['auth/userInfo'].theme_color][50]-->
      <!--}">-->
        
      
      <router-view></router-view>
   
      <ScrollTopArrow></ScrollTopArrow>
      <loader :is-visible="isGlobalLoading"></loader> 
      
    </div>
  </div>
</template>
<script>
  import Loader from "@/containers/ui/Loader1";
  import ScrollTopArrow from "@/containers/ui/ScrollTopArrow";
  import swal from "sweetalert2";
  import { SOCKET_URL } from '@/shared/common/config';
  //import io from 'socket.io-client';
 // var socket = io.connect(SOCKET_URL);
  export default {
    name: 'app',
    components: {
      Loader,
      ScrollTopArrow,
      swal
    },
    data() {
        return {
          refreshing: false,
          registration: null,
          node_env: process.env.NODE_ENV
        }
    },
    created() {
      if (process.env.NODE_ENV === 'production') {
        // Listen for swUpdated event and display refresh snackbar as required.
        document.addEventListener('swUpdated', this.showRefreshUI, { once: true });
        // Refresh all open app tabs when a new service worker is installed.
        if(navigator.serviceWorker != undefined) {
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (this.refreshing) return;
            this.refreshing = true;
            window.location.reload();
          });
        }
      }
  },
  mounted() {
    // socket.on('RES_UPDATE_VERSION', (res) => {
    //   this.$router.go(this.$router.currentRoute)
    // })
  },
    methods: {
        showRefreshUI(e) {
            this.registration = e.detail;
             this.swalLoad();
        },
        swalLoad() {
          swal({
                title: 'New version available!',
                type: 'warning',
                customClass: 'swal-wide',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Refresh',
                allowOutsideClick: false,
                showCancelButton: false,
            }).then((result) => {
                if (result.value) {
                  this.refreshApp()
                }
            })
        },
        refreshApp() {
        // Protect against missing registration.waiting.
        if (!this.registration || !this.registration.waiting) { return; }
        this.registration.waiting.postMessage('skipWaiting');
      }
    },
    computed: {
      isGlobalLoading: function() {
        if(this.$store.getters['auth/isLoadingShow']) {
          return this.$root.isLoading;
        }
        return false;
      }
    }
  }
</script>

<style lang="scss">
  //@import 'assets/css/style.css';
@import 'assets/css/cxlt-vue2-toastr.css';
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';
  
</style>
