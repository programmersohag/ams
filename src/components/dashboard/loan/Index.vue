<template>
    <div>
        <b-row>
            <b-col lg="3" v-for="(row, key) in branch_card" :key="key">
                <WidgetTwo :card_info="row"></WidgetTwo>
            </b-col>
        </b-row>
        <hr>
        <b-row>
            <LoanChart></LoanChart>
        </b-row>
    </div>
</template>

<script src="@/components/services/dashboard/loan/Index.js"></script>
<style>
    .single-chart div.card-header span{
        color: #000;
    }
</style>