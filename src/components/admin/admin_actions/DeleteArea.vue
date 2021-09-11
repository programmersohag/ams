<template>
    <div class="animated fadeIn entry-list">
        <b-row>
            <b-col xs="12" lg="12">
                <div class="search">
                    <fieldset>
                        <legend>{{ $t('search') }}</legend>
                        <b-form inline @submit.prevent="loadData()" autocomplete="off">
                            <SearchFormGenerator :schema="search_schema" :formValue="search_form_data"></SearchFormGenerator>
                            <b-button type="submit" :disabled="isSearch" variant="primary" size="sm"><i class="fa fa-search fa-sm"></i>&nbsp;{{ $t("search") }}</b-button>&nbsp;
                            <b-button variant="danger" size="sm" class="add" @click.prevent="handleReset">
                                <i class="fa fa-ban fa-sm"></i>&nbsp;{{ $t("reset") }}
                            </b-button>
                        </b-form>
                    </fieldset>
                </div>
                <b-card>
                    <loading
                            :show="loading_show"
                            :label="loading_label">
                    </loading>

                    <div slot="header">
                        <custom-modal v-if="is_modal_visible" @close="closeModal" :componentAddress="component_address" :title="title" :id="edit_id"> </custom-modal>
                        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ $t('loan_purpose') }} {{ $t('list') }}</h5>
                        <b-button variant="info" size="sm" class="add" @click.prevent="customModal('')">
                            <i class="fa fa-plus fa-sm"></i>&nbsp;{{ $t('add') }}
                        </b-button>
                    </div>
                    <div class="table-responsive">
                        <div>
                            <CommonIndex :table_data="table_data" v-on:edit="customModal" :table_head="head_information" :offset="offset" @delete="loadData" :delete_info="delete_info"></CommonIndex>
                        </div>

                    </div>
                    <Pagination :paginationData=total_rows @pagination="loadData"></Pagination>
                </b-card>
            </b-col>
        </b-row>
    </div>

</template>

<script src="@/components/services/admin/admin_actions/DeleteArea.js"></script>

        
      