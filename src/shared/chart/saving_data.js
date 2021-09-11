import { COLORS } from '@/shared/common/constants';

export function getBranchWiseSaving(data = []) {
    let series = [];
    let deposit_data = [];
    let refund_data = [];
    let balance_data = [];
    let branch_ids = [];

    if(data.length > 0) {
        for(let key in data) {
            if(key < 5) {
                deposit_data[key] = data[key]["savingDeposit"];
                refund_data[key] = data[key]["savingRefund"];
                balance_data[key] = (data[key]["savingDeposit"] - data[key]["savingRefund"]);
                branch_ids[key] = data[key]["name"]+"-"+data[key]["code"];
            }
        }
    }

    series.push(
        {
            name:"Deposit",
            data:deposit_data,
            color: COLORS.green,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        },
        {
            name:"Refund",
            data:refund_data,
            color: COLORS.deepOrange,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        },
        {
            name:"Balance",
            data:balance_data,
            color: COLORS.teal,
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


export function getSavingProductWiseSaving(data = []) {
    let series = [];
    let deposit_data = [];
    let refund_data = [];
    let product_code = [];

    if(data.length > 0) {
        for(let key in data) {
                deposit_data[key] = data[key]["depositCollection"];
                refund_data[key] = data[key]["savingRefund"];
                product_code[key] = data[key]["savingProductShortName"]+"-"+data[key]["savingProductCode"];
        }
    }

    series.push(
        {
            name:"Deposit",
            data:deposit_data,
            color: COLORS.green,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        },
        {
            name:"Refund",
            data:refund_data,
            color: COLORS.deepOrange,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    );
    const serie_list = {
        'label':product_code,
        'series':series
    };
    return serie_list;
}