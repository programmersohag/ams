import { numberFormat, getShortNumber, numberConverter } from '@/shared/utils';
let FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

function getNumberFormat(stringNumber = '', isNumberFormat) {
    if(!isNumberFormat) {
        return numberFormat(stringNumber, 1);
        return stringNumber;
    }
    let n = "0";
    let str = getShortNumber(stringNumber);
    str = str.split(" ");
    if(str[0]){
        n = numberConverter(numberFormat(str[0]));
    }
    if(str[1]) {
        n = n +" "+ str[1];
    }
    return n;

}
export function getHighChartOption (data_info = {}) {
   // console.log('data_info', data_info);
    let title_text = (data_info.text) ? data_info.text : '';
    let series = (data_info.data.series) ? data_info.data.series : [];
    let label_name = (data_info.data.label) ? data_info.data.label : [];
    let type = (data_info.type) ? data_info.type : 'spline';
    let height = (data_info.height) ? data_info.height : 300;
    let y_text = (data_info.y_text) ? data_info.y_text : 'Value';
    let x_text = (data_info.x_text) ? data_info.x_text : 'Month';
    let legend = {backgroundColor: '#FFFFFF',};
    if(data_info.data.legend != undefined) {
        legend = data_info.data.legend;
    }
    const option = {
        chart: {
            panning: true,
            type: type,
            backgroundColor: '#f5f5f5',
            height: height,
            //width:408,
            style: {
                color: "#000",
                fontFamily: FONT_FAMILY
            }
        },
        title: {
            text: title_text,
            style: {
                color: "#000"
            }
        },
        series: series,
        xAxis: {
            categories: label_name,
            labels: {
                // formatter: function(index) {
                //     //return '<b id="' + label_code[index.pos] + '">' +
                //         //label_code[index.pos] + '</b>';
                //     //console.log('index=', index)
                // },
                style: {
                    color: '#000',
                }
            },
            title: {
                text: x_text,
                style: {
                    color: '#000',
                }
            }
        },
        yAxis: {
            labels: {
                style: {
                    color: '#000',
                },
                formatter: function() {
                    return getNumberFormat(this.value);
                }
            },
            title: {
                text: y_text,
                style: {
                    color: '#000',
                }
            }
        },
        tooltip: {
            formatter: function () {
               return getTooltip(this);
            },
            shared: true
        },
        legend: legend,
        credits: {
        enabled: false
        },
         responsive: {
            // rules: [{
            //     condition: {
            //       maxWidth: 408
            //     }
            //   }]
         }
    }
    return option;
}


export function getHighChartAdvanceOption (data_info = {}) {
     let title_text = (data_info.text) ? data_info.text : '';
     let series = (data_info.data.series) ? data_info.data.series : [];
     let label_name = (data_info.data.label) ? data_info.data.label : [];
     let type = (data_info.type) ? data_info.type : 'spline';
     let height = (data_info.height) ? data_info.height : 300;
     let y_text = (data_info.y_text) ? data_info.y_text : 'Value';
     let x_text = (data_info.x_text) ? data_info.x_text : 'Month';
     let legend = {backgroundColor: '#FFFFFF',};

     let isNumberFormat = (data_info.isNumberFormat != undefined) ? data_info.isNumberFormat : true;
     let chartType = (data_info.chartType != undefined) ? data_info.chartType : 1;
     let tooltipInfo = [];
     if(chartType === 2) {
        tooltipInfo[0] = "Percent";
        tooltipInfo[1] = "Date";
     } else {
        tooltipInfo[0] = "Rating score";
        tooltipInfo[1] = "Grade";
     }
     if(data_info.data.legend != undefined) {
         legend = data_info.data.legend;
     }
     let tooltipData = [];
    if(data_info.data.tooltipData != undefined) {
        tooltipData = data_info.data.tooltipData;
    }
     const option = {
         chart: {
             panning: true,
             type: type,
             backgroundColor: '#f5f5f5',
             height: height,
             style: {
                 color: "#000",
                 fontFamily: FONT_FAMILY
             },
             zoomType: 'xy'
         },
         title: {
             text: title_text,
             style: {
                 color: "#000"
             }
         },
         series: series,
         xAxis: {
             categories: label_name,
             labels: {
                 style: {
                     color: '#000',
                 }
             },
             title: {
                 text: x_text,
                 style: {
                     color: '#000',
                 }
             }
         },
         yAxis: {
             labels: {
                 style: {
                     color: '#000',
                 },
                 formatter: function() {
                     return getNumberFormat(this.value, isNumberFormat);
                 }
             },
             title: {
                 text: y_text,
                 style: {
                     color: '#000',
                 }
             }
         },
         tooltip: {
             formatter: function () {
                 if(Object.keys(tooltipData).length > 0) {
                    return getCustomAdvTooltip(this, tooltipData, tooltipInfo, isNumberFormat);
                 } else {
                    return getAdvTooltip(this);
                 }
                
             },
             shared: true
         },
         legend: legend,
         credits: {
            enabled: false
         },
          responsive: {
          }
     }
     return option;
 }

 function getCustomAdvTooltip(_this, tooltipData, tooltipInfo, isNumberFormat) {
    return _this.points.reduce(function (s, point) {
        let y = getNumberFormat(point.y, isNumberFormat);
        let x = tooltipData[point.x] ? tooltipData[point.x] : "";
        if(x) {
            return s + '<br/>' + tooltipInfo[1]+": "+ x;
        } else {
            return s + '<br/>' + tooltipInfo[0]+": "+ y;
        }
        // if(x) {
        //     return s + '<br/>' + tooltipInfo[0]+': '+ y + '<br/>' +tooltipInfo[1]+": "+ x;
        // } else {
        //     return s + '<br/>' + tooltipInfo[0]+': '+ y;
        // }
    }, '<b>' + _this.x + '</b>');
 }
function getAdvTooltip(_this) {
    return _this.points.reduce(function (s, point) {
        return s + '<br/>' + point.series.name + ': ' +
        numberConverter(numberFormat(point.y));
    }, '<b>' + _this.x + '</b>');
}
function getTooltip(_this) {
    return _this.points.reduce(function (s, point) {
        return s + '<br/>' + point.series.name + ': ' +
        numberConverter(numberFormat(point.y));
    }, '<b>' + _this.x + '</b>');
}

export function getPieHighChartOption (data_info = {}) {
    let title_text = (data_info.text) ? data_info.text : '';
    let series = (data_info.data) ? data_info.data : [];
    let height = (data_info.height) ? data_info.height : 300;
    let isPercent = (data_info.isPercent) ? data_info.isPercent : false;
    const option = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: '#f5f5f5',
            height: height,
            style: {
                color: "#000",
                fontFamily: FONT_FAMILY
            }
        },
        title: {
            text: title_text,
            style: {
                color: "#000"
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <br>{point.percentage:.1f} %<br>value: {point.y} Tk'
          },
        plotOptions: {
             pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        if(isPercent) {
                            return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %<br>value:'+numberFormat(this.point.y)+"Tk";
                        } else {
                            return '<b>'+ this.point.name +'</b>: value:'+numberFormat(this.point.y)+"Tk";
                        }
                      // return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %<br>value:'+numberFormat(this.point.y)+"Tk";
                      // return '<b>{this.point.name}</b>:<br>{this.point.percentage:.1f} %<br>value: {this.point.y}';
                    },
                    //format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>value: {point.y}',
                    style: {
                        color: 'black'
                    }
                }
             }
        },
        series: series,
        legend: {
            // layout: 'vertical',
            backgroundColor: '#000',
            // floating: true,
            // align: 'bottom',
            // verticalAlign: 'bottom',
        },
        credits: {
        enabled: false
        },
         responsive: {
         }
    }
    return option;
}

export function getPieAdvChartOption (data_info = {}) {
    let title_text = (data_info.text) ? data_info.text : '';
    let series = (data_info.data) ? data_info.data : [];
    let height = (data_info.height) ? data_info.height : 300;
    let isPercent = (data_info.isPercent) ? data_info.isPercent : false;
    let legend = {backgroundColor: '#FFFFFF',};
    if(data_info.data.legend != undefined) {
         legend = data_info.data.legend;
     }
    const option = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: '#f5f5f5',
            height: height,
            style: {
                color: "#000",
                fontFamily: FONT_FAMILY
            }
        },
        title: {
            text: title_text,
            style: {
                color: "#000"
            }
        },
        tooltip: {
            pointFormat: 'Percent: {point.percentage:.1f} %<br>amount: {point.y} Tk'
          },
        plotOptions: {
             pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        if(isPercent) {
                            return '<b>'+ this.point.name +'</b><br>'+numberFormat(this.point.y)+"Tk("+this.percentage.toFixed(2)+"%)";
                        } else {
                            return '<b>'+ this.point.name +'</b>: value:'+numberFormat(this.point.y)+"Tk";
                        }
                    },
                    style: {
                        color: 'black'
                    }
                }
             }
        },
        series: series,
        legend: legend,
        credits: {
            enabled: false
        }
    }
    return option;
}

export function getPolarHighChartOption (data_info = {}) {
    const option = {
        chart: {
            polar: true,
            style: {
                fontFamily: FONT_FAMILY
            }
        },
        title: {
            text: 'Highcharts Polar Chart'
        },
        subtitle: {
            text: 'Also known as Radar Chart'
        },
        pane: {
            startAngle: 0,
            endAngle: 360
        },
        xAxis: {
            tickInterval: 45,
            min: 0,
            max: 360,
            labels: {
                format: '{value}°'
            }
        },
        yAxis: {
            min: 0
        },
        plotOptions: {
            series: {
                pointStart: 0,
                pointInterval: 45
            },
            column: {
                pointPadding: 0,
                groupPadding: 0
            }
        },
        series: [{
            type: 'column',
            name: 'Column',
            data: [8, 7, 6, 5, 4, 3, 2, 1],
            pointPlacement: 'between'
        }, {
            type: 'line',
            name: 'Line',
            data: [1, 2, 3, 4, 5, 6, 7, 8]
        }, {
            type: 'area',
            name: 'Area',
            data: [1, 8, 2, 7, 3, 6, 4, 5]
        }]
    }
    return option;
}