import { COLORS } from '@/shared/common/constants';
import { formatDate } from '@/shared/utils';
const LEGEND = {
    enabled:false,
    backgroundColor: '#FFFFFF',
};

export function getMfiWiseBranch(data = []) {
    let series = [];
    let ratingScore = [];
    let branchName = [];
    let grade = [];
    if(data.length > 0) {
        for(let key in data) {
            if(key < 50) {
                ratingScore[key] = data[key]["RatingScore"];
                branchName[key] = data[key]["BranchName"];
                grade[data[key]["BranchName"]] = data[key]["Grade"];
            }
        }
    }

    series.push(
        {
            data:ratingScore,
            color: COLORS.green,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    );
    const serie_list = {
        'legend':LEGEND,
        'label':branchName,
        'series':series,
        'tooltipData':grade
    };
    return serie_list;
}

export function getMfiWiseSector(data = []) {
    let series = [];
    let ratingScore = [];
    let sectorName = [];
    let grade = [];

    if(data.length > 0) {
        for(let key in data) {
            if(key < 50) {
                ratingScore[key] = data[key]["RatingScore"];
                sectorName[key] = data[key]["SectorName"];
                grade[data[key]["SectorName"]] = data[key]["Grade"];
            }
        }
    }

    series.push(
        {
            data:ratingScore,
            color: COLORS.green,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    );
    const serie_list = {
        'legend':LEGEND,
        'label':sectorName,
        'series':series,
        'tooltipData':grade
    };
    return serie_list;
}


export function getMfiWiseGeo(data = []) {
    let series = [];
    let ratingScore = [];
    let districtName = [];
    let grade = [];

    if(data.length > 0) {
        for(let key in data) {
            if(key < 50) {
                ratingScore[key] = data[key]["RatingScore"];
                districtName[key] = data[key]["DistrictName"];
                grade[data[key]["DistrictName"]] = data[key]["Grade"];
            }
        }
    }

    series.push(
        {
            name:"All",
            data:ratingScore,
            color: COLORS.indigo,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    );
    const serie_list = {
        'legend':LEGEND,
        'label':districtName,
        'series':series,
        'tooltipData':grade
    };
    return serie_list;
}



export function getMfiOverAllInvestmentStatus(data = []) {
    let dataInfo = [];
    if(data.length > 0) {
        for(let key in data) {
            dataInfo.push({
                name:data[key]['Grade'],
                y:data[key]["InstallmentAmount"]
            })
        }
    }
    const _data = [{
        'legend':LEGEND,
        innerSize: '50%',
        colorByPoint: true,
        data: dataInfo
    }];
    return _data;
}


export function getMfiBranchLinvestMentStatus(data = []) {
    let dataInfo = [];
    if(data.length > 0) {
        for(let key in data) {
            dataInfo.push({
                name:data[key]['Grade'],
                y:data[key]["InstallmentAmount"]
            })
        }
    }
    const _data = [{
        'legend':LEGEND,
        innerSize: '50%',
        //name: 'All',
        colorByPoint: true,
        data: dataInfo
    }];
    return _data;
}

function compare(a, b) {
    const A = a.StrNplDate;
    const B = b.StrNplDate;
  
    let comparison = 0;
    if (A > B) {
      comparison = 1;
    } else if (A < B) {
      comparison = -1;
    }
    return comparison;
  }

export function getMfiWiseNpl(data = []) {
    let series = [];
    let nplInPercent = [];
    let strNplDate = [];
    let quarterly = [];

    if(data.length > 0) {
        data.sort(compare);
        let i = 1;
        for(let key in data) {
            if(key < 50) {
                let q = "Q-"+i;
                nplInPercent[key] = data[key]["NplInPercent"];
                quarterly[key] = data[key]["Quarterly"];
               // strNplDate[data[key]["Quarterly"]] = data[key]["StrNplDate"];
                strNplDate[data[key]["Quarterly"]] = 0;
                i++;
            }
        }
    }

    series.push(
        {
            data:nplInPercent,
            color: COLORS.indigo,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    );
    const serie_list = {
        'legend':LEGEND,
        'label':quarterly,
        'series':series,
        'tooltipData':strNplDate
    };
    return serie_list;
}


export function getMfiBranchNpl(data = []) {
    data.sort(compare);
    let series = [];
    let nplInPercent = [];
    let strNplDate = [];
    let quarterly = [];

    if(data.length > 0) {
        let i = 1;
        for(let key in data) {
            if(key < 50) {
                let q = "Q-"+formatDate(data[key]["StrNplDate"], "YY");
                nplInPercent[key] = data[key]["NplInPercent"];
                strNplDate[key] = data[key]["StrNplDate"];
                quarterly[key] = q;
                i++;
            }
        }
    }

    series.push(
        {
            data:nplInPercent,
            color: COLORS.indigo,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    );
    const serie_list = {
        'legend':LEGEND,
        'label':quarterly,
        'series':series,
        'tooltipData':strNplDate
    };
    return serie_list;
}

export function getMfiBranchNplByDate(data = []) {
    let series = [];
    let nplInPercent = [];
    let branchName = [];

    if(data.length > 0) {
        for(let key in data) {
            if(key < 50) {
                nplInPercent[key] = data[key]["NplInPercent"];
                branchName[key] = data[key]["BranchName"];
            }
        }
    }

    series.push(
        {
            name:"All",
            data:nplInPercent,
            color: COLORS.indigo,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    );
    const serie_list = {
        'legend':LEGEND,
        'label':branchName,
        'series':series,
        'tooltipData':nplInPercent
    };
    return serie_list;
}