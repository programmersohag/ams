<template>
   <div class="animated fadeIn">
        
                <b-form @submit.prevent="handleSubmit" autocomplete="off">

                    <b-form-group
                            label-size="sm"
                            :label='this.$t("module_name")+this.valid_star'
                            label-for="cbo_mode_of_payment"
                            :label-cols="4"
                            :horizontal="true"
                    >
                        <b-form-select  name='cbo_branch' v-validate="'required'" v-model="inputForm.module_name"
                                        :plain="true"
                                        :options="cbo_module_name_options"
                                        value="Please select" data-vv-as="period"

                        >
                        </b-form-select>
                        <span v-if="formErrors['module_name'] " class="text-danger">{{ formErrors['module_name'] }}</span>
                    </b-form-group>

                    <b-form-group
                            label-size="sm"
                            :label='this.$t("label_name") +this.valid_star'
                            label-for="txt_closing_date"
                            :label-cols="4"
                            :horizontal="true"
                    >
                        <b-form-input
                                class="form-control col-md-12"
                                name="Transaction Date"
                                v-validate="'required'"
                                v-model="inputForm.label_name"

                                type="text"
                                autocomplete="off"
                        ></b-form-input>
                        <!--<span v-show="errors.has('type_of_deposit Date')" class="text-danger">{{ errors.first('type_of_deposit Date') }}</span>-->
                        <span v-if="formErrors['label_name'] " class="text-danger"  v-html=" formErrors['label_name']"  ></span>
                    </b-form-group>
                    <b-form-group
                            label-size="sm"
                            :label='this.$t("lang_english") +this.valid_star'
                            label-for="txt_closing_date"
                            :label-cols="4"
                            :horizontal="true"
                    >
                        <b-form-input
                                class="form-control col-md-12"
                                name="Transaction Date"
                                v-validate="'required'"
                                v-model="inputForm.lang_english"
                                type="text"
                                autocomplete="off"
                        ></b-form-input>
                        <!--<span v-show="errors.has('type_of_deposit Date')" class="text-danger">{{ errors.first('type_of_deposit Date') }}</span>-->
                        <span v-if="formErrors['lang_english'] " class="text-danger">{{ formErrors['lang_english'] }}</span>
                    </b-form-group>


                    <b-form-group
                            label-size="sm"
                            :label='this.$t("lang_bengali") +this.valid_star'
                            label-for="txt_closing_date"
                            :label-cols="4"
                            :horizontal="true"
                    >
                        <b-form-input
                                class="form-control col-md-12"
                                name="Transaction Date"
                                v-validate="'required'"
                                v-model="inputForm.lang_bengali"
                                type="text"
                                autocomplete="off"
                                accept-charset="utf-8"
                        ></b-form-input>
                        <!--<span v-show="errors.has('type_of_deposit Date')" class="text-danger">{{ errors.first('type_of_deposit Date') }}</span>-->
                        <span v-if="formErrors['lang_bengali'] " class="text-danger">{{ formErrors['lang_bengali'] }}</span>
                    </b-form-group>





                    <div slot="footer" class="submit text-center mb-2">
                        <b-button type="submit" class="add" size="sm" variant="success"><i class="fa fa-save fa-sm"></i>&nbsp;{{
                            $t("save") }}
                        </b-button>
                        &nbsp;
                        <b-button type="reset" variant="primary" class="add" size="sm" @click.prevent="handleReset"><i
                                class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
                        </b-button>
                        &nbsp;
                        <b-button type="reset" size="sm" variant="danger" class="mr-2" @click.prevent="handleCancel"><i
                                class="fa fa-close fa-lg mt-1.9"></i>&nbsp;{{ $t("cancel") }}
                        </b-button>
                    </div>
                </b-form>

            </b-col>

        </b-row>
    </div>
</template>
<script src="@/components/services/configs/languages/Save.js"></script>
