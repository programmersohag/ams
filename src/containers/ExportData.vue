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
                    style="background-color: red;cursor:pointer;"
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
    import html2canvas from "html2canvas";
    import jsPDF from "jspdf";

    import Vue from 'vue'

    export default {
        name: "ExportData",
        components: {
            RadialMenu,
            RadialMenuItem
        },
        props: {
            html: '',
            reportTitle: '',
            data:[]
        },
        data () {
            return {
              //  items: ['Print', 'PDF', 'Excel'],
                items: ['Print'],
                lastClicked: 'click on something!',
                user:this.$store.getters['auth/userInfo']
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
               // htmlString+="<link href='../../../assets/report.css' /></head>"
                htmlString+=document.getElementById("export-data").innerHTML;
                htmlString+="</body></html>";
                var opt = {
                    margin:       1,
                    filename:     this.reportTitle + ".pdf",
                    image:        { type: 'jpeg', quality: 1 },
                    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
                    html2canvas:  { scale: 1 },
                    jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
                };
                html2pdf().set(opt).from(htmlString).save();
                this.setExportData(2);
            },
            generateExcel: function(){
                this.excel_data = document.getElementById('report-container').innerHTML;
                let blob = new Blob([this.excel_data], { type: 'application/ms-excel' })
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = this.reportTitle + '.xls';
                link.click()
                this.setExportData(3);
            },
            printPreview: function(){
                let htmlString = this.getHtmlExportData();
                let location = window.location;
                location = location.origin+location.pathname;
                let url = location+'print-new.html';
                var newWindow = window.open(url, '_blank');
                newWindow.exportData = htmlString;
                newWindow.ReportTitle = this.reportTitle;
                this.setExportData(1);
            },
            setExportData: function(type) {
                try {
				    this.$parent.handleExport(type)
                } catch (error) {}
            },
            getHtmlExportData: function() {
                let reportData = "";
                reportData = document.getElementById('export-data');
                let headerData = 
                `<div id="report_header_content">
                    <h2>${this.reportTitle} (${this.user['mfi_name'].toUpperCase()})</h2>        
                    <p>${this.user['address']}</p>		
                </div>`;
                if(reportData == null) {
                    return;
                }
                let htmlString = `<div id="report_header_content">
                    <h2>${this.reportTitle} (${this.user['mfi_name'].toUpperCase()})</h2>        
                    <p>${this.user['address']}</p>		
                </div>`;
                htmlString += reportData.innerHTML;
                return htmlString;
            }
        }
    }
</script>