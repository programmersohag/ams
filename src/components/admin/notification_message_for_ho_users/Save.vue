<template>
    <div class="animated fadeIn entry-list">
        <loading :show="loading_show"></loading>
        <b-row>
            <b-col></b-col>
            <b-col xs="12" lg="12">
                <b-card>
                    <div slot="header">
                       <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{title}}</h5>
                    </div>
                    <b-form @submit.prevent="handleSubmit()" class="pr-2 pl-2 pt-2 pb-2">
                        <b-form-group
                                :label='$t("message_caption_name")'
                                label-for="txt_title"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input name="txt_title" v-validate="'required'" autocomplete="off" id="txt_title"
                                          type="text" :value="txt_title" v-model="txt_title"></b-form-input>
                            <span v-show="errors.has('txt_title')" class="text-danger">{{ errors.first('txt_title') }}</span>
                            <span class="error-test" v-if="error_message['txt_title'] != ''">{{error_message['txt_title']}} </span>
                        </b-form-group>
                        <b-form-group
                                :label='$t("previous_description")'
                                label-for="description"
                                :label-cols="3"
                                :horizontal="true">
                            <div v-html="description"></div>
                        </b-form-group>
                        <b-form-group
                                :label='$t("new_description")'
                                label-for="txt_description"
                                :label-cols="3"
                                :horizontal="true"
                        >
                            <b-form-input name="txt_description" v-validate="'required'" autocomplete="off" id="txt_description"
                                          type="text" v-model="txt_description"></b-form-input>
                            <span v-show="errors.has('txt_description')" class="text-danger">{{ errors.first('txt_description') }}</span>
                            <span class="error-test" v-if="error_message['txt_description'] != ''">{{error_message['txt_description']}} </span>
                        </b-form-group>

                        <b-form-group
                                :label='$t("message_validity_period")'
                                label-for="txt_to_date"
                                :label-cols="3"
                                :horizontal="true">
                            <date-picker
                                    size="md"
                                    date-format="yy-mm-dd"
                                    name="txt_to_date"
                                    v-validate="'required'"
                                    v-model="txt_to_date"
                                    :data-vv-as="'date'"
                                    lang="en"
                                    format="YYYY-MM-DD"
                                    class="form-control"
                                    input-class="form-control form-control-sm"
                                    :editable="true">
                            </date-picker>
                        </b-form-group>



                    <div class="text-center"><br>

                        <b-button type="submit" size="sm" variant="success" class="mr-2"><i class="fa fa-dot-circle-o"></i>&nbsp;{{$t("submit")}}
                        </b-button>
                        <b-button type="reset" size="sm" variant="primary" class="mr-2" v-on:click="handleReset"><i
                                class="fa fa-reply fa-lg mt-1.9"> </i>&nbsp;{{$t("reset")}}
                        </b-button>
                        <b-button type="reset" size="sm" variant="danger" class="mr-2" v-on:click="handleCancel"><i
                                class="fa fa-close fa-lg mt-1.9"></i>&nbsp;{{$t("cancel")}}
                        </b-button>
                    </div>
                    </b-form>
                </b-card>
            </b-col>
            <b-col></b-col>
        </b-row>
    </div>
</template>

<script src="@/components/services/admin/notification_message_for_ho_users/Save.js"></script>

<style scoped>

</style>
