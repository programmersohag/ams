<template>
    <b-card class="text-center trend-child-card">
        <div slot="header">
            <span>{{ $t("funding_organizations") }}</span>
        </div>
        <highcharts :options="chartOptions"></highcharts>
    </b-card>
</template>
<script src="@/components/services/dashboard/loan/FundingOrgChart.js"></script>



