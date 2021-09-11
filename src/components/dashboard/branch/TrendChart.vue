<template>
    <b-col lg="12">
        <div class="box  widget-user-2 trend-chart">
            <div class="widget-user-header"> 
                <b-row class="">
                    <b-col cols="4">
                        <h6 class="widget-user-desc">
                            <i class="fa fa-area-chart"></i>&nbsp;{{ $t("last") }} {{input.period | vNumberConverter}} {{ $t("month_trend_chart") }}
                        </h6>
                    </b-col>
                    <b-col cols="4">
                    </b-col>
                    <b-col cols="4">
                        <b-form-group>
                            <b-form-select
                                class="select_for_darkTheme2"
                                size="sm"
                                :plain="true"
                                :options="month_list"
                                v-model="input.period"
                                @change.native="periodChange($event)">
                            </b-form-select>  
                        </b-form-group>

                    </b-col>
                </b-row>  
                <multi-select :options="branch_list"
                    class="select_for_darkTheme mt-2 mb-2"
                    :selected-options="items"
                    placeholder="select branch"
                    @select="onSelect">
                </multi-select>
            </div>
            <div class="box-footer frequency-chart">
                <b-row v-if="is_branch_list">
                    <Loan :filter_props="input" ref="childComponent1"></Loan>
                    <Saving :filter_props="input" ref="childComponent2"></Saving>
                    <Member :filter_props="input" ref="childComponent3"></Member>
                    <Surplus :filter_props="input" ref="childComponent4"></Surplus>
                </b-row>
            </div>
        </div>
    </b-col>
</template>
<script src="@/components/services/dashboard/branch/TrendChart.js"></script>
<style>
    div.trend-chart div.multiple{
        font-size: 10px !important;
        background-color: var(--dashboard_deep_color);
    }
    div.trend-chart div.multiple .menu{
            background-color: var(--dashboard_deep_color);
            color:white;
    }
    div.trend-chart div.multiple.selection.dropdown>.menu .item{
        color: #000 !important;
        padding: 5px 10px !important;
        font-size: 10px !important;
        border-top: 1px solid #ddd;
    }
    i.delete.icon:before {
        font-family: FontAwesome;
        font-weight: 900;
        content: "\f2d3";
    }
    div.trend-chart a.dropdown-toggle::after{
        display: none;
    }
    div.trend-chart div.card-header{
        padding: 0px 4px !important;
    }
    div.trend-chart div.card-header a.dropdown-toggle{
        margin-top: -5px;
    }
    div.trend-chart div.card-header .b-nav-dropdown a i {
        font-size: 24px;
    }
</style>


