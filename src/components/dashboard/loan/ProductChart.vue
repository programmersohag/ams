<template>
    <div>
        <b-card class="text-center trend-child-card" v-if="Object.keys(data_info).length > 0">
            <highcharts :options="chartOptions" style="width:100%;"></highcharts>
        </b-card>
        <NoFoundForChart :cssStyle="'135px auto'" v-else />
        <mf-loader v-if="isLoad" />
    </div>
</template>
<script src="@/components/services/dashboard/loan/ProductChart.js"></script>



