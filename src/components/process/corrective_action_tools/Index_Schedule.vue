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
          <div slot="header">
            <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ page_title }}</h5>
          </div>

          <div class="table-responsive">
            <div>
              <CommonIndex
                :table_data="schedules"
                :table_head="head_information"
                :offset="pagination.offset"
                @view="customView"
                :is_common_delete="'false'">
              </CommonIndex>
            </div>
          </div>
          <Pagination v-if="(pagination.total_rows>0)" :paginationData=pagination.total_rows
                      @pagination="loadData"></Pagination>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script src="@/components/services/process/corrective_action_tools/Index_Schedule.js"></script>
