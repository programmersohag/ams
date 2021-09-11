<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12" class="mt-2">
        <b-button class="float-right" @click.prevent="handleBack" size="sm" variant="danger"><i
          class="fa fa-backward"></i>&nbsp;{{ $t("back") }}
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12" lg="12">
        <b-col class="col-md-12 text-center mt-2">
          <h4>Location: {{ locationName }}</h4>
        </b-col>
        <b-col class="col-md-12 text-center">
          <h4>Schedule: {{ scheduleName }}</h4>
        </b-col>
        <b-form @submit.prevent="handlePreview" autocomplete="off">
          <b-card>
            <FormGenerator
              v-if="is_form_load"
              :schema="schema"
              @change="onChangeMethod"
              :formValue="formData"
              @handleReset="clear"
              :errorMessage="error_message">
            </FormGenerator>
          </b-card>
          <div slot="footer" class="text-center">
            <b-button type="submit" class="add" size="sm" variant="success"><i
              class="fa fa-plus fa-sm"></i>&nbsp;{{ $t("preview") }}
            </b-button>&nbsp;
            <b-button type="reset" variant="primary" class="add" size="sm" @click.prevent="handleReset"><i
              class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
            </b-button>
          </div>
        </b-form>
      </b-col>
      <b-col>
        <Preview v-if="preview_data.is_preview_show" :id="preview_data.id" :data="preview_data.data"></Preview>
      </b-col>
    </b-row>
  </div>
</template>
<script src="@/components/services/audit_executions/ongoing_program_average_positions/Edit.js"></script>
