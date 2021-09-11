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
                        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ $t("samity")+" "+$t('wise')+" "+$t('transaction')+" "+$t('unauthorization')+" "+$t('detail') }} As on {{current_date}}</h5>
                        <mf-button :btnType="'back'" :btnClass="'float-right'" />
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered no-record-found" v-if="Object.keys(transaction_authorizations_detail).length == 0">
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
                                    <th>{{ $t("member_code") }}</th>
                                    <th>{{ $t("member_name") }}</th>
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
                                <tr v-for="(row, key, index) in transaction_authorizations_detail" :key="key">
                                    <td class="text-center">{{index+1}}</td>
                                    <td class="text-center">{{row.code}}</td>
                                    <td>{{row.name}}</td>
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
                                                @click.prevent="handleView(row.member_id)"
                                                variant="primary"
                                                class="mr-1 btnpad">
                                                <i class="fa fa-eye"></i>
                                            </b-button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(row, key) in transaction_authorization_not_req_detail" :key="key">
                                    <td class="text-center"></td>
                                    <td class="text-center">{{row.code}}</td>
                                    <td>{{row.name}}</td>
                                    <td class="text-right">0.00</td>
                                    <td class="text-right">{{row.deposit_amount}}</td>
                                    <td class="text-right" v-if="is_SKT_required == 1">&nbsp;</td>
                                    <td class="text-right">{{row.withdraw_amount}}</td>
                                    <td class="text-right">{{row.transaction_amount}}</td>
                                    <td class="text-right">{{row.transaction_type}}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <th class="text-center">{{$t('total')}}</th>
                                <th colspan="2" class="text-center">{{totalVal.total}}</th>
                                <th class="text-right">{{totalVal.total_loan_amount}}</th>
                                <th class="text-right">{{totalVal.total_deposit_amount}}</th>
                                <th class="text-right" v-if="is_SKT_required == 1">{{totalVal.total_skt_collection_amount}}</th>
                                <th class="text-right"  v-if="is_SKT_required == 1">{{totalVal.total_skt_withdraw_amount}}</th>
                                <th class="text-right">{{totalVal.total_withdraw_amount}}</th>
                                <th class="text-right">{{totalVal.total_loan_transaction_amount}}</th>
                                <th>&nbsp;</th>
                            </tfoot>

                        </table>
                    </div>
                    <div slot="footer" class="text-right" v-if="Object.keys(transaction_authorizations_detail).length > 0">
                        <b-button variant="info" size="sm" class="add" @click.prevent="authorize()">
                            <i class="fa fa-plus fa-sm"></i>&nbsp;{{ $t("unauthorize")+" All "+$t('information') }}
                        </b-button>
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <Loading :show="loading_show"></Loading>
    </div>
</template>
<script src="@/components/services/process/unauthorizations/Detail.js"></script>


