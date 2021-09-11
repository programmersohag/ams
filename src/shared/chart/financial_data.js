import { COLORS } from '@/shared/common/constants';
export function getBranchWiseCash(data = []) {
    let series = [];
    let cash_data = [];
    let bank_data = [];
    let branch_ids = [];

    if(data.length > 0) {
        for(let key in data) {
            if(key < 5) {
                cash_data[key] = Math.round(data[key]["cashBalance"]);
                bank_data[key] = Math.round(data[key]["bankBalance"]);
                branch_ids[key] = data[key]["name"]+"-"+data[key]["code"];
            }
        }
    }

    series.push(
        {
            name:"Cash",
            data:cash_data,
            color: COLORS.teal,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        },
        {
            name:"Bank",
            data:bank_data,
            color: COLORS.blueGrey,
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

export function getBranchWiseCurrentYearSurplus(data = []) {
    let series = [];
    let totalSurplusThisYear = [];
    let branch_ids = [];

    if(data.length > 0) {
        for(let key in data) {
            if(key < 5) {
                totalSurplusThisYear[key] = Math.round(data[key]["totalSurplusThisYear"]);
                branch_ids[key] = data[key]["name"]+"-"+data[key]["code"];
            }
        }
    }

    series.push(
        {
            name:"Surplus",
            data:totalSurplusThisYear,
            color: COLORS.green,
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