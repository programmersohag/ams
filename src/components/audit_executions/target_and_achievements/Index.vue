<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12">
        <div class="search">
          <fieldset>
            <legend>{{ $t("search") }}</legend>
            <b-form inline @submit.prevent="findAuditMasterByScheduleId()" autocomplete="off">
              <SearchFormGenerator
                :schema="search_schema"
                :formValue="search_form_data"
                @handleReset="clear"
                :isSearch="'true'">
              </SearchFormGenerator>
            </b-form>
          </fieldset>
        </div>
        <b-card>
          <div slot="header">
            <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ page_title }}</h5>
            <b-button
              variant="info"
              size="sm"
              class="add"
              @click.prevent="add">
              <i class="fa fa-plus fa-sm"></i>&nbsp;{{ $t("add") }}
            </b-button>
          </div>
          <div class="table-responsive">
            <div>
              <AuditIndex
                :table_data="target_and_achievements"
                @view="view"
                @edit="edit"
                @submit="submit"
                @delete="customDelete"
              >
              </AuditIndex>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script src="@/components/services/audit_executions/target_and_achievements/Index.js"></script>
