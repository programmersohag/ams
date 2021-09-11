<template>
  <div class="animated fadeIn entry-form">
    <b-form @submit.prevent="handleSubmit" autocomplete="off">
      <div data-v-264e952c="" class="row pl-3 pr-3">
        <div data-v-264e952c="" class="col-sm-6 pb-3" v-for="(data) in formData">
          <div data-v-264e952c="">
            <div class="schedule_div" v-if="scheduleId!= data.schedule_id" @click="saveToLocal(data)">
              <div class="schedule_div_header">
                <i class="fa fa-map-marker" aria-hidden="true" style="margin-right: 5px;"></i> <b>{{
                  data.location_name
                }}</b>
              </div>
              <div class="schedule_div_body">
                <div>
                  <i class="fa fa-list-alt" aria-hidden="true"></i>
                  <i> {{ data.schedule_name }}</i>
                </div>
                <div class="schedule_members">
                  <i class="fa fa-users" aria-hidden="true"></i>
                  <i>{{ data.member_name }}</i>
                </div>
              </div>
            </div>

            <div v-else class="added_shcedule_div">
              <div class="schedule_div_header">
                <b style="float:left; margin-left:0.5em;"><i class="fa fa-check-circle fa-lg"></i></b>
                <i class="fa fa-map-marker" aria-hidden="true" style="margin-right: 5px;"></i> <b>{{
                  data.location_name
                }}</b>
              </div>
              <div class="schedule_div_body">
                <div>
                  <i class="fa fa-list-alt" aria-hidden="true"></i>
                  <i> {{ data.schedule_name }}</i>
                </div>
                <div class="schedule_members">
                  <i class="fa fa-users" aria-hidden="true"></i>
                  <i>{{ data.member_name }}</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script src="@/components/services/schedules/schedule_popup/scheduleCards.js"></script>

<style scoped>

.added_shcedule_div {
  color: #155724;
  cursor: pointer;
  background-color: #d4edda;
  border: 1px solid #46a75c !important;
  min-height: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0 4px 20px 1px rgba(0, 0, 0, .06), 0 1px 4px rgba(0, 0, 0, .08);
  box-shadow: 0 4px 20px 1px rgba(0, 0, 0, .06), 0 1px 4px rgba(0, 0, 0, .08);

}

.schedule_div {

  min-height: 100%;
  cursor: pointer;
  background: var(--background-color);
  border-radius: 10px;
  -webkit-box-shadow: 0 4px 20px 1px rgba(0, 0, 0, .06), 0 1px 4px rgba(0, 0, 0, .08);
  box-shadow: 0 4px 20px 1px rgba(0, 0, 0, .06), 0 1px 4px rgba(0, 0, 0, .08);
  border: 0;

}

.schedule_div:hover {
  transform: scale(1.08);
}

.schedule_div .schedule_div_header {
  text-align: center;
  text-transform: capitalize;
  padding: 4px;
  border-bottom: 1px solid rgb(168, 162, 162);
  font-size: 18px;

}

.schedule_div .schedule_div_body {
  padding: 20px;
}

.added_shcedule_div .schedule_div_header {
  text-align: center;
  text-transform: capitalize;
  padding: 4px;
  border-bottom: 1px solid #57c470;
  font-size: 18px;

}

.added_shcedule_div .schedule_div_body {
  padding: 20px;
}

.schedule_members {
  display: inline;
}

.schedule_div_body i {
  overflow-wrap: break-word;
  display: inline;
  padding-right: 5px;
  font-style: normal;
  font-weight: 500;
}
</style>
