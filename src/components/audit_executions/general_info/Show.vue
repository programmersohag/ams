<template>
  <div class="animated fadeIn entry-form">

    <div class="text-left border">
      <div class="container">
        <div class="row">
          <div class="col">
            <label>SCHEDULE</label>
            <p><strong>{{ schedule }}</strong></p>
          </div>
          <div class="col">
            <label>LOCATION</label>
            <p><strong>{{ location }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label> TEAM INFO</label>
            <p><strong>{{ teamMembers }}</strong></p>
          </div>
          <div class="col">
            <label>AUDIT PERIOD</label>
            <p><strong>{{ auditPeriod }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>AUDITING DATE</label>
            <p><strong>{{ auditingDate }}</strong></p>
          </div>
          <div class="col">
            <label>AUDIT AREA</label>
            <p><strong>{{ auditArea }}</strong></p>
          </div>

        </div>
        <div class="row">
          <div class="col">
            <label>PURPOSE</label>
            <p><strong>{{ purpose }}</strong></p>
          </div>
          <div class="col">
            <label>LIMITATION OF AUDIT</label>
            <p><strong>{{ limitationOfAudit }}</strong></p>
          </div>
          <!--<div class="col">
            <label>STATUS</label>
            <p><strong>{{ issueStatus }}</strong></p>
          </div>-->
        </div>
      </div>
    </div>
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

<script src="@/components/services/audit_executions/general_info/Show.js"></script>
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
