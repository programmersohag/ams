<template>
    <div class="animated fadeIn entry-list">
        <b-row>
            <b-col xs="12" lg="12">
                <div class="search">
                    <fieldset>
                        <legend>{{ $t('search') }}</legend>
                        <b-form inline @submit.prevent="loadData(1)" autocomplete="off">
                            <select  class="form-control mb-2 mr-sm-2 mb-sm-0 col-md-1" id="cbo_branch" title="Branch" @change="getSamityList">
                                <option value="">All Branch</option>
                                <option
                                        v-for="option in branches"
                                        :value="option.id"
                                        :key="option.id"
                                >{{ option.code}} - {{ option.name}}
                                </option>
                            </select>
                            <select class="form-control mb-2 mr-sm-2 mb-sm-0 col-md-1" id="cbo_samity" title="Samity" v-model="search_form_data.samity_id">
                                <option value="0" >--Select Samity--</option>
                                <option
                                        v-for="option in samities"
                                        :value="option.id"
                                        :key="option.id" v-if="option.id>0"

                                >{{ option.name}}
                                </option>
                            </select>
                            <select class="form-control mb-2 mr-sm-2 mb-sm-0 col-md-1" id="cbo_product" title="Product" v-model="search_form_data.product_id">
                                <option value="-1">All Product</option>{{product_options}}
                                <option
                                        v-for="(item,index) in product_options"
                                        :value="item.product_id"
                                        :key="item.product_id"
                                >{{ item.product_code}} - {{item.product_mnemonic}}
                                </option>
                            </select>
                            <select class="form-control mb-2 mr-sm-2 mb-sm-0 col-md-1" title="Consider" id="cbo_consider" v-model="search_form_data.cbo_consider">
                                <option
                                        v-for="(item,index) in consider"
                                        :value="index"
                                        :key="index"
                                >{{ item }}
                                </option>
                            </select>
                            <b-form-input
                                    v-model="search_form_data.name"
                                    type="text"
                                    class="form-control mb-2 mr-sm-2 mb-sm-0 col-md-1"
                                    placeholder="Loan Code"
                                    title="Loan Code"
                                    size="sm"
                            ></b-form-input>
                            <b-form-checkbox id="chk_update_transactions"  v-model="search_form_data.chk_update_transactions" class="mt-2"><p style="font-size:12px;">Update Transactions</p></b-form-checkbox>
                            <b-button type="submit" :disabled="isSearch" variant="primary" size="sm"><i class="fa fa-search fa-sm"></i>&nbsp;{{ $t("update") }}</b-button>&nbsp;
                        </b-form>
                    </fieldset>
                </div>

            </b-col>
        </b-row>
    </div>
</template>
<script src="@/components/services/admin/admin_actions/UpdateLoans.js"></script>
<style scoped>

</style>
