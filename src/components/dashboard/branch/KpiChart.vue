<template>
    <b-col lg="12">
        <custom-modal v-if="modal_info.isModalVisible && userType == 'auditor'"
                    :componentAddress="modal_info.component_address" :title="modal_info.title"
                    :id="modal_info.id"></custom-modal>

        <div class="box  widget-user-2 trend-child-card trend-card">
            <div class="widget-user-header">
                <b-row>
                    <b-col cols="7">
                     <h6 class="widget-user-desc">
                           <!-- <i class="fa fa-pie-chart"></i> -->
                           <img src="img/audit2.png" width="40px" height="40px">
                           Audit Plan Update
                     </h6>
                    </b-col>
                    <b-col cols="5">
                        <div class="form-row">
                            <div class="col-3">
                                <label class="select_for_darkTheme_lebel">Location</label>
                                <b-form-select class="select_for_darkTheme" size="sm" :plain="true" :options="kpi_list" aria-placeholder="Location" v-model="input.kpi"
                                    @change.native="kpiChange($event)">
                                </b-form-select>
                            </div>
                            <div class="col-3">
                                <label class="select_for_darkTheme_lebel">Category</label>
                                <b-form-select class="select_for_darkTheme" size="sm" :plain="true" :options="order_list" v-model="input.order"
                                    @change.native="orderChange($event)">
                                </b-form-select>
                            </div>
                            <div class="col-3">
                                <label class="select_for_darkTheme_lebel">Audit Rating</label>
                                <b-form-select
                                    class="select_for_darkTheme"
                                    size="sm"
                                    :plain="true"
                                    :options="month_list"
                                    v-model="input.period"
                                    @change.native="periodChange($event)">
                                </b-form-select>
                            </div>
                            <div class="col-3">
                                <label class="select_for_darkTheme_lebel">Audit status</label>
                                <b-form-select class="select_for_darkTheme" size="sm" :plain="true" :options="order_list2" v-model="input.order"
                                    @change.native="orderChange($event)">
                                </b-form-select>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </div>
        </div>


            <div class="">

                <!-- Temporary static Charts -->

                <b-row class="pb-4">
                    <div class="col-sm-4">
                        <div class="chart_box">
                            <!-- <GChart
                                :settings="{packages: ['bar']}"
                                :data="chartDataBar"
                                :options="chartOptions"
                                :createChart="(el, google) => new google.charts.Bar(el)"

                            /> -->
                            <div class="ChartHeader">
                                <h5><i class=""></i>Issue Status</h5>
                            </div>
                            <div class="chart_body">
                                <GChart
                                    type="ColumnChart"
                                    :data="chartDataBar"
                                    :options="chartOptionsBar"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="chart_box">
                            <div class="ChartHeader">
                                <h5><i class=""></i>Overall Audits Ratings</h5>
                            </div>
                            <div class="chart_body">
                                <GChart
                                    type="PieChart"
                                    :data="chartDataPie"
                                    :options="chartOptionPie"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="row">
                            <div class="col-sm-6 pb-2">
                                <div class="atGlanceseeBox">
                                    <div class="row">
                                    <div class="col-sm-5 text-center icon_atGlanceseeBox">
                                        <!-- <i class="fa fa-users fa-3x"></i> -->
                                        <img src="img/img1.png" >
                                    </div>
                                    <div class="col-sm-7 mt-1">
                                        <span class="title_atGlanceseeBox">Total Audit</span><br>
                                        <h5 class="value_atGlanceseeBox">{{total_audit}}</h5>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 pb-2">
                                <div class="atGlanceseeBox">
                                        <div class="row">
                                        <div class="col-sm-5 text-center icon_atGlanceseeBox">
                                            <!-- <i class="fa fa-building-o fa-3x"></i> -->
                                            <img src="img/img2.png" >
                                        </div>
                                        <div class="col-sm-7 mt-1">
                                            <span class="title_atGlanceseeBox">Scheduled</span><br>
                                            <h5 class="value_atGlanceseeBox">{{total_schedules}}</h5>
                                        </div>
                                        </div>
                                    </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6 pb-2">
                                <div class="atGlanceseeBox">
                                    <div class="row">
                                    <div class="col-sm-5 text-center icon_atGlanceseeBox">
                                        <!-- <i class="fa fa-money fa-3x"></i> -->
                                        <img src="img/img3.png" >
                                    </div>
                                    <div class="col-sm-7 mt-1">
                                        <span class="title_atGlanceseeBox">Approved Schedule</span><br>
                                        <h5 class="value_atGlanceseeBox">{{approved_schedule}}</h5>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 pb-2">
                                <div class="atGlanceseeBox">
                                    <div class="row">
                                    <div class="col-sm-5 text-center icon_atGlanceseeBox">
                                        <!-- <i class="fa fa-line-chart fa-3x"></i> -->
                                        <img src="img/img4.png" >
                                    </div>
                                    <div class="col-sm-7 mt-1">
                                        <span class="title_atGlanceseeBox">Pending Schedule</span><br>
                                        <h5 class="value_atGlanceseeBox">{{pending_schedules}}</h5>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      <div class="row">
                        <div class="col-sm-6 pb-2">
                          <div class="atGlanceseeBox">
                            <div class="row">
                              <div class="col-sm-5 text-center icon_atGlanceseeBox">
                                <!-- <i class="fa fa-money fa-3x"></i> -->
                                <img src="img/img1.1.png" >
                              </div>
                              <div class="col-sm-7 mt-1">
                                <span class="title_atGlanceseeBox">Reject Schedule</span><br>
                                <h5 class="value_atGlanceseeBox">{{reject_schedules}}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6 pb-2">
                          <div class="atGlanceseeBox">
                            <div class="row">
                              <div class="col-sm-5 text-center icon_atGlanceseeBox">
                                <!-- <i class="fa fa-line-chart fa-3x"></i> -->
                                <img src="img/img1.2.png" >
                              </div>
                              <div class="col-sm-7 mt-1">
                                <span class="title_atGlanceseeBox">Feedback schedule</span><br>
                                <h5 class="value_atGlanceseeBox">{{feedback_schedules}}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
<!--                        <div class="row">-->
<!--                            <div class="col-sm-12">-->
<!--                                <div class="atGlanceseeBox">-->
<!--                                    <div class="row">-->
<!--                                    <div class="col-sm-5 text-center icon_atGlanceseeBox">-->
<!--                                        &lt;!&ndash; <i class="fa fa-line-chart fa-3x"></i> &ndash;&gt;-->
<!--                                        <img src="img/img1.5.png" >-->
<!--                                    </div>-->
<!--                                    <div class="col-sm-7 mt-1">-->
<!--                                        <span class="title_atGlanceseeBox">Pending Audits</span><br>-->
<!--                                        <h5 class="value_atGlanceseeBox">{{pending_audits}}</h5>-->
<!--                                    </div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
                    </div>
                </b-row>
                <b-row class="pb-4">
                    <div class="col-sm-6">
                        <div class="chart_box">
                            <!-- <GChart
                                :settings="{packages: ['bar']}"
                                :data="chartDataVerBar"
                                :options="chartOptionsVerBar"
                                :createChart="(el, google) => new google.charts.Bar(el)"
                                @ready="onChartReady"

                            /> -->
                            <div class="ChartHeader">
                                <h5><i class=""></i>Issue by Location</h5>
                            </div>
                            <div class="chart_body">
                                <GChart
                                    type="BarChart"
                                    :data="chartDataVerBar"
                                    :options="chartOptionsVerBar"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="chart_box chart_box_gantt">
                            <div class="ChartHeader">
                                <h5><i class=""></i>Audit Schedule</h5>
                            </div>
                            <div class="chart_body">
                                <GChart
                                    :settings="{ packages: ['gantt'] }"
                                    type="Gantt"
                                    :data="chartDataGantt"
                                    :options="chartOptionGnt"
                                    ref="gChart"
                                />
                            </div>

                        </div>
                    </div>
                </b-row>

                <!-- Temporary static Charts -->

            </div>

    </b-col>
</template>
<script src="@/components/services/dashboard/branch/KpiChart.js"></script>
<style scoped>
  .chart_box{
      overflow-x: scroll;
      background: var(--background-color);
      box-shadow: 0 4px 20px 1px rgba(0,0,0,.06), 0 1px 4px rgba(0,0,0,.08);
      border-radius: 10px;
  }
  .chart_box .chart_body{
      padding: 10px;
  }
  .chart_box_gantt{
      overflow-y: scroll;
  }
  .icon_atGlanceseeBox img{
      width: 4.6em;
      height: 4.6em;
      margin-top: -5px;
  }
  .ChartHeader{
      border-bottom: 1px solid rgb(204, 199, 199);
      padding: 5px;
  }
  .ChartHeader h5{
      color: grey !important;
      font-size: 14px;
      margin-left: 10px;
      margin-top: 3 px;

  }

</style>
