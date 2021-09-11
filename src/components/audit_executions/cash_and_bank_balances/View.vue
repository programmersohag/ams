<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header" style="font-size:13px;">
        {{$t('Cash Balance')}}
        <div class="float-right">
          <mf-button :btnType="'back'"/>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-sm table-bordered">
          <thead>
          <tr>
            <th colspan="5">Cash Information</th>
          </tr>
          <tr>
            <th rowspan="2" colspan="2">Cash Balance According to Cash Book</th>
            <th colspan="3">Actual Cash Balance</th>
          </tr>
          <tr>
            <th>Denotation</th>
            <th>Numbers</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td rowspan="11">Cash in Hand</td>
            <td rowspan="11">
              {{cash_data.cashInHand}}
            </td>
            <td>1</td>
            <td>
              {{cash_data.denotationOneQuantity}}
            </td>
            <td>
              {{cash_data.denotationOneAmount}}
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              {{cash_data.denotationTwoQuantity}}
            </td>
            <td>
              {{cash_data.denotationTwoAmount}}
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>
              {{cash_data.denotationFiveQuantity}}
            </td>
            <td>
              {{cash_data.denotationFiveAmount}}
            </td>
          </tr>
          <tr>
            <td>10</td>
            <td>
              {{cash_data.denotationTenQuantity}}
            </td>
            <td>
              {{cash_data.denotationTenAmount}}
            </td>
          </tr>
          <tr>
            <td>20</td>
            <td>
              {{cash_data.denotationTwentyQuantity}}
            </td>
            <td>
              {{cash_data.denotationTwentyAmount}}
            </td>
          </tr>
          <tr>
            <td>50</td>
            <td>
              {{cash_data.denotationFiftyQuantity}}
            </td>
            <td>
              {{cash_data.denotationFiftyAmount}}
            </td>
          </tr>
          <tr>
            <td>100</td>
            <td>
              {{cash_data.denotationOneHundredQuantity}}
            </td>
            <td>
              {{cash_data.denotationOneHundredAmount}}
            </td>
          </tr>
          <tr>
            <td>200</td>
            <td>
              {{cash_data.denotationTwoHundredQuantity}}
            </td>
            <td>
              {{cash_data.denotationTwoHundredAmount}}
            </td>
          </tr>
          <tr>
            <td>500</td>
            <td>
              {{cash_data.denotationFiveHundredQuantity}}
            </td>
            <td>
              {{cash_data.denotationFiveHundredAmount}}
            </td>
          </tr>
          <tr>
            <td>1000</td>
            <td>
              {{cash_data.denotationOneThousandQuantity}}
            </td>
            <td>
              {{cash_data.denotationOneThousandAmount}}
            </td>
          </tr>
          <tr>
            <td>Coin</td>
            <td></td>
            <td>
              {{cash_data.denotationCoinAmount}}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>
              {{cash_data.denotationTotalAmount}}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>Difference in Cash Balance</td>
            <td></td>
            <td></td>
            <td>
              {{cash_data.cashAmountDifference}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-card>
    <b-card>
      <div slot="header" style="font-size:13px;">
        {{$t('Bank Balance')}}
      </div>
      <div class="table-responsive">
        <table class="table table-sm table-bordered">
          <thead>
          <tr>
            <th colspan="5">Bank Information</th>
          </tr>
          <tr>
            <th colspan="2">Bank Balance According to Bank Book</th>
            <th>Actual Bank Balance According to Bank Statement</th>
            <th rowspan="2">Difference</th>
          </tr>
          <tr>
            <th>Bank Details</th>
            <th>Amount</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, key) in bank_data" :key="key">
            <td>{{ row['bankBookDetails'] }}</td>
            <td>{{ row['bankBookAmount'] }}</td>
            <td>{{ row['bankStatementAmount'] }}</td>
            <td>{{ row['bankBookAmount']-row['bankStatementAmount'] }}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{{ bankBookTotalAmount }}</td>
            <td>{{ bankStatementTotalAmount }}</td>
            <td>{{ bankBookTotalAmount-bankStatementTotalAmount }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-card>
    <b-card>
      <div slot="header">
        <h5><i class="fa fa-th-list fa-sm"></i> Comments</h5>
      </div>
      <b-row v-html="cash_data.comment"></b-row>
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
              <div class="comment-author">{{data.reviewerName}}</div>
              <p class="m-0">
                Date &bull; {{data.reviewDate}}
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
                      Date &bull; {{data.replyDate}}
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
  </div>
</template>
<script src="@/components/services/audit_executions/cash_and_bank_balances/View.js"></script>

<style scoped>
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

