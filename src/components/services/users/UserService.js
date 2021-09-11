export default {
  name: 'user-service',
  methods: {
    getUserById: function (userId) {
      return this.$http_service.get("/ams-auth-api/users/get_user/" + userId)
        .then(response => {
          if (response.data) {
            let user = response.data;
            return user[0];
          }
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }
  }
}
