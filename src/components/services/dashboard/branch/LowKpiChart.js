import { Chart } from 'highcharts-vue';
import { getHighChartOption } from '@/shared/chart/high-charts';
import { getKpiWiseLowBranch } from '@/shared/chart/branch_data';
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
            low_name:' ('+this.$t('low')+')',
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
          let api_name = "get_disbursement_low_branch";
          if(kpi == 2) {
              api_name = "get_recovery_low_branch";
          } else if(kpi == 3) {
              api_name = "get_outstanding_low_branch";
          } else if(kpi == 4) {
              api_name = "get_deposit_low_branch";
          } else if(kpi == 5) {
              api_name = "get_refund_low_branch";
          } else if(kpi == 6) {
              api_name = "get_male_low_branch";
          } else if(kpi == 7) {
              api_name = "get_female_low_branch";
          } else if(kpi == 8) {
              api_name = "get_income_low_branch";
          } else if(kpi == 9) {
              api_name = "get_expense_low_branch";
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
          if(res.data && Object.keys(res.data.data.lowDisbursements).length > 0) {
            this.branch_list = this.setBranchList(res.data.data.branches);
            this.data_info = {
                data:getKpiWiseLowBranch(res.data.data.lowDisbursements, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.low_name,
                type:'column',
                height:300,
                y_text:this.$t("value"),
                x_text:this.$t("month")
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      recoveryKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.lowReconverys).length > 0) {
            this.data_info = {
                data:getKpiWiseLowBranch(res.data.data.lowReconverys, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.low_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      outstandingKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.lowOutstandings).length > 0) {
            this.data_info = {
                data:getKpiWiseLowBranch(res.data.data.lowOutstandings, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.low_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      depositKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.lowDeposits).length > 0) {
            this.data_info = {
                data:getKpiWiseLowBranch(res.data.data.lowDeposits, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.low_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      RefundKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.lowRefunds).length > 0) {
            this.data_info = {
                data:getKpiWiseLowBranch(res.data.data.lowRefunds, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.low_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      MaleKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.lowMales).length > 0) {
            this.data_info = {
                data:getKpiWiseLowBranch(res.data.data.lowMales, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.low_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      FemaleKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.lowFemales).length > 0) {
            this.data_info = {
                data:getKpiWiseLowBranch(res.data.data.lowFemales, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.low_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      IncomeKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.lowIncomes).length > 0) {
            this.data_info = {
                data:getKpiWiseLowBranch(res.data.data.lowIncomes, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.low_name,
                type:'column',
                height:300
            };
            this.chartOptions = getHighChartOption(this.data_info);
        }
      },
      ExpenseKpi: function(res, kpi) {
          if(res.data && Object.keys(res.data.data.lowExpenses).length > 0) {
            this.data_info = {
                data:getKpiWiseLowBranch(res.data.data.lowExpenses, this.branch_list, kpi),
                text:this.filter_props.kpi_list[kpi]+this.low_name,
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
    }
}