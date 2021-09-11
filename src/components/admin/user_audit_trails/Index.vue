<template>
    <div class="animated fadeIn entry-list">
        <b-row>
            <b-col xs="12" lg="12">
                <div class="search">
                    <fieldset>
                        <legend>Search</legend>
                        <b-form inline @submit.prevent="getSearch" autocomplete="off">
                            <date-picker class="mr-1 form-control col-md-2 " id="txt_date_from"  date-format="yy-mm-dd"  
                             v-model = "search.date_from" :placeholder="$t('date_from')"></date-picker>
                            <date-picker class="mr-1 form-control col-md-2" id="txt_date_to"  date-format="yy-mm-dd"   v-model = "search.date_to" :placeholder="$t('date_to')"></date-picker>
                            <b-form-select v-if="Branch_list" v-model="search.cbo_branch"
                                            :plain="true"
                                            :options="Branch_list"
                                            value="Please select" class="mr-2 form-control col-md-2" >
                            </b-form-select>

                            <b-form-select v-model="search.cbo_user"
                                           :plain="true"
                                           :options="user_list"
                                           value="Please select" class="mr-2 form-control col-md-2" >
                            </b-form-select>

                            <b-form-select v-model="search.cbo_action"
                                           :plain="true"
                                           :options="action_info"
                                           value="Please select" class="mr-2 form-control col-md-2" >
                            </b-form-select>

                            <b-form-select v-model="search.cbo_entity"
                                           :plain="true"
                                           :options="tables_options"
                                           value="Please select" class="mr-2 form-control col-md-2" >
                            </b-form-select>
                           
                            <b-button type="submit"  variant="success" size="sm"><i class="fa fa-search fa-sm"></i>&nbsp;{{ $t("search") }}</b-button>&nbsp;
                            <b-button v-if="isSearch" variant="danger" size="sm" class="add" @click="handleReset()">
                                <i class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
                            </b-button>
                        </b-form>
                    </fieldset>
                </div>
                <b-card>
                    <div slot="header">
                        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp; {{ $t("user")+" "+$t("audit_trails") }}</h5>
                    </div>
                    <custom-modal v-if="viewInfo.isModalVisible"  :size="'lg'" @close="closeModal" :componentAddress="viewInfo.component_address" :title="viewInfo.title" :id="viewInfo.id"> </custom-modal>
                    <div class="table-responsive">
                        <div  v-if="total_rows>0">
                            <CommonIndex   
                            :table_data="userAuditTrails" 
                            :table_head="head_information" 
                            :offset="offset" 
                             v-on:view="viewModal"></CommonIndex>
                        </div>
                         <div v-else>
                            <h5 style="text-align:center; font-size:15px;margin-top:5px;">No data found!!</h5>
                        </div>

                    </div>
                    <pagination  class="paginate" :paginationData="total_rows" @pagination="getData"></pagination>

                </b-card>
            </b-col>
        </b-row>
    </div>

</template>

<script src="@/components/services/admin/user_audit_trails/Index.js"></script>