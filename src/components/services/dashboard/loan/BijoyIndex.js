
import WidgetTwo from '@/components/dashboard/widget/WidgetTwo';
import WidgetSeven from '@/components/dashboard/widget/WidgetSeven';

import LoanChartSham from '@/components/dashboard/loan/Chart_sham';
import ProductChart from '@/components/dashboard/loan/ProductChart';
import {numberFormat} from '@/shared/utils';
import BorrowerChart from '@/components/dashboard/loan/BorrowerChart';
import BranchWiseLoanChart from '@/components/dashboard/loan/BranchWiseLoanChart';

export default {
    name: 'tabs',
    components: {
        WidgetTwo,
        WidgetSeven,

        LoanChartSham,
        BorrowerChart,
        BranchWiseLoanChart,
        ProductChart

    },
    data () {
        return {
            branch_card:[]
        }
    },
    mounted:function() {
        this.loadData();
    },
    methods: {
        loadData:function(){
            this.branch_card = [];
            this.$http_service.get('dashboard-service/loan/get_card_info')
                .then(res => {
                    if(Object.keys(res.data.data.cards).length > 0 && res.data.data) {
                        let data = res.data.data;
                        this.branch_card.push(
                            {
                                icon:'fa-money',
                                name:this.$t('disbursement'),
                                value:this.$numberConverter(numberFormat(Math.round(data.cards['currentDisbursedAmount']))),
                                title:this.$t('current')
                            },
                            {
                                icon:'fa-money',
                                name:this.$t('recovery'),
                                value:this.$numberConverter(numberFormat(Math.round(data.cards['currentPrincipalRecoveryAmount']))),
                                title:this.$t('current')
                            },
                            {
                                icon:'fa-money',
                                name:this.$t('due'),
                                value:this.$numberConverter(numberFormat(Math.round(data.cards['currentOutstandingAmount']))),
                                title:this.$t('current')
                            },
                            {
                                icon:'fa-money',
                                name:this.$t('outstanding'),
                                value:this.$numberConverter(numberFormat(Math.round(data.cards['currentOutstandingAmount']))),
                                title:this.$t('current')
                            }
                        );
                    }
                });
        }
    }
}