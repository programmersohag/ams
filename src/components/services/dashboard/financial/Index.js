
import WidgetFour from '@/components/dashboard/widget/WidgetFour';
import Chart from '@/components/dashboard/financial/Chart';
import {numberFormat} from '@/shared/utils';

export default {
  name: 'tabs',
  components: {
    Chart,
    WidgetFour
  },
  data () {
    return {
        financial_card:[]
    }
  },
  mounted:function() {
    this.$http_service.get('dashboard-service/financial/get_card_info')
    .then(res => {
        if(Object.keys(res.data.data.cards).length > 0 && res.data.data) {
            let data = res.data.data;
            this.financial_card.push(
                {
                    icon:'fa-money',
                    title:this.$t('cash'),
                    name1:this.$t('cash_in_hand'),
                    name2:this.$t('cash_at_bank'),
                    value1:this.$numberConverter(numberFormat(Math.round(data.cards['cashBalance']), 0, '.', ',')),
                    value2:this.$numberConverter(numberFormat(Math.round(data.cards['bankBalance']), 0, '.', ',')),
                },
                {
                    icon:'fa-money',
                    title:this.$t('income_expense'),
                    name1:this.$t('last_month_income'),
                    name2:this.$t('last_month_expense'),
                    value1:this.$numberConverter(numberFormat(Math.round(data.cards['totalIncomeLastMonth']), 0, '.', ',')),
                    value2:this.$numberConverter(numberFormat(Math.round(data.cards['totalExpenseLastMonth']), 0, '.', ',')),
                },
                {
                    icon:'fa-money',
                    title:this.$t('surpluse'),
                    name1:this.$t('last_month_surplus'),
                    name2:this.$t('this_month_surplus'),
                    value1:this.$numberConverter(numberFormat(Math.round(data.cards['totalSurplusLastMonth']), 0, '.', ',')),
                    value2:this.$numberConverter(numberFormat(Math.round(data.cards['totalSurplusThisMonth']), 0, '.', ',')),
                }
            );
        }
    });
  }
}