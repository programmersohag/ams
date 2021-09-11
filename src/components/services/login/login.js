import Logo from '@/components/login/Logo';
import { loadLanguageAsync } from '@/shared/lan/i18n-setup';
import CustomModal from '@/containers/Modal';
import { URL_INFO } from '@/shared/common/constants';
export default {
    name: 'Login',
    components:{
    Logo,
    CustomModal
  },
    data(){
		return {
            serviceList:[
                {name:"Document MGMT", link:"", icon:"document"},
                {name:"Ticket System", link:"", icon:"ticket-system"},
                {name:"Data Analysis", link:"", icon:"data-analysis"},
                {name:"Cashless", link:"", icon:"cashless"},
                {name:"Inevntory MGMT", link:"", icon:"inevntory"},
                {name:"Co- Operative", link:"", icon:"co-operative"},
                {name:"Agent Banking", link:"", icon:"agent-banking"},
                {name:"Message Center", link:"", icon:"message-center"},
                {name:"eKYC", link:"", icon:"ekyc"},
                {name:"HR Management", link:"", icon:"hrm"},
                {name:"Biometric", link:"", icon:"biometric"},
                {name:"SMS Service", link:"", icon:"sms"},
            ],
            modalInfo:{
                id:'',
                isModalVisible: false,
                title: '',
                componentAddress: "login/View"
            },
            password : "",
            userName:"",
            submitted: false,
            isInvalid: false,
            current_year: '',
            cssTopImg:URL_INFO['SYMLINK_BASE_URL']+"/img/login/right-top.png",
            cssBottomImg:URL_INFO['SYMLINK_BASE_URL']+"/img/login/left-bottom.png"
            // cssTopImg:"/img/login/right-top.png",
            // cssBottomImg:"/img/login/left-bottom.png"
        }
    },
    mounted: function(){
        var d = new Date();
        this.current_year = d.getFullYear();
    },
    methods: {
        login: function () {
        this.submitted = true;
        const { userName, password } = this;
        let mfi_name = (window.location.pathname.replace(/[^\w\s]/gi,'').trim()).split('_');
        mfi_name = mfi_name[0];
        this.$store.dispatch('auth/login', { userName, password, mfi_name })
        .then(() => {
          if(this.$store.getters['auth/authStatus'] == 'error') {
            this.isInvalid = true
            this.submitted = false
            this.userName = ''
            this.password = ''
            return
          }
          this.$store.dispatch('config/getGeneralConfig').then(() => {
            //todo: user policy
            this.$store.dispatch("users/getPolicy");
          }).then(() => {
            let user_info = this.$store.getters['auth/userInfo'];
            if(this.$i18n.messages['en'] != undefined && user_info['lan'] != "en") {
              this.$i18n.setLocaleMessage("en", {})
            }
            if(this.$i18n.messages['bn'] != undefined && user_info['lan'] != "bn") {
              this.$i18n.setLocaleMessage("bn", {})
            }
              loadLanguageAsync(user_info['lan']);
           // }
          })
          // .then(() => {
          //   this.$store.dispatch("admin/getNotifications");
          // })
          .then(() => {
            this.$router.push('/mis/dashboard')
          });
        })
        .catch((err) => {
         // console.log(err)
          if(this.$store.getters['auth/authStatus'] == 'error') {
            this.isInvalid = true
            this.submitted = false
            this.userName = ''
            this.password = ''
            return
          }
         // console.log(err)
          })
		   	},
        handleView: function(row) {
            this.modalInfo.title = row['name'];
            this.modalInfo.id = '';
            this.modalInfo.isModalVisible = true;
        },
        closeModal: function() {
            this.modalInfo.isModalVisible = false;
        }
    },
    computed: {
        loggingIn: function() {
            if(this.userName && this.password) {
                return false
            }
            return true
        }
    }
}
