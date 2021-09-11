export default {
    name: 'PoworkingareasSave',
    props:{
        id: String
    },
    data() {
        return {
            row:[],
            oldValue:[],
            newValue:[],
            result:[],
        }
    },

    mounted: function () {
        this.getData();
    },
    methods: {
        getData: function() {
            this.$http_uat_service.get("/api/user-audit-trials/"+this.id)
            .then(resp => {
                if(resp && resp.status == 200){
                    this.row= resp.data.result;
                    if(this.row.tableName) {
                        this.row.tableName = this.getFormatedTableName(this.row.tableName);
                    }
                    if(this.row.oldValue) {
                        this.oldValue = JSON.parse(this.row.oldValue);
                    }
                    if(this.row.newValue) {
                        this.newValue = JSON.parse(this.row.newValue);
                    }
                    if(this.row.action=='update') {
                        if (this.newValue && this.oldValue) {
                             this.result = this.merge_options(this.oldValue, this.newValue);
                        }
                    }
                }
            });
        },
        getFormatedTableName:function (tableName) {
            var tmp = tableName.split("_");
            switch (tmp[0]) {
                case 'po':
                    tmp[0]="Organization:";
                    break;
                case 'acc':
                    tmp[0]="Accounting:";
                    break;
                case 'config':
                    tmp[0]="Configuration:";
                    break;
                case 'user':
                    tmp[0]="Security: "+tmp[0];
                    break;
                case 'users':
                    tmp[0]="Security: "+tmp[0];
                    break;
                default:
                    tmp[0]= tmp[0].charAt(0).toUpperCase() + tmp[0].slice(1);
                    break;
            }
            var str = tmp.join(" ")
            return str;
        },
        merge_options: function(obj1,obj2){
            var obj3 = {};
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
            return obj3;
        }
    }
}