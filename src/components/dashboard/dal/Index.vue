
<template>
    <div>
        <!-- <b-row>
            <b-col lg="3" v-for="(row, key) in dalCard" :key="key">
                <WidgetOne :card_info="row"></WidgetOne>
            </b-col>
        </b-row>
        <hr> -->
        <b-row>
            <Chart v-if="isLoad"></Chart>
        </b-row>
    </div>
</template>

<script src="@/components/services/dashboard/dal/Index.js"></script>
<style>
    .single-chart div.card-header span{
        color: #000;
    }
</style>


