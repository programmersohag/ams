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
            <label>FIXED ASSET OPENING BALANCE</label>
            <p><strong>{{ fixedAssetOpeningBalance }}</strong></p>
          </div>
          <div class="col">
            <label>FIXED ASSET ADDITION</label>
            <p><strong>{{ fixedAssetAddition }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>FIXED ASSET DISPOSAL</label>
            <p><strong>{{ fixedAssetDisposal }}</strong></p>
          </div>
          <div class="col">
            <label>FIXED ASSET CLOSING BALANCE</label>
            <p><strong>{{ fixedAssetClosingBalance }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>ACTUAL BALANCE AFTER INVENTORY</label>
            <p><strong>{{ actualBalanceAfterInventory }}</strong></p>
          </div>
          <div class="col">
            <label>DEPRECIATION OPENING BALANCE</label>
            <p><strong>{{ depreciationOpeningBalance }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>DEPRECIATION NEW CHARGE</label>
            <p><strong>{{ depreciationNewCharge }}</strong></p>
          </div>
          <div class="col">
            <label>DEPRECIATION ADJUSTMENT</label>
            <p><strong>{{ depreciationAdjustment }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>ACCUMULATED DEPRECIATION</label>
            <p><strong>{{ accumulatedDepreciation }}</strong></p>
          </div>
          <div class="col">
            <label>WRITTEN DOWN VALUE</label>
            <p><strong>{{ writtenDownValue }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Risk Level</label>
            <p><strong>{{ riskLevel }}</strong></p>
          </div>
          <div class="col">
            <label>Satisfaction Ratio</label>
            <p><strong>{{ satisfactionRatio }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Comments</label>
            <p><strong v-html="comment"></strong></p>
          </div>
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
  </div>
</template>

<script src="@/components/services/audit_executions/fixed_assets/Show.js"></script>
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
