<template>
    <div>
        <b-row>
            <b-col lg="6">
            <div>
            <b-row>
                <b-col lg="12">
                    <div class="box box-widget widget-user-2 box-member">
                        <div class="widget-user-header">
                            <h6 class="widget-user-desc">
                                <i class="fa fa-table"></i>&nbsp;{{ $t("branch_value") }}
                            </h6>
                        </div>
                        <div class="box-footer frequency-chart">
                            <div class="table-responsive">
                                <table class="table table-bordered table-sm report-table chart-table">
                                    <thead>
                                    <tr>
                                        <th style="vertical-align: middle;">#</th>
                                        <th style="vertical-align: middle;">{{this.$t("branch_name")}}</th>
                                        <th style="vertical-align: middle;">{{this.$t("borrower")}}</th>
                                        <th style="text-align: center;">{{this.$t("outstanding")}}</th>
                                        <th style="text-align: center;">{{this.$t("balance")}}</th>
                                    </tr>
                                    </thead>
                                    <tbody v-if="table_lists.length > 0">
                                    <tr v-for="(row, key) in table_lists" :key="key">
                                        <td>{{(key+1) | vNumberConverter}}</td>
                                        <td>{{row.name+"-"+row.code}}</td>
                                        <td class="text-right">{{row.currentBorrower | vNumberFormat | vNumberConverter}}</td>
                                        <td class="text-right">{{Math.round(row.currentOutstandingAmount) | vNumberFormat | vNumberConverter}}</td>
                                        <td class="text-right">{{Math.round(row.savingBalance) | vNumberFormat | vNumberConverter}}</td>
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
                    <mf-loader v-if="isLoadValue" />
                </b-col>
            </b-row>
        </div>
            </b-col>

            <b-col lg="6">
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
            </b-col>
        </b-row>
        <b-button type="reset" size="sm" class="mr-2" @click="goBack()">
            <i class="fa fa-reply"></i>Go Back</b-button>
    </div>
</template>

<style>
    .box-footer {
        border-top: 1px solid #fff;
        padding: 10px;
        background-color: #fff;
    }
    .widget-user-2 .widget-user-header {
        background-color: #1E88E5;
    }

    .widget-user-2 .widget-user-desc {
        font-size: 14px;
        background-color: #1E88E5;
    }
    .td-no-record{
        height: 282px;
        text-align: center;
        color: green;
        font-size: 16px;
    }
</style>

<script src="@/components/services/dashboard/branch/BranchStatusAndBranchType.js"></script>

