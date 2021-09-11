<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12">
        <div class="search">
          <fieldset>
            <legend>{{ $t("search") }}</legend>
            <b-form @submit.prevent="getReport()" class="report-search-form" autocomplete="off">
              <b-row>
                <b-col xs="12" lg="10">
                  <SearchFormGenerator v-if="is_form_loaded" :schema="SearchSchema" :formValue="SearchFormData"
                                       @change="onChangeMethod" :errorMessage="error_message"
                                       isSearch="'true'"></SearchFormGenerator>
                </b-col>
              </b-row>
            </b-form>
          </fieldset>
        </div>
        <b-card v-if="show_report">
          <ReportContainer v-html="report_view"></ReportContainer>
          <print-menu :params="params"></print-menu>
        </b-card>
      </b-col>

    </b-row>

  </div>

</template>

<script src="@/components/services/reports/fixed_assets/fixed_assets.js"></script>
