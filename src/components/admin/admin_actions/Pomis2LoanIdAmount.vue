
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

                            <b-form-group
                                    :label='this.$t("service_charge")'
                                    label-for="year"
                                    :label-cols="3"
                                    :horizontal="true" class="mr-1">
                                <select class="form-control mb-2 mr-sm-2 mb-sm-0" autocomplete="off"
                                        name = 'cbo_service_charge'
                                        id = 'cbo_service_charge'
                                        v-validate="'required'" :data-vv-as="this.$t('service_charge')" v-model="cbo_service_charge"
                                >
                                    <option
                                            v-for="(service_charge_info,service_charge_id) in service_charge"
                                            :value="service_charge_id"
                                            :key="service_charge_id"
                                    >{{service_charge_info}}
                                    </option>
                                </select>
                                <form-error :message="errors.first('cbo_service_charge') || errorMessage['cbo_service_charge']"> </form-error>
                            </b-form-group>

                            <b-button type="submit" variant="primary" size="sm"><i class="fa fa-search fa-sm"></i>&nbsp;{{$t('preview')}}</b-button>
                        </b-form>
                    </fieldset>
                </div>
                <b-card>
                    <div slot="header">
                        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{$t('pomis_2A_new_due_loan_list')}}</h5>
                    </div>

                    <table class="table table-bordered report-table table-striped">
                        <thead>
                            <th>#</th>
                            <th>{{this.$t('loan_code')}}</th>
                            <th>{{this.$t('amount')}}</th>
                            <th>{{this.$t('action')}}</th>
                        </thead>

                        <tbody>
                            <tr v-show="false">
                                <span v-show="false">
                                        {{total = 0}}
                                        {{i = 0}}
                                </span>
                            </tr>
                            <template v-for="(amount,loan_id) in pomis_2_due_loan">
                                <tr>
                                    <td>{{i=i+1}}</td>
                                    <td>{{loan_code[loan_id]}}</td>
                                    <td>{{amount}}</td>
                                    <td @click="loanView(loan_id)"><i class="fa fa-search"></i></td>
                                </tr>
                                <tr v-show="false">
                                <span v-show="false">
                                        {{total += amount}}
                                </span>
                                </tr>
                            </template>

                            <tr>
                                <th colspan='2' align='center'> {{this.$t('total')}} </th>
                                <th>{{total}}</th>
                                <th></th>
                            </tr>
                        </tbody>


                     </table>
                   
                   
                    <Loading :show="loading_show"></Loading>
                </b-card>
            </b-col>
        </b-row>
    </div>

</template>

<script src="@/components/services/admin/admin_actions/Pomis2LoanIdAmount.js"></script>
