<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;general information</h5>
      </div>
      <h6><b>Location: </b>{{location}}</h6>
      <h6><b>Schedule: </b>{{schedule}}</h6>
      <h6><b>Team Info: </b>{{team}}</h6>
    </b-card>
    <b-card>
      <div class="head" slot="header">
        <h5>{{$t('general')+" "+$t('information')+" "+$t('details')}}</h5>
      </div>
      <div class="row">
        <b-col sm="3">
          <p><label>AUDIT PERIOD</label></p>
        </b-col>
        <b-col sm="3">
          <strong><p>{{ inputForm.txt_audit_period }}</p></strong>
        </b-col>
        <b-col sm="3">
          <p><label>AUDIT AREA</label></p>
        </b-col>
        <b-col sm="3">
          <strong><p>{{ inputForm.txt_audit_area }}</p></strong>
        </b-col>
      </div>

      <div class="row">
        <b-col sm="3">
          <p><label>PURPOSE</label></p>
        </b-col>
        <b-col sm="3">
          <strong><p>{{ inputForm.txt_purpose }}</p></strong>
        </b-col>
        <b-col sm="3">
          <p><label>LIMITATION OF AUDIT</label></p>
        </b-col>
        <b-col sm="3">
          <strong><p>{{ inputForm.txt_limitation_of_audit }}</p></strong>
        </b-col>
      </div>
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
        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{$t('add')+" "+$t('Review')}}</h5>
      </div>
      <b-form @submit.prevent="handleSubmit" autocomplete="off">
        <b-row align-v="center">
          <b-col sm="6">
            <b-form-group
              :label='this.$t("comment")+" "+this.valid_star'
              label-size="sm"
              label-for="txt_comment"
              :label-cols="4"
              :horizontal="true"
            >
              <vue-ckeditor type="classic" v-model="inputForm.txt_comment" v-validate="'required'"
                            :editors="editors"></vue-ckeditor>
              <span v-show="errors.has('txt_comment')" class="text-danger">{{ errors.first('txt_comment') }}</span>
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
<script src="@/components/services/process/audit_review/review_GI.js"></script>
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
