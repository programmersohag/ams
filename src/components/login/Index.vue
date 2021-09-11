<template>

<b-row>
    <b-col>
        <b-row>

            <div class="col-sm-7 image_section">
                <div class="row">

                <div class="col-sm-7">
                    <img src="img/login_image.gif" style='height: 100%; width: 100%; object-fit: contain'>
                </div>
                <div class="col-sm-5">
                <div class="row">
                    <b-col lg="12">
                            <div class="login-card-header text-center">
                                <span>
                                    <!-- <img src="img/microfinance_logo.gif" /> -->
                                   <span class="logo_text"><img class="navbar-brand-full" src="img/next_audit_big.png" alt="Microfin360 Next Logo"></span>
                                </span>
                            </div>
                        </b-col>
                        <b-col lg="12">
                            <div class="form-group login-card-header-bottom">
                                <p class="text-center">Sign in to your account</p>
                            </div>
                </b-col>

                    <div class="col-md-12">

                 <div class="login-card-form">
                    <b-form @submit.prevent="login">
                                    <b-alert show v-if="isInvalid" variant="danger">User Name or Password Is Invalid !!!</b-alert>
                                    <b-input-group class="mb-3" style="padding-top:1rem;">
                                        <b-input-group-prepend><b-input-group-text><i class="icon-user" style="color:#8b5cf6 !important; font-weight:bold;"></i></b-input-group-text></b-input-group-prepend>
                                            <b-form-input type="text" v-model="userName" class="form-control" :class="{ 'is-invalid': submitted && !userName }" placeholder="Username" autocomplete="off" />
                                            <b-form-invalid-feedback>
                                            User name is required
                                            </b-form-invalid-feedback>
                                        </b-input-group>
                                        <b-input-group class="mb-4">
                                            <b-input-group-prepend><b-input-group-text><i class="icon-lock" style="color:#8b5cf6 !important; font-weight:bold;"></i></b-input-group-text></b-input-group-prepend>
                                            <b-form-input type="password" v-model="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" placeholder="Password" autocomplete="off" />
                                            <b-form-invalid-feedback>
                                            Password is required
                                            </b-form-invalid-feedback>
                                        </b-input-group>
                                        <b-button type="submit" :disabled="loggingIn" variant="primary" class="px-4">Login</b-button>

                    </b-form>
                    <b-row>
                        <b-col>
                            <div class="login-card-footer mt-4">
                                <p>Copyright &copy; 2020- {{current_year}} <br><a href="http://www.datasoft-bd.com" target="_blank" class="companyLink">DataSoft Systems Bangladesh Ltd.</a></p>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </div>
                </div>
                </div>
            </div>
        </b-row>
    </b-col>
</b-row>



</template>
<script src="@/components/services/login/login.js"></script>
<style scoped>
    .row {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-right: 0px;
        margin-left: 0px;
    }
   .single-service-col{
        margin-bottom: 14.5px;
        padding: 0px 7.2px;
    }
    .single-service-col a{
        overflow: hidden;
        display: block;
        cursor: pointer;
    }
    .single-service-col a:hover{
        background: linear-gradient(180deg, #01b8ff52 0%, #0177b8d9 100%);
        border-radius: 8px;
    }
    .sigle-service{
        opacity: 0.5;
        border: 1px solid #2D58A7;
        box-sizing: border-box;
        border-radius: 8px;
        height: 83px;
        padding-top: 14.5px;
        padding-left: 14px;
    }
    /* .single-service:hover{
        background: linear-gradient(180deg, #01B8FF 0%, #0177B8 100%);
        border-radius: 8px;
    } */
    .sigle-service img{
        /* background: linear-gradient(180deg, #01B8FF 0%, #0177B8 100%); */
        width: 31px;
        height: 42px;
        margin-top: -6px;
    }
    .sigle-service h3{
        font-family: "Muli";
        font-style: normal;
        font-weight: bold;
        font-size: 13.8px;
        line-height: 7px;
        text-align: left;
        padding-top: 10.5px;
        color: #333333;
    }
   div.login-card{
        position: relative;
        background: black;
        /* border-radius: 20px; */
        height: 100%;
        padding: 0px 86px;
        margin-top: 40px;
    }
   div.login-card:before{
        position: absolute !important;
        width: 100%;
        height: 100%;
        content: "";
        position: relative;
        top: 0px;
        right: 0px;
        /* background-image: var(--cssTopImg); */
        background-repeat: no-repeat;
        background-position: top right;
        background-size: auto;
    }
    div.login-card:after{
        position: absolute !important;
        width: 100%;
        height: 100%;
        content: "";
        position: relative;
        bottom: 0px;
        left: 0px;
        /* background-image: var(--cssBottomImg); */
        background-repeat: no-repeat;
        background-position: left bottom;
        background-size: auto;
    }
    div.login-card-header{
        /* padding-top: 120px; */
    }
     div.login-card-header img{
        width: 130px;
        height: 82px;
    }
     div.login-card-header span{
        font-family: Muli;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 42px;
        color: var(--font-color);
    }
    div.login-card-header-bottom{
        margin-top: 37px;
    }
    div.login-card-header-bottom p{
        font-family: Muli;
        font-style: normal;
        font-weight: 600;
        font-size: 19px;
        line-height: 10px;
        color: #F1F9FF;
    }
    div.login-card-form{
        margin-top: 25px;
         position: relative;
        z-index: 99999;
    }
    div.login-card-form button{
        background: #8b5cf6 !important;
        border-radius: 8px;
        font-family: Muli;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
        color: white !important;
        border: none;
        width: 100%;
        height: 40px;
    }
    div.fb-like{
        margin-top: 55px;
         position: relative;
        z-index: 99999;
    }
    div.fb-like .pluginSkinLight {
        color:#fff;
    }
    div.login-card-footer{
        position: relative;
        z-index: 99999;
    }
    div.login-card-footer p{
        font-family: Muli;
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        line-height: 14px;
        text-align: center;
        color: var(--font-color);
    }
    div.login-card-footer p a{
        color: var(--font-color);
    }

    .right_column{
        padding-right:0; padding-left:6%;
    }
    .image_section{
        background:#35393e;
        padding-left:30px;
        padding-right:30px;
        border-radius:10px;
        padding-top:30px;
        margin-top: 4%;
        padding-bottom:50px;
        border-top:2px solid #8b5cf6 !important;
    }

    @media (min-width: 1024px) and (max-width: 1220px) {

       div.login-card{
        position: relative;
        background: linear-gradient(305deg, #2D58A7 0%, #508ABD 100%);
        /* border-radius: 20px; */
        height: 100%;
        padding: 0px 86px;
    }

    div.login-card-header-bottom p{
        font-size: 18px;
    }
    .right_column{
        padding-right:0; padding-left:4%;
    }
     div.login-card-header img{
        width: 46px;
        height: 35px;
    }

    div.login-card-header span{
        font-size: 20px;
    }
    .sigle-service h3{
        font-size: 13px;
    }

    }

       @media (max-width: 780px) {

       .image_section img{
            display: none;
        }
        .app, app-dashboard, app-root {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            min-height: 100vh;
       }
       }



</style>
