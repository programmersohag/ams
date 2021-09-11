<template>
    <div>
        <b-card class="text-right trend-child-card dal-card">
            <div slot="header">
                <!-- <date-picker
                    date-format="yy-mm-dd" 
                    placeholder="From Date"
                     @input="getRatingDate($event)"
                    v-model="ratingDate">
                </date-picker> -->
                <b-row>
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
            <highcharts v-if="Object.keys(data_info).length > 0" :options="chartOptions"></highcharts>
            <NoFoundForChart :cssStyle="'135px auto'" v-else />
        </b-card>
        <mf-loader v-if="isLoad" />
    </div>
</template>
<script src="@/components/services/dashboard/dal/MfiNpl.js"></script>