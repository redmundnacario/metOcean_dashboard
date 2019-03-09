<template>
    <div class="sync-linechart">
        <!-- <VueApexCharts type="line" height=350 :options="chartOptionsLine1" :series="series1" />
        <VueApexCharts type="line" height=350 :options="chartOptionsLine2" :series="series2" />
        <VueApexCharts type="area" height=350 :options="chartOptionsArea" :series="series3" /> -->

        <div id="chart-line">
            <VueApexCharts type=area height=250 :options="chartOptionsArea" :series="series1" />
        </div>

        <div id="chart-line2">
            <VueApexCharts type=line height=160 :options="chartOptionsLine2" :series="series2" />
        </div>

        <div id="chart-area">
            <VueApexCharts type=area height=160 :options="chartOptionsLine1" :series="series3" />
        </div>
    
    </div>      
</template>

<script>

import VueApexCharts from 'vue-apexcharts'
import apexcharts from 'apexcharts'

Apex = {
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      toolbar: {
        tools: {
          selection: true
        }
      },
    //   markers: {
    //     size: 3,
    //     hover: {
    //       size: 5
    //     }
    //   },
      tooltip: {
        followCursor: true,
        theme: 'dark',
        x: {
          show: true
        },
        marker: {
          show: true
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        }
      },
      grid: {
        clipMarkers: true
      },
      yaxis: {
        tickAmount: 3
      },
      xaxis: {
        type: 'datetime'
      },
    }

export default {
    name: "sync-linechart",
    props : [
        "series1",
        "series2",
        "series3"
    ],
    components: {
        VueApexCharts,
    },
    data () {
        return {
            // series1: [{
            //     data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            //         min: 10,
            //         max: 60
            //     })
            // }],
            // series2: [{
            //     data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            //         min: 10,
            //         max: 30
            //     })
            // }],
            // series3: [{
            //     data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            //         min: 10,
            //         max: 90
            //     })
            // }],
            chartOptionsLine1: {
                chart: {
                    id: '1',
                    group: 'metOcean',
                },
                colors: ['#00E396'],
                title: {
                        text: 'Surface Sea Water Speed',
                        align: 'Center'
                    },

                yaxis: {
                    title: {
                        text: '[ meters / second ]'
                        },
                        min: 0,
                        max: 0.1
                    },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: 0,
                    offsetX: 0
                }
            },
            chartOptionsLine2: {
                chart: {
                    id: '2',
                    group: 'metOcean',
                },
                colors: ['#546E7A'],
                title: {
                        text: 'Wind Speed at 10m Above Ground Level',
                        align: 'Center'
                    },
                yaxis: {
                    title: {
                        text: '[ meters / second ]'
                        },
                        min: 0,
                        max: 20
                    },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: 0,
                    offsetX: 0
                }
            },
            chartOptionsArea: {
                chart: {
                    id: '3',
                    group: 'metOcean',
                },
                title: {
                        text: 'Sea Surface Wave Height',
                        align: 'Center'
                    },
                colors: ['#008FFB', '#FF0000'],
                yaxis: {
                    title: {
                        text: '[ meters ]'
                        },
                        min: 0,
                        max: 12
                    },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -5,
                    offsetX: 0
                }
            }
        }
    },
    methods :{

    }
}
</script>

<style>

</style>

