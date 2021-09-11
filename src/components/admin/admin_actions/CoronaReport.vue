
<template>
    <div class="animated fadeIn entry-list">
        <b-row>
            <b-col xs="12" lg="12">
                <div class="search">
                    <fieldset>
                        <legend>Search</legend>

                        <b-form inline @submit.prevent="loadData()" autocomplete="off">

                            <b-form-group
                                    :label='this.$t("branch")'
                                    label-for="year"
                                    :label-cols="3"
                                    :horizontal="true" class="ml-2 mr-1">

                                <select class="form-control mb-2 mr-sm-2 mb-sm-0" autocomplete="off"
                                        name = 'cbo_branch'
                                        v-validate="'required'" :data-vv-as="this.$t('branch')" v-model="cbo_branch"
                                >
                                    <option
                                            v-for="(branch_info, branch_id) in branch_options"
                                            :value="branch_id"
                                            :key="branch_id"
                                    >{{branch_info}}
                                    </option>
                                </select>
                                <form-error :message="errors.first('cbo_branch') || errorMessage['cbo_branch']"> </form-error>
                            </b-form-group>

                            <b-form-group
                                    :label='this.$t("month")'
                                    label-for="year"
                                    :label-cols="3"
                                    :horizontal="true" class="mr-1">
                                <select class="form-control mb-2 mr-sm-2 mb-sm-0" autocomplete="off"
                                        name = 'cbo_month'
                                        v-validate="'required'"  :data-vv-as="this.$t('month')" v-model="cbo_month"
                                >
                                    <option
                                            v-for="(month_info, month_id) in months"
                                            :value="month_id"
                                            :key="month_id"
                                    >{{month_info}}
                                    </option>
                                </select>
                                <form-error :message="errors.first('cbo_month') || errorMessage['cbo_month']"> </form-error>
                            </b-form-group>

                            <b-form-group
                                    :label='this.$t("year")'
                                    label-for="year"
                                    :label-cols="3"
                                    :horizontal="true" class="ml-2 mr-1">
                                <select class="form-control mb-2 mr-sm-2 mb-sm-0" autocomplete="off"
                                        name = 'cbo_year'
                                        :data-vv-as="this.$t('year')"
                                        v-validate="'required'" v-model="cbo_year"
                                >
                                    <option
                                            v-for="year_id in year"
                                            :value="year_id"
                                            :key="year_id"
                                    >{{year_id}}
                                    </option>
                                </select>
                                <form-error :message="errors.first('cbo_year') || errorMessage['cbo_year']"> </form-error>
                            </b-form-group>

                            <b-button type="submit" variant="primary" size="sm"><i class="fa fa-search fa-sm"></i>&nbsp;{{$t('preview')}}</b-button>
                        </b-form>
                    </fieldset>
                </div>
                <b-card>
                    <div slot="header">
                        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{$t('corona_report')}}</h5>
                    </div>

                    <table class="table table-bordered report-table table-striped">
                        <thead>
                        <th>#</th>
                        <th width="25%">Recoverable Amount(Before Reschedule)</th>
                        <th width="25%">Reschedule Due Amount</th>
                        <th width="25%">Loan Outstanding (Only Re-schedule Member)</th>
                        <th width="25%">No. of Reschedule Loan </th>
                        </thead>

                        <tbody>

                            <tr>
                                <td>{{i=i+1}}</td>
                                <td>{{report_data['principal_recoverable_amount']}}</td>
                                <td>{{report_data['due']}}</td>
                                <td>{{report_data['loan_outstanding']}}</td>
                                <td>{{report_data['no_reschedule_loan']}}</td>
                            </tr>



                        </tbody>


                    </table>


                    <Loading :show="loading_show"></Loading>
                </b-card>
            </b-col>
        </b-row>
    </div>

</template>

<script src="@/components/services/admin/admin_actions/CoronaReport.js"></script>
