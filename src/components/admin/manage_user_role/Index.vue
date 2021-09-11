
<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12">
      <loading :show="loading_show"></loading>
        <b-card>
          <custom-modal v-if="isModalVisible" @close="closeModal" :componentAddress="component_address" :title="title" :data="edit_data"></custom-modal>
          <div slot="header">
            <h5>
              <i class="fa fa-th-list fa-sm"></i>&nbsp;{{$t('user_role')}}
            </h5>
            <b-button variant="info" size="sm" class="add" v-on:click="customModal('')">
              <i class="fa fa-plus fa-sm"></i>&nbsp;{{$t('add')}}
            </b-button>
          </div>
          <div>
            <div class="table-responsive">
              <table class="table table-bordered report-table">
                <thead>
                  <tr>
                    <th style="width: 5%" class="text-center">#</th>
                    <th style="width: 25%">{{ $t("role")+" "+$t("name") }}</th>
                    <th style="width: 60%">{{ $t("role")+" "+$t("description") }}</th>
                    <th style="width: 10%">{{ $t("action") }}</th>                    
                  </tr>                  
                </thead>
                <tbody>
                  <tr v-for="(item,index) in userRoles" :key="index">
                    <th class="text-center">{{index+1}}</th>
                    <td>
                        <span
                        v-for="details in parseInt(item.depth)"
                        :key="details"
                        >{{'&nbsp;'}}{{'&nbsp;'}}{{'&nbsp;'}}{{'&nbsp;'}}{{'&nbsp;'}}{{'&nbsp;'}}{{'&nbsp;'}}</span>
                    <i class="fa fa-angle-double-right" aria-hidden="true" ></i>
                    {{item.role_name}} 
                    </td>
                    <td>{{item.role_description}}</td>

                    <td>
                        
                    <div class="btn-action d-flex flex-row">
                        <b-button variant="info" class="btn-square" @click.prevent="permissionButton(item)">
                            <i class="fa fa-lock fa-sm"></i>
                        </b-button>&nbsp;
                        <b-button v-if="item.depth != 0" variant="info" class="btn-square" @click.prevent="customModal(item)">
                            <i class="fa fa-edit fa-sm"></i>
                        </b-button>&nbsp;
                        <b-button v-if="item.depth != 0" variant="danger" class="btn-square"
                                @click.prevent="deleteButton(item)">
                            <i class="fa fa-trash fa-sm"></i>
                        </b-button>
                    </div>                    
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
          </div>
          <div>
            <Pagination class = "paginate" v-if="(total_rows>0)" :paginationData="total_rows"
                        @pagination="loadData"></Pagination>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script src="@/components/services/admin/manage_user_role/Index.js"></script>
