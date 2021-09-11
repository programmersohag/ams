<template>
    <div class="animated fadeIn entry-list">
        <b-row>
            <b-col xs="12" lg="12">
                <div class="search">
                    <fieldset>
                        <legend>{{ $t("search") }}</legend>
                        <b-form v-if="is_form_loaded" inline @submit.prevent="getAutoVoucherBatchInsert()" autocomplete="off">  
                            <SearchFormGenerator 
                            :schema="SearchSchema" 
                            :formValue="SearchFormData"></SearchFormGenerator>                          
                            <b-button type="submit" variant="primary" size="sm"><i class="fa fa-search fa-sm"></i>&nbsp;{{ $t("batch_insert") }}</b-button>&nbsp;
                        </b-form>                        
                    </fieldset>
                </div>
                
            </b-col>
        </b-row>
    </div>

</template>

<script src="@/components/services/admin/admin_actions/AutoVoucherBatchInsert.js"></script>
