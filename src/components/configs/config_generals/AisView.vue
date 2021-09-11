<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col xs="12" lg="12">
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
                  
                    <tr v-for="(row, k) in purpose.purpose_info" :key="k + '-childOf-'+ key">
                        <td width='40%' align='left'>{{ row.label_name }}</td>
                        <td v-if="row.field_type=='text' || row.field_type=='number' || row.field_type=='textarea'">{{ row.default_value }}</td> 
                        <td v-else-if="row.field_type=='password'">********</td> 
                        <td v-else-if="row.field_type=='date' && row.default_value.length>0">{{ row.default_value }}</td>
                        <td v-else-if="row.field_type=='file'"><img src=""></td>  
                        <td v-else><span v-if="row.field_value!=null">{{ row.field_value[row.default_value] }}</span></td>                     
                    </tr>
                  </template>
                  <Loading :show="loading_show"></Loading>
                </tbody>
            </table>
            </div>
            </b-tab>
            <b-tab :active="IsActiveTabOthers" v-for="(row, key) in purposes" :key="key">
              <template slot="title">
                <i class="fa fa-industry"></i> {{row.label}}
              </template>
              <ConfigGeneral @ActiveTab="setActiveTab" :purpose_info="row"></ConfigGeneral>
            </b-tab>
          </b-tabs>
      </b-col>
    </b-row>
  </div>
</template>
<script src="@/components/services/configs/config_generals/AisView.js"></script>


