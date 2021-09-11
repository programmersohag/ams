<template>
  <div>
    <radial-menu
      style="position: fixed;
                            bottom: 50px;
                            right: 50px;
                            background-color: var(--background-color-light) !important;
                            color: green;
                            content: '\f095';
                            display: inline-block;
                            padding-right: 3px;
                            vertical-align: middle;
                            font-weight:900;
                            box-shadow: 2px 2px 4px var(--shadow_color_light2), -1px -1px 4px var(--shadow_color_light), inset 4px 4px 8px var(--shadow_color_light2), inset -8px -8px 8px var(--shadow_color_light);"
      :itemSize="50"
      :radius="100"
      :angle-restriction="90">
      <radial-menu-item
        v-for="(item, index) in items"
        :key="index"
        style="background-color: #7ab800;
                            cursor:pointer;
                            color: var(--background-color) !important;
                            align-items: center;
                            font-size:0.45em;
                            justify-content: center;
                            border: 1px solid rgba(255, 255, 255, 0.5);
                            transition: all 0.3s linear;
                            box-shadow: 2px 2px 4px #bbcfda, -1px -1px 4px #bbcfda, inset 4px 4px 8px rgba(209, 217, 230, 0.35), inset -8px -8px 8px rgba(255, 255, 255, 0.3);"
        @click="() => handleClick(item)">
        <span class="text-center"><i :class="item.icon"></i><br><p
          style="margin-bottom:0; font-size:11px;">{{ item.text }}</p></span>
      </radial-menu-item>
    </radial-menu>

  </div>
</template>
click
<script>
import {RadialMenu, RadialMenuItem} from 'vue-radial-menu'
import {Printd} from 'printd'
import API from "@/shared/common/API.js";

let reportAPI = new API();
reportAPI.createEntity({name: "report"});
let restAPI = reportAPI.endpoints.report

export default {
  name: "PrintMenu",
  props: {
    params: {title: '', url: '', data: null},
  },
  data() {
    return {
      // items: ['Print', 'PDF', 'Excel'],
      items: [
        {
          text: "Print",
          icon: "fa fa-print fa-lg"
        },
        {
          text: "PDF",
          icon: "fa fa-file-pdf-o fa-lg"
        },
        {
          text: "Excel",
          icon: "fa fa-file-excel-o fa-lg"
        }

      ],
      lastClicked: 'click on something!',
    }
  },
  methods: {
    handleClick(item) {
      this.lastClicked = item;
      if (item.text === 'Print') {
        this.printPreview();
      } else if (item.text === 'PDF') {
        this.generatePdf();
      } else if (item.text === 'Excel') {
        this.generateExcel()
      } else if (item.text === 'Full') {

      }
    },
    generatePdf() {
      const url = this.params['url'];
      const data = this.params['data'];
      const fileName = data['outputFileName'] + ".pdf";
      const params = new FormData();
      params.append("outputFileName", fileName);
      params.append("reportType", "PDF");
      params.append("mimeType", "PDF");
      params.append("scheduleId", data['scheduleId']);
      this.sendRequest(url, params, fileName);
    },
    generateExcel: function () {
      const url = this.params['url'];
      const data = this.params['data'];
      const fileName = data['outputFileName'] + ".xlsx";
      const params = new FormData();
      params.append("outputFileName", fileName);
      params.append("reportType", "XLSX");
      params.append("mimeType", "XLSX");
      params.append("scheduleId", data['scheduleId']);
      this.sendRequest(url, params, fileName);
    },
    printPreview: function () {
      // let
      let reportData = document.getElementById('report-container');
      if (reportData == null) {
        return;
      }
      let htmlString = "";
      htmlString += reportData.innerHTML;
      // let routeData = this.$router.resolve({name: 'Print', query: {reportData: htmlString}});
      let location = window.location;
      location = location.origin + location.pathname;
      let url = location + 'print.html';
      const newWindow = window.open(url, '_blank');
      newWindow.reportData = htmlString;
      newWindow.ReportTitle = this.params.title;
    },
    sendRequest: function (url, params, fileName) {
      const config = {
        responseType: 'blob'
      };
      restAPI.postRequest(url, params, config).then(res => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', fileName);
        document.body.appendChild(fileLink);
        fileLink.click();
        window.URL.revokeObjectURL(fileLink.href);
      });
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
