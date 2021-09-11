import { Chart } from 'highcharts-vue';
import { getHighChartOption } from '@/shared/chart/high-charts';
import { getKpiWiseTopBranch } from '@/shared/chart/branch_data';
import NoFoundForChart from '@/components/dashboard/NoFoundForChart';
export default {
    name: 'KpiChart',
    components: {
        highcharts: Chart,
        NoFoundForChart
    },
    props:['filter_props'],
    data () {
        return {
            chartOptions:{},
            data_info:{},
            is_load: false,
            branch_list:[],
            top_name:' ('+this.$t('top')+')',
            isLoad:false
        }
    },
    mounted:function(){
        this.loadData();
        this.is_load = true;
    },
    methods:{
      loadData: function(){
          this.isLoad = true;
          let kpi = this.filter_props.kpi;
          let api_name = "get_disbursement_top_branch";
          if(kpi == 2) {
              api_name = "get_recovery_top_branch";
          } else if(kpi == 3) {
              api_name = "get_outstanding_top_branch";
          } else if(kpi == 4) {
              api_name = "get_deposit_top_branch";
          } else if(kpi == 5) {
              api_name = "get_refund_top_branch";
          } else if(kpi == 6) {
              api_name = "get_male_top_branch";
          } else if(kpi == 7) {
              api_name = "get_female_top_branch";
          } else if(kpi == 8) {
              api_name = "get_income_top_branch";
          } else if(kpi == 9) {
              api_name = "get_expense_top_branch";
          }
          let params = {
                period:  this.filter_props.period,
                limit:this.filter_props.order
            };
            this.$http_service.get('dashboard-service/branch/'+api_name, {params})
                .then(res => {
                    this.data_info = {};
                    if(kpi == 1) {
                        this.disbursementKpi(res, kpi);
                    } else if(kpi == 2) {
                        this.recoveryKpi(res, kpi);
                    } else if(kpi == 3) {
                        this.outstandingKpi(res, kpi);
                    } else if(kpi == 4) {
                        this.depositKpi(res, kpi);
                    } else if(kpi == 5) {
                        this.RefundKpi(res, kpi);
                    } else if(kpi == 6) {
                        this.MaleKpi(res, kpi);
                    } else if(kpi == 7) {
                        this.FemaleKpi(res, kpi);
                    } else if(kpi == 8) {
                        this.IncomeKpi(res, kpi);
                    } else if(kpi == 9) {
                        this.ExpenseKpi(res, kpi);
                    }
                this.isLoad = false;
            });
      },
      disbursementKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.topDisbursements).length > 0) {
            this.branch_list = this.setBranchList(res.data.data.branches);
            this.data_info = {
                data:getKpiWiseTopBranch(res.data.data.topDisbursements, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.top_name,
                type:'column',
                height:300,
                y_text:this.$t("value"),
                x_text:this.$t("month")
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      recoveryKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.topReconverys).length > 0) {
            this.data_info = {
                data:getKpiWiseTopBranch(res.data.data.topReconverys, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.top_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      outstandingKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.topOutstandings).length > 0) {
            this.data_info = {
                data:getKpiWiseTopBranch(res.data.data.topOutstandings, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.top_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      depositKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.topDeposits).length > 0) {
            this.data_info = {
                data:getKpiWiseTopBranch(res.data.data.topDeposits, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.top_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      RefundKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.topRefunds).length > 0) {
            this.data_info = {
                data:getKpiWiseTopBranch(res.data.data.topRefunds, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.top_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      MaleKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.topMales).length > 0) {
            this.data_info = {
                data:getKpiWiseTopBranch(res.data.data.topMales, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.top_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      FemaleKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.topFemales).length > 0) {
            this.data_info = {
                data:getKpiWiseTopBranch(res.data.data.topFemales, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.top_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
       IncomeKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.topIncomes).length > 0) {
            this.data_info = {
                data:getKpiWiseTopBranch(res.data.data.topIncomes, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.top_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      ExpenseKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.topExpenses).length > 0) {
            this.data_info = {
                data:getKpiWiseTopBranch(res.data.data.topExpenses, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.top_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      setBranchList: function(data) {
        let branch_name_combo = [];
            if(Object.keys(data).length > 0 && data) {
            for(let key in data) {
                branch_name_combo[data[key]['id']] = data[key]['name']+"-"+data[key]['code'];
            }
        }
        return branch_name_combo;
      },
      kpiLoad: function() {
          
      }
    }
}