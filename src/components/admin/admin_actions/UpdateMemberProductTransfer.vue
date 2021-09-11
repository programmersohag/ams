<template>
    <div class="animated fadeIn">
        <b-row>

            <b-col md="6">
                <b-card>
                    <div slot="header">
                        <strong><i class="fa fa-plus-circle fa-lg" style="font-size:25px;color:green"></i> {{$t('update_member_primary_product')}}</strong>
                    </div>
                    <b-form @submit.prevent="handleSubmit()" autocomplete="off">
                        <b-form-group
                                :label= "$t('branch')"
                                label-for="branch"
                                label-size="sm"
                                :label-cols="3"
                                :horizontal="true">
                            <!--v-on:change="getOldBranch"-->

                            <select class="form-control mb-2 mr-sm-2 mb-sm-0" :data-vv-as="$t('branch')" v-validate="'required'" name='cbo_branch' v-model="cbo_branch" v-on:change="branchChange">
                                <option
                                        v-for="(branch_name,branch_id) in branch_options"
                                        :value="branch_id"
                                        :key="branch_id"

                                >{{ branch_name}}
                                </option>
                            </select>
                            <form-error :message="errors.first('cbo_branch') || errorMessage['cbo_branch']"> </form-error>
                        </b-form-group>

                        <b-form-group
                                :label= "$t('samity')"
                                label-for="samity"
                                label-size="sm"
                                :label-cols="3"
                                :horizontal="true">

                            <select class="form-control mb-2 mr-sm-2 mb-sm-0" :data-vv-as="$t('samity')" v-validate="'required'" name='cbo_samity' v-model="cbo_samity" v-on:change="samityChange">
                                <option
                                        v-for="samity_info in samity_options"
                                        :value="samity_info.value"
                                        :key="samity_info.value"

                                >{{ samity_info.text}}
                                </option>
                            </select>
                            <form-error :message="errors.first('cbo_samity') || errorMessage['cbo_samity']"> </form-error>
                        </b-form-group>

                        <b-form-group
                                :label= "$t('current_primary_product')"
                                label-for="current_primary_product"
                                label-size="sm"
                                :label-cols="3"
                                :horizontal="true">
                            <!--v-on:change="getOldBranch"-->

                            <select class="form-control mb-2 mr-sm-2 mb-sm-0" :data-vv-as="$t('current_primary_product')" v-validate="'required'" name='cbo_current_primary_product' v-model="cbo_current_primary_product" v-on:change="productChange">
                                <option
                                        v-for="row in primary_product_list"
                                        :value="row.value"
                                        :key="row.value"

                                >{{ row.text}}
                                </option>
                            </select>

                            <form-error :message="errors.first('cbo_current_primary_product') || errorMessage['cbo_current_primary_product']"> </form-error>
                        </b-form-group>

                        <b-form-group
                                :label= "$t('member_name')"
                                label-for="member_name"
                                label-size="sm"
                                :label-cols="3"
                                :horizontal="true">

                            <select class="form-control mb-2 mr-sm-2 mb-sm-0" :data-vv-as="$t('member_name')" v-validate="'required'" name='cbo_member' v-model="cbo_member" v-on:change="memberChange">
                                <option
                                        v-for="row in member_list"
                                        :value="row.value"
                                        :key="row.value"

                                >{{ row.text}}
                                </option>
                            </select>
                            <label class="float-right"> {{member_no_notification}}</label>
                            <form-error :message="errors.first('cbo_member') || errorMessage['cbo_member']"> </form-error>
                        </b-form-group>

                        <b-form-group
                                :label= "$t('new_primary_product')"
                                label-for="cbo_product"
                                label-size="sm"
                                :label-cols="3"
                                :horizontal="true">
                            <!--v-on:change="getOldBranch"-->

                            <select class="form-control mb-2 mr-sm-2 mb-sm-0" :data-vv-as="$t('new_primary_product')" v-validate="'required'" name='cbo_product' v-model="cbo_product" >
                            <option
                            v-for="row in new_product_list"
                            :value="row.value"
                            :key="row.value"

                            >{{row.text}}
                            </option>
                            </select>
                            <form-error :message="errors.first('cbo_product') || errorMessage['cbo_product']"> </form-error>
                        </b-form-group>

                        <b-form-group
                                label="Transfer Date"
                                label-for="txt_transfer_date"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input name="txt_transfer_date" :data-vv-as="$t('transfer_date')" v-validate="'required'" id="txt_transfer_date" type="text" v-model = "txt_transfer_date" disabled></b-form-input>
                            <form-error :message="errors.first('txt_transfer_date') || errorMessage['txt_transfer_date']"> </form-error>

                        </b-form-group>

                        <b-form-group
                                label="Note"
                                label-for="txt_note"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input name="txt_note" id="txt_note" type="text" v-model = "txt_note"></b-form-input>

                        </b-form-group>
                        <div slot="footer">
                            <b-button type="submit" size="sm" variant="success" class="mr-2"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                            <b-button type="reset" size="sm" variant="primary" class="mr-2" @click.prevent="handleReset"><i class="fa fa-reply fa-lg mt-1.9"> </i>Reset</b-button>
                            <b-button type="reset" size="sm" variant="danger" class="mr-2" @click.prevent="handleCancel"><i class="fa fa-close fa-lg mt-1.9"></i>Cancel</b-button>
                        </div>

                    </b-form>
                </b-card>
            </b-col>

        </b-row>
    </div>
</template>

<script src="@/components/services/admin/admin_actions/UpdateMemberProductTransfer.js"></script>
