<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col xs="12" lg="12">
        <div class="tab" role="tabpanel">
          <b-tabs v-model="tabIndex[0]">
            <b-tab :active="IsActiveTabView">
              <template slot="title">
                <i class="fa fa-home"></i> View
              </template>
              <div class="table-responsive">
              <table class="table table-bordered report-table">
                <tbody>
                  <template v-for="(purpose, key) in purposes">
                    <tr :key="key + '-parent'">
                      <th colspan='2'>{{ purpose.label }}</th>
                    </tr>

                    <tr v-for="(row, k) in purpose.purpose_info.entity" :key="k + '-childOf-'+ key">
                        <td width='40%' align='left' style="text-transform: uppercase;">{{ row.labelName }}</td>
                        <td v-if="row.fieldType=='text' || row.fieldType=='number' || row.fieldType=='textarea'">{{ row.defaultValue }}</td>
                        <td v-else-if="row.fieldType=='password'">********</td>
                        <td v-else-if="row.fieldType=='date' && row.defaultValue.length>0">{{ row.defaultValue }}</td>
                        <td v-else-if="row.fieldType=='file'"><img src=""></td>
                        <td v-else><span v-if="row.fieldValue!=null">{{purpose.purpose_info.extraValue[row.dbFieldName][row.defaultValue]}} </span></td>
                    </tr>
                  </template>

                </tbody>
            </table>
            </div>
            </b-tab>
            <b-tab :active="IsActiveTabOthers" v-for="(row, key) in purposes" :key="key">
              <template slot="title">
                <i class="fa fa-cog"></i> {{row.label}}
              </template>
              <ConfigGeneral @ActiveTab="setActiveTab" :purpose_info="row"></ConfigGeneral>
            </b-tab>
          </b-tabs>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script src="@/components/services/configs/config_generals/View.js"></script>

<style scoped>

  /* .animated .tabs div > ul {
    background-color: var(--background-color-light);
    color: rgb(7, 8, 65);
    font-size: 10px;
    border-radius:0px;
} */

</style>


