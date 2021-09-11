<template>
    <div class="report-data" v-html="htmlData"></div>
</template>
<script>

export default {
    name: "Print",
    data () {
        return {
            htmlData:''
        }
    },
    mounted() {
        let reportData = this.$route.query.reportData;
        this.htmlData = JSON.parse(Buffer.from(reportData, 'base64').toString('ascii'))
    }
}
</script>
<style scoped>
.report-data{
    padding: 10px;
}
</style>