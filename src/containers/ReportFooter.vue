<template>
    <div class="report-footer" align="center" border="0" v-html="report_footer"></div>
</template>

<script>
    import API from "@/shared/common/API.js";
    var reportAPI = new API();
    reportAPI.createEntity({name: "reports"});
    let reportApiEndPoint = reportAPI.endpoints.reports;
    export default {
        name: "ReportFooter",
        data () {
            return {
                report_footer:''
            }
        },
        mounted() {
           reportApiEndPoint.getRequest("report_footer", '')
            .then(response => {
                this.report_footer = response.data.report_footer
            })
            .catch(function (error) {
                console.log(error.response);
            })             
        }
    }
</script>
