<template>
  <div>
    <b-row>
      <b-col xs="12" lg="12" class="mt-2">
        <b-button class="float-right" @click.prevent="handleBack" size="sm" variant="danger"><i
          class="fa fa-backward"></i>&nbsp;{{ $t("back") }}
        </b-button>
      </b-col>
    </b-row>
    <b-card>
      <div slot="header">
        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ page_title }}</h5>
      </div>
      <b-table class="table table-bordered report-table" :fields="fields" :items="items">
        <template slot="comment" slot-scope="row">
          <span v-html="row.value"></span>
        </template>
      </b-table>
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
    </b-card>
  </div>
</template>
<script src="@/components/services/audit_executions/target_and_achievements/View.js"></script>
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
