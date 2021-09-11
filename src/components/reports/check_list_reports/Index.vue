<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12">
        <div class="search">
          <fieldset>
            <legend>{{ $t("search") }}</legend>
            <b-form @submit.prevent="getReport()" class="report-search-form" autocomplete="off">
              <SearchFormGenerator :schema="SearchSchema" :formValue="SearchFormData" isSearch="'true'">>
              </SearchFormGenerator>
            </b-form>
          </fieldset>
        </div>
        <b-card v-if="show_report">
          <ReportContainer v-html="report_view"></ReportContainer>
          <print-menu :ReportTitle="title"></print-menu>
        </b-card>



        <div id="div-table" >
          <div id="report-header"><p>Check List Report</p></div>
          <table id="table">
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Code</th>
              <th>Check List Category</th>
              <th>Team Type</th>
              <th>Status</th>
            </tr>
            <tr v-for="(row,index) in rows">
              <td>{{ index + 1 }}</td>
              <td>{{ row.name }}</td>
              <td>{{ row.code }}</td>
              <td>[{{ row.cl_category_code }}]-{{ row.cl_category_name }}</td>
              <td>[{{ row.team_type_code }}]-{{ row.team_type_name }}</td>
              <td>{{ row.is_active }}</td>
            </tr>
          </table>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script src="@/components/services/reports/check_list_reports/Index.js"></script>
<style scoped>
table, th, td {
  border: 1px solid black;
}

th, td {
  padding: 10px;
}

#report-header{
  text-align: center;
  font-size: large;
  font-weight: bold;
  text-decoration: underline;
}

#table{
  margin-left: auto;
  margin-right: auto;
}
</style>

