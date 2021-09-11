<template>
    <div>
        <b-row>
            <b-col lg="12">
                <div class="box box-widget widget-user-2 box-member">
                    <div class="widget-user-header">
                        <h6 class="widget-user-desc">
                            <i class="fa fa-table"></i>&nbsp;{{ $t("branch_status") }}
                        </h6>
                    </div>
                    <div class="box-footer frequency-chart">
                        <div class="table-responsive">
                            <table class="table table-bordered table-sm report-table chart-table">
                                <thead>
                                    <tr>
                                        <th style="vertical-align: middle;">#</th>
                                        <th style="vertical-align: middle;">{{this.$t("branch_name")}}</th>
                                        <th style="vertical-align: middle;">{{this.$t("software_start_date")}}</th>
                                        <th style="text-align: center;">{{this.$t("branch_date")}}</th>
                                        <th style="text-align: center;">{{this.$t("lag")}}</th>
                                    </tr>
                                </thead>
                                <tbody v-if="table_list.length > 0">
                                    <tr v-for="(row, key) in table_list" :key="key">
                                        <td>{{key+1}}</td>
                                        <td>{{row.name+"-"+row.code}}</td>
                                        <td>{{(branch_list[row.branchId] != undefined) ? $moment(branch_list[row.branchId]).format("DD MMM, YYYY") : ""}}</td>
                                        <td>{{$moment(row.branchDate).format("DD MMM, YYYY")}}</td>
                                        <td>{{row.lag}}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <th colspan="5" class="td-no-record">No Record Found</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <mf-loader v-if="isLoad" />
            </b-col>
        </b-row>
    </div>
</template>
<script src="@/components/services/dashboard/branch/BranchStatus.js"></script>
<style scoped>
    .td-no-record{
        height: 282px;
        text-align: center;
        color: green;
        font-size: 16px;
    }
</style>
