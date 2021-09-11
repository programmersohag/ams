<template>
  <div class="animated fadeIn bijoy">
    <b-row>
      <b-col xs="12" lg="12" >
        <!-- <b-card> -->
          <b-tabs v-model="tabIndex[0]">
            <b-tab active>
              <template slot="title">
                <i class="fa fa-home"></i> {{tabs[0]}}
                
              </template>
              <Branch></Branch>
            </b-tab>
            <b-tab @click="loadChildComponent(tabIndex[1])">
              <template slot="title">
                <i class="fa fa-pie-chart"></i> {{tabs[1]}}
              </template>
              <Loan v-if="isLoan"></Loan>
            </b-tab>
            <b-tab @click="loadChildComponent(tabIndex[2])">
              <template slot="title">
                <i class="fa fa-industry"></i> {{tabs[2]}}
              </template>
              <Saving v-if="isSaving"></Saving>
            </b-tab>
            <b-tab @click="loadChildComponent(tabIndex[3])">
              <template slot="title">
                <i class="fa fa-industry"></i> {{tabs[3]}}
              </template>
            </b-tab>
            <b-tab @click="loadChildComponent(tabIndex[4])">
              <template slot="title">
                <i class="fa fa-industry"></i> {{tabs[4]}}
              </template>
            </b-tab>
            <b-tab @click="loadChildComponent(tabIndex[6])">
              <template slot="title">
                <i class="fa fa-industry"></i> {{tabs[6]}}
              </template>
            </b-tab>
          </b-tabs>
        <!-- </b-card> -->
      </b-col>
    </b-row>
  </div>
</template>

<script src="@/components/services/dashboard/IndexMisBijoy.js"></script>
<style src="@/assets/css/dashboard.css"></style>
<style src="@/assets/css/widget.css"></style>
<style>
.box {
  background: #232121;
}
</style>