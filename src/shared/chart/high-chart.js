import { getShortNumber } from '@/shared/utils'
export function getHighChartOption (report_type, info) {
    let label_code = info.branch_code;
    let label_name = info.branch_name;
    let xTitle = 'Branch List';
    let yTitle = 'Amount';
    let title = '';
    let type = 'column';
    let data_value = [];
    let cAnimation = {
        duration: 1500,
        easing: 'easeOutBounce'
    }
    if(report_type == 1) {
        data_value = [
            {
                name: 'Male',
                data: info.active_male_member,
                animation: cAnimation
            },
            {
                name: 'Female',
                data: info.active_female_member,
                animation: cAnimation
            },
            {
                name: 'Total',
                data: info.active_member,
                animation: cAnimation
            }
        ];
        title = 'Branch Wise Total Active Member';
        yTitle = 'Active Member';
    } else if(report_type == 2) {
        var data = []
        info.total_borrower.map((val, index) => {
            data.push({
                name:label_name[index],
                y:val,
                sliced: (index == 0) ? true : false,
                selected: (index == 0) ? true : false
            })
        })
        data_value = [{
            name: 'Borrower',
            colorByPoint: true,
            data: data
        }]
        title = 'Branch Wise Total Borrower';
        yTitle = 'Borrower';
        let title_list = {
            tTitle: title,
            xTitle: xTitle,
            yTitle: yTitle
        };
        return commonPieHighChat(type,label_code, label_name, data_value,title_list)

    } else if(report_type == 3) {
        data_value = [
            {
                name: 'Disbursement',
                data: info.disbursed_amount,
                animation: cAnimation
            },
            {
                name: 'Recovery',
                data: info.recovered_amount,
                animation: cAnimation
            },
            {
                name: 'Outstanding',
                data: info.outstanding_amount,
                animation: cAnimation
            }
        ];
        label_name = info.component_name;
        label_code = info.component_name;
        title = 'Component Wise Loan Info';
        xTitle = 'Component List';
        type = 'spline';
    } else if(report_type == 4) {
        data_value = [
            {
                name: 'Disbursement',
                data: info.bw_disbursed_amount,
                animation: cAnimation
            },
            {
                name: 'Recovery',
                data: info.bw_recovery_amount,
                animation: cAnimation
            },
            {
                name: 'Outstanding',
                data: info.bw_outstanding_amount,
                animation: cAnimation
            }
        ];
        title = 'Branch Wise Loans Info';
        type = 'line';
    }

    let title_list = {
        tTitle: title,
        xTitle: xTitle,
        yTitle: yTitle
    };
   return commonHighChat(type,label_code, label_name, data_value,title_list)
  }getShortNumber

  function commonHighChat(type, label_code, label_name, data_value,title_list) {
      const option = {
        chart: {
            panning: true,
            type: type,
            height: 270
        },
        title: {
            text: title_list.tTitle,
            style: {
                color: '#6d4343',
                fontWeight: 'bold',
                fontSize: '12px'
            }
        },
        xAxis: {
            type: 'category',
            categories: label_name,
            title: {
                text: title_list.xTitle
            },
            labels: {
                formatter: function(index) {
                    return '<b id="' + label_code[index.pos] + '">' +
                        label_code[index.pos] + '</b>';
                }
            }
        },
         yAxis: {
            min: 0,
            title: {
                text: title_list.yTitle,
            },
            labels: {
                overflow: 'justify',
                formatter: function() {
                    return getShortNumber(this.value);
                }
            }
        },
        series: data_value,
        credits: {
            enabled: false
        }
    }
    return option;
  }

  function commonPieHighChat(type, label_code, label_name, data_value,title_list) {
    const option = {
        chart: {
            type: 'pie',
            height: 270,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: title_list.tTitle,
            style: {
                color: '#6d4343',
                fontWeight: 'bold',
                fontSize: '12px'
            }
        },
        plotOptions: {
            pie: {
               allowPointSelect: true,
               cursor: 'pointer',
               dataLabels: {
                   enabled: true,
                   format: '<b>{point.name}</b>: {y}',
                   style: {
                       color: 'black'
                   }
               }
           }
       },
        series: data_value,
        credits: {
            enabled: false
        }
    }
    return option;

    }