<template>
  <div class="animated fadeIn entry-list">
    <b-form @submit.prevent="handleSubmit" autocomplete="off">
      <b-card>
        <div slot="header">
          <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ page_title }}</h5>
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
            <div class="table-responsive">
              <b-table class="table table-bordered report-table" :fields="fields" :items="budgets">
              </b-table>
            </div>
          </b-col>
        </b-row>
        <br/>
        <b-card tag="article" style="max-width: 40rem;" class="mb-2">
          <div class="head" slot="header">
            <h5>{{ $t('review') + " " + $t('details') }}</h5>
          </div>
          <div class="row">
            <b-col sm="4">
              <p><label>REVIEWED BY</label></p>
            </b-col>
            <b-col >
              <h5><strong>{{ inputForm.txt_reviewed_by }}</strong></h5>
            </b-col>
          </div>
          <div class="row">
            <b-col sm="4">
              <p><label>REVIEW STATUS</label></p>
            </b-col>

            <b-col >
              <div class="audit_reply" v-if="inputForm.txt_review_status=='Done'">
                <b-badge variant="success">
                  <h5><strong v-html="inputForm.txt_review_status"></strong></h5>
                </b-badge>
              </div>
              <div class="audit_reply" v-else-if="inputForm.txt_review_status =='Feedback'">
                <b-badge variant="danger">
                  <h5><strong v-html="inputForm.txt_review_status"></strong></h5>
                </b-badge>
              </div>
              <div class="audit_reply" v-else>
                <b-badge variant="warning" pill>
                  <h5><strong v-html="inputForm.txt_review_status"></strong></h5>
                </b-badge>
              </div>
            </b-col>
          </div>
          <div class="row">
            <b-col sm="4">
              <p><label>REVIEW DATE</label></p>
            </b-col>
            <b-col >
              <h5><strong>{{ inputForm.txt_review_date }}</strong></h5>
            </b-col>
          </div>
          <div class="row">
            <b-col sm="4">
              <p><label>REVIEW COMMENT</label></p>
            </b-col>
            <b-col sm="8">
              <!--<b-form-textarea-->
              <!--id="textarea-default"-->
              <!--placeholder="Default textarea"-->
              <!--v-html="inputForm.txt_review"-->
              <!--rows="3"-->
              <!--&gt;</b-form-textarea>-->
              <div class="comment">
                <strong v-html="inputForm.txt_review"></strong>
              </div>
            </b-col>
          </div>
        </b-card>

        <b-card tag="article" style="max-width: 40rem;" class="mb-2">
          <div class="head" slot="header">
            <h5>{{ $t('replay') + " " + $t('details') }}</h5>
          </div>
          <div class="row">
            <b-col sm="4">
              <p><label>REPLYED BY</label></p>
            </b-col>
            <b-col >
              <h5><strong>{{ inputForm.txt_reply_by }}</strong></h5>
            </b-col>
          </div>
          <div class="row">
            <b-col sm="4">
              <p><label>REPLY STATUS</label></p>
            </b-col>

            <b-col >
              <div class="audit_reply" v-if="inputForm.txt_reply_status=='Done'">
                <b-badge variant="success">
                  <h5><strong v-html="inputForm.txt_reply_status"></strong></h5>
                </b-badge>
              </div>
              <div class="audit_reply" v-else-if="inputForm.txt_reply_status =='Feedback'">
                <b-badge variant="danger">
                  <h5><strong v-html="inputForm.txt_review_status"></strong></h5>
                </b-badge>
              </div>
              <div class="audit_reply" v-else>
                <b-badge variant="warning" pill>
                  <h5><strong v-html="inputForm.txt_reply_status"></strong></h5>
                </b-badge>
              </div>
            </b-col>
          </div>
          <div class="row">
            <b-col sm="4">
              <p><label>REPLY DATE</label></p>
            </b-col>
            <b-col >
              <h5><strong>{{ inputForm.txt_reply_date }}</strong></h5>
            </b-col>
          </div>
          <div class="row">
            <b-col sm="4">
              <p><label>REPLY COMMENT</label></p>
            </b-col>
            <b-col sm="8">
              <!--<b-form-textarea-->
              <!--id="textarea-default"-->
              <!--placeholder="Default textarea"-->
              <!--v-html="inputForm.txt_review"-->
              <!--rows="3"-->
              <!--&gt;</b-form-textarea>-->
              <div class="comment">
                <strong v-html="inputForm.txt_review"></strong>
              </div>
            </b-col>
          </div>
        </b-card>
        <b-row>
          <b-col sm="6">
            <b-form-group
              :label='this.$t("comments")+" "+this.valid_star'
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
              <form-error v-if="is_error_msg_show" :message="errorMessage['inputForm.txt_comment']"> </form-error>
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
      </b-card>

    </b-form>
  </div>
</template>
<script src="@/components/services/process/corrective_action_tools/cat_Budget.js"></script>
<style>
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
</style>
