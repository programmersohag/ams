<template>
  <div class="mega_menu" id="main_menu">
    <div class="container-fluid">
      <div class="row search">
        <div class="col-md-6 custom-breadcrumb">
          <h6 v-if="is_first_setp_menu"><span @click="setModule(module_name)"><i class="fa fa-home fa-sm"></i></span></h6>
          <h6 v-else-if="is_second_step_menu"><span @click="setModule(module_name)"><i class="fa fa-home fa-sm"></i></span>&nbsp;/&nbsp;{{sub_moduel}}</h6>
          <h6 v-else><span @click="setModule(module_name)"><i class="fa fa-home fa-sm"></i></span>&nbsp;/&nbsp;<span @click="firstStepMenu(sub_moduel)">{{sub_moduel}}</span>&nbsp;/&nbsp;{{sub_menu}}</h6>
        </div>
        <div class="col-md-5">
        </div>
        <div class="col-md-1" id="main_menu">
          <span>
              <b-button id="main_menu"
                style="margin-bottom: 5px;"
                variant="danger"
                class="btn-square btn-sm"
                @click="handleBack()"
                :disabled="isDisabledBack">
                    <i id="main_menu" class="fa fa-backward fa-sm"></i>
              </b-button>
           </span>
        </div>
      </div>
      <!-- start parent menu  -->
      <div id="main_menu" class="row menu_list first_menu_list" v-if="is_first_setp_menu && !is_search_menu">
        <div id="main_menu"  class="col-12 col-sm-2 col col-md-6 col-lg-3 col-xl-3" v-for="(row, key) in menu_items" :key="key">

          <div id="main_menu" class="first_menu" v-if="row.text == 'Dashboard'">
            <span @click="handleClear()">
              <router-link :to = "dashboard_route_name">
              <i id="main_menu" class="fa fa-lg" :class="row.icon"></i>
              <h5 id="main_menu" >{{row.text}}</h5>
              </router-link>
            </span>
          </div>
          <div v-else  id="main_menu" class="first_menu" @click="firstStepMenu(row.text)">
            <i id="main_menu" class="fa fa-lg" :class="row.icon"></i>
            <h5 id="main_menu" >{{row.text}}</h5>
          </div>
        </div>
      </div>
      <!-- end parent menu  -->
      <!-- start parent menu  -->
      <div class="row menu_list second_menu_list" v-if="is_second_step_menu && !is_search_menu">
        <div class="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-2 c-col" v-for="(row, key) in first_menu_items" :key="key">
          <div id="main_menu" class="second_menu" v-if="!row.is_child">
            <span @click="handleClear()">
              <router-link :to = "row.url">
              <i id="main_menu" class="fa fa-bar-chart fa-lg"></i>
              <h5 id="main_menu" >{{row.name}}</h5>
              </router-link>
            </span>
          </div>
          <div class="second_menu" @click="secondStepMenu(row.main_menu,row.name, row.url)"  v-else>
            <i id="main_menu" class="fa fa-bar-chart fa-lg"></i>
            <h5 id="main_menu" ><span><i class="fa fa-angle-right fa-sm"></i></span>&nbsp;{{row.name}}</h5>
          </div>
        </div>
      </div>
      <!-- end parent menu  -->
      <!-- start third menu  -->
      <div class="row menu_list second_menu_list" v-if="is_third_step_menu && !is_search_menu">
        <div class="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-2 c-col" v-for="(row, key) in secodn_menu_items" :key="key">
          <span @click="handleClear()">
            <div class="second_menu">
              <router-link :to = "row.url">
              <i  id="main_menu" class="fa fa-bar-chart fa-lg"></i>
              <h5 id="main_menu" >{{row.name}}</h5>
              </router-link>
            </div>
          </span>
        </div>
      </div>
      <!-- end third menu  -->
      <!-- start searching menu  -->
      <div class="row menu_list second_menu_list" v-if="is_search_menu">
        <div class="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-2 c-col" v-for="(row, key) in search_menu_list" :key="key">
          <span @click="handleClear()">
            <div class="second_menu">
              <router-link :to = "row.url">
              <i id="main_menu" class="fa fa-bar-chart fa-lg"></i>
              <h5 id="main_menu" >{{row.name}}</h5>
              </router-link>
            </div>
          </span>
        </div>
      </div>
      <!-- end searching menu  -->
    </div>
  </div>
</template>

<script>
import {
  getMenu,
  getGenterateMenu,
  getSearchGenerateMenu,
  getMisMainMenu
} from '@/nav/Generate';

export default {
  name: "MegaMenu",
  data() {
    return {
      is_first_setp_menu: true,
      is_second_step_menu: false,
      is_third_step_menu: false,
      is_search_menu:false,

      first_menu_items:[],
      secodn_menu_items:[],
      menu_items: [],
      sub_moduel: 'Admin',
      sub_menu:'',
      module_name:'MIS',
      search_value:'',
      search_menu_list:[],
      all_search_menu_list:[],
      dashboard_route_name:'/mis/dashboard',
      menu:[],
      isLoading: false,
    };
  },
  mounted: function() {
    let user_info = this.$store.getters['auth/userInfo'];
    this.module_name = user_info['module'];
    this.setModule(this.module_name);
    this.loadData();
  },
  methods: {
    loadData: function() {
      this.getMenuList();
    },
    getGM: function() {
     return getMenu(this, this.module_name);
    },
    getMenuList: function() {
      this.$emit('emitMenus', this.getGM());
    },
    getSearchMenu:function(search_value = ''){
      this.search_menu_list = [];
      this.search_value = search_value;
      if(this.search_value.length >= 2) {
         this.is_search_menu = true;
         this.search_menu_list = getSearchGenerateMenu(this.getGM(), this.search_value);
      } else {
        this.search_menu_list = [];
        this.is_search_menu = false;
      }
    },
    setModule: function(module_name){
      this.is_first_setp_menu = true;
      this.is_second_step_menu = false;
      this.is_third_step_menu = false;
      this.is_search_menu = false,

      this.module_name = module_name;
      this.search_menu_list = [];
      this.all_search_menu_list = [];
      this.search_value = '';

      if(this.module_name == 'MIS') {
        this.menu_items = getMisMainMenu(this);
        this.dashboard_route_name = '/mis/dashboard';
      } else {
        // this.menu_items = getAisMainMenu(this);

        // this.dashboard_route_name = '/ais/dashboard';

      }
      this.getMenuList();
    },
    firstStepMenu: function(sub_moduel = '') {
      this.sub_moduel = sub_moduel;
      this.sub_menu = '';
      this.is_first_setp_menu = false;
      this.is_second_step_menu = true;
      this.is_third_step_menu = false;
      this.is_search_menu = false;
      this.first_menu_items = getGenterateMenu(this.getGM(), sub_moduel);
      this.$emit('emitMenus', this.first_menu_items, sub_moduel, 2);
    },
    secondStepMenu: function(sub_moduel='', sub_menu='', url = "") {
      this.sub_moduel = sub_moduel;
      this.sub_menu = sub_menu;
      this.is_second_step_menu = false;
      this.is_third_step_menu = true;
      this.is_search_menu = false;
      this.secodn_menu_items = getGenterateMenu(this.getGM(), sub_moduel, url, true);
      this.$emit('emitMenus',this.secodn_menu_items ,sub_moduel, 3);
    },
    handleBack() {
      this.is_search_menu = false;
      this.search_value = '';
      this.search_menu_list = [];
      if(this.is_second_step_menu) {
        this.is_first_setp_menu = true;
        this.is_second_step_menu = false;
        this.$emit('emitMenus', this.getGM(), 'Admin', 1);
      }
      if(this.is_third_step_menu) {
        this.$emit('emitMenus', this.first_menu_items, this.sub_moduel, 2);
        this.is_second_step_menu = true;
        this.is_third_step_menu = false;
      }
    },
    handleClear: function(){
      this.is_search_menu = false;
      this.search_value = '';
      this.search_menu_list = [];
      this.$emit('showMegaMenu', 1);
    }
  },
  computed: {
    isDisabledBack: function() {
      if(this.is_first_setp_menu) {
        return true
      }
      return false
    }
  }
};
</script>

<style scoped>
  input.delay {
  margin-bottom: 15px;
}

.loading-overlay {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(100, 100, 100, .5);
}

i.fa.fa-cog {
  font-size: 2.6em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>



