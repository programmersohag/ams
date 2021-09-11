<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12">

        <b-card>
          <div slot="header">
            <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ page_title }}</h5>
          </div>
          <div class="table-responsive">
            <div>
              <CommonIndex
                :table_data="response_review"
                :table_head="head_information"
                :offset="pagination.offset"
                @customActionButton="customActionButton">
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
<script src="@/components/services/process/corrective_action_tools/index_execution.js"></script>

<style>
.card-body .report-table tr th {
  background-color: #8c8282;
}

.success {
  color: #fff;
  background-color: #28a745;
  width: 100%;
  border-radius: 5px;
  padding: 3px 5px;

}

.danger {
  color: #212529;
  background-color: #ffc107;
  width: 100%;
  border-radius: 5px;
  padding: 3px 5px;
}

.warning {
  color: #212529;
  background-color: #0ea5aa;
  width: 100%;
  border-radius: 5px;
  padding: 3px 5px;
}

.pending_tag {
  color: #212529;
  background-color: #00FFFF;
  width: 100%;
  border-radius: 5px;
  padding: 3px 5px;
}

.draft_tag {
  color: #212529;
  background-color: #FFF8DC;
  width: 100%;
  border-radius: 5px;
  padding: 3px 5px;
}

</style>
