<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12">
        <div class="search">
          <fieldset>
            <legend>{{ $t("search") }}</legend>
            <b-form inline @submit.prevent="loadData(0)" autocomplete="off">
              <SearchFormGenerator :schema="search_schema" :formValue="search_form_data" @change="onChangeMethod"></SearchFormGenerator>
              <b-button type="submit"  variant="primary" size="sm"><i class="fa fa-search fa-sm"></i>&nbsp;{{ $t("search") }}</b-button>&nbsp;
              <b-button variant="danger" size="sm" class="add" @click="clear()">
                <i class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
              </b-button>
            </b-form>
          </fieldset>
        </div>
        <b-card>
          <div slot="header">
            <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{title}}</h5>

            <!--<b-button variant="info" size="sm" class="add"  @click.prevent="customModal('')">
              <i class="fa fa-plus fa-sm"></i>&nbsp;{{ $t('add') }}
            </b-button>-->
          </div>
          <!--<custom-modal v-if="modal_info.isModalVisible" @close="closeModal" :componentAddress="modal_info.component_address" :title="modal_info.title" :id="modal_info.id"> </custom-modal>-->
          <div>
            <CommonIndex :table_data="invalid_repayment_info" :table_head="head_information" :offset="pagination.offset" v-on:view="loanDetails" @customActionButton="customAction"></CommonIndex>
          </div>
          <div slot="footer" class="cpagination">
            <pagination v-if="(pagination.total_rows>0)" :paginationData=pagination.total_rows  @pagination="loadData" ></pagination>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <loading :show="loading_show"></loading>
  </div>
</template>

<script src="@/components/services/admin/admin_actions/GetInvalidRepaymentAmount.js"></script>

<style scoped></style>
