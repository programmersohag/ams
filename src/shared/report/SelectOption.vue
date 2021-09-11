<template>
  <div class="animated fadeIn">
    <b-container class="bv-example-row">
      <div v-for="(data, key) in searchParams" :key="key">
        <b-row v-for="(row, key1) in data.b_row" :key="key+'-'+key1">
          <b-col v-for="(col, key2) in row.b_col" :key="key+'-'+key1+'-'+key2">
            <b-form-group v-if="col.name=='cbo_branch'" label="Branch" label-for="input1">
              <b-form-select id="cbo_branch" v-model="inputData[col.name]"
                             size="sm"
                             :plain="true"
                             :options="branch_infos"
                             :value="selected_branch">
              </b-form-select>
            </b-form-group>
            <b-form-group v-if="col.name=='cbo_product_category'" label="Product Category" label-for="input1">
              <b-form-select id="basicSelect" v-model="inputData[col.name]"
                             size="sm"
                             :plain="true"
                             :options="product_category_list"
                             :value="selected_product_category">
              </b-form-select>
            </b-form-group>
            <b-form-group v-if="col.name=='cbo_product'" label="Product" label-for="input1">
              <b-form-select id="basicSelect" v-model="inputData[col.name]"
                             size="sm"
                             :plain="true"
                             :options="product_list"
                             :value="selected_product">
              </b-form-select>
            </b-form-group>
            <b-form-group v-if="col.name=='cbo_field_officer'" label="Field Officer" label-for="input1">
              <b-form-select id="basicSelect" v-model="inputData[col.name]"
                             size="sm"
                             :plain="true"
                             :options="field_officer_list"
                             :value="selected_field_officer">
              </b-form-select>
            </b-form-group>
            <b-form-group v-if="col.name=='cbo_transfer_member'" label="Transfer Member" label-for="input1">
              <b-form-select id="basicSelect" v-model="inputData[col.name]"
                             size="sm"
                             :plain="true"
                             :options="transfer_member"
                             :value="selected_transfer_member">
              </b-form-select>
            </b-form-group>
            <b-form-group v-if="col.name=='cbo_gender'" label="Gender" label-for="input1">
              <b-form-select id="basicSelect" v-model="inputData[col.name]"
                             size="sm"
                             :plain="true"
                             :options="gender"
                             :value="selected_gender">
              </b-form-select>
            </b-form-group>
            <b-form-group v-if="col.name=='cbo_order_by'" label="Order by" label-for="input1">
              <b-form-select id="basicSelect" v-model="inputData[col.name]"
                             size="sm"
                             :plain="true"
                             :options="order_by"
                             :value="selected_order_by">
              </b-form-select>
            </b-form-group>
            <b-form-group v-if="col.tag=='select_option'" v-bind:label="col.label">
              <b-form-select v-model="inputData[col.name]"
                             size="sm"
                             :plain="true"
                             :options="col.options"
                             value=""
              >
              </b-form-select>
            </b-form-group>
            <b-form-group v-if="col.tag=='date'" v-bind:label="col.label">
              <date-picker v-model="inputData[col.name]" :first-day-of-week="1" lang="en" format="DD/MM/YYYY" date-format="YYYY-MM-DD" input-class="form-control form-control-sm"></date-picker>
            </b-form-group>
            <b-form-group v-if="col.tag=='text'" v-bind:label="col.label">
              <b-form-input type="text" id="name" :placeholder="col.placeholder" v-model="inputData[col.name]"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <b-row>
        <b-col>
          <!--<button v-on:click="getData()">Preview</button>-->
          <input
                  type="submit"
                  value="Submit"
          >

        </b-col>
        <b-col>

        </b-col>
        <b-col>

        </b-col>
        <b-col>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
    import axios from 'axios'
    import DatePicker from 'vue2-datepicker'
    export default {
        name: "SelectOption",
        props: {
            searchParams: {},
            inputData: {

            },
        },
        data(){
            return {
                ReportData: [],
                branch_infos: [],
                selected_branch: '',
                product_category_list: [],
                selected_product_category: '',
                product_list: [],
                selected_product: '',
                field_officer_list: [],
                selected_field_officer: '',
                transfer_member: [],
                selected_transfer_member: '',
                gender: [],
                selected_gender: '',
                order_by: [],
                selected_order_by: ''
            }
        },
        components: {
            DatePicker
        },
        methods: {
            getSearchingParameters() {
                //console.log(this.$store.getters['auth/userInfo'])
                var session_data = {
                    id: 5,
                    login: 'ds.001',
                    name: 'Datasoft Support Kalitara',
                    logged_id: 1,
                    role_id: 1,
                    branch_id: 2,
                    branch_name: 'Kalitara',
                    end_time: '',
                    is_head_office: 0,
                    branch_type: 'B',
                    is_super_admin: '',
                    default_language: 'english',
                    current_date: '2018-11-29'
                };
                var data = new FormData();
                data.append('session_data',JSON.stringify(session_data));
                for (var inputData in this.inputData) {
                    data.append(inputData,'1');
                }
                this.$axios.post('/reports/ajax_load_combo_data',data).then(response => {
                    this.branch_infos = [];
                    if(session_data.branch_type == 'B'){
                        this.branch_infos.push({
                            text: response.data.branch_info[session_data.branch_id].branch_name + '(' +response.data.branch_info[session_data.branch_id].branch_code + ')',
                            value: response.data.branch_info[session_data.branch_id].branch_id
                        });
                        this.inputData.cbo_branch = session_data.branch_id;
                    }else{
                        this.branch_infos.push({
                            text: 'Select Branch',
                            value: ''
                        });
                        for(var value_branch_id in response.data.branch_info){
                            this.branch_infos.push({
                                text: response.data.branch_info[value_branch_id].branch_name + '(' +response.data.branch_info[value_branch_id].branch_code + ')',
                                value: response.data.branch_info[value_branch_id].branch_id
                            });
                        }
                    }
                    if(response.data.product_category_info){
                        this.product_category_list.push({
                            text: 'Select Product Category',
                            value: ''
                        });
                        this.product_category_list.push({
                            text: 'All',
                            value: '-1'
                        });
                        for(var value_product_category_id in response.data.product_category_info){
                            this.product_category_list.push({
                                text: response.data.product_category_info[value_product_category_id].name + '(' +response.data.product_category_info[value_product_category_id].short_name + ')',
                                value: response.data.product_category_info[value_product_category_id].id
                            });
                        }
                    }
                    if(response.data.products_info){
                        this.product_list.push({
                            text: 'Select Product',
                            value: ''
                        });
                        for(var value_product_id in response.data.products_info){
                            if(response.data.products_info[value_product_id].product_id == '0'){
                                this.product_list.push({
                                    text: response.data.products_info[value_product_id].product_name,
                                    value: "-1"
                                });
                            }else {
                                this.product_list.push({
                                    text: response.data.products_info[value_product_id].product_name + '(' +response.data.products_info[value_product_id].product_code + ')',
                                    value: response.data.products_info[value_product_id].product_id
                                });
                            }
                        }
                    }
                    if(response.data.field_officer_list){
                        this.field_officer_list.push({
                            text: 'Select Field Officer',
                            value: ''
                        });
                        this.field_officer_list.push({
                            text: 'All',
                            value: '-1'
                        });
                        for(var value_field_officer_id in response.data.field_officer_list){
                            this.product_list.push({
                                text: response.data.field_officer_list[value_field_officer_id].product_name + '(' +response.data.field_officer_list[value_field_officer_id].product_code + ')',
                                value: response.data.field_officer_list[value_field_officer_id].product_id
                            });
                        }
                    }
                    if(response.data.transfer_member){
                        for(var value_transfer_member in response.data.transfer_member){
                            this.transfer_member.push({
                                text: response.data.transfer_member[value_transfer_member],
                                value: value_transfer_member
                            });
                        }
                        this.inputData.cbo_transfer_member = 0;
                    }
                    if(response.data.gender_list){
                        for(var value_gender in response.data.gender_list){
                            this.gender.push({
                                text: response.data.gender_list[value_gender],
                                value: value_gender
                            });
                        }
                        this.inputData.cbo_transfer_member = 0;
                    }
                    if(response.data.order_by_options){
                        for(var value_order_by in response.data.order_by_options){
                            this.order_by.push({
                                text: response.data.order_by_options[value_order_by],
                                value: value_order_by
                            });
                        }
                        this.inputData.cbo_order_by = 'samitycode';
                    }
                })

            }
        },
        mounted(){
            this.getSearchingParameters();
        },
    }
</script>

<style scoped>

</style>
