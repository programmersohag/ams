<template>
    <div class="animated fadeIn entry-list">
        <b-row>
            <b-col xs="12" lg="12">
                <b-card>
                    <div slot="header">
                        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ $t("member")+" "+$t('wise')+" "+$t('transaction')+" "+$t('authorization')+" "+$t('detail') }} As on {{current_date}}</h5>
                         <mf-button :btnType="'back'" :btnClass="'float-right'" />
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered no-record-found" v-if="Object.keys(authorization_detail_member_wise).length == 0">
                            <thead>
                                <tr>
                                    <th>{{$t('authorization_not_found_message')}}</th>
                                </tr>
                            </thead>
                        </table>
                        <table class="table table-bordered report-table" v-else>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>{{ $t("type") }}</th>
                                    <th>{{ $t("id") }}</th>
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
                                <tr v-for="(row, key) in authorization_detail_member_wise" :key="key">
                                    <td class="text-center">{{key+1}}</td>
                                    <td v-if="(row.saving_deposit_id > 0) || (row.saving_withdraw_id > 0)">{{ $t("saving")}}</td>
                                    <td v-else-if="(row.loan_id > 0) || (row.loan_transaction_id)">{{ $t("loan")}}</td>
                                    <td v-if="(row.d_code != '0')">{{row.d_code}}</td>
                                    <td v-else-if="(row.w_code != '0')">{{row.w_code}}</td>
                                    <td v-else-if="(row.l_code != '0')">{{row.l_code}}</td>
                                    <td v-else-if="(row.lt_code != '0')">{{row.lt_code}}</td>
                                    <td v-else>-</td>
                                    <td class="text-right">{{row.loan_amount}}</td>
                                    <td class="text-right">{{row.deposit_amount}}</td>
                                    <td class="text-right" v-if="is_SKT_required == 1">{{row.skt_collection_amount}}</td>
                                    <td class="text-right" v-if="is_SKT_required == 1">{{row.skt_withdraw_amount}}</td>
                                    <td class="text-right">{{row.withdraw_amount}}</td>
                                    <td class="text-right">{{row.loan_transaction_amount}}</td>
                                    <td class="text-center">
                                        <div class="btn-action">
                                            <b-button
                                                id="Addbtn"
                                                title="Add"
                                                @click.prevent="singleAuthorize(row)"
                                                size="sm"
                                                variant="primary"
                                                class="mr-1 btnpad">
                                                {{ $t("authorize") }}
                                            </b-button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="text-right" slot="footer" v-if="Object.keys(authorization_detail_member_wise).length > 0">
                        <b-button variant="info" size="sm" class="add" @click.prevent="authorize()">
                            <i class="fa fa-plus fa-sm"></i>&nbsp;{{ $t("authorize")+" All "+$t('information') }}
                        </b-button>
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <Loading :show="loading_show"></Loading>
    </div>
</template>
<script src="@/components/services/process/authorizations/MemberDetail.js"></script>


