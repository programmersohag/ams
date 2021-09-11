<template>
    <div>
        <radial-menu
                style="position: fixed;bottom: 50px;right: 50px;background-color: green;"
                :itemSize="50"
                :radius="120"
                :angle-restriction="90">
            <radial-menu-item
                    v-for="(item, index) in items"
                    :key="index"
                    style="background-color: white;cursor:pointer;"
                    @click="() => handleClick(item)">
                <span>{{item}}</span>
            </radial-menu-item>
        </radial-menu>
    </div>
</template>

<script>
    import html2pdf from 'html2pdf.js';
    import { RadialMenu,  RadialMenuItem } from 'vue-radial-menu'
    import { Printd } from 'printd'
    export default {
        name: "PrintMenu",
        props: {
            html: '',
            ReportTitle: '',
        },
        data () {
            return {
                items: ['Print', 'PDF', 'Excel'],
                lastClicked: 'click on something!'
            }
        },
        methods: {
            handleClick (item) {
                this.lastClicked = item;
                if(item==='Print'){
                    this.printPreview();
                }else if(item==='PDF'){
                    this.generatePdf();
                }else if(item==='Excel'){
                    this.generateExcel()
                }else if(item==='Full'){

                }
            },
            generatePdf(){
                var htmlString ="<!DOCTYPE html><html lang='en'><body><head><title>District and Upazilla cummulative Loan Disbursement</title>";
                htmlString+="<link href='../../../assets/report.css' /></head>"
                htmlString+=document.getElementById("report-container").innerHTML;
                htmlString+="</body></html>";
                var opt = {
                    margin:       1,
                    filename:     this.ReportTitle + ".pdf",
                    image:        { type: 'jpeg', quality: 1 },
                    html2canvas:  { scale: 1 },
                    jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
                };
                html2pdf().set(opt).from(htmlString).save();
            },
            generateExcel: function(){
                this.excel_data = document.getElementById('report-container').innerHTML;
                let blob = new Blob([this.excel_data], { type: 'application/ms-excel' })
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = this.ReportTitle + '.xls';
                link.click()
            },
            printPreview: function(){
                this.excel_data = document.getElementById('report-container');
                //console.log(this.$el);
                const d = new Printd();
                d.print(this.excel_data, '')
            },
        },
        components: {
            RadialMenu,
            RadialMenuItem
        },
    }
</script>

<style scoped>

</style>