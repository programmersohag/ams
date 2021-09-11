<template>
    <div>
        <b-row>
            <b-col lg="12">
                <div class="box box-widget widget-user-2 box-member">
                    <div class="widget-user-header">
                        
                        <b-row>
                        <div class="col-3">
                            <h6 class="widget-user-desc">
                                <i class="fa fa-table"></i>&nbsp;{{ KpiList[kpi]+" "+$t("Rating") }}
                            </h6>
                        </div>
                        <div class="col-3 offset-md-6">
                            <b-form-select
                                size="sm"
                                :plain="true"
                                v-model="kpi"
                                :options="KpiList"
                                @change="onChangeRating($event)">
                            </b-form-select> 
                        </div>
                        </b-row>
                    </div>
                    <div class="animated fadeIn entry-list">
                        <div class="search">
                            <fieldset>
                                <b-form inline @submit.prevent="loadData(0)" autocomplete="off">
                                    <SearchFormGenerator 
                                        :schema="kpi == 3 ? loanSearchSchema : memberSearchSchema" 
                                        :formValue="kpi == 3 ? loanSearchFormData : memberSearchFormData" 
                                        @change="onChangeMethod"
                                        @handleReset="handleReset" 
                                        :isSearch="'true'" />
                                </b-form>
                            </fieldset>
                        </div>
                    </div>
                    <div class="box-footer frequency-chart" v-if="tableList.length > 0">
                        <div class="chart-table">
                            <CommonIndex 
                                v-if="isLoad"
                                :table_data="tableList" 
                                :table_head="kpi == 3 ? headerLoanInfo : headerMemberInfo" 
                                @customActionButton="customActionButton"
                                :offset="pagination.offset">
                            </CommonIndex>
                        </div>
                        <div slot="footer" class="cpagination paginate">
                            <Pagination v-if="(pagination.total_rows>0)" :paginationData="pagination.total_rows" @pagination="loadData"></Pagination>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script src="@/components/services/dashboard/dal2/RatingTable.js"></script>
<style scoped>
    .td-no-record{
        height: 282px;
        text-align: center;
        color: green;
        font-size: 16px;
    }
</style>