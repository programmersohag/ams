<template>
    <div class="animated fadeIn entry-list">
        <b-row>
            <b-col xs="12" lg="12">
              <div class="search">
                <fieldset>
                      <legend>{{ $t("search") }}</legend>
                      <b-form v-if="is_form_loaded" inline @submit.prevent="loadData()" autocomplete="off">
                        <SearchFormGenerator :schema="search_schema" :formValue="search_form_data" @handleReset="clear" :isSearch="'true'" ></SearchFormGenerator>
                      </b-form>
                    </fieldset>
                  </div>

                <b-card>
                    <div slot="header">
                        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ $t("branch_notification_message") }}</h5>

                        <b-button variant="info" size="sm" class="add"  @click.prevent="customModal('')">
                            <i class="fa fa-plus fa-sm"></i>&nbsp;{{ $t('add') }}
                        </b-button>
                        <b-button v-if="showBatchEntry" variant="info" size="sm" class="add"  @click.prevent="customModal('show_batch_modal')">
                            <i class="fa fa-plus fa-sm"></i>&nbsp;{{ $t('add_batch') }}
                        </b-button>&nbsp;
                        <b-button v-if="showDeleteAll" variant="info" size="sm" class="add"  @click.prevent="deleteBatch">
                            <i class="fa fa-plus fa-sm"></i>&nbsp;{{ $t('delete')+" "+$t('all') }}
                        </b-button>
                    </div>
                    <custom-modal v-if="modal_info.isModalVisible" @close="closeModal" :componentAddress="modal_info.component_address" :title="modal_info.title" :id="modal_info.id"> </custom-modal>
                    <div>
                        <CommonIndex :table_data="notifications" :table_head="head_information" :offset="pagination.offset"  @delete="loadData" :delete_info="delete_info" v-on:edit="customModal"></CommonIndex>
                    </div>
                    <div slot="footer" class="cpagination">
                        <pagination v-if="(pagination.total_rows>0)" :paginationData=pagination.total_rows  @pagination="loadData" ></pagination>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>

</template>
<script src="@/components/services/admin/branch_notification_message/Index.js"></script>
