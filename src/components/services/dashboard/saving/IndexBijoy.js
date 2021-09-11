
import WidgetThree from '@/components/dashboard/widget/WidgetThree';
import WidgetSix from '@/components/dashboard/widget/WidgetSix';
import Chart from '@/components/dashboard/saving/ChartBijoy';
import {numberFormat} from '@/shared/utils';
import SavingProductWiseChart from '@/components/dashboard/saving/SavingProductWiseChart';

export default {
    name: 'tabs',
    components: {
        WidgetThree,
        WidgetSix,
        Chart,
        SavingProductWiseChart,

    },
    data () {
        return {
            saving_card:[]
        }
    },
    mounted:function() {
        this.$http_service.get('dashboard-service/saving/get_card_info')
            .then(res => {
                if(Object.keys(res.data.data.cards).length > 0 && res.data.data) {
                    let data = res.data.data;
                    this.saving_card.push(
                        {
                            icon:'fa-money',
                            name:this.$t('deposit'),
                            value:this.$numberConverter(numberFormat(Math.round(data.cards['savingDeposit']))),
                        },
                        {
                            icon:'fa-money',
                            name:this.$t('refund'),
                            value:this.$numberConverter(numberFormat(Math.round(data.cards['savingRefund']))),
                        },
                        {
                            icon:'fa-money',
                            name:this.$t('balance'),
                            value:this.$numberConverter(numberFormat(Math.round(data.cards['savingBalance']))),
                        },
                        {
                            icon:'fa-money',
                            name:this.$t('todays_balance'),
                            value:this.$numberConverter(numberFormat(50000)),
                        }
                    );
                }
            });
    }
}