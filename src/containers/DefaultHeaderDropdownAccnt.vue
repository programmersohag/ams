<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <!-- <img
        src="img/avatars/6.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" /> -->
      <i style="font-size: 14px; color:white;" class="fa fa-user-circle"></i>&nbsp;<span class="user_name" style="font-size: 11px; color:white;position: relative;
top: 3px;"><strong>{{$store.getters['auth/userInfo'].name}}</strong></span>
    </template>
    <template slot="dropdown" class="dropdown_admin">
      <b-dropdown-item @click="profile"><i class="fa fa-user" />&nbsp;Profile</b-dropdown-item>
      <b-dropdown-item disabled=""><i class="fa fa-wrench" style="color:grey;"/>&nbsp;Settings</b-dropdown-item>
      <b-dropdown-item @click="language"><i class="fa fa-language" aria-hidden="true"></i>&nbsp;Language</b-dropdown-item>
      <b-dropdown-item @click="logout"><i class="fa fa-unlock" aria-hidden="true"></i>&nbsp;Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
    import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
    export default {
        name: 'DefaultHeaderDropdownAccnt',
        components: {
            AppHeaderDropdown
        },
        data: () => {
            return { itemsCount: 42 }
        },
        methods: {
            logout: function () {
                //console.log('logout')
                this.$store.dispatch('auth/logout')
                    .then(() => {
                        this.$router.push('/login')
                    });
                this.$store.dispatch('search/resetState');
            },
            language: function () {
                this.$router.push('/config/Language-labels/index')
            },
            profile: function () {
                this.$router.push('/admin/users/change-password')
            }
        }
    }
</script>
