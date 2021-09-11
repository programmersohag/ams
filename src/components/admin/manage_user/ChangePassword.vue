
<template>
    <div class="animated fadeIn entry-list">
       <!-- <access-denied v-if="is_access_denied==true"></access-denied> -->
        <b-row>            
             <div class="col-sm-12"> 
                <b-card>
                    <div slot="header">                        
                            <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ $t("Change Password") }}</h5>
                                
                    </div>
                    <div style="margin-top:20px;">
                    </div>   

                    <div style="margin-top:20px;" v-if="msg_password_grace_time != ''">
                        {{$msg_password_grace_time +'.'+" Please change it. "}}
                    </div>
                    <div class="row" style="display: flex;
                             justify-content: center;
                            align-items: center;"> 
                       
                   
                    <div class="col-sm-5 mt-0">  
                        <div class="change_password_box">                       
                        <b-form @submit.prevent="handleSubmit()" autocomplete="off">  
                            <div class="text-center change_passord_box_title mb-4">
                                <h5>Change Password</h5>
                            </div>
                        
                            <div>
                                <b-form-group
                                :label="$t('user') +' '+ $t('login')"
                                label-for="login"
                                label-size="sm"
                                :label-cols="3"
                                :horizontal="false">
                                <b-form-input name="login" :data-vv-as="$t('user') +' '+ $t('login')"
                                            v-validate="'required'" :class="{'is-invalid': errors.first('login') || errorMessage['login']}"
                                            :title="errors.first('login') || errorMessage['login']" id="login" type="text" v-model="login" readonly></b-form-input>
                                </b-form-group>
                            </div> 

                            <div>
                                <b-form-group
                                :label="$t('user_full_name')"
                                label-for="user_full_name"
                                label-size="sm"
                                :label-cols="3"
                                :horizontal="false">
                                <b-form-input name="full_name" :data-vv-as="$t('user_full_name')" v-validate="'required'" :class="{'is-invalid': errors.first('full_name') || errorMessage['full_name']}" :title="errors.first('full_name') || errorMessage['full_name']" id="full_name" type="text" v-model="full_name" readonly></b-form-input>         
                                </b-form-group>
                            </div>

                            <div>
                                <b-form-group
                                :label="$t('previous_password')+' <span class=\'required\'>*</span>'"
                                label-for="oldPassword"
                                label-size="sm"
                                :label-cols="3"
                                :horizontal="false">
                                <b-form-input name="oldPassword" :data-vv-as="$t('oldPassword')"
                                            v-validate="'required|max:40'"
                                            id="oldPassword" type="password" v-model="oldPassword"></b-form-input>
                                    <span v-show="errors.has('oldPassword')" class="text-danger">{{ errors.first('oldPassword') }}</span>
                                    <span v-if="errorMessage['oldPassword'] " class="text-danger">{{ errorMessage['oldPassword'] }}</span>
                                </b-form-group>

                            </div>

                            <div>
                                <b-form-group
                                :label="$t('new_password')+' <span class=\'required\'>*</span>'"
                                label-for="new_password"
                                label-size="sm"
                                :label-cols="3"
                                :horizontal="false">
                                <b-form-input name="password" :data-vv-as="$t('new_password')" v-validate="'required|min:8|max:40'"
                                            id="password" type="password" v-model="password" ref="password"></b-form-input>
                                    <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                                    <span v-if="errorMessage['newPassword'] " class="text-danger">{{ errorMessage['newPassword'] }}</span>
                                </b-form-group>

                            </div> 

                            <div>
                                <b-form-group
                                :label="$t('verify_new_password')+' <span class=\'required\'>*</span>'"
                                label-for="verify_new_password"
                                label-size="sm"
                                :label-cols="3"
                                :horizontal="false">
                                <b-form-input name="verify_password" :data-vv-as="$t('verify_new_password')"
                                            v-validate="'required|min:8|max:40|confirmed:password'"
                                            id="verify_password" type="password" v-model="verify_password"></b-form-input>
                                    <span v-show="errors.has('verify_password')" class="text-danger">{{ errors.first('verify_password') }}</span>

                                </b-form-group>
                            </div>                            
                                    
                            <div class="text-center mt-2">
                                
                                <b-button type="submit" size="sm"  class="mr-2" variant="success"><i class="fa fa-dot-circle-o"></i>&nbsp;{{ $t("submit") }}</b-button>
                                <b-button type="reset" size="sm" variant="primary" @click.prevent="handleReset"  class="mr-2"><i class="fa fa-reply mt-1.9"> </i>&nbsp;{{ $t("reset") }}</b-button> 
                                <b-button type="reset" size="sm" variant="danger" class="mr-2" @click.prevent="handleCancel"><i class="fa fa-close mt-1.9"></i>&nbsp;{{ $t("cancel") }}</b-button>
                                
                            </div> 
                          
                                         
                         </b-form> 
                     </div>                      
                    </div> 
                </div>
                    <div style="margin-top:20px;"></div> 
                </b-card>
                
            </div>            
        </b-row>
    </div>
    
</template>

<script src="@/components/services/admin/manage_user/ChangePassword.js"></script>

<style scoped>
.change_password_box{
    border-radius: 5px;
    padding:22px 35px;
    border-radius: 10px;
    background: var(--dashboard_deep_color);
    box-shadow:  2px 2px 6px #232323,
                -2px -2px 6px #2f2f2f;
    border: 0;

}
.change_passord_box_title{
    font-weight: bold;
    color: whitesmoke;
}
.change_passord_box_title h5{
    font-size: 20px;
}
</style>