import { getShortMonthName } from '@/shared/utils';
import { COLORS, COLORLIST } from '@/shared/common/constants';

export function getKpiWiseLoans(data = [], branch_list = [], kpi = 1, branch_name = []) {
    let amount_list = [];
    let label_list = [];
    var uniqueIds = [];
    let amount = 0;
    let i = 0;
    if(data.length > 0) {
        for(let key in data) {
            if(kpi == 1) {
                amount = data[key].disbursedAmount;
            } else if(kpi == 2) {
                amount = data[key].recoveryAmount
            } else if(kpi == 3) {
                amount = data[key].outstandingAmount
            }

            if ($.inArray(data[key].branchId, uniqueIds) === -1) {
                i = 0;
                amount_list[data[key].branchId] = [];
                amount_list[data[key].branchId][i] = amount;
                var month_name = getShortMonthName()[data[key].period-1]+"-"+data[key].year.toString().substr(-2);

                label_list[data[key].branchId] = [];
                label_list[data[key].branchId][i] = month_name;
            } else {
                i++;
                var month_name = getShortMonthName()[data[key].period-1]+"-"+data[key].year.toString().substr(-2);
                amount_list[data[key].branchId][i] = amount;
                label_list[data[key].branchId][i] = month_name;
            }
            uniqueIds.push(data[key].branchId);
        }
    }
    let series = [];
    if(branch_list.length > 0) {
        for(let key in branch_list) {
            series.push({
                name:(branch_name[branch_list[key]] != undefined) ? branch_name[branch_list[key]] : "",
                data:amount_list[branch_list[key]],
                color: COLORLIST[key],
                animation: {
                    duration: 1500,
                    easing: 'easeOutBounce'
                }
            });
        }
    }
    const serie_list = {
        'label':label_list[branch_list[0]],
        'series':series
    };
    return serie_list;
}

export function getKpiWiseSavings(data = [], branch_list = [], kpi = 1, branch_name = []) {
    let amount_list = [];
    let label_list = [];
    var uniqueIds = [];
    let amount = 0;
    let i = 0;
    if(data.length > 0) {
        for(let key in data) {
            if(kpi == 1) {
                amount = data[key].deposit;
            } else if(kpi == 2) {
                amount = data[key].refund;
            }
            if ($.inArray(data[key].branchId, uniqueIds) === -1) {
                i = 0;
                amount_list[data[key].branchId] = [];
                amount_list[data[key].branchId][i] = amount;
                var month_name = getShortMonthName()[data[key].period-1]+"-"+data[key].year.toString().substr(-2);

                label_list[data[key].branchId] = [];
                label_list[data[key].branchId][i] = month_name;
            } else {
                i++;
                var month_name = getShortMonthName()[data[key].period-1]+"-"+data[key].year.toString().substr(-2);
                amount_list[data[key].branchId][i] = amount;
                label_list[data[key].branchId][i] = month_name;
            }
            uniqueIds.push(data[key].branchId);
        }
    }
    let series = [];
    if(branch_list.length > 0) {
        for(let key in branch_list) {
            series.push({
                name:(branch_name[branch_list[key]] != undefined) ? branch_name[branch_list[key]] : "",
                data:amount_list[branch_list[key]],
                color: COLORLIST[key],
                animation: {
                    duration: 1500,
                    easing: 'easeOutBounce'
                }
            });
        }
    }
    const serie_list = {
        'label':label_list[branch_list[0]],
        'series':series
    };
    return serie_list;
}

export function getKpiWiseMembers(data = [], branch_list = [], kpi = 1, branch_name = []) {
    let gender_list = [];
    let label_list = [];
    var uniqueIds = [];
    let gender = 0;
    let i = 0;
    if(data.length > 0) {
        for(let key in data) {
            if(kpi == 1) {
                gender = data[key].female;
            } else if(kpi == 2) {
                gender = data[key].male;
            }
            if ($.inArray(data[key].branchId, uniqueIds) === -1) {
                i = 0;
                gender_list[data[key].branchId] = [];
                gender_list[data[key].branchId][i] = gender;

                label_list[data[key].branchId] = [];
                var month_name = getShortMonthName()[data[key].period-1]+"-"+data[key].year.toString().substr(-2);
                label_list[data[key].branchId][i] = month_name;
            } else {
                i++;
                gender_list[data[key].branchId][i] = gender;
                var month_name = getShortMonthName()[data[key].period-1]+"-"+data[key].year.toString().substr(-2);
                label_list[data[key].branchId][i] = month_name;
            }
            uniqueIds.push(data[key].branchId);
        }
    }
    let series = [];
    if(branch_list.length > 0) {
        for(let key in branch_list) {
            series.push({
                name:(branch_name[branch_list[key]] != undefined) ? branch_name[branch_list[key]] : "",
                data:gender_list[branch_list[key]],
                color: COLORLIST[key],
                animation: {
                    duration: 1500,
                    easing: 'easeOutBounce'
                }
            });
        }
    }
    const serie_list = {
        'label':label_list[branch_list[0]],
        'series':series
    };
    return serie_list;
}

export function getKpiWiseSurpluses(data = [], branch_list = [], kpi = 1, branch_name = []) {
    let amount_list = [];
    let label_list = [];
    var uniqueIds = [];
    let amount = 0;
    let i = 0;
    if(data.length > 0) {
        for(let key in data) {
            if(kpi == 1) {
                amount = data[key].income;
            } else if(kpi == 2) {
                amount = data[key].expense;
            }
            if ($.inArray(data[key].branchId, uniqueIds) === -1) {
                i = 0;
                amount_list[data[key].branchId] = [];
                amount_list[data[key].branchId][i] = amount;

                label_list[data[key].branchId] = [];
                var month_name = getShortMonthName()[data[key].period-1]+"-"+data[key].year.toString().substr(-2);

                label_list[data[key].branchId][i] = month_name;
            } else {
                i++;
                amount_list[data[key].branchId][i] = amount;
                //var month_name = month_name;
                var month_name = getShortMonthName()[data[key].period-1]+"-"+data[key].year.toString().substr(-2);
                label_list[data[key].branchId][i] = month_name;
            }
            uniqueIds.push(data[key].branchId);
        }
    }
    let series = [];
    if(branch_list.length > 0) {
        for(let key in branch_list) {
            series.push({
                name:(branch_name[branch_list[key]] != undefined) ? branch_name[branch_list[key]] : "",
                data:amount_list[branch_list[key]],
                color: COLORLIST[key],
                animation: {
                    duration: 1500,
                    easing: 'easeOutBounce'
                }
            });
        }
    }
    const serie_list = {
        'label':label_list[branch_list[0]],
        'series':series
    };
    return serie_list;
}

export function getKpiWiseTopBranch(data_list = [], branch_list = [], kpi) {
    let series = [];
    let combo_data = [];
    let branch_ids = [];
    let amount = 0;
    if(data_list.length > 0) {
        for(let key in data_list) {
            if(kpi == 1) {
                amount = data_list[key]["disbursedAmount"];
            } else if(kpi == 2) {
                amount = data_list[key]["recoveryAmount"];
            } else if(kpi == 3) {
                amount = data_list[key]["outstandingAmount"];
            } else if(kpi == 4) {
                amount = data_list[key]["deposit"];
            } else if(kpi == 5) {
                amount = data_list[key]["refund"];
            } else if(kpi == 6) {
                amount = data_list[key]["male"];
            } else if(kpi == 7) {
                amount = data_list[key]["female"];
            } else if(kpi == 8) {
                amount = data_list[key]["income"];
            } else if(kpi == 9) {
                amount = data_list[key]["expense"];
            }
            combo_data[key] = amount;
            branch_ids[key] = branch_list[data_list[key]["branchId"]];
        }
    }
    let name = "Top Branch(Disbursement)";
    if(kpi == 2) {
        name = "Top Branch(Recovery)";
    } else if(kpi == 3) {
        name = "Top Branch(OutstandingAmount)";
    } else if(kpi == 4) {
        name = "Top Branch(Deposit)";
    } else if(kpi == 5) {
        name = "Top Branch(Refund)";
    } else if(kpi == 6) {
        name = "Top Branch(Male)";
    } else if(kpi == 7) {
        name = "Top Branch(Female)";
    } else if(kpi == 8) {
        name = "Top Branch(Income)";
    } else if(kpi == 9) {
        name = "Top Branch(Expense)";
    }
    series.push({
        name:name,
        data:combo_data,
        color: COLORS.green,
        animation: {
            duration: 1500,
            easing: 'easeOutBounce'
        }
    });
    const serie_list = {
        'label':branch_ids,
        'series':series
    };
    return serie_list;
}

export function getKpiWiseLowBranch(data_list = [], branch_list = [], kpi) {
    let series = [];
    let combo_data = [];
    let branch_ids = [];
    let amount = 0;
    if(data_list.length > 0) {
        for(let key in data_list) {
            if(kpi == 1) {
                amount = data_list[key]["disbursedAmount"];
            } else if(kpi == 2) {
                amount = data_list[key]["recoveryAmount"];
            } else if(kpi == 3) {
                amount = data_list[key]["outstandingAmount"];
            } else if(kpi == 4) {
                amount = data_list[key]["deposit"];
            } else if(kpi == 5) {
                amount = data_list[key]["refund"];
            } else if(kpi == 6) {
                amount = data_list[key]["male"];
            } else if(kpi == 7) {
                amount = data_list[key]["female"];
            } else if(kpi == 8) {
                amount = data_list[key]["income"];
            } else if(kpi == 9) {
                amount = data_list[key]["expense"];
            }
            combo_data[key] = amount;
            branch_ids[key] = branch_list[data_list[key]["branchId"]];
        }
    }
    let name = "Low Branch(Disbursement)";
    if(kpi == 2) {
        name = "Low Branch(Recovery)";
    } else if(kpi == 3) {
        name = "Low Branch(OutstandingAmount)";
    } else if(kpi == 4) {
        name = "Low Branch(Deposit)";
    } else if(kpi == 5) {
        name = "Low Branch(Refund)";
    } else if(kpi == 6) {
        name = "Low Branch(Male)";
    } else if(kpi == 7) {
        name = "Low Branch(Female)";
    } else if(kpi == 8) {
        name = "Low Branch(Income)";
    } else if(kpi == 9) {
        name = "Low Branch(Expense)";
    }
    series.push({
        name:name,
        data:combo_data,
        color: COLORS.red,
        animation: {
            duration: 1500,
            easing: 'easeOutBounce'
        }
    });
    const serie_list = {
        'label':branch_ids,
        'series':series
    };
    return serie_list;
}