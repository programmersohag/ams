import Loan from '@/components/dashboard/branch/Loan';
    import Saving from '@/components/dashboard/branch/Saving';
    import Member from '@/components/dashboard/branch/Member';
    import Surplus from '@/components/dashboard/branch/Surplus';
    import { MultiSelect } from 'vue-search-select';
    import _ from 'lodash';
    export default {
        name: 'TrendChart',
        components: {
            Loan,
            Saving,
            Member,
            Surplus,
            MultiSelect
        },
        data () {
            return {
                input:{
                  period:6,
                  branch:[],
                  branch_name:[]
                },
                month_list:{
                    3:this.$numberConverter(3)+' '+this.$t('month'),
                    4:this.$numberConverter(4)+' '+this.$t('month'),
                    5:this.$numberConverter(5)+' '+this.$t('month'),
                    6:this.$numberConverter(6)+' '+this.$t('month')
                },
                searchText: '',
                items: [],
                lastSelectItem: {},
                branch_list:[],
                is_branch_list:false
            }
        },
        mounted: function(){
            this.loadData();
        },
        methods: {
            loadData: function() {
                this.$http_service.get('dashboard-service/branch/get_branch_list')
                    .then(res => {
                    let branch_combo = [];
                    let branch_name_combo = [];
                    if(Object.keys(res.data.data.branches).length > 0 && res.data.data) {
                        for(let key in res.data.data.branches) {
                        branch_combo[key] = {
                            value:res.data.data.branches[key]['id'],
                            text:res.data.data.branches[key]['name']+"-"+res.data.data.branches[key]['code'],
                            code:res.data.data.branches[key]['code']
                        };
                        branch_name_combo[res.data.data.branches[key]['id']] = res.data.data.branches[key]['name']+"-"+res.data.data.branches[key]['code'];
                        }
                    }
                    this.input.branch_name = branch_name_combo;
                    this.setBranchlist(branch_combo);
                    this.branch_list = branch_combo;
                });
            },
            setBranchlist: function(branch_combo) {
                let item_list = [];
                if(branch_combo.length > 0) {
                    for(let key in branch_combo) {
                        if(key <= 4) {
                            item_list[key] = branch_combo[key]
                        }
                    }
                }
                this.items = item_list;
                this.input.branch = item_list;
                this.is_branch_list = true;
            },
            periodChange: function($event){
                this.input.period = $event.target.value;
                this.childComponentLoad();
            },
            onSelect (items, lastSelectItem) {
                if(items.length > 5 || items.length < 1) {
                    return false;
                }
                this.items = items;
                this.input.branch = items;
                this.lastSelectItem = lastSelectItem;
                this.childComponentLoad();
            },
            childComponentLoad(){
                this.$refs.childComponent1.loadData();
                this.$refs.childComponent2.loadData();
                this.$refs.childComponent3.loadData();
                this.$refs.childComponent4.loadData();
            },
            reset () {
                this.items = [] // reset
            },
            selectFromParentComponent () {
                this.items = _.unionWith(this.items, [this.branch_list[0]], _.isEqual);
            }
        }
    }