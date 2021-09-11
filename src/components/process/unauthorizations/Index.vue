<template>
    <div class="animated fadeIn entry-list">
        <b-row>
            <b-col xs="12" lg="12">
                 <div class="search">
                    <fieldset>
                        <legend>{{ $t("search") }}</legend>
                        <b-form inline @submit.prevent="searchData()" autocomplete="off">
                            <SearchFormGenerator 
                                :schema="search_schema" 
                                :formValue="search_form_data"
                                :isSearch="'true'"
                                @handleReset="handleReset">
                            </SearchFormGenerator>
                        </b-form>
                    </fieldset>
                </div>
                <b-card>
                    <div slot="header">
                        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ $t("transaction")+" "+$t('unauthorization') }} As on&nbsp;{{current_date}}</h5>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered no-record-found" v-if="Object.keys(transaction_authorizations).length == 0">
                            <thead>
                                <tr>
                                    <th>{{$t('unauthorization_not_found_message')}}</th>
                                </tr>
                            </thead>
                        </table>
                        <table class="table table-bordered report-table" v-else>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>{{ $t("samity_code") }}</th>
                                    <th>{{ $t("samity_name") }}</th>
                                    <th>{{ $t("loan")+" "+$t('disbursement')+" "+$t('amount') }}</th>
                                    <th>{{ $t("saving")+" "+$t('collection')+" "+$t('amount') }}</th>
                                    <th v-if="is_SKT_required == 1">{{ $t("skt")+" "+$t('collection')+" "+$t('amount') }}</th>
                                    <th v-if="is_SKT_required == 1">{{ $t("skt")+" "+$t('withdraw')+" "+$t('amount') }}</th>
                                    <th>{{ $t("withdraw")+" "+$t('amount') }}</th>
                                    <th>{{ $t("loan")+" "+$t('transaction')+" "+$t('amount') }}</th>
                                    <th>{{ $t("actions") }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, key, index) in transaction_authorizations" :key="key">
                                    <td class="text-center">{{index+1}}</td>
                                    <td class="text-center">{{row.samity_code}}</td>
                                    <td>{{row.samity_name}}</td>
                                    <td class="text-right">{{row.loan_amount}}</td>
                                    <td class="text-right">{{row.deposit_amount}}</td>
                                    <td class="text-right" v-if="is_SKT_required == 1">{{row.skt_collection_amount}}</td>
                                    <td class="text-right" v-if="is_SKT_required == 1">{{row.skt_withdraw_amount}}</td>
                                    <td class="text-right">{{row.withdraw_amount}}</td>
                                    <td class="text-right">{{row.transaction_amount}}</td>
                                    <td class="text-center">
                                        <div class="btn-action">
                                            <b-button
                                                id="viewbtn"
                                                title="View"
                                                size="sm"
                                                @click.prevent="handleView(row.samity_id)"
                                                variant="primary"
                                                class="mr-1 btnpad">
                                                <i class="fa fa-eye"></i>
                                            </b-button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <th class="text-center" colspan="3">{{totalVal.total}}</th>
                                <th class="text-right">{{totalVal.total_loan_amount}}</th>
                                <th class="text-right">{{totalVal.total_deposit_amount}}</th>
                                <th class="text-right" v-if="is_SKT_required == 1">{{totalVal.total_skt_collection_amount}}</th>
                                <th class="text-right" v-if="is_SKT_required == 1">{{totalVal.total_skt_withdraw_amount}}</th>
                                <th class="text-right">{{totalVal.total_withdraw_amount}}</th>
                                <th class="text-right">{{totalVal.total_loan_transaction_amount}}</th>
                                <th>&nbsp;</th>
                            </tfoot>

                        </table>
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <Loading :show="loading_show"></Loading>
    </div>
</template>
<script src="@/components/services/process/unauthorizations/Index.js"></script>


