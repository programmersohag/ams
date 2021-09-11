<template>
  <div class="animated fadeIn entry-list">
    <b-card>
      <div slot="header">
        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;Average Position of Ongoing Program</h5>
      </div>
      <b-row>
        <b-col xs="12" lg="12">
          <b-col class="col-md-12 mt-2">
            <h6>Location &nbsp;&nbsp;<b>{{ locationName }}</b></h6>
          </b-col>
          <b-col class="col-md-12">
            <h6>Schedule &nbsp;&nbsp;<b>{{ scheduleName }}</b></h6>
          </b-col>
          <b-col class="col-md-12">
            <h6>Team &nbsp;&nbsp;<b>{{ teamName }}</b></h6>
          </b-col>
          <div class="table-responsive">
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
              <tbody>
              <tr>
                <td rowspan="2">1</td>
                <td rowspan="2">Member Per Samity</td>
                <td>Member</td>
                <td>{{ ongoing_program_average_positions['totalMember'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['memberPerSamity'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['expectedMemberPerSamity'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['memberPerSamityLast'] }}</td>
              </tr>
              <tr>
                <td>Samity</td>
                <td>{{ ongoing_program_average_positions['totalSamity'] }}</td>
              </tr>
              <tr>
                <td rowspan="2">2</td>
                <td rowspan="2">Borrower Per Samity</td>
                <td>Borrower</td>
                <td>{{ ongoing_program_average_positions['totalMember'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['borrowerPerSamity'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['expectedBorrowerPerSamity'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['borrowerPerSamityLast'] }}</td>
              </tr>
              <tr>
                <td>Samity</td>
                <td>{{ ongoing_program_average_positions['totalSamity'] }}</td>
              </tr>
              <tr>
                <td rowspan="2">3</td>
                <td rowspan="2">FO Per Member</td>
                <td>FO</td>
                <td>{{ ongoing_program_average_positions['totalFO'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['foPerMember'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['expectedFoPerMember'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['foPerMemberLast'] }}</td>
              </tr>
              <tr>
                <td>Member</td>
                <td>{{ ongoing_program_average_positions['totalMember'] }}</td>
              </tr>
              <tr>
                <td rowspan="2">4</td>
                <td rowspan="2">FO Per Borrower</td>
                <td>FO</td>
                <td>{{ ongoing_program_average_positions['totalFO'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['foPerBorrower'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['expectedFoPerBorrower'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['foPerBorrowerLast'] }}</td>
              </tr>
              <tr>
                <td>Borrower</td>
                <td>{{ ongoing_program_average_positions['totalBorrower'] }}</td>
              </tr>
              <tr>
                <td rowspan="3">5</td>
                <td rowspan="3">Borrower Per Day FO Wise</td>
                <td>Borrower</td>
                <td>{{ ongoing_program_average_positions['totalBorrower'] }}</td>
                <td rowspan="3">{{ ongoing_program_average_positions['borrowerPerDayFoWise'] }}</td>
                <td rowspan="3">{{ ongoing_program_average_positions['expectedBorrowerPerDayFoWise'] }}</td>
                <td rowspan="3">{{ ongoing_program_average_positions['borrowerPerDayFoWiseLast'] }}</td>
              </tr>
              <tr>
                <td>Total FO</td>
                <td>{{ ongoing_program_average_positions['totalFO'] }}</td>
              </tr>
              <tr>
                <td>Working Day (weekly)</td>
                <td>{{ ongoing_program_average_positions['weeklyWorkingDay'] }}</td>
              </tr>
              <tr>
                <td rowspan="2">6</td>
                <td rowspan="2">Total Member Per Total Borrower</td>
                <td>Borrower</td>
                <td>{{ ongoing_program_average_positions['totalBorrower'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['totalMemberPerTotalBorrower'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['expectedTotalMemberPerTotalBorrower'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['totalMemberPerTotalBorrowerLast'] }}</td>
              </tr>
              <tr>
                <td>Member</td>
                <td>{{ ongoing_program_average_positions['totalMember'] }}</td>
              </tr>
              <tr>
                <td rowspan="2">7</td>
                <td rowspan="2">Member Cancellation Rate</td>
                <td>Member Cancellation</td>
                <td>{{ ongoing_program_average_positions['totalMemberCancellation'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['memberCancellationRate'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['expectedMemberCancellationRate'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['memberCancellationRateLast'] }}</td>
              </tr>
              <tr>
                <td>Member Admission</td>
                <td>{{ ongoing_program_average_positions['totalMemberAdmission'] }}</td>
              </tr>
              <tr>
                <td rowspan="2">8</td>
                <td rowspan="2">FO Per Loan Outstanding</td>
                <td>FO</td>
                <td>{{ ongoing_program_average_positions['totalFO'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['foPerLoanOutstanding'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['expectedFoPerLoanOutstanding'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['foPerLoanOutstandingLast'] }}</td>
              </tr>
              <tr>
                <td>Loan Outstanding</td>
                <td>{{ ongoing_program_average_positions['totalLoanOutstanding'] }}</td>
              </tr>
              <tr>
                <td rowspan="2">9</td>
                <td rowspan="2">Savings Ratio of Loan outstanding</td>
                <td>Savings Balance</td>
                <td>{{ ongoing_program_average_positions['totalSavingsBalance'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['loanOutstandingSavingsRatio'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['expectedLoanOutstandingSavingsRatio'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['loanOutstandingSavingsRatioLast'] }}</td>
              </tr>
              <tr>
                <td>Loan Outstanding</td>
                <td>{{ ongoing_program_average_positions['totalLoanOutstanding'] }}</td>
              </tr>
              <tr>
                <td rowspan="2">10</td>
                <td rowspan="2">Loan Outstanding Per Borrower</td>
                <td>Borrower</td>
                <td>{{ ongoing_program_average_positions['totalBorrower'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['loanOutstandingPerBorrower'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['expectedLoanOutstandingPerBorrower'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['loanOutstandingPerBorrowerLast'] }}</td>
              </tr>
              <tr>
                <td>Loan Outstanding</td>
                <td>{{ ongoing_program_average_positions['totalLoanOutstanding'] }}</td>
              </tr>
              <tr>
                <td rowspan="2">11</td>
                <td rowspan="2">Percent of Savings Refund</td>
                <td>Savings Refund</td>
                <td>{{ ongoing_program_average_positions['totalSavingsRefund'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['savingsRefundPercent'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['expectedSavingsRefundPercent'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['savingsRefundPercentLast'] }}</td>
              </tr>
              <tr>
                <td>Savings Collection</td>
                <td>{{ ongoing_program_average_positions['totalSavingsCollection'] }}</td>
              </tr>
              <tr>
                <td rowspan="2">12</td>
                <td rowspan="2">Percent of Due Loan</td>
                <td>Total Due</td>
                <td>{{ ongoing_program_average_positions['totalDue'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['dueLoanPercent'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['expectedDueLoanPercent'] }}</td>
                <td rowspan="2">{{ ongoing_program_average_positions['dueLoanPercentLast'] }}</td>
              </tr>
              <tr>
                <td>Total Loan Outstanding</td>
                <td>{{ ongoing_program_average_positions['totalLoanOutstanding'] }}</td>
              </tr>
              <tr>
                <td>13</td>
                <td>Comments</td>
                <td colspan="6">{{ ongoing_program_average_positions['comment'] }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <!-- Start Review Reply -->
    <b-card>
      <div slot="header">
        <h5><i class="fa fa-th-list fa-sm"></i> Reviews</h5>
      </div>
      <div class="review-reply-container">
        <div class="comment border-left" v-for="(data, index) in reviews" :key="index">
          <div class="comment-heading">
            <div class="comment-info">
              <div class="comment-author">{{ data.reviewerName }}</div>
              <p class="m-0">
                Date &bull; {{ data.reviewDate }}
              </p>
            </div>
          </div>
          <div class="comment-body" v-html="data['reviewComment']">
            <div class="replies">
              <div class="comment border-left">
                <div class="comment-heading">
                  <div class="comment-info">
                    <div class="comment-author">{{ data.replierName }}</div>
                    <p class="m-0">
                      Date &bull; {{ data.replyDate }}
                    </p>
                  </div>
                </div>
                <div class="comment-body" v-html="data.replyComment">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-card>
    <!-- End Review Reply -->
    <b-card>
      <div slot="header">
        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ page_title }}</h5>
      </div>
      <b-form @submit.prevent="handleSubmit" autocomplete="off">
        <b-row>
          <b-col sm="6">
            <b-form-group
              :label='this.$t("reply")+" "+this.valid_star'
              label-size="sm"
              label-for="txt_comment"
              :label-cols="4"
              :horizontal="true"
            >
              <vue-ckeditor type="classic" v-model="inputForm.txt_comment" v-validate="'required'"
                            :editors="editors"></vue-ckeditor>
              <span v-show="errors.has('txt_comment')"
                    class="text-danger">{{ errors.first('txt_comment') }}</span>
              <span v-if="formErrors['txt_comment'] "
                    class="text-danger">{{ formErrors['txt_comment'] }}</span>
            </b-form-group>
            <b-form-group
              label-size="sm"
              :label='this.$t("status")+" "+this.valid_star'
              label-for="txt_status"
              :label-cols="4"
              :horizontal="true"
            >
              <b-form-select
                class="form-control col-md-12"
                name="txt_status"
                v-model="inputForm.txt_status"
                :options="options"
                v-validate="'required'"
                data-vv-as="status"
                autocomplete="off"
                value="Please select"
              ></b-form-select>
              <span v-show="errors.has('txt_status')"
                    class="text-danger">{{ errors.first('txt_status') }}</span>
              <span v-if="formErrors['txt_status'] "
                    class="text-danger">{{ formErrors['txt_status'] }}</span>
            </b-form-group>
          </b-col>
          <b-col sm="12">
            <div slot="footer" class="submit mt-2 ml-3">
              <div class="text-center">
                <b-button type="submit" class="add" size="sm" variant="success">
                  <i class="fa fa-save fa-sm"></i>&nbsp;{{ $t("submit") }}
                </b-button>
                &nbsp;
                <b-button type="reset" variant="primary" class="add" size="sm"
                          v-on:click="handleReset()"><i
                  class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
                </b-button>
                &nbsp;
                <b-button type="reset" size="sm" variant="danger" class="mr-2"
                          @click.prevent="handleCancel"><i
                  class="fa fa-close fa-lg mt-1.9"></i>{{ $t("cancel") }}
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>
<script src="@/components/services/process/audit_reply/reply_OPAP.js"></script>
<style scoped>
.animated .card .card-header {
  background-color: #c1c4c7;
  /*background-color: #9a7ae2;*/
}

input {
  border: 0;
}

.review-reply-container {
  max-width: 100%;
  margin: auto;
  padding: 0 30px;
  background-color: #fff;
  border: 1px solid transparent; /* Removes margin collapse */
}

.comment {
  position: relative;
  margin: 10px auto;
}

.comment-heading {
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 14px;
}

.comment-info {
  color: rgba(0, 0, 0, 0.5);
  margin-left: 10px;
}

.comment-author {
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
  text-decoration: none;
}

.comment-body {
  padding: 0 20px;
  padding-left: 28px;
}

.replies {
  margin-left: 20px;
}
</style>
