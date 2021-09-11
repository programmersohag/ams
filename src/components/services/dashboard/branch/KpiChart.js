import LowKpiChart from '@/components/dashboard/branch/LowKpiChart';
import TopKpiChart from '@/components/dashboard/branch/TopKpiChart';
import CustomModal from '@/containers/Modal';


// Temporary static Charts
import {GChart} from 'vue-google-charts'

export default {
  name: 'KpiChart',
  components: {
    CustomModal,
    TopKpiChart,
    LowKpiChart,
    GChart // Temporary static Charts
  },
  data() {
    return {
      total_schedules: 0,
      total_audit: 0,
      pending_audits: 0,
      approved_schedule: 0,
      pending_schedules: 0,
      reject_schedules: 0,
      feedback_schedules: 0,
      input: {
        kpi: 1,
        order: 5,
        kpi_list: [],
        period: 6
      },
      user_info: [],
      userType: '',
      month_list: {
        3: this.$t('All'),
        4: this.$t('High'),
        5: this.$t('Low'),
        6: this.$t('Medium')
      },
      order_list: {
        5: this.$t('All'),

      },
      order_list2: {
        5: this.$t('All'),
        6: this.$t('Draft'),
        7: this.$t('Submitted'),
        8: this.$t('Reviwed'),
        9: this.$t('Feedback'),
        10: this.$t('Rejected')

      },
      kpi_list: {
        1: this.$t('Savar'),
        2: this.$t('Uttara'),
        // 3:this.$t('outstanding'),
        // 4:this.$t('deposit'),
        // 5:this.$t('refund'),
        // 6:this.$t('male'),
        // 7:this.$t('female'),
        // 8:this.$t('income'),
        // 9:this.$t('expense')
      },
      // Temporary static Charts

      chartsLib: null,
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartDataVerBar: [
        ['Location', 'No of Issues']
      ],
      chartOptionsVerBar: {
        chart: {
          title: 'Issue/Remediation Status'
        },
        legend: {position: 'bottom', alignment: 'start'},
        bars: 'horizontal', // Required for Material Bar Charts.
        hAxis: {format: 'decimal'},
        height: 340,
        grid: "false",
        colors: ['#c4b3ea', '#b296f1', '#916ae6'],
        backgroundColor: "transparent",
        chartArea: {
          backgroundColor: {
            fill: 'transparent',
            fillOpacity: 1
          },
        },
        vAxis: {
          title: 'Location',
          titleTextStyle: {
            color: '#8b5cf6'
          },
          textStyle: {color: '#8b5cf6'},
          gridlines: {
            color: 'transparent'
          }
        },
        hAxis: {
          title: 'No of Issues',
          titleTextStyle: {
            color: '#8b5cf6'
          },
          textStyle: {color: '#8b5cf6'},
        },
      },


      chartOptionsBar: {
        chart: {
          title: 'Issue/Remediation Status'
        },
        legend: {position: 'bottom', alignment: 'start'},
        bars: 'vertical', // Required for Material Bar Charts.
        hAxis: {format: 'decimal'},
        height: 300,
        grid: "false",
        colors: ['#c4b3ea', '#b296f1', '#916ae6'],
        backgroundColor: "transparent",
        chartArea: {
          backgroundColor: {
            fill: 'transparent',
            fillOpacity: 1
          },
        },
        vAxis: {
          title: 'Accumulated Rating',
          titleTextStyle: {
            color: '#8b5cf6'
          },
          textStyle: {color: '#8b5cf6'},
          gridlines: {
            color: 'transparent'
          }
        },
        hAxis: {
          textStyle: {color: '#8b5cf6'},
        },

      },

      chartDataPie: [],

      chartOptionPie: {
        chart: {
          title: 'Issue/Remediation Status'
        },
        legend: {position: 'top', maxLines: 3, textStyle: {color: '#8b5cf6'}},
        is3D: true,
        pieHole: 0.4,
        bars: 'horizontal', // Required for Material Bar Charts.
        hAxis: {format: 'decimal'},
        height: 300,
        grid: "false",
        colors: ['#c4b3ea', '#b296f1', '#916ae6', '#753ef1', '#b264ea'],
        backgroundColor: "transparent",
        chartArea: {
          backgroundColor: {
            fill: 'transparent',
            fillOpacity: 1
          },
        },
        vAxis: {
          title: 'Location',
          textStyle: {color: '#8b5cf6'},
          gridlines: {
            color: 'transparent'
          }
        },
        hAxis: {
          title: 'No of Issues',
          textStyle: {color: '#8b5cf6'},
        },
      },
      chartDataBar: [
        ['Issue Severity', 'High', 'Low', 'Medium'],
        ['Open', 1, 2, 4],
        ['Pending', 2, 4, 1],
        ['Inactive', 4, 2, 6],
        ['Remediated', 3, 2, 2]
      ],


      chartDataGantt: [
        [
          {type: "string", label: "Schedule ID"},
          {type: "string", label: "Schedule Name"},
          {type: "date", label: "Start Date"},
          {type: "date", label: "End Date"},
          {type: "number", label: "Duration"},
          {type: "number", label: "Percent Complete"},
          {type: "string", label: "Dependencies"},
        ]
      ],
      chartOptionGnt: {
        chart: {
          title: 'Issue/Remediation Status',
          backgroundColor: 'transparent',
        },
        bars: 'vertical', // Required for Material Bar Charts.
        hAxis: {format: 'decimal'},
        height: 340,
        grid: "false",

        gantt: {
          trackHeight: 25,
          percentEnabled: 'true',
          barHeight: 13,
          palette: [
            {
              "color": "#8c68e0",
              "dark": "#733df1",
              "light": "#b9a2ef"
            }
          ],

          barCornerRadius: 2,
          backgroundColor: {
            fill: 'transparent',
          },
          innerGridHorizLine: {
            stroke: 'transparent',
            strokeWidth: 0,
          },
          innerGridTrack: {
            fill: 'transparent'
          },
          innerGridDarkTrack: {
            fill: 'transparent'
          },
          sortTasks: 'true',
          shadowEnabled: false

        },
        chartArea: {
          backgroundColor: {
            fill: 'transparent',
            fillOpacity: 1
          },
        },
        vAxis: {
          title: 'Accumulated Rating',
          textStyle: {color: '#8b5cf6'},
          gridlines: {
            color: 'transparent'
          }
        },
        hAxis: {
          textStyle: {color: '#8b5cf6'},
        },
      },


      // End here Temporary static Charts

      is_load: false,
      modal_info: {
        id: null,
        isModalVisible: true,
        title: 'Please Select a Schedule',
        component_address: "schedules/schedule_popup/scheduleCards",
      }
    }
  },
  mounted: function () {
    this.user_info = this.$store.getters['auth/userInfo'];
    this.userType = this.user_info['userType'];
    //console.log("typerr",this.userType);
    this.loadData(1);
    this.getDashboardInfo();
  },
  methods: {
    loadData: function () {
      this.input.kpi_list = this.kpi_list;
      this.is_load = true;
    },
    kpiChange: function ($event) {
      this.input.kpi = $event.target.value;
      this.childComponentLoad();
    },
    orderChange: function ($event) {
      this.input.order = $event.target.value;
      this.childComponentLoad();
    },
    periodChange: function ($event) {
      this.input.period = $event.target.value;
      this.childComponentLoad();
    },
    childComponentLoad() {
      this.$refs.childComponentTop.loadData();
      this.$refs.childComponentLow.loadData();
    },
    onChartReady(chart, google) {
      this.chartsLib = google
    },
    getDashboardInfo: function () {
      let session = this.$store.getters['auth/userInfo'];
      let params = {};
      params.userId = session.id;
      params.userType = session.userType;

      let url = '/dashboard/get-data';
      let headers = {
        headers: {
          'Content-Type': `application/json`
        }
      }
      this.$axios
        .post(url, JSON.stringify(params), headers)
        .then(res => {
          let infos = res.data.data;
          this.total_schedules = infos.schedule_count;
          this.total_audit = infos.schedule_count;
          this.approved_schedule = infos.approved_schedule;
          this.pending_schedules = infos.pending_schedules;
          this.reject_schedules = infos.reject_schedules;
          this.feedback_schedules = infos.feedback_schedules;
          this.pending_audits = this.total_schedules - this.total_audit;

          this.chartDataPie = [
            ["Audits", "Rating"],
            ["High", infos.risk_level.high],
            ["Medium", infos.risk_level.mediums],
            ["Low", infos.risk_level.low]
          ]


          // format
          // ['2014Spring', 'Spring 2014', new Date(2014, 2, 22), new Date(2014, 2, 28), null, 10, null]

          for (let i = 0; i < infos.schedule_chart.length; i++) {
            this.chartDataGantt.push([infos.schedule_chart[i].schedul_id, infos.schedule_chart[i].schedul_name,
              new Date(parseInt(infos.schedule_chart[i].start_date.split('-')[0]),
                parseInt(infos.schedule_chart[i].start_date.split('-')[1]) - 1, parseInt(infos.schedule_chart[i].start_date.split('-')[2])),
              new Date(parseInt(infos.schedule_chart[i].end_date.split('-')[0]),
                parseInt(infos.schedule_chart[i].end_date.split('-')[1]) - 1, parseInt(infos.schedule_chart[i].end_date.split('-')[2])),
              parseInt(infos.schedule_chart[i].duration), parseInt(infos.schedule_chart[i].percent_complete), null]);
          }

          //  issue_by_location
          // , ['Gulsan', 4],
          for (let i = 0; i < infos.issue_by_location.length; i++) {
            this.chartDataVerBar.push([infos.issue_by_location[i].location_name,
              infos.issue_by_location[i].no_of_issues]);
          }

        });
    },
  },

}
