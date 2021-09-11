
<template>
  <div class="animated fadeIn user-privileges">
    <b-row>
      <b-col md="12">
        <b-form @submit.prevent="handleSubmit">
          <b-card>
            <div slot="header">
              <span class="pull-left">
                <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{$t("add")+" "+$t("user_role")}}</h5>
              </span>
              <span class="pull-right">
                <mf-button :btnType="'submit'" />&nbsp;
                <mf-button :btnType="'handle-reset'" @clicked = "handleReset" />
              </span>
              
            </div>
            <div class="table-responsive">
              <table class="table report-table table-bordered">
                <thead>
                  <tr>
                    <th class="col-8">{{$t("description")}}</th>
                    <th>{{$t("view")}}&nbsp;<b-form-checkbox type="checkbox" @change="checkAll($event,'View')"></b-form-checkbox></th>
                    <th>{{$t("add")}}&nbsp;<b-form-checkbox type="checkbox" @change="checkAll($event,'Add')"></b-form-checkbox></th>
                    <th>{{$t("edit")}}&nbsp;<b-form-checkbox type="checkbox" @change="checkAll($event,'Edit')"></b-form-checkbox></th>
                    <th>{{$t("delete")}}&nbsp; <b-form-checkbox type="checkbox" @change="checkAll($event,'Delete')"></b-form-checkbox></th>
                    <th>{{$t("execute")}}&nbsp;<b-form-checkbox type="checkbox" @change="checkAll($event,'Execute')"></b-form-checkbox></th>
                  </tr>
                </thead>
                <tbody v-if="isLoad">
                <template v-for="(row,key) in resourcePolicyData">
                  <tr :key="key">
                    <td colspan="6" class="text-center">{{key}}</td>
                  </tr>
                  <template v-for="(row1,key1) in row">
                    <tr :key="key+'-'+key1">
                      <td><i class="fa fa-folder-open-o fa-sm"></i>&nbsp;{{key1}}</td>
                      <td><b-form-checkbox input @change="checkSubgroupAll($event, key, key1,'View')"></b-form-checkbox></td>
                      <td><b-form-checkbox input @change="checkSubgroupAll($event, key, key1,'Add')"></b-form-checkbox></td>
                      <td><b-form-checkbox input @change="checkSubgroupAll($event, key, key1,'Edit')"></b-form-checkbox></td>
                      <td><b-form-checkbox input @change="checkSubgroupAll($event, key, key1,'Delete')"></b-form-checkbox></td>
                      <td><b-form-checkbox input @change="checkSubgroupAll($event, key, key1,'Execute')"></b-form-checkbox></td>
                    </tr>
                    <template v-for="(row2,key2) in row1">
                      <tr :key="key+'-'+key1+'-'+key2">
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-folder-open-o fa-sm"></i>&nbsp;{{key2}}</td>
                        <td v-if="row2['View'] != undefined"><b-form-checkbox v-model="row2['View'].isCheck" @change="checkActionType($event, key, key1, key2,'View')"></b-form-checkbox></td>
                        <td v-else>-</td>
                        <td v-if="row2['Add'] != undefined"><b-form-checkbox v-model="row2['Add'].isCheck" @change="checkActionType($event, key, key1, key2, 'Add')"></b-form-checkbox></td>
                        <td v-else>-</td>
                        <td v-if="row2['Edit'] != undefined"><b-form-checkbox v-model="row2['Edit'].isCheck" @change="checkActionType($event, key, key1, key2, 'Edit')"></b-form-checkbox></td>
                        <td v-else>-</td>
                        <td v-if="row2['Delete'] != undefined"><b-form-checkbox v-model="row2['Delete'].isCheck" @change="checkActionType($event, key, key1, key2, 'Delete')"></b-form-checkbox></td>
                        <td v-else>-</td>
                        <td v-if="row2['Execute'] != undefined"><b-form-checkbox v-model="row2['Execute'].isCheck" @change="checkActionType($event, key, key1, key2, 'Execute')"></b-form-checkbox></td>
                        <td v-else>-</td>
                      </tr>
                    </template>
                  </template>
                </template>
                </tbody>
                <loading :show="loading_show"></loading>
              </table>
            </div>
            <div slot="footer" class="text-center">
              <mf-button :btnType="'submit'" />&nbsp;
              <mf-button :btnType="'handle-reset'" @clicked = "handleReset" />
            </div>
          </b-card>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>
<style scoped>
div.user-privileges .card-body{
  padding: 5px;
}
div.user-privileges .custom-checkbox{
  margin-right: 0px;
    min-height: 1rem;
}
div.user-privileges .custom-checkbox .custom-control-label::before{
  width: .9rem;
  height: .9rem;
}
</style>
<script src="@/components/services/admin/user_role_wise_privileges/SaveBatch.js"></script>
