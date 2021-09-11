<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col xs="12" lg="12">
        <!-- <b-card> -->
           <div class="tab" role="tabpanel">
          <b-tabs v-model="tabIndex[0]">
            <b-tab v-for="(row, key) in schema" :key="key">
              <template slot="title">
                <i :class="tabs_icons[key]"></i> {{tabs[key]}}
              </template>

              <div class="wrapper">
                <div class="animated fadeIn">
                  <b-row>
                    <b-col cols="12">
                      <b-card footer-tag="footer">

                        <div slot="header">
                          <i class="fa fa-align-justify"></i><strong> {{ tab_label[key] }}</strong>         
                        </div>
                        <b-row>
                          <b-col cols="8">
                            <form v-on:submit.prevent="handleSubmit(key)">
                              <FormGenerator :schema="row" :formValue="formData[key]" :errorMessage="errorMessage" @change="onChangeMethod"></FormGenerator>
                              <div class="form-group">
                                <b-button type="submit"  :disabled="errors.any()" size="sm" variant="success" class="mr-2"><i class="fa fa-dot-circle-o"></i> {{ $t("submit") }} </b-button>
                                <b-button type="reset" size="sm" variant="primary" class="mr-2" v-on:click.prevent="handleReset"><i class="fa fa-reply fa-lg mt-1.9"> </i>&nbsp;{{ $t("reset") }}</b-button>
                              </div>                    
                            </form> 
                          </b-col>
                          <b-col cols="4">
                            <div v-if="is_show_sample_code[key]">
                              Sample Code
                              <hr>
                              {{ sample_code[key] }}                            
                            </div>
                          </b-col>
                        </b-row>                       
                        <!-- <p>{{formData[key]}}</p> -->
                      </b-card>
                    </b-col>
                  </b-row>
                </div>
              </div>
              
            </b-tab>
            
          </b-tabs>
           </div>
        <!-- </b-card> -->
      </b-col>
    </b-row>
  </div>
</template>
<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="@/assets/js/bootstrap.min.js" ></script>
<script src="@/components/services/configs/config_auto_ids/Index.js"></script>


<style src="@/assets/css/tab_design.css"></style>
<style scoped>
  .card-body .form-row .input-group{
    width:50%;
  }
</style>


