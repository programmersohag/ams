<template>
    <div>
        <b-row>
            <b-col lg="4" v-for="(row, key) in financial_card" :key="key">
                <WidgetFour :card_info="row"></WidgetFour>
            </b-col>
        </b-row>
        <hr>
        <b-row>
            <Chart></Chart>.
        </b-row>
    </div>
</template>

<script src="@/components/services/dashboard/financial/Index.js"></script>
<style>
.single-chart div.card-header span{
    color: #000;
}
</style>