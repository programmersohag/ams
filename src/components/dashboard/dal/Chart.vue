<template>
    <b-col lg="12">
    <b-row v-if="isLoad">
        <b-col lg="6" v-if="user['is_head_office'] == true">
            <MfiBranch></MfiBranch>
        </b-col>
         <b-col lg="6" v-if="user['is_head_office'] == true">
            <MfiSector></MfiSector>
        </b-col>
        <b-col lg="6" v-if="user['is_head_office'] == true">
            <MfiGeo></MfiGeo>
        </b-col>
        <b-col lg="6" v-if="user['is_head_office'] == true">
            <MfiOverallInvestmentStatus></MfiOverallInvestmentStatus>
        </b-col>
        <b-col lg="6" v-if="user['branch_type'] == 'B'">
            <MfiBranchLinvestMentStatus></MfiBranchLinvestMentStatus>
        </b-col>
        <b-col lg="6" v-if="user['is_head_office'] == true">
            <mfiNpl></mfiNpl>
        </b-col>
        <b-col lg="6" v-if="user['branch_type'] == 'B'">
            <MfiBranchNpl></MfiBranchNpl>
        </b-col>
        <b-col lg="6" v-if="user['is_head_office'] == true">
            <MfiBranchNplByDate></MfiBranchNplByDate>
        </b-col>
        <!-- <b-col lg="6" v-if="user['is_head_office'] == true">
            <Drilldown></Drilldown>
        </b-col> -->
    </b-row>
    </b-col>

</template>
<script src="@/components/services/dashboard/dal/Chart.js"></script>
<style>
    div.animated div.dal-card .card-header{
        padding: 4px 8px;
    }
    div.animated div.dal-card div.row{
        padding-left: 5px;
        padding-right: 5px;
    }
    div.animated div.dal-card div.c{
        padding-left: 4px;
        padding-right: 4px;
    }
</style>>