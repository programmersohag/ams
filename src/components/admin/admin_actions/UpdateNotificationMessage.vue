
<template>
    <div class="animated fadeIn entry-list">
        <b-row>
            <b-col xs="12" lg="12">
                <div class="search">
                    <fieldset>
                        <legend>{{ $t('search') }}</legend>
                        <b-form inline @submit.prevent="loadData(1)" autocomplete="off">
                            <td style="vertical-align:top">
                                <div class="formContainer" style="width:420px;">
                                    <label >Notification Message</label>
                                    <div class="form_input_container">
                                        <textarea v-model="search_form_data.txt_notification_message">
                                        </textarea>
                                    </div>
                                </div>
                            </td>
                            <td  style="vertical-align:top">
                                <div class="formContainer" style="width:500px;">
                                    <ol>
                                        <li>
                                            <input style="width:14px;" type="checkbox" id="yes" value="yes" name="yes" v-on:change="on_action_click_on_yes_checkbox($event)" v-model="click_on_yes"/>
                                            <label for="checkbox" style="width:60px;">Select MFI</label>
                                        </li>
                                    </ol>
                                    <div id="ex" style="border-bottom:0px;">
                                        <ol style="width:450px;">
                                            <li style="float:right">
                                                <table border="0" v-show="mfi_list_show">
                                                    <tr  v-for="(list, index) in mfi_lists">
                                                        <td style="width:30px;">
                                                            <input type="checkbox" name="mfi_name[]" style="float:left" :value="list" v-on:change="onCheckShowTxt(index)" v-model="chk_form_mfi_list[index]"/>
                                                        </td>
                                                        <td><label style="width:48px;">{{list}}</label></td>
                                                        <td><div style="" v-show="mfi_list_show_txt[index]">
                                                            <textarea v-model="txt_form_mfi_list[index]" id="" style="height:20px; width:330px;"></textarea>

                                                            </div></td>
                                                    </tr>
                                                    </table>
                                            </li>
                                        </ol>
                                        <input type="hidden" id="count" v-model="mfi_count" />
                                    </div>
                                </div>
                            </td>
                            <b-button type="submit" :disabled="isSearch" variant="primary" size="sm"><i class="fa fa-search fa-sm"></i>&nbsp;{{ $t("update") }}</b-button>&nbsp;
                        </b-form>
                    </fieldset>
                    <Loading :show="loading_show"></Loading>
                </div>

            </b-col>
        </b-row>
    </div>
</template>
<script src="@/components/services/admin/admin_actions/UpdateNotificationMessage.js"></script>

<style scoped>

</style>