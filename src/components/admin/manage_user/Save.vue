<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col>
        <span v-if="show_error_message" v-for="row in this.errorMessage"
              class="custom-error-validation">{{ JSON.parse(row).error }}<br></span>
        <b-form @submit.prevent="validate_form">
          <FormGenerator v-if="is_load_schema" :schema="schema" :formValue="formData" @change="onChangeMethod"
                         :errorMessage="errorMessage"></FormGenerator>

          <div slot="footer" style="text-align:center;">
            <b-button type="submit" size="sm" variant="success" class="mr-2">
              <i class="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;{{ $t("save") }}
            </b-button>
            <b-button type="reset" size="sm" variant="warning" class="mr-2" @click.prevent="resetPage()">
              <i class="fa fa-reply"></i>&nbsp;{{ $t("reset") }}
            </b-button>
            <b-button size="sm" variant="danger" class="mr-2" @click.prevent="cancleModal()">
              <i class="fa fa-close"></i>{{ $t("cancel") }}
            </b-button>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script src="@/components/services/admin/manage_user/Save.js"></script>


