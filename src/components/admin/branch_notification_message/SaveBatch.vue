<template>
  <div class="animated fadeIn entry-form">
    <b-form @submit.prevent="handleSubmit()">
      <b-form-group
          :label="$t('comment')+':'"
          label-for="txt_message"
          :label-cols="2"
          :horizontal="true">
        <b-form-textarea name="txt_message" id="txt_message" type="text"
                         v-model="txt_message"
                         v-validate="'required'"
                         :rows="3">
        </b-form-textarea>
        <form-error :message="errors.first('txt_message') || validation_error['txt_message']"> </form-error>
      </b-form-group>
      <b-form-group :label="$t('branch')+':'"
                    :label-cols="2"
                    :horizontal="true">
        <b-form-checkbox value="1" unchecked-value="0" @change="checkAll">
          {{$t("select_all")}}
        </b-form-checkbox>
        <br><br>
        <b-form-checkbox class="col-3" v-for="(option,key) in branches"
                         :key="key"
                         v-model="cbo_branch[key]"
                         :name="'branch[' + key + ']'"
                         :id="'branch[' + key + ']'">
          {{ option.branch_name }}
        </b-form-checkbox>

        <form-error :message="errors.first('branch') || validation_error['branch']"> </form-error>
      </b-form-group>

      <b-button type="submit" size="sm" variant="success"
                class="mr-2"><i class="fa fa-dot-circle-o"></i> {{ $t("save") }}
      </b-button>

      <b-button type="reset" size="sm" variant="primary" class="mr-2"
                v-on:click.prevent="handleReset"><i class="fa fa-reply fa-lg mt-1.9"> </i>{{
        $t("reset") }}
      </b-button>
      <b-button type="reset" size="sm" variant="danger" class="mr-2"
                v-on:click="handleCancel"><i class="fa fa-close fa-lg mt-1.9"></i>{{
        $t("cancel") }}
      </b-button>
    </b-form>
  </div>
</template>

<script src="@/components/services/admin/branch_notification_message/SaveBatch.js"></script>

<style scoped>

</style>
