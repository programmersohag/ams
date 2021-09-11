<template>

  <b-card style="text-align: center">
    <div slot="header"  class="text-danger" >
      <h1> 404</h1>
      <h3> Error: Access Denied </h3>
    </div>
    <div>
      <h6>You are not authorized to view this requested page.<br/></h6>
    </div>
  </b-card>

</template>

<script>
  export default {
    name: "Error404",
    methods: {
      goToDashboard: function () {
        let module_name = (this.$store.getters['auth/userInfo']['module'] == "MIS") ? "mis" : "ais";
        this.$router.push('/' + module_name + '/dashboard');
      },
    }
  }
</script>

<style scoped>

</style>
