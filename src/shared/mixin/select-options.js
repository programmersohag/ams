import Vue from 'vue';

Vue.mixin({

    methods:{
        ReportTypeGeneratByReportLevel:function(options ){
              var  optionns_formatted=[];
                optionns_formatted.push({
                    text :"----Select---",
                    value :"",
                    disable:false
                });

                for (let index in options) {

                   optionns_formatted.push({
                        text :options[index]['name'],
                        value :index,
                        disabled:false
                    })

                    for (let index2 in options[index]['child']) {

                        optionns_formatted.push({
                            text: options[index]['child'][index2],
                            value: index+"@@@##"+index2,
                            disabled: true
                        });
                    }
                }
                return optionns_formatted;
            },
    }
})