<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12">
        <b-card>
                    <div slot="header">
                      <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ $t("tutorials") }}</h5>
                      <b-button
                        variant="info"
                        size="sm"
                        class="add"
                        v-on:click="customModal('')">
                        <i class="fa fa-plus fa-sm"></i>&nbsp;{{ $t("add") }}
                      </b-button>
                    </div>

          <custom-modal
            v-if="isModalVisible"
            @close="closeModal"
            :componentAddress="component_address"
            :title="title"
            :id="edit_id">
          </custom-modal>
          <div>
            <CommonIndex
              :table_data="tutorials"
              :table_head="head_information"
              v-on:edit="customModal"
              :offset="pagination.offset"
              @delete="loadData"
              :delete_info="delete_info" >
            </CommonIndex>
          </div>

          <div slot="footer" class="cpagination">
            <pagination
              v-if="(pagination.total_rows>0)"
                        :paginationData=pagination.total_rows @pagination="loadData" ></pagination>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>

</template>

<script src="@/components/services/configs/help/tutorial_details/index.js"></script>
