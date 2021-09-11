<template>
  <div class="animated fadeIn entry-list">
    <b-row>
      <b-col xs="12" lg="12" class="mt-2">
        <b-button class="float-right" @click.prevent="handleBack" size="sm" variant="danger"><i
          class="fa fa-backward"></i>&nbsp;{{ $t("back") }}
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12" lg="12">
        <b-col class="col-md-12 text-center mt-2">
          <h4>Location: {{ locationName }}</h4>
        </b-col>
        <b-col class="col-md-12 text-center">
          <h4>Schedule: {{ scheduleName }}</h4>
        </b-col>
        <b-form @submit.prevent="handleSubmit()" autocomplete="off">
          <b-card>
            <FormGenerator
              v-if="is_form_load"
              :schema="schema"
              :formValue="form_data"
              @handleReset="clear"
              :errorMessage="error_message">
            </FormGenerator>
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
        <!--        ==================start api table===================================================-->
        <b-card v-if="isMfiAudit">
          <div slot="header">
            <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ page_title }}</h5>
          </div>
          <div class="table-responsive">
            <table border="1">
              <thead>
              <tr>
                <th>API INFO</th>
                <th>Auditor Part</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in processedApiBudgetsData" :key="index">
                <td>
                  <table>
                    <tr>
                      <td>Budget Head</td>
                      <td>:</td>
                      <td>{{ item['budgetHead'] }}</td>
                    </tr>
                    <tr>
                      <td>Yearly Approved Budget</td>
                      <td>:</td>
                      <td>{{ item['yearlyApprovedBudget'] }}</td>
                    </tr>
                    <tr>
                      <td>Yearly Revise Budget</td>
                      <td>:</td>
                      <td>{{ item['yearlyReviseBudget'] }}</td>
                    </tr>
                    <tr>
                      <td>Auditing Period Budget</td>
                      <td>:</td>
                      <td>{{ item['auditingPeriodBudget'] }}</td>
                    </tr>
                    <tr>
                      <td>Expenditure Up To Previous Month</td>
                      <td>:</td>
                      <td>{{ item['expenditureUpToPreviousMonth'] }}</td>
                    </tr>
                    <tr>
                      <td>Expenditure Auditing Month</td>
                      <td>:</td>
                      <td>{{ item['expenditureAuditingMonth'] }}</td>
                    </tr>
                  </table>
                </td>
                <td>
                  <table>
                    <tr>
                      <td>Satisfaction Ratio</td>
                      <td>:</td>
                      <td>
                        <b-form-group>
                          <b-form-select :options="satisfactionRatios" v-model="item.satisfactionRatio"
                                         :name="'satisfactionRatio[' + index + ']'" v-validate="'required'"
                                         data-vv-as="satisfaction ratio"
                                         @change.native="onChangeSr($event, index)"></b-form-select>
                          <span v-show="errors.has('satisfactionRatio[' + index + ']')" class="text-danger">{{ errors.first('satisfactionRatio[' + index + ']') }}</span>
                          <span v-if="formErrors['satisfactionRatio[' + index + ']'] "
                                class="text-danger">{{ formErrors['satisfactionRatio[' + index + ']'] }}</span>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>Risk Level</td>
                      <td>:</td>
                      <td>
                        <b-form-group>
                          <b-form-select :options="riskLevels" v-model="item.riskLevel"
                                         :name="'riskLevel[' + index + ']'" v-validate="'required'"
                                         data-vv-as="risk level"
                                         @change.native="onChangeRl($event, item.index)"></b-form-select>
                          <span v-show="errors.has('riskLevel[' + index + ']')" class="text-danger">{{ errors.first('riskLevel[' + index + ']') }}</span>
                          <span v-if="formErrors['riskLevel[' + index + ']'] "
                                class="text-danger">{{ formErrors['riskLevel[' + index + ']'] }}</span>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>Comment</td>
                      <td>:</td>
                      <td>
                        <b-form-group>
                          <b-form-textarea v-model="item.comment"></b-form-textarea>
                        </b-form-group>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div slot="footer" class="text-center">
            <b-button type="button" class="add" size="sm" variant="success" @click.prevent="handleCoreData"><i
              class="fa fa-plus fa-sm"></i>&nbsp;{{ $t("add") }}
            </b-button>&nbsp;
            <b-button type="reset" variant="primary" class="add" size="sm" @click.prevent="handleReset"><i
              class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
            </b-button>
          </div>
        </b-card>
        <!--        ==================end api table===================================================-->
        <b-card>
          <custom-modal v-if="modal_info.isModalVisible" @close="closeModal"
                        :componentAddress="modal_info.component_address"
                        :title="modal_info.title" :id="modal_info.id"></custom-modal>
          <div slot="header">
            <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ page_title }}</h5>
          </div>
          <div class="table-responsive">
            <CommonIndex
              :table_data="budgets"
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
<script src="@/components/services/audit_executions/budgets/Add.js"></script>
