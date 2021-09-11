<template>
  <div class="animated fadeIn">
          <b-form @submit.prevent= "handleSubmit()"> 
              <FormGenerator v-if="is_form_loaded" :schema="schema" :formValue="formData" :errorMessage="errorMessage"></FormGenerator>
              <div slot="footer" style="text-align:center;">
              <b-button type="submit" :disabled="isSubmit" size="sm" variant="success" class="mr-2"><i class="fa fa-dot-circle-o"></i>&nbsp;{{ $t("submit") }} </b-button>
              <b-button type="reset" size="sm" variant="primary" class="mr-2" v-on:click.prevent="handleReset"><i class="fa fa-reply fa-lg mt-1.9"> </i>&nbsp;{{ $t("reset") }}</b-button>
              <b-button type="reset" size="sm" variant="danger" class="mr-2" v-on:click="handleCancel"><i class="fa fa-close fa-lg mt-1.9"></i>&nbsp;{{ $t("cancel") }}</b-button>              
              </div>
        </b-form>
  </div>
</template>

<script src="@/components/services/admin/manage_user_role/Save.js"></script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>