<template>
  <div>
    <div class="report-data" v-html="htmlData"></div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
        return {
            htmlData:''
        }
    },
    mounted() {
        document.title =  (window.ReportTitle == null) ? "Microfin360 Next" : window.ReportTitle;
        this.htmlData =  (window.reportData == null) ? "" : window.reportData;
         //this.htmlData = JSON.parse(Buffer.from(this.htmlData, 'base64').toString('ascii'))
    }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>