<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="6">
          <b-row>
            <b-col cols="12">
              <b-card header-tag="header" footer-tag="footer">
                <b-form @submit.prevent="handleSubmit" autocomplete="off">
                  <b-form-group
                      :label='this.$t("samity") + this.$t("name") +" "+this.valid_star'
                      label-size="sm"
                      :label-cols="3"
                      :horizontal="true">
                    <vue-bootstrap-typeahead class="form-control form-control-sm col-md-9"
                                             :data="samity_info"
                                             v-model="samity_search"
                                             v-validate="'required'"
                                             size="sm"
                                             name="samity"
                                             :serializer="s => s.samity_name"
                                             placeholder="Type a name or code..."
                                             @hit="selectSamity($event)">

                      <template slot="suggestion" slot-scope="{ data, htmlText }">
                        <span v-html="htmlText"></span>
                        <br>
                        <small>{{ data.samity_name }}-{{ data.samity_code }}</small>
                        <br>
                        <small>Branch: {{ data.branch_name }}</small>
                      </template>
                    </vue-bootstrap-typeahead>
                    <form-error :message="errors.first('samity') || validation_error['txt_samity_id']"> </form-error>
                  </b-form-group>

                  <FormGenerator v-if="is_form_load" :schema="schema" :formValue="formData" :errorMessage="error_message"></FormGenerator>
                  <div slot="footer" class="submit">
                    <b-button type="submit" class="add"  size="sm" variant="success"><i class="fa fa-save fa-sm"></i>&nbsp;{{ $t("save") }}</b-button>&nbsp;
                    <b-button type="reset" variant="primary" class="add" size="sm" @click.prevent="handleReset"><i class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}</b-button>&nbsp;
                    <b-button type="reset" size="sm" variant="danger" class="mr-2" @click.prevent="handleCancel"><i class="fa fa-close fa-lg mt-1.9"></i>{{ $t("cancel") }}</b-button>
                  </div>
                </b-form>
              </b-card>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="6" v-if="single_samity_info.code">
          <b-row>
            <b-col cols="12">
              <b-card
                  header-tag="header"
                  footer-tag="footer">
                <div slot="header">
                  <i class="fa fa-align-justify"></i><strong> Samity's Information </strong>
                </div>
                <table border="1">
                  <tr>
                    <th>{{ this.$t('samity') }} ( {{ this.$t('code') }} ):</th>
                    <td>{{ single_samity_info.code }}</td>
                  </tr>
                  <tr>
                    <th>{{ this.$t('samity') }} ( {{ this.$t('type') }} ):</th>
                    <td>{{ single_samity_info.samity_type }}</td>
                  </tr>
                </table>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script src="@/components/services/admin/admin_actions/UpdateSamityType.js"></script>
