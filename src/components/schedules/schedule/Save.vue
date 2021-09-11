<template>
  <div class="animated fadeIn entry-form">
    <b-form @submit.prevent="handleSubmit" autocomplete="off">
      <FormGenerator v-if="is_form_load" :schema="schema" :formValue="formData" @change="onChangeMethod"
                     :errorMessage="error_message"></FormGenerator>
      <div slot="footer" class="text-center">
        <b-button type="submit" class="add" size="sm" variant="success"><i
          class="fa fa-save fa-sm"></i>&nbsp;{{ $t("save") }}
        </b-button>&nbsp;
        <b-button type="reset" variant="primary" class="add" size="sm" @click.prevent="handleReset"><i
          class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
        </b-button>&nbsp;
        <b-button type="reset" size="sm" variant="danger" class="mr-2" @click.prevent="handleCancel"><i
          class="fa fa-close fa-md"></i>{{ $t("cancel") }}
        </b-button>
      </div>
    </b-form>
  </div>
</template>
<script src="@/components/services/schedules/schedule/Save.js"></script>
<style scoped>
</style>
