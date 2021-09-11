<template>
  <div class="animated fadeIn">
    <b-form @submit.prevent="handleSubmit" autocomplete="off">
      <div class="report-table table-responsive">
        <table class="table table-bordered report-table b-table">
          <thead>
          <tr>
            <th>{{ $t('SL') }}</th>
            <th>{{ $t('Component') }}</th>
            <th>{{ $t('Formula') }}</th>
            <th>{{ $t('Count') + "/" + $t('Balance') }}</th>
            <th>{{ $t('Result') }}</th>
            <th>{{ $t('Expected') + " " + $t('Result') }}</th>
            <th>{{ $t('Last') + " " + $t('Audit') + " " + $t('Result') }}</th>
          </tr>
          </thead>
          <tbody v-if="is_preview">
          <tr>
            <td rowspan="2">1</td>
            <td rowspan="2">Member Per Samity</td>
            <td>Member</td>
            <td>{{ formData['totalMember'] }}</td>
            <td rowspan="2">{{ formData['memberPerSamity'] }}</td>
            <td rowspan="2">{{ formData['txt_member_per_samity'] }}</td>
            <td rowspan="2">{{ formData['memberPerSamityLast'] }}</td>
          </tr>
          <tr>
            <td>Samity</td>
            <td>{{ formData['totalSamity'] }}</td>
          </tr>
          <tr>
            <td rowspan="2">2</td>
            <td rowspan="2">Borrower Per Samity</td>
            <td>Borrower</td>
            <td>{{ formData['totalBorrower'] }}</td>
            <td rowspan="2">{{ formData['borrowerPerSamity'] }}</td>
            <td rowspan="2">{{ formData['txt_borrower_per_samity'] }}</td>
            <td rowspan="2">{{ formData['borrowerPerSamityLast'] }}</td>
          </tr>
          <tr>
            <td>Samity</td>
            <td>{{ formData['totalSamity'] }}</td>
          </tr>
          <tr>
            <td rowspan="2">3</td>
            <td rowspan="2">Member Per FO</td>
            <td>Member</td>
            <td>{{ formData['totalMember'] }}</td>
            <td rowspan="2">{{ formData['foPerMember'] }}</td>
            <td rowspan="2">{{ formData['txt_fo_per_member'] }}</td>
            <td rowspan="2">{{ formData['foPerMemberLast'] }}</td>
          </tr>
          <tr>
            <td>FO</td>
            <td>{{ formData['totalFO'] }}</td>
          </tr>
          <tr>
            <td rowspan="2">4</td>
            <td rowspan="2">Borrower Per FO</td>
            <td>Borrower</td>
            <td>{{ formData['totalBorrower'] }}</td>
            <td rowspan="2">{{ formData['foPerBorrower'] }}</td>
            <td rowspan="2">{{ formData['txt_fo_per_borrower'] }}</td>
            <td rowspan="2">{{ formData['foPerBorrowerLast'] }}</td>
          </tr>
          <tr>
            <td>FO</td>
            <td>{{ formData['totalFO'] }}</td>
          </tr>
          <tr>
            <td rowspan="3">5</td>
            <td rowspan="3">Borrower Per Day FO Wise</td>
            <td>Borrower</td>
            <td>{{ formData['totalBorrower'] }}</td>
            <td rowspan="3">{{ formData['borrowerPerDayFoWise'] }}</td>
            <td rowspan="3">{{ formData['txt_borrower_per_day_fo_wise'] }}</td>
            <td rowspan="3">{{ formData['borrowerPerDayFoWiseLast'] }}</td>
          </tr>
          <tr>
            <td>Total FO</td>
            <td>{{ formData['totalFO'] }}</td>
          </tr>
          <tr>
            <td>Working Day (weekly)</td>
            <td>{{ formData['weeklyWorkingDay'] }}</td>
          </tr>
          <tr>
            <td rowspan="2">6</td>
            <td rowspan="2">Total Borrower Per Total Member</td>
            <td>Borrower</td>
            <td>{{ formData['totalBorrower'] }}</td>
            <td rowspan="2">{{ formData['totalMemberPerTotalBorrower'] }}</td>
            <td rowspan="2">{{ formData['txt_total_member_per_total_borrower'] }}</td>
            <td rowspan="2">{{ formData['totalMemberPerTotalBorrowerLast'] }}</td>
          </tr>
          <tr>
            <td>Member</td>
            <td>{{ formData['totalMember'] }}</td>
          </tr>
          <tr>
            <td rowspan="2">7</td>
            <td rowspan="2">Member Cancellation Rate</td>
            <td>Member Cancellation</td>
            <td>{{ formData['totalMemberCancellation'] }}</td>
            <td rowspan="2">{{ formData['memberCancellationRate'] }}</td>
            <td rowspan="2">{{ formData['txt_member_cancellation_rate'] }}</td>
            <td rowspan="2">{{ formData['memberCancellationRateLast'] }}</td>
          </tr>
          <tr>
            <td>Member Admission</td>
            <td>{{ formData['totalMemberAdmission'] }}</td>
          </tr>
          <tr>
            <td rowspan="2">8</td>
            <td rowspan="2">Loan Outstanding Per FO</td>
            <td>Loan Outstanding</td>
            <td>{{ formData['totalLoanOutstanding'] }}</td>
            <td rowspan="2">{{ formData['foPerLoanOutstanding'] }}</td>
            <td rowspan="2">{{ formData['txt_fo_per_loan_outstanding'] }}</td>
            <td rowspan="2">{{ formData['foPerLoanOutstandingLast'] }}</td>
          </tr>
          <tr>
            <td>FO</td>
            <td>{{ formData['totalFO'] }}</td>
          </tr>
          <tr>
            <td rowspan="2">9</td>
            <td rowspan="2">Savings Ratio of Loan outstanding</td>
            <td>Savings Balance</td>
            <td>{{ formData['totalSavingsBalance'] }}</td>
            <td rowspan="2">{{ formData['loanOutstandingSavingsRatio'] }}</td>
            <td rowspan="2">{{ formData['txt_savings_ratio_of_loan_outstanding'] }}</td>
            <td rowspan="2">{{ formData['loanOutstandingSavingsRatioLast'] }}</td>
          </tr>
          <tr>
            <td>Loan Outstanding</td>
            <td>{{ formData['totalLoanOutstanding'] }}</td>
          </tr>
          <tr>
            <td rowspan="2">10</td>
            <td rowspan="2">Loan Outstanding Per Borrower</td>
            <td>Loan Outstanding</td>
            <td>{{ formData['totalLoanOutstanding'] }}</td>
            <td rowspan="2">{{ formData['loanOutstandingPerBorrower'] }}</td>
            <td rowspan="2">{{ formData['txt_loanee_per_outstanding'] }}</td>
            <td rowspan="2">{{ formData['loanOutstandingPerBorrowerLast'] }}</td>
          </tr>
          <tr>
            <td>Borrower</td>
            <td>{{ formData['totalBorrower'] }}</td>
          </tr>
          <tr>
            <td rowspan="2">11</td>
            <td rowspan="2">Percent of Savings Refund</td>
            <td>Savings Refund</td>
            <td>{{ formData['totalSavingsRefund'] }}</td>
            <td rowspan="2">{{ formData['savingsRefundPercent'] }}</td>
            <td rowspan="2">{{ formData['txt_percent_of_savings_refund'] }}</td>
            <td rowspan="2">{{ formData['savingsRefundPercentLast'] }}</td>
          </tr>
          <tr>
            <td>Savings Collection</td>
            <td>{{ formData['totalSavingsCollection'] }}</td>
          </tr>
          <tr>
            <td rowspan="2">12</td>
            <td rowspan="2">Percent of Due Loan</td>
            <td>Total Due</td>
            <td>{{ formData['totalDue'] }}</td>
            <td rowspan="2">{{ formData['dueLoanPercent'] }}</td>
            <td rowspan="2">{{ formData['txt_percent_of_due_loan'] }}</td>
            <td rowspan="2">{{ formData['dueLoanPercentLast'] }}</td>
          </tr>
          <tr>
            <td>Total Loan Outstanding</td>
            <td>{{ formData['totalLoanOutstanding'] }}</td>
          </tr>
          <tr>
            <td>13</td>
            <td>Satisfaction Ratio</td>
            <td colspan="2">{{ formData['satisfactionRatio'] }}</td>
            <td>Risk Level</td>
            <td colspan="2">{{ formData['riskLevel'] }}</td>
          </tr>
          <tr>
            <td>14</td>
            <td>Comments<span class="required">*</span></td>
            <td colspan="6" v-html="formData['comment']"></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer" class="text-center">
        <b-button type="submit" class="add" size="sm" variant="success">&nbsp;{{ $t("submit") }}
        </b-button>&nbsp;
        <b-button type="reset" size="sm" variant="danger" class="mr-2" @click.prevent="handleCancel"><i
          class="fa fa-close fa-md"></i>{{ $t("cancel") }}
        </b-button>
      </div>
    </b-form>
    <mf-loader v-if="isLoad" :loaderStyle="loaderStyle"/>
  </div>
</template>
<script src="@/components/services/audit_executions/ongoing_program_average_positions/Preview.js"></script>
