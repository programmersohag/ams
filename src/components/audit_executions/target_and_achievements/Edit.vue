<template>
  <div class="animated fadeIn entry-form">
    <b-form @submit.prevent="handleSubmit" autocomplete="off">
      <FormGenerator v-if="is_form_load" :schema="schema" :formValue="form_data"  @change="onChangeMethod" :errorMessage="error_message"></FormGenerator>
      <div slot="footer" class="text-center">
        <b-button type="submit" class="add"  size="sm" variant="success"><i class="fa fa-save fa-sm"></i>&nbsp;{{ $t("update") }}</b-button>&nbsp;
        <b-button type="reset" size="sm" variant="danger" class="mr-2" @click.prevent="handleCancel"><i class="fa fa-close fa-md"></i>{{ $t("cancel") }}</b-button>
      </div>
    </b-form>
  </div>
</template>
<script src="@/components/services/audit_executions/target_and_achievements/Edit.js"></script>
<style scoped>

</style>
