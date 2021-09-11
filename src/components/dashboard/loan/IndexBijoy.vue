<template>
    <div>
        <b-row>
            <b-col lg="6">
                <LoanChartSham></LoanChartSham>
            </b-col>

            <b-col lg="6">
                <b-row>
                    <b-col lg="6" v-for="(row, key) in branch_card" :key="key">
                        <WidgetSeven :card_info="row"></WidgetSeven>
                    </b-col>
                </b-row>
            </b-col>

        </b-row>

        <b-row>


            <b-col lg="6">
                <BorrowerChart></BorrowerChart>
            </b-col>
            <b-col lg="6">
                <BranchWiseLoanChart></BranchWiseLoanChart>
            </b-col>

        </b-row>

        <b-row>
            <b-col lg="6">
                <ProductChart></ProductChart>
            </b-col>
        </b-row>

    </div>
</template>

<script src="@/components/services/dashboard/loan/BijoyIndex.js"></script>
<style>
    .single-chart div.card-header span{
        color: #000;
    }
    .tab-content .info-box{
        border-radius: 6px;
        margin-bottom: 11px;
        /*background-color: white;*/
        box-shadow: 0px 0px 0px 2px #eae9e9;
        /*min-height: 154px;*/
    }
</style>