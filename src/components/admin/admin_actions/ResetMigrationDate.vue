<template>
    <div class="animated fadeIn">
        <b-row >
            <b-col>

                <loading
                        :show="loading_show"
                        :label="loading_label">
                </loading>


                <b-form @submit.prevent="ResetMigrationDate()" autocomplete="off">
                    <b-form-group
                            :label='this.$t("migration_type") +this.valid_star'
                            label-for="basicText"
                            label-size="sm"
                            :label-cols="5"
                            :horizontal="true">
                        <select class="form-control col-md-12"
                                name="Migration Type"
                                v-validate="'required'"
                                title="Migration Type"
                                v-model="migration_type"
                        >
                            <option value="">Select</option>
                            <option value="clearAll">Clear Data upto Samity</option>
                            <option value="DeleteOpening">Delete All Transactions</option>
                            <option value="keepOpening">Keep Opening Transactions</option>

                        </select>

                        <span
                                v-if="is_error_msg_show"
                                v-show="errors.has('Migration Type')"
                                class="text-danger"
                        >{{ errors.first('Migration Type') }}</span>
                        <span
                                class="text-danger"
                                v-if="is_error_msg_show && errorMessage['migrationType'] != ''"
                        >{{errorMessage['migrationType']}}</span>

                    </b-form-group>

                    <b-form-group
                            :label='this.$t("branch") +this.valid_star'
                            label-for="basicText"
                            label-size="sm"
                            :label-cols="5"
                            :horizontal="true"
                    >
                        <select class="form-control col-md-12"
                                name="Branch"
                                v-validate="'required'"
                                title="Branch"
                                v-model="branch"
                        >
                            <option value="">Select</option>
                            <option
                                    v-for="option in branch_list"
                                    :value="option.branch_id"
                                    :key="option.branch_id"
                            >{{ option.branch_code}} - {{ option.branch_name}}</option>
                        </select>

                        <span
                                v-if="is_error_msg_show "
                                v-show="errors.has('Branch')"
                                class="text-danger"
                        >{{ errors.first('Branch') }}</span>
                        <span
                                class="text-danger"
                                v-if="is_error_msg_show && errorMessage['cbo_branch_id'] != ''"
                        >{{errorMessage['cbo_branch_id']}}</span>
                    </b-form-group>
                    <b-form-group
                            :label='this.$t("reset_migration_date") +this.valid_star'
                            label-for="basicText"
                            label-size="sm"
                            :label-cols="5"
                            :horizontal="true"
                    >
                        <date-picker name="Date" id="txt_date_from"  date-format="yy-mm-dd" :value="curr_migration_date"  v-model = "curr_migration_date" placeholder="Date" class="form-control"></date-picker>

                        <span
                                v-if="is_error_msg_show "
                                v-show="errors.has('Date')"
                                class="text-danger"
                        >{{ errors.first('Date') }}</span>
                        <span
                                class="text-danger"
                                v-if="is_error_msg_show && errorMessage['txt_migration_date'] != ''"
                        >{{errorMessage['txt_migration_date']}}</span>
                    </b-form-group>

                    <div slot="footer">
                        <div class="text-center">
                            <b-button type="submit" size="sm" variant="success" class="mr-2">
                                <i class="fa fa-dot-circle-o"></i>&nbsp;{{ $t("save") }}
                            </b-button>
                            <b-button type="reset" size="sm" variant="warning" class="mr-2" @click.prevent="resetPage()">
                                <i class="fa fa-reply"></i>&nbsp;{{ $t("reset") }}
                            </b-button>
                            <b-button size="sm" variant="danger"  class="mr-2" @click.prevent="cancleModal()">
                                <i class="fa fa-close"></i>&nbsp;{{ $t("cancel") }}
                            </b-button>
                        </div>
                    </div>
                </b-form>


            </b-col>

        </b-row>
    </div>
</template>

<script

        src="@/components/services/admin/admin_actions/ResetMigrationDate.js">

</script>


