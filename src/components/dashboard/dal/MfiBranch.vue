<template>
    <div>
        <b-card class="text-right trend-child-card dal-card">
            <div slot="header">
                <b-row>
                    <!-- <b-col class="c" cols="3" v-if="layer != 4">
                        <b-form-select
                            size="sm"
                            :plain="true"
                            :options="poData"
                            v-model="ids['poId']"
                            @change.native="poChange($event)">
                        </b-form-select> 
                    </b-col> -->
                    <!-- <b-col class="c" cols="3" v-if="layer == '1'">
                        <b-form-select
                            size="sm"
                            :plain="true"
                            :options="zoneList"
                            v-model="ids['zoneId']"
                            @change.native="zoneChange($event)">
                        </b-form-select> 
                    </b-col> -->
                    <!-- <b-col class="c" cols="3" v-if="(layer == '1') || (layer == '2')">
                        <b-form-select
                            size="sm"
                            :plain="true"
                            :options="areaList"
                            v-model="ids['areaId']"
                            @change.native="areaChange($event)">
                        </b-form-select> 
                    </b-col> -->
                    <!-- <b-col class="c" cols="3">
                        <date-picker
                            style="width:100%"
                            date-format="yy-mm-dd" 
                            placeholder="Rating Date"
                            @input="getRatingDate($event)"
                            v-model="ratingDate">
                        </date-picker>
                    </b-col> -->
                    
                    <b-col class="c" cols="3">
                        <b-form-select
                            size="sm"
                            :plain="true"
                            :options="ratingDatelist"
                            v-model="ratingDate">
                        </b-form-select> 
                    </b-col>
                </b-row>
            </div>
            <highcharts  v-if="Object.keys(data_info).length > 0" :options="chartOptions"></highcharts>
            <NoFoundForChart :cssStyle="'135px auto'" v-else />
        </b-card>
        <mf-loader v-if="isLoad" />
    </div>
</template>
<script src="@/components/services/dashboard/dal/MfiBranch.js"></script>