<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col xs="12" lg="12">
        <!-- <b-card> -->
          <b-tabs v-model="tabIndex[0]">
            <b-tab active @click="loadChildComponent(tabIndex[0])">
              <template slot="title">
                <i class="fa fa-home"></i> {{tabs[0]}}
              </template>
              <Financial v-if="isFinancial"></Financial>
            </b-tab>
          </b-tabs>
        <!-- </b-card> -->
      </b-col>
    </b-row>
  </div>
</template>

<script src="@/components/services/dashboard/IndexAis.js"></script>
<style src="@/assets/css/dashboard.css"></style>
<style src="@/assets/css/widget.css"></style>
<style>
.box {
  background: #232121;
}
</style>