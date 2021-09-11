
<template>
    <div>
        <b-row>
            <b-col lg="3" v-for="(row, key) in saving_card" :key="key">
                <WidgetThree :card_info="row"></WidgetThree>
            </b-col>
        </b-row>
        <hr>
        <b-row>
            <Chart></Chart>
        </b-row>
    </div>
</template>

<script src="@/components/services/dashboard/saving/Index.js"></script>
<style>
    .single-chart div.card-header span{
        color: #000;
    }
</style>


