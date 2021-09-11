<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <div v-if="is_data_ready" class="md-stepper-horizontal">
          <div v-for="index in total_steps" :key="index" v-bind:class="class_header[index]">
            <div @click="changeStep(index)">
              <div class="md-step-circle"><span>{{original_tag[index]}}</span></div>
              <div v-bind:class="title_class[index]">{{header_info[index]}}</div>
              <div class="md-step-bar-left"></div>
              <div class="md-step-bar-right"></div>
            </div>
          </div>
        </div>
      </div>
      <b-row v-if="current_step===1 && is_data_ready">
        <b-form autocomplete="off">
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
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_cash_in_hand"
                        v-validate="'required'"
                        type="number"
                        autocomplete="off"
                        v-model="cash_info.cashInHand"
                        @change="onChangeCashInHand($event)"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('txt_cash_in_hand') || errorMessage['txt_cash_in_hand']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>1</td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_denotation_one_quantity"
                        v-validate="'required'"
                        type="number"
                        autocomplete="off"
                        @change="onChangeOne($event)"
                        v-model="cash_info.denotationOneQuantity"
                      >
                      </b-form-input>
                      <form-error
                        :message="errors.first('txt_denotation_one_quantity') || errorMessage['txt_denotation_one_quantity']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>
                  {{cash_info.denotationOneAmount}}
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_denotation_two_quantity"
                        v-validate="'required'"
                        type="number"
                        autocomplete="off"
                        v-model="cash_info.denotationTwoQuantity"
                        @change="onChangeTwo($event)"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('txt_denotation_two_quantity') || errorMessage['txt_denotation_two_quantity']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>
                  {{cash_info.denotationTwoAmount}}
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_denotation_five_quantity"
                        v-validate="'required'"
                        type="number"
                        autocomplete="off"
                        v-model="cash_info.denotationFiveQuantity"
                        @change="onChangeFive($event)"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('txt_denotation_five_quantity') || errorMessage['txt_denotation_five_quantity']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>
                  {{cash_info.denotationFiveAmount}}
                </td>
              </tr>
              <tr>
                <td>10</td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_denotation_ten_quantity"
                        v-validate="'required'"
                        type="number"
                        autocomplete="off"
                        v-model="cash_info.denotationTenQuantity"
                        @change="onChangeTen($event)"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('txt_denotation_ten_quantity') || errorMessage['txt_denotation_ten_quantity']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>
                  {{cash_info.denotationTenAmount}}
                </td>
              </tr>
              <tr>
                <td>20</td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_denotation_twenty_quantity"
                        v-validate="'required'"
                        type="number"
                        autocomplete="off"
                        v-model="cash_info.denotationTwentyQuantity"
                        @change="onChangeTwenty($event)"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('txt_denotation_twenty_quantity') || errorMessage['txt_denotation_twenty_quantity']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>
                  {{cash_info.denotationTwentyAmount}}
                </td>
              </tr>
              <tr>
                <td>50</td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_denotation_fifty_quantity"
                        v-validate="'required'"
                        type="number"
                        autocomplete="off"
                        v-model="cash_info.denotationFiftyQuantity"
                        @change="onChangeFifty($event)"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('txt_denotation_fifty_quantity') || errorMessage['txt_denotation_fifty_quantity']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>
                  {{cash_info.denotationFiftyAmount}}
                </td>
              </tr>
              <tr>
                <td>100</td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="denotation_one_hundred_quantity"
                        v-validate="'required'"
                        type="number"
                        autocomplete="off"
                        v-model="cash_info.denotationOneHundredQuantity"
                        @change="onChangeOneHundred($event)"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('denotation_one_hundred_quantity') || errorMessage['denotation_one_hundred_quantity']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>
                  {{cash_info.denotationOneHundredAmount}}
                </td>
              </tr>
              <tr>
                <td>200</td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_denotation_two_hundred_quantity"
                        v-validate="'required'"
                        type="number"
                        autocomplete="off"
                        v-model="cash_info.denotationTwoHundredQuantity"
                        @change="onChangeTwoHundred($event)"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('txt_denotation_two_hundred_quantity') || errorMessage['txt_denotation_two_hundred_quantity']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>
                  {{cash_info.denotationTwoHundredAmount}}
                </td>
              </tr>
              <tr>
                <td>500</td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_denotation_five_hundred_quantity"
                        v-validate="'required'"
                        type="number"
                        autocomplete="off"
                        v-model="cash_info.denotationFiveHundredQuantity"
                        @change="onChangeFiveHundred($event)"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('txt_denotation_five_hundred_quantity') || errorMessage['txt_denotation_five_hundred_quantity']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>
                  {{cash_info.denotationFiveHundredAmount}}
                </td>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_denotation_one_thousand_quantity"
                        v-validate="'required'"
                        type="number"
                        autocomplete="off"
                        v-model="cash_info.denotationOneThousandQuantity"
                        @change="onChangeOneThousand($event)"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('txt_denotation_one_thousand_quantity') || errorMessage['txt_denotation_one_thousand_quantity']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>
                  {{cash_info.denotationOneThousandAmount}}
                </td>
              </tr>
              <tr>
                <td>Coin</td>
                <td></td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_denotation_coin_amount"
                        v-validate="''"
                        type="number"
                        autocomplete="off"
                        v-model="cash_info.denotationCoinAmount"
                        @change="onChangeCoin($event)"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('txt_denotation_coin_amount') || errorMessage['txt_denotation_coin_amount']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Total</td>
                <td></td>
                <td></td>
                <td>
                  {{cash_info.denotationTotalAmount}}
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Difference in Cash Balance</td>
                <td></td>
                <td></td>
                <td>
                  {{cash_info.cashAmountDifference}}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </b-form>
      </b-row>
      <b-row v-if="current_step===2">
        <b-form autocomplete="off">
          <div class="table-responsive">
            <table class="table table-sm table-bordered">
              <thead>
              <tr>
                <th colspan="2">Bank Balance According to Bank Book</th>
                <th>Actual Bank Balance According to Bank Statement</th>
                <th rowspan="2">Difference</th>
                <th rowspan="2">Action</th>
              </tr>
              <tr>
                <th>Bank Details</th>
                <th>Amount</th>
                <th>Amount</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <b-form-group>
                    <b-form-textarea
                      class="form-control form-control-sm"
                      name="txt_bank_book_details"
                      v-validate="'required'"
                      data-vv-as="Bank Book Details"
                      type="number"
                      autocomplete="off"
                      v-model="bank_info.bankBookDetails"
                    ></b-form-textarea>
                    <form-error
                      :message="errors.first('txt_bank_book_details') || errorMessage['txt_bank_book_details']"></form-error>
                  </b-form-group>
                </td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_bank_book_amount"
                        v-validate="'required'"
                        data-vv-as="Bank Book Amount"
                        type="number"
                        autocomplete="off"
                        v-model="bank_info.bankBookAmount"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('txt_bank_book_amount') || errorMessage['txt_bank_book_amount']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>
                  <b-col class="col col-md-6">
                    <b-form-group>
                      <b-form-input
                        class="form-control form-control-sm"
                        name="txt_bank_statement_amount"
                        v-validate="'required'"
                        type="number"
                        data-vv-as="Bank Statement Amount"
                        autocomplete="off"
                        v-model="bank_info.bankStatementAmount"
                        @change="onChangeCashInHand($event)"
                      ></b-form-input>
                      <form-error
                        :message="errors.first('txt_bank_statement_amount') || errorMessage['txt_bank_statement_amount']"></form-error>
                    </b-form-group>
                  </b-col>
                </td>
                <td>{{bank_info.bankBookAmount-bank_info.bankStatementAmount}}</td>
                <td class="text-center">
                  <b-button title="submit" type="button" size="sm" variant="success"
                            class="mr-2" @click.prevent="addBankData()">
                    <i class="fa fa-plus-circle"></i>&nbsp;{{ $t("add") }}
                  </b-button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </b-form>
        <div class="table-responsive">
          <table class="table table-sm table-bordered">
            <thead>
            <tr>
              <th colspan="2">Bank Balance According to Bank Book</th>
              <th>Actual Bank Balance According to Bank Statement</th>
              <th rowspan="2">Difference</th>
              <th rowspan="2">Action</th>
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
              <td>{{ row['bankBookAmount'] - row['bankStatementAmount'] }}</td>
              <td class="text-center">
                <b-button title="edit" type="button" size="sm" variant="warning" class="mr-1"
                          @click.prevent="editBank(row)">
                  <i class="fa fa-edit"></i>
                </b-button>
                <b-button title="delete" type="button" size="sm" variant="danger"
                          class="mr-1" @click.prevent="deleteBank(row,key)">
                  <i class="fa fa-trash"></i>
                </b-button>
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{{ bankBookTotalAmount }}</td>
              <td>{{ bankStatementTotalAmount }}</td>
              <td>{{ bankBookTotalAmount-bankStatementTotalAmount }}</td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
      </b-row>
      <b-row v-if="current_step===3">
        <b-form autocomplete="off">
          <b-col>
            <b-form-group
              :label='this.$t("comment")+" "+this.valid_star'
              label-size="sm"
              label-for="txt_comment"
              :label-cols="4"
              :horizontal="true"
            >
              <vue-ckeditor type="classic" v-model="cash_info.comment" v-validate="'required'"
                            :editors="editors"></vue-ckeditor>
              <span v-show="errors.has('txt_comment')"
                    class="text-danger">{{ errors.first('txt_comment') }}</span>
              <span v-if="formErrors['txt_comment'] "
                    class="text-danger">{{ formErrors['txt_comment'] }}</span>
            </b-form-group>
          </b-col>
        </b-form>
      </b-row>
      <div slot="footer" align="middle">
        <b-button :disabled="is_prev_button_disable" title="Previous Step" type="button" size="sm" variant="info"
                  class="mr-2"
                  @click.prevent="handlePreviousPage()">
          <i class="fa fa-arrow-left"></i>&nbsp;{{ $t("previous") }}
        </b-button>
        <b-button title="Reset" type="button" size="sm" variant="warning" class="mr-2"
                  @click="resetPage()">
          <i class="fa fa-refresh"></i>&nbsp;{{ $t("reset") }}
        </b-button>
        <b-button v-if="current_step === 1" title="Next" type="button" size="sm" variant="success"
                  class="mr-2" @click.prevent="addCash()">
          <i class="fa fa-dot-circle-o"></i>&nbsp;{{ $t("next") }}
        </b-button>
        <b-button v-if="current_step === 2" title="Submit Bank" type="button" size="sm" variant="success"
                  class="mr-2" @click.prevent="addBank()">
          <i class="fa fa-dot-circle-o"></i>&nbsp;{{ $t("next") }}
        </b-button>
        <b-button v-if="is_save_button_show" title="Save" type="button" size="sm" variant="info"
                  class="mr-2"
                  @click.prevent="submitComment()">
          &nbsp;{{ $t("submit") }}
        </b-button>
        <mf-button :btnType="'back'" class="mr-2 btn-warning"/>
      </div>
    </b-card>
  </div>
</template>
<style scoped>
  .btnPad {
    padding: 0.8rem .10rem;
  }

  table.member-doc tr td {
    vertical-align: middle;
  }

  table.member-doc tr.c-disabled td {
    pointer-events: none;
    opacity: 0.5;
    background: #f3f3f3;
  }

  .font-size {

    font-size: 14px;
    font-weight: bold;

  }

  div.card-header {
    font-size: 13px;

  }

  div.card div.card-body {
    padding: 5px 20px;
  }

  .badge {
    padding: 10px 4px;
    /* width: 100%; */
    display: block;
    text-align: center;
    background: var(--background-color-light);;
    color: black;
    font-weight: lighter;
    font-size: 12px;
    border: none;
    border-radius: 4px;
    box-shadow: 5px 5px 8px #dbdbdb,
    -5px -5px 8px #ffffff;
  }

  html {
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
    -ms-font-smoothing: antialiased !important;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    color: #555555;
  }

  .md-stepper-horizontal {
    display: table;
    width: 100%;
    margin: 0 auto;
    background-color: seashell;
    box-shadow: 0 5px 8px -6px rgba(0, 0, 0, .50);
  }

  .md-stepper-horizontal .md-step {
    display: table-cell;
    position: relative;
    padding: 5px;
  }

  .md-stepper-horizontal .md-step:active {
    border-radius: 15% / 75%;
  }

  .md-stepper-horizontal .md-step:first-child:active {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .md-stepper-horizontal .md-step:last-child:active {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .md-stepper-horizontal .md-step:first-child .md-step-bar-left,
  .md-stepper-horizontal .md-step:last-child .md-step-bar-right {
    display: none;
  }

  .md-stepper-horizontal .md-step .md-step-circle {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    background-color: #999999;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    font-weight: 600;
    color: var(--background-color);
  }

  .md-stepper-horizontal.green .md-step.active .md-step-circle {
    background-color: #00AE5D;
  }

  .md-stepper-horizontal.orange .md-step.active .md-step-circle {
    background-color: #F96502;
  }

  .md-stepper-horizontal .md-step.active.done .md-step-circle {
    background-color: rgb(24, 185, 24);
    color: whitesmoke;
  }

  .md-stepper-horizontal .md-step.active.done .md-step-title {
    color: rgb(24, 185, 24);
    text-align: center;
  }

  .md-stepper-horizontal .md-step.done .md-step-title {
    color: rgb(24, 185, 24);
    text-align: center;
  }

  .md-stepper-horizontal .md-step.done .md-step-circle:before {
    font-family: 'FontAwesome', serif;
    font-weight: 100;
    content: "\f00c";

  }

  .md-stepper-horizontal .md-step.done .md-step-circle *,
  .md-stepper-horizontal .md-step.editable .md-step-circle * {
    display: none;
  }

  /* .md-stepper-horizontal .md-step.editable .md-step-circle {
      -moz-transform: scaleX(-1);
      -o-transform: scaleX(-1);
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
  } */

  .md-stepper-horizontal .md-step.editable .md-step-circle:before {
    font-family: 'FontAwesome';
    font-weight: 100;
    content: "\f044";
    color: var(--background-color);

  }

  .md-stepper-horizontal .md-step.active.done .md-step-title {

    color: whitesmoke;
    text-align: center;

  }

  .md-stepper-horizontal .md-step .md-step-optional {
    font-size: 12px;
  }

  .md-stepper-horizontal .md-step.active .md-step-optional {
    color: rgba(0, 0, 0, .55);
  }

  .md-stepper-horizontal .md-step .md-step-bar-left,
  .md-stepper-horizontal .md-step .md-step-bar-right {
    position: absolute;
    top: 56px;
    height: 1px;
    border-top: 1px solid #DDDDDD;
  }

  .md-stepper-horizontal .md-step .md-step-bar-right {
    right: 0;
    left: 50%;
    margin-left: 20px;
  }

  .md-stepper-horizontal .md-step .md-step-bar-left {
    left: 0;
    right: 50%;
    margin-right: 20px;
  }

  .md-stepper-horizontal .md-step.editable .md-step-title {
    color: whitesmoke;
    text-align: center;
    font-size: 12px;
  }

  .md-stepper-horizontal .md-step.divdisabled .md-step-title {
    color: var(--background-color);
    text-align: center;
    font-size: 12px;
  }

  .md-stepper-horizontal .md-step.divdisabled:hover .md-step-title {
    color: whitesmoke;
    text-align: center;
    font-size: 12px;
  }

  .md-stepper-horizontal .md-step .md-step-title {
    text-align: center;
    color: var(--background-color);
  }

  .md-stepper-horizontal .md-step:hover .md-step-title {
    text-align: center;
    color: whitesmoke;
  }

  .md-stepper-horizontal .md-step.active.done .md-step-title {
    color: rgb(24, 185, 24);

  }

</style>

<script src="@/components/services/audit_executions/cash_and_bank_balances/Add.js"></script>

