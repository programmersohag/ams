<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> {{ tab_label }}</strong>         
            </div>
            <form v-on:submit.prevent="handleSubmit">
              <FormGenerator :schema="schema" :formValue="formData" :errorMessage="errorMessage" @change="onChangeMethod"></FormGenerator>
              <div class="form-group">
                <b-button type="submit"  :disabled="errors.any()" size="sm" variant="success" class="mr-2"><i class="fa fa-dot-circle-o"></i> {{ $t("submit") }} </b-button>
                <b-button type="reset" size="sm" variant="primary" class="mr-2" v-on:click.prevent="handleReset"><i class="fa fa-reply"> </i>&nbsp;{{ $t("reset") }}</b-button>
                <!-- <b-button type="reset" size="sm" variant="danger" class="mr-2" v-on:click="handleCancel"><i class="fa fa-close fa-lg mt-1.9"></i>{{ $t("cancel") }}</b-button> -->
              </div>                    
            </form>            

    <!-- <p>      
     {{formData}}
    </p> -->

    </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script src="@/components/services/configs/config_generals/ConfigGeneral.js"></script>