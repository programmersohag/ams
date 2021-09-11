import { COLORS } from '@/shared/common/constants';

export function getFundingOrganizationLoan() {
    let label = ['Pksf', 'Non Pksf'];
    let data1 = [29.9, 71.5];
    let data2 = [19.9, 51.5];
    let data3 = [9.9, 91.5];

    let series_data = [
        {
            name:"Disbursement",
            data: data1,
            color: COLORS.green,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        },
        {
            name:"Recovery",
            data: data2,
            color: COLORS.orange,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        },
        {
            name:"Outstanding",
            data: data3,
            color: COLORS.red,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    ];
   
    const data = {
        'label':label,
        'series':series_data
    };
    return data;
}

export function getDueClassification(due_data) {
    let data_info = [];
    data_info = [{
        name: 'watchful Outstanding(WLO)',
        y: Math.round(due_data["watchfulOutstanding"]),
        color:COLORS.green,
       // sliced: true,
       // selected: true
    }, {
        name: 'Substandard Outstanding(SLO)',
        y: Math.round(due_data["substandardOutstanding"]),
        color:COLORS.teal,
    }, {
        name: 'Doubtfull Outstanding(DLO)',
        y: Math.round(due_data["doubtfullOutstanding"]),
        color:COLORS.deepOrange,
    }, {
        name: 'Bad Outstanding(BLO)',
        y: Math.round(due_data["badOutstanding"]),
        color:COLORS.red,
    }];
    const data = [{
        innerSize: '50%',
        name: 'Due Classification',
        colorByPoint: true,
        data: data_info
    }];
    return data;
}

export function getProductLoan(data = []) {
    let series = [];
    let disbursed_data = [];
    let recovery_data = [];
    let outstanding_data = [];
    let products = [];

    if(data.length > 0) {
        for(let key in data) {
            if(key < 10) {
                disbursed_data[key] = data[key]["currentDisbursedAmount"];
                recovery_data[key] = data[key]["currentPrincipalRecoveryAmount"];
                outstanding_data[key] = data[key]["currentOutstandingAmount"];
                products[key] = data[key]["shortName"];
            }
        }
    }

    series.push(
        {
            name:"Disbursement",
            data:disbursed_data,
            color: COLORS.green,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        },
        {
            name:"Recovery",
            data:recovery_data,
            color: COLORS.orange,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        },
        {
            name:"Outstanding",
            data:outstanding_data,
            color: COLORS.red,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    );
    const serie_list = {
        'label':products,
        'series':series
    };
    return serie_list;
}

export function getBorrower(data = []) {
    let series = [];
    let combo_data = [];
    let branch_ids = [];

    if(data.length > 0) {
        for(let key in data) {
            if(key < 5) {
                combo_data[key] = data[key]["totalBorrower"];;
                branch_ids[key] = data[key]["name"]+"-"+data[key]["code"];
            }
        }
    }

    series.push({
        name:"Borrower",
        data:combo_data,
        color: COLORS.indigo,
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

export function getBranchWiseLoan(data = []) {
    let series = [];
    let disbursed_data = [];
    let recovery_data = [];
    let outstanding_data = [];
    let branch_ids = [];

    if(data.length > 0) {
        for(let key in data) {
            if(key < 5) {
                disbursed_data[key] = data[key]["currentDisbursedAmount"];
                recovery_data[key] = data[key]["currentPrincipalRecoveryAmount"];
                outstanding_data[key] = data[key]["currentOutstandingAmount"];
                branch_ids[key] = data[key]["name"]+"-"+data[key]["code"];
            }
        }
    }

    series.push(
        {
            name:"Disbursement",
            data:disbursed_data,
            color: COLORS.green,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        },
        {
            name:"Recovery",
            data:recovery_data,
            color: COLORS.orange,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        },
        {
            name:"Outstanding",
            data:outstanding_data,
            color: COLORS.red,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    );
    const serie_list = {
        'label':branch_ids,
        'series':series
    };
    return serie_list;
}