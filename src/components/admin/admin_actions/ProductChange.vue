<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12">
        <div class="search">
          <fieldset>
            <legend>{{ $t("search") }}</legend>
            <b-form inline @submit.prevent="handleSubmit" autocomplete="off">
              <SearchFormGenerator :schema="search_schema" :formValue="search_form_data" @change="onChangeMethod"></SearchFormGenerator>
              <b-button type="submit"  variant="primary" size="sm"><i class="fa fa-search fa-sm"></i>&nbsp;{{ $t("save") }}</b-button>&nbsp;
              <b-button variant="danger" size="sm" class="add" @click="clear()">
                <i class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
              </b-button>
            </b-form>
          </fieldset>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12" lg="12">
        <CommonIndex :table_data="change_products" :table_head="head_information" :offset="pagination.offset" @delete="loadData" :delete_info="delete_info"></CommonIndex>
      </b-col>
    </b-row>
    <loading :show="loading_show"></loading>
  </div>
</template>

<script src="@/components/services/admin/admin_actions/ProductChange.js"></script>
