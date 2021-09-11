<template>
    <div>

        <b-row>
            <b-col lg="7">
                <Chart></Chart>
            </b-col>
            <b-col lg="5">
                <b-row>
                    <b-col lg="6" v-for="(row, key) in saving_card" :key="key">
                        <!-- <WidgetThree :card_info="row"></WidgetThree> -->
                        <WidgetSix :card_info="row"></WidgetSix>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <b-row>
            <b-col lg="7">
                <SavingProductWiseChart></SavingProductWiseChart>
            </b-col>
        </b-row>

    </div>
</template>

<script src="@/components/services/dashboard/saving/IndexBijoy.js"></script>
<style>
    .single-chart div.card-header span{
        color: #000;
    }
</style>