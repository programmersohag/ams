<template>
  <b-tabs>
    <b-tab>
      <template slot="title">
        <!-- <i class='icon-settings'></i> -->
        <div  class= "theme_changer_closer" @click="themeCloser" style="height: 11px;">
          <i class="fa fa-close" style="font-size:18px"></i>
      </div>
      </template>
      <div class="p-3">
        <h6>Theme Setting</h6>
        <div class="aside-options">
          <div class="clearfix mt-4">
            <small><b>Change Color</b></small>
          </div>
          <div>
            <div class="gradient-color center-align">
              <span v-for="(value,key) in $theme_colors['default']"
                    :key="key"
                    v-bind:class="'navbar-color-option ' + key + ' ' + ((isActiveColor == key) ? 'active' : '')"
                    v-bind:style="'background: ' + value['700']"
                    @click="changeColor(key)"></span>
            </div>
          </div>
        </div>
        <!-- <div class="aside-options">
          <div class="clearfix mt-3">
            <small><b>Select theme</b></small>
          </div>
          <div>
            <select class="form-control sm-2" v-model="selectedTheme" @change="changeTheme" >
              <option value="default">Default</option>
              <option value="prottoy">Prottoy</option>
              <option value="bijoy">Bijoy</option>
            </select>
          </div>
        </div> -->
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import { Switch as cSwitch } from '@coreui/vue'
import Style from "./normal_forms/Style";
export default {
  name: 'DefaultAside',
  components: {
      Style,
    cSwitch
  },
    data() {
      return {
          isActiveColor: this.$store.getters['auth/userInfo'].theme_color,
          isActive: 1,
          user:this.$store.getters['auth/userInfo'],
          selectedTheme: this.$store.getters['auth/userInfo'].theme
      }
    },
    mounted() {
        this.loadData();
    },

    methods: {
      themeCloser: function() {
            $(".sidebar-minimizer").click(); 
            $(".theme_change_default_icon").click();
            $(".theme_changer").show();
      },

        loadData: function () {
            //console.log(this.$store.getters['auth/userInfo']);
            //console.log(StorageService.getUserInfo());
        },
        changeColor: function (color) {
            this.$store.dispatch('auth/updateThemeColor', color);
            this.isActiveColor = color;
            //console.log("ssssss", this.$store.getters['auth/userInfo'])
            let params = {
                theme_color: color,
                theme: this.selectedTheme
            }
            this.$http_service.put("/auth-api/users/update_theme", JSON.stringify(params))
                .then(response => {
                    if (response.data.code == 201) {
                        //this.$toast.success({title: response.data.status, message: response.data.message});
                    }
                    else {

                    }
                })
                .catch(error => {
                    console.log(error.response);
                })
        },
        changeTheme: function () {
            this.$store.dispatch('auth/updateTheme', this.selectedTheme);
            let params = {
                theme: this.selectedTheme,
                theme_color: this.$store.getters['auth/userInfo'].theme_color
            }
            this.$http_service.put("/auth-api/users/update_theme", JSON.stringify(params))
                .then(response => {
                    if (response.data.code == 201) {
                        window.location.reload();
                        //this.$toast.success({title: response.data.status, message: response.data.message});
                    }
                    else {

                    }
                })
                .catch(error => {
                    console.log(error.response);
                })
        }
  },

}
</script>
<style>
  /* .navbar-color-option {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    margin: 5px;
    cursor: pointer;
  } */
  /*.gradient-color .red {*/
    /*background: #d32f2f;*/
  /*}*/

  /*.gradient-color .purple {*/
    /*background: #7b1fa2;*/
  /*}*/

  /*.gradient-color .default {*/
    /*background: #0288d1;*/
  /*}*/
  /*.gradient-color .pink {*/
    /*background: #c2185b;*/
  /*}*/
  /*.gradient-color .indigo {*/
    /*background: #303f9f;*/
  /*}*/
  /*.gradient-color .blue {*/
    /*background: #1976d2;*/
  /*}*/
  /*.gradient-color .cyan {*/
    /*background: #0097a7;*/
  /*}*/
  /*.gradient-color .teal {*/
    /*background: #00796b;*/
  /*}*/
  /*.gradient-color .deeppurple {*/
    /*background: #512da8;*/
  /*}*/

  .gradient-color span{
    border-radius: 50px;
    border: 3px solid #fff;
  }

  .gradient-color.selected{
    -webkit-box-shadow: 0 0 10px 3px #03a9f4;
    box-shadow: 0 0 10px 3px #03a9f4;
  }
  /* .navbar-color-option:hover {
    padding: 15px;
  } */
  .gradient-color .active {
    -webkit-box-shadow: 0 0 10px 3px #03a9f4;
    box-shadow: 0 0 10px 3px #03a9f4;
  }
  .navbar-color-option {

    display: inline-block;
    position: relative;
    width: 24px;
    height: 24px;
    margin: 5px;
    cursor: pointer;

}
</style>


<style>

</style>
