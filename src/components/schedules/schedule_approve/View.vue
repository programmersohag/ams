<template>
  <div class="animated fadeIn entry-form">
    <div class="text-left border">
      <div class="container">
        <div class="row">
          <div class="col-4">
            <label>SCHEDULE NAME</label>
          </div>
          <div class="col-8">
            <p><strong>{{ '[' + formData['code'] + ']-' + formData['name'] }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label>LOCATION</label>
          </div>
          <div class="col-8">
            <p><strong>{{ formData['locationName'] }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label>TEAM</label>
          </div>
          <div class="col-8">
            <p><strong>{{ formData['teamName'] }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label>PROJECT</label>
          </div>
          <div class="col-8">
            <p><strong>{{ formData['projectName'] }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label>LAST AUDIT DATE</label>
          </div>
          <div class="col-8">
            <p><strong>{{ formData['lastAuditDate'] }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label>CYCLE NUMBER</label>
          </div>
          <div class="col-8">
            <p><strong>{{ formData['auditCycleNumber'] }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label>AUDIT DURATION</label>
          </div>
          <div class="col-8">
            <p><strong>{{
                formData['auditingFromDate'] + ' To ' + formData['auditingToDate']
                + ' [' + formData['auditDurationDay'] + ' day(s)]'
              }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label>AUDIT PERIOD</label>
          </div>
          <div class="col-8">
            <p><strong>{{ formData['auditPeriodFromDate'] + ' To ' + formData['auditPeriodToDate'] }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label>STATUS</label>
          </div>
          <div class="col-8">
            <p><strong>{{ formData['scheduleStatus'] }}</strong></p>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label>NOTE</label>
          </div>
          <div class="col-8">
            <p v-html="formData['note']"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="@/components/services/schedules/schedule_approve/View.js"></script>

