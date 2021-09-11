<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12">
        <!--<div class="search">
          <fieldset>
            <legend>{{$t("search")}}</legend>
            <b-form inline id="userform" @submit.prevent="getFormData" autocomplete="off">
              <b-form-input
                      v-model="search_form_data.name"
                      type="text"
                      class="form-control mb-2 mr-sm-2 mb-sm-0"
                      :placeholder="$t('by_name')"
                      :title="$t('by_name')+'/'+$t('short_name')+'/'+$t('code')"
                      size="sm"
              ></b-form-input>

              <select class="form-control mb-2 mr-sm-2 mb-sm-0" v-model="search_form_data.select_role">
                <option value="">{{$t('select_role')}}</option>
                <option
                        v-for="(option,key) in combo_data.user_roles"
                        :value="key"
                        :key="key"
                >{{ option }}
                </option>
              </select>
              <select v-if="user['is_head_office']==1" class="form-control mb-2 mr-sm-2 mb-sm-0" v-model="search_form_data.select_branch">
                <option value="">{{$t('select')+" "+$t('branch')}}</option>
                <option
                        v-for="option in combo_data.user_branches"
                        :value="option.branch_id"
                        :key="option.branch_id"
                >{{ option.branch_code}} - {{option.branch_name}}
                </option>
              </select>
              <select class="form-control mb-2 mr-sm-2 mb-sm-0 text-center" v-model="search_form_data.select_status">
                <option
                        v-for="(option,key) in combo_data.status_info"
                        :value="key"
                        :key="key"
                >{{ option }}
                </option>
              </select>
              <select class="form-control mb-2 mr-sm-2 mb-sm-0" v-model="search_form_data.select_language">
                <option
                        v-for="(option,key) in combo_data.language_info"
                        :value="key"
                        :key="key"
                >{{ option}}
                </option>
              </select>

              <b-button  type="submit" variant="success" size="sm">
                <i class="fa fa-search fa-sm"></i>&nbsp;{{ $t("search") }}
              </b-button>&nbsp;
              <b-button variant="warning" size="sm" class="add" @click.prevent="handleReset()">
                            <i class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
                        </b-button>


            </b-form>
          </fieldset>
        </div>-->
        <b-card>
          <div slot="header">
            <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ title }}</h5>
            <b-button type="button" title="Add User" variant="success" size="sm" class="add"
                      @click.prevent="openAddModal()">
              <i class="fa fa-plus-circle fa-sm"></i>&nbsp;{{ $t("add") }}
            </b-button>

          </div>


          <div>
            <CommonIndex :table_data="index_data.user_info" v-on:edit="editUser" v-on:lock="openUnlockModal"
                         :delete_info="delete_info" v-on:delete="loadData"
                         :table_head="head_information" :offset="offset"></CommonIndex>
          </div>
          <div>
            <CustomModal v-if="isModalVisible" @close="closeModal" :componentAddress="component_address"
                         :title="title" :id="edit_id"></CustomModal>
          </div>

          <div>
            <Pagination class="paginate" v-if="(total_rows>0)" :paginationData=total_rows
                        @pagination="loadData"></Pagination>
          </div>

        </b-card>

      </b-col>
    </b-row>
  </div>
</template>


<script src="@/components/services/admin/manage_user/Index.js"></script>


