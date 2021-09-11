<template>
    <b-col lg="6">
        <b-card class="text-center" v-if="Object.keys(data_info).length > 0">
            <div slot="header">
                <b-navbar-nav style="float:right;background-color: var(--background-color-light);">
                    <b-nav-item-dropdown>
                        <template slot="button-content">
                            <em><i class="fa fa-ellipsis-h"></i></em>
                        </template>
                        <b-dropdown-item @click="kpiChange(1)">{{ $t('disbursement') }}</b-dropdown-item>
                        <b-dropdown-item @click="kpiChange(2)">{{ $t('recovery') }}</b-dropdown-item>
                        <b-dropdown-item @click="kpiChange(3)">{{ $t('outstanding') }}</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </div>
            <highcharts :options="chartOptions"></highcharts>
        </b-card>
         <NoFoundForChart v-else />
         <mf-loader v-if="isLoad" />
    </b-col>
</template>
<script src="@/components/services/dashboard/branch/Loan.js"></script>



