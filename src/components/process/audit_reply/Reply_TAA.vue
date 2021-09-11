<template>
  <div class="animated fadeIn entry-list">
    <b-card>
      <div slot="header">
        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;Target And Achievement</h5>
      </div>
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
        <div class="table-responsive">
          <b-table class="table table-bordered report-table" :fields="fields" :items="target_and_achievements">
          </b-table>
        </div>
      </b-col>
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
                :options="options"
                autocomplete="off"
                v-validate="'required'"
                data-vv-as="status"
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
<script src="@/components/services/process/audit_reply/reply_TAA.js"></script>
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
