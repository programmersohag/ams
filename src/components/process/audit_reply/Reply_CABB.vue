<template>
  <div class="animated fadeIn entry-list">
    <b-card>
      <div slot="header">
        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;Cash And Bank Balance</h5>
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
            <h6>Team &nbsp;&nbsp;<b>{{teamName}}</b></h6>
          </b-col>
          <b-card>
            <div slot="header" style="font-size:13px;">
              {{$t('Cash Balance')}}
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
                  <th colspan="2">Actual Bank Balance According to Bank Statement</th>
                  <th rowspan="2">Difference</th>
                </tr>
                <tr>
                  <th>Bank Details</th>
                  <th>Amount</th>
                  <th>Bank Details</th>
                  <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row, key) in bank_data" :key="key">
                  <td>{{ row['bankBookDetails'] }}</td>
                  <td>{{ row['bankBookAmount'] }}</td>
                  <td>{{ row['bankStatementDetails'] }}</td>
                  <td>{{ row['bankStatementAmount'] }}</td>
                  <td>{{ row['bankBookAmount']-row['bankStatementAmount'] }}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>{{ bankBookTotalAmount }}</td>
                  <td></td>
                  <td>{{ bankStatementTotalAmount }}</td>
                  <td>{{ bankBookTotalAmount-bankStatementTotalAmount }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </b-card>
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
                v-validate="'required'"
                data-vv-as="status"
                :options="options"
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
                  <i class="fa fa-save fa-sm"></i>&nbsp;{{$t("submit")}}
                </b-button>
                &nbsp;
                <b-button type="reset" variant="primary" class="add" size="sm"
                          v-on:click="handleReset()"><i
                  class="fa fa-refresh fa-sm"></i>&nbsp;{{$t("reset")}}
                </b-button>
                &nbsp;
                <b-button type="reset" size="sm" variant="danger" class="mr-2"
                          @click.prevent="handleCancel"><i
                  class="fa fa-close fa-lg mt-1.9"></i>{{$t("cancel")}}
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>
<script src="@/components/services/process/audit_reply/reply_CABB.js"></script>
<style scoped>
  .animated .card .card-header {
    background-color: #c1c4c7;
    /*background-color: #9a7ae2;*/
  }

  input {
    border: 0;
  }

  .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar, .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {
    width: 598px;
  }

  .audit_reply .badge {
    padding: 5px 10px;
    font-size: 11px;
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
