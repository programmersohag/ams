import router from "@/router/index.js";
import API from "@/shared/common/API.js";
import FormError from "@/containers/FormError";

var manageUserAPI = new API();
var users = 'users';
manageUserAPI.createEntity({name: users});

export default {
    
    data() {
        return {
            user:{},
            login: '',
            full_name: '',
            oldPassword: '',
            password: '',
            verify_password: '',
            errorMessage: [],
            resetData: {},
            msg_password_grace_time: ''
        };
    },
    created() {
        /*manageUserAPI.endpoints.users.getRequest('change_password')
        .then(response=>{ 
            if(response.data.user){
                this.login = response.data.user['login']; 
                this.full_name = response.data.user['name']; 
            }             
        })*/
    },
    mounted() {
        this.user = this.$store.getters['auth/userInfo'];
        this.login = this.user.login;
        this.full_name = this.user.name;
    },
    methods: {
        handleSubmit: function () {                        
            this.$validator.validate().then(valid => {
                if (valid) {
                    var change_password =  {}
                    change_password['oldPassword'] = this.oldPassword;
                    change_password['newPassword'] = this.password;
                    var self = this;

                    this.$http_service.post("/ams-auth-api/users/update_password", JSON.stringify(change_password))
                        .then(response => {
                            console.log("heee",response.data );
                           // this.loading_show = false;
                            if (response.data.code == 200) {
                                this.flashMessage('Success',response.data.message);
                                router.push("/mis/dashboard");

                            }
                            else {
                                this.flashMessage('Failure',response.data.message);
                                router.push("/mis/dashboard");
                            }
                        })
                        .catch(error => {
                            var oldPassword = '';
                            var newPassword = '';

                            if(error.response.data.status == "BAD_REQUEST") {
                                for (var index = 0; index < error.response.data.errors.length; ++index) {
                                    var errors = JSON.parse(error.response.data.errors[index])
                                    var key = errors.field;
                                    if(key == 'oldPassword') {
                                        oldPassword = errors.error;
                                    }
                                    if (key == 'newPassword') {
                                        newPassword = errors.error;
                                    }
                                }
                                this.errorMessage = {
                                    'oldPassword': oldPassword,
                                    'newPassword': newPassword
                                }

                            }
                        })

                } 
            });

        },
        handleReset: function (event) {  
           // this.errorMessage = {};
            this.errors.clear(); 
            this.oldPassword= '';
            this.password= '';
            this.verify_password= '';  
        },
        handleCancel: function () {
            router.push("/mis/dashboard");
        }
    }
}
