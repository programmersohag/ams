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
                @handleReset="clear"
                :isSearch="'true'">
              </SearchFormGenerator>
            </b-form>
          </fieldset>
        </div>
        <b-card>
          <custom-modal v-if="modal_info.isModalVisible" @close="closeModal"
                        :componentAddress="modal_info.component_address" :title="modal_info.title"
                        :id="modal_info.id"></custom-modal>
          <div slot="header">
            <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ page_title }}</h5>
            <b-button
              variant="info"
              size="sm"
              class="add"
              @click.prevent="customModal">
              <i class="fa fa-plus fa-sm"></i>&nbsp;{{ $t("add") }}
            </b-button>
          </div>
          <div class="table-responsive">
            <div>
              <AuditIndex
                :table_data="generalInfo"
                @view="customViewModal"
                @edit="customModal"
                @submit="submit"
                @delete="customDelete"
                :is_common_delete="'false'">
              </AuditIndex>
            </div>
          </div>
          <Pagination v-if="(pagination.total_rows>0)" :paginationData=pagination.total_rows
                      @pagination="loadData"></Pagination>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script src="@/components/services/audit_executions/general_info/index.js"></script>
