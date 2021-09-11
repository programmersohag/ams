<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12">
        <div class="search">
          <fieldset>
            <legend>{{ $t("search") }}</legend>
            <b-form inline @submit.prevent="loadData(0)" autocomplete="off">
              <SearchFormGenerator
                :schema="search_schema"
                :formValue="search_form_data"
                :offset="pagination.offset"
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
              @click="add">
              <i class="fa fa-plus fa-sm"></i>&nbsp;{{ $t("add") }}
            </b-button>
          </div>
          <AuditIndex :table_data="passbook_balances"
                      @view="view"
                      @submit="submit"
                      @delete="customDelete"
                      @edit="add">
          </AuditIndex>
          <Pagination v-if="(pagination.total_rows>0)" :paginationData=pagination.total_rows
                      @pagination="loadData"></Pagination>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script src="@/components/services/audit_executions/passbook_balances/Index.js"></script>

