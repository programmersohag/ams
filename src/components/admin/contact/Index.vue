<template>
    <div class="animated fadeIn entry-list">
      <b-row>
        <b-col xs="12" lg="12">
          <div class="search">
            <fieldset>
              <legend>{{ $t("search") }}</legend>
              <b-form v-if="is_form_loaded" inline @submit.prevent="loadData()" autocomplete="off">
                <SearchFormGenerator :schema="search_schema" :formValue="search_form_data" :isSearch="'true'" ></SearchFormGenerator>
              </b-form>
            </fieldset>
          </div>

          <b-card>
            <div slot="header">
              <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ $t("contact_info") }}</h5>
            </div>
            <custom-modal v-if="modal_info.isModalVisible" @close="closeModal"> </custom-modal>
            <div>
              <CommonIndex :table_data="notifications" :table_head="head_information" :offset="pagination.offset"></CommonIndex>
            </div>
            <div slot="footer" class="cpagination">
              <pagination v-if="(pagination.total_rows>0)" :paginationData=pagination.total_rows  @pagination="loadData" ></pagination>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>

</template>
<script src="@/components/services/admin/contact/Index.js"></script>
