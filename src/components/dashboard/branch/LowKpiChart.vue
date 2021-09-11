<template>
    <b-col lg="6">
        <b-card class="text-center" v-if="Object.keys(data_info).length > 0">
            <highcharts v-if="is_load" :options="chartOptions"></highcharts>
        </b-card>
        <NoFoundForChart :cssStyle="'135px auto'" v-else />
        <mf-loader v-if="isLoad" />
    </b-col>
</template>
<script src="@/components/services/dashboard/branch/LowKpiChart.js"></script>