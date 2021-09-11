<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12" class="mt-2">
        <b-button class="float-right" @click.prevent="handleBack" size="sm" variant="danger"><i
          class="fa fa-backward"></i>&nbsp;{{ $t("back") }}
        </b-button>
      </b-col>
      <b-col xs="12" lg="12">

        <b-form @submit.prevent="handleSubmit()" autocomplete="off">
          <b-card>
            <b-col class="col-md-12 text-center mt-4">
              <h5>Location: {{ locationName }}</h5>
            </b-col>
            <b-col class="col-md-12 text-center">
              <h5>Schedule: {{ scheduleName }}</h5>
            </b-col>

            <FormGenerator
              v-if="is_parent_form_load"
              :schema="parent_schema"
              :formValue="parent_form_data"
              @change="onChangeMethod"
              :errorMessage="parent_error_message"
              style="margin-left:38%;">
            </FormGenerator>

            <NormalForm
              v-if="is_child_form_load"
              :schema="child_schema"
              :formValue="child_form_data"
              @change="onChangeMethod"
              :errorMessage="child_error_message">
            </NormalForm>
          </b-card>
          <div slot="footer" class="text-center">
            <b-button type="submit" class="add" size="sm" variant="success"><i
              class="fa fa-plus fa-sm"></i>&nbsp;{{ $t("add") }}
            </b-button>&nbsp;
            <b-button type="reset" variant="primary" class="add" size="sm" @click.prevent="handleReset"><i
              class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
            </b-button>
          </div>
        </b-form>
        <b-card>
          <custom-modal v-if="modal_info.isModalVisible" @close="closeModal"
                        :componentAddress="modal_info.component_address"
                        :title="modal_info.title" :id="modal_info.id"></custom-modal>
          <div slot="header">
            <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ page_title }}</h5>
          </div>
          <div class="table-responsive">
            <CommonIndex
              :table_data="check_list_execution"
              :table_head="head_information"
              :offset="pagination.offset"
              @edit="customEdit"
              @delete="customDelete"
              :is_common_delete="'false'">
            </CommonIndex>
          </div>
          <Pagination v-if="(pagination.total_rows>0)" :paginationData=pagination.total_rows
                      @pagination="loadData"></Pagination>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script src="@/components/services/audit_executions/check_point_executions/Add.js"></script>
