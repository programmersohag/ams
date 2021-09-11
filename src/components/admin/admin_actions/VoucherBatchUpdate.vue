<template>
  <div class="animated fadeIn">
    <b-form @submit.prevent="handleSubmit" autocomplete="off">
      <FormGenerator v-if="is_form_load" :schema="schema" :formValue="formData" :errorMessage="error_message"></FormGenerator>
      <div slot="footer" class="submit">
        <b-button v-if="!this.id" :disabled="errors.any() || isSubmit" type="submit"  size="sm" variant="success"><i class="fa fa fa-save"></i>{{ $t("save") }}</b-button>
        <b-button v-else type="submit" :disabled="errors.any() || isSubmit"  size="sm" variant="success"><i class="fa fa fa-save"></i>{{ $t("update") }}</b-button>
        &nbsp;<b-button type="reset" variant="primary" class="add" size="sm" @click.prevent="handleReset"><i class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}</b-button>&nbsp;
      <b-button type="reset" size="sm" variant="danger" class="mr-2" @click.prevent="handleCancel"><i class="fa fa-close fa-lg mt-1.9"></i>{{ $t("cancel") }}</b-button>
      </div>
    </b-form>
  </div>
</template>
<script src="@/components/services/admin/admin_actions/VoucherBatchUpdate.js"></script>
