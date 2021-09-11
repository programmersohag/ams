<template>
    <div class="animated fadeIn entry-list">
        <div class="table-responsive">
            <table class="table-sm table">
                <tbody>
                    <tr>
                        <th>{{ $t("action") }}</th>
                        <th>{{row.action}}</th>
                    </tr>
                    <tr>
                        <td><b>{{ $t("by") }}</b></td>
                        <td>{{row.userId}}</td>
                    </tr>
                    <tr>
                        <td><b>{{ $t("date") }}</b></td>
                        <td>{{row.timeStamp}}</td>
                    </tr>
                    <tr>
                        <td><b>{{ $t("branch_name") }}</b></td>
                        <td>{{row.branchId}}</td>
                    </tr>
                    <tr>
                        <td><b>{{ $t("entity") }}</b></td>
                        <td> {{row.tableName}}</td>
                    </tr>
                    <tr>
                        <td  v-if="row.action=='delete'">
                            <b>Old Value</b>
                        </td>
                        <td v-else-if="row.action=='insert'">
                                New Value :
                        </td>
                        <td v-if="row.action=='delete' && oldValue">
                             <template v-for=" (value,key) in oldValue">
                                 <hr :key="key">
                                 <template v-for="(val1, key1) in value">
                                     <span :key="key+'_'+key1"><b>{{key1}}:</b>{{val1}}</span></br>
                                 </template>
                            </template>
                        </td>
                        <td v-else-if="row.action=='insert' && newValue && row.tableName=='user_role_wise_privileges'">
                            <template v-for=" (value,key) in newValue">
                                 <hr :key="key">
                                 <template v-for="(val1, key1) in value">
                                     <span :key="key+'_'+key1"><b>{{key1}}:</b>{{val1}}</span></br>
                                 </template>
                            </template>
                        </td>
                        <td v-else-if="row.action=='insert' && newValue">
                            <template v-for=" (value,key) in newValue">
                                <span :key="key"><b>{{key}}</b>:{{value}} <br/></span>
                            </template>
                        </td>
                    </tr>
                    <tr v-if="row.action=='update'">
                        <td><b>Change:</b></td>
                        <td v-if="newValue && oldValue">
                            <br>
                            <table class="table-sm table">
                                <thead>
                                    <tr>
                                        <th>Column</th>
                                        <th>Old Value</th>
                                        <th>New value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for=" (value,key) in result" :key="key">
                                        <td>{{key}}</td>
                                        <td>{{oldValue[key]}}</td>
                                        <td>{{newValue[key]}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <span v-if="row.referenceId" >
                                <b>Reference id : {{row.reference_id}}</b>
                            </span>
                        </td>
                        <td v-else>No change!!!</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script src="@/components/services/admin/user_audit_trails/View.js"></script>
