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
        <b-form @submit.prevent="handlePreview" autocomplete="off" v-if="is_form_load">
          <b-card>
            <FormGenerator
              :schema="schema"
              :formValue="formData"
              @handleReset="clear"
              :errorMessage="error_message">
            </FormGenerator>
          </b-card>
          <div slot="footer" class="text-center">
            <b-button type="submit" class="add" size="sm" variant="success"><i
              class="fa fa-plus fa-sm"></i>&nbsp;{{ $t("preview") }}
            </b-button>&nbsp;
            <b-button type="reset" variant="primary" class="add" size="sm" @click.prevent="handleReset"><i
              class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
            </b-button>
          </div>
        </b-form>
      </b-col>
      <b-col>
        <Preview v-if="preview_data.is_preview_show" :id="preview_data.id" :data="preview_data.data"></Preview>
      </b-col>
    </b-row>
    <b-card v-if="isMfiAudit">
      <div slot="header">
        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ page_title }}</h5>
      </div>
      <table class="table table-bordered report-table b-table">
        <thead>
        <tr>
          <th>{{ $t('SL') }}</th>
          <th>{{ $t('Component') }}</th>
          <th>{{ $t('Formula') }}</th>
          <th>{{ $t('Count') + "/" + $t('Balance') }}</th>
          <th>{{ $t('Result') }}</th>
          <th>{{ $t('Expected') + " " + $t('Result') }}</th>
          <th>{{ $t('Last') + " " +$t('Audit')+" "+ $t('Result') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2">1</td>
          <td rowspan="2">Member Per Samity</td>
          <td>Member</td>
          <td>{{coreData['totalMember']}}</td>
          <td rowspan="2">{{coreData['memberPerSamity']}}</td>
          <td rowspan="2">{{coreData['expectedMemberPerSamity']}}</td>
          <td rowspan="2">{{coreData['memberPerSamityLast']}}</td>
        </tr>
        <tr>
          <td>Samity</td>
          <td>{{coreData['totalSamity']}}</td>
        </tr>
        <tr>
          <td rowspan="2">2</td>
          <td rowspan="2">Borrower Per Samity</td>
          <td>Borrower</td>
          <td>{{coreData['totalMember']}}</td>
          <td rowspan="2">{{coreData['borrowerPerSamity']}}</td>
          <td rowspan="2">{{coreData['expectedBorrowerPerSamity']}}</td>
          <td rowspan="2">{{coreData['borrowerPerSamityLast']}}</td>
        </tr>
        <tr>
          <td>Samity</td>
          <td>{{coreData['totalSamity']}}</td>
        </tr>
        <tr>
          <td rowspan="2">3</td>
          <td rowspan="2">Member Per FO</td>
          <td>Member</td>
          <td>{{coreData['totalMember']}}</td>
          <td rowspan="2">{{coreData['foPerMember']}}</td>
          <td rowspan="2">{{coreData['expectedFoPerMember']}}</td>
          <td rowspan="2">{{coreData['foPerMemberLast']}}</td>
        </tr>
        <tr>
          <td>FO</td>
          <td>{{coreData['totalFO']}}</td>
        </tr>
        <tr>
          <td rowspan="2">4</td>
          <td rowspan="2">Borrower Per FO</td>
          <td>Borrower</td>
          <td>{{coreData['totalBorrower']}}</td>
          <td rowspan="2">{{coreData['foPerBorrower']}}</td>
          <td rowspan="2">{{coreData['expectedFoPerBorrower']}}</td>
          <td rowspan="2">{{coreData['foPerBorrowerLast']}}</td>
        </tr>
        <tr>
          <td>FO</td>
          <td>{{coreData['totalFO']}}</td>
        </tr>
        <tr>
          <td rowspan="3">5</td>
          <td rowspan="3">Borrower Per Day FO Wise</td>
          <td>Borrower</td>
          <td>{{coreData['totalBorrower']}}</td>
          <td rowspan="3">{{coreData['borrowerPerDayFoWise']}}</td>
          <td rowspan="3">{{coreData['expectedBorrowerPerDayFoWise']}}</td>
          <td rowspan="3">{{coreData['borrowerPerDayFoWiseLast']}}</td>
        </tr>
        <tr>
          <td>Total FO</td>
          <td>{{coreData['totalFO']}}</td>
        </tr>
        <tr>
          <td>Working Day (weekly)</td>
          <td>{{coreData['weeklyWorkingDay']}}</td>
        </tr>
        <tr>
          <td rowspan="2">6</td>
          <td rowspan="2">Total Borrower Per Total Member</td>
          <td>Borrower</td>
          <td>{{coreData['totalBorrower']}}</td>
          <td rowspan="2">{{coreData['totalMemberPerTotalBorrower']}}</td>
          <td rowspan="2">{{coreData['expectedTotalMemberPerTotalBorrower']}}</td>
          <td rowspan="2">{{coreData['totalMemberPerTotalBorrowerLast']}}</td>
        </tr>
        <tr>
          <td>Member</td>
          <td>{{coreData['totalMember']}}</td>
        </tr>
        <tr>
          <td rowspan="2">7</td>
          <td rowspan="2">Member Cancellation Rate</td>
          <td>Member Cancellation</td>
          <td>{{coreData['totalMemberCancellation']}}</td>
          <td rowspan="2">{{coreData['memberCancellationRate']}}</td>
          <td rowspan="2">{{coreData['expectedMemberCancellationRate']}}</td>
          <td rowspan="2">{{coreData['memberCancellationRateLast']}}</td>
        </tr>
        <tr>
          <td>Member Admission</td>
          <td>{{coreData['totalMemberAdmission']}}</td>
        </tr>
        <tr>
          <td rowspan="2">8</td>
          <td rowspan="2">Loan Outstanding Per FO</td>
          <td>Loan Outstanding</td>
          <td>{{coreData['totalLoanOutstanding']}}</td>
          <td rowspan="2">{{coreData['foPerLoanOutstanding']}}</td>
          <td rowspan="2">{{coreData['expectedFoPerLoanOutstanding']}}</td>
          <td rowspan="2">{{coreData['foPerLoanOutstandingLast']}}</td>
        </tr>
        <tr>
          <td>FO</td>
          <td>{{coreData['totalFO']}}</td>
        </tr>
        <tr>
          <td rowspan="2">9</td>
          <td rowspan="2">Savings Ratio of Loan outstanding</td>
          <td>Savings Balance</td>
          <td>{{coreData['totalSavingsBalance']}}</td>
          <td rowspan="2">{{coreData['loanOutstandingSavingsRatio']}}</td>
          <td rowspan="2">{{coreData['expectedLoanOutstandingSavingsRatio']}}</td>
          <td rowspan="2">{{coreData['loanOutstandingSavingsRatioLast']}}</td>
        </tr>
        <tr>
          <td>Loan Outstanding</td>
          <td>{{coreData['totalLoanOutstanding']}}</td>
        </tr>
        <tr>
          <td rowspan="2">10</td>
          <td rowspan="2">Loan Outstanding Per Borrower</td>
          <td>Loan Outstanding</td>
          <td>{{coreData['totalLoanOutstanding']}}</td>
          <td rowspan="2">{{coreData['loanOutstandingPerBorrower']}}</td>
          <td rowspan="2">{{coreData['expectedLoanOutstandingPerBorrower']}}</td>
          <td rowspan="2">{{coreData['loanOutstandingPerBorrowerLast']}}</td>
        </tr>
        <tr>
          <td>Borrower</td>
          <td>{{coreData['totalBorrower']}}</td>
        </tr>
        <tr>
          <td rowspan="2">11</td>
          <td rowspan="2">Percent of Savings Refund</td>
          <td>Savings Refund</td>
          <td>{{coreData['totalSavingsRefund']}}</td>
          <td rowspan="2">{{coreData['savingsRefundPercent']}}</td>
          <td rowspan="2">{{coreData['expectedSavingsRefundPercent']}}</td>
          <td rowspan="2">{{coreData['savingsRefundPercentLast']}}</td>
        </tr>
        <tr>
          <td>Savings Collection</td>
          <td>{{coreData['totalSavingsCollection']}}</td>
        </tr>
        <tr>
          <td rowspan="2">12</td>
          <td rowspan="2">Percent of Due Loan</td>
          <td>Total Due</td>
          <td>{{coreData['totalDue']}}</td>
          <td rowspan="2">{{coreData['dueLoanPercent']}}</td>
          <td rowspan="2">{{coreData['expectedDueLoanPercent']}}</td>
          <td rowspan="2">{{coreData['dueLoanPercentLast']}}</td>
        </tr>
        <tr>
          <td>Total Loan Outstanding</td>
          <td>{{coreData['totalLoanOutstanding']}}</td>
        </tr>
        <tr>
          <td>13</td>
          <td>Satisfaction Ratio</td>
          <td colspan="2">
            <b-form-group
            >
              <b-form-select :options="satisfactionRatios" v-model="coreData['satisfactionRatio']"
                             name="'satisfactionRatio" v-validate="'required'" data-vv-as="satisfaction ratio"
                             @change.native="onChangeSr($event)"></b-form-select>
              <span v-show="errors.has('satisfactionRatio')"
                    class="text-danger">{{ errors.first('satisfactionRatio') }}</span>
              <span v-if="formErrors['satisfactionRatio'] "
                    class="text-danger">{{ formErrors['satisfactionRatio'] }}</span>
            </b-form-group>
          </td>
          <td>Risk Level</td>
          <td colspan="2">
            <b-form-group
            >
              <b-form-select :options="riskLevels" v-model="coreData['riskLevel']" name="riskLevel"
                             v-validate="'required'"
                             data-vv-as="risk level" @change.native="onChangeRl($event)"></b-form-select>
              <span v-show="errors.has('riskLevel')"
                    class="text-danger">{{ errors.first('riskLevel') }}</span>
              <span v-if="formErrors['riskLevel'] "
                    class="text-danger">{{ formErrors['riskLevel'] }}</span>
            </b-form-group>
          </td>
        </tr>
        <tr>
          <td>14</td>
          <td>Comments</td>
          <td colspan="6">
            <b-form-group
            >
              <b-form-textarea v-model="coreData.comment"></b-form-textarea>
            </b-form-group>
          </td>
        </tr>
        </tbody>
      </table>
      <div slot="footer" class="text-center">
        <b-button type="button" class="add" size="sm" variant="success" @click.prevent="handleSubmitCoreData"><i
          class="fa fa-plus fa-sm"></i>&nbsp;{{ $t("add") }}
        </b-button>&nbsp;
        <b-button type="reset" variant="primary" class="add" size="sm" @click.prevent="handleReset"><i
          class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
        </b-button>
      </div>
    </b-card>
  </div>
</template>
<script src="@/components/services/audit_executions/ongoing_program_average_positions/Add.js"></script>
