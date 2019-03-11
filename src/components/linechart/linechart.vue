<template>
    <div id="sync-linechart" class="row mt-3">
        <!-- <VueApexCharts type="line" height=350 :options="chartOptionsLine1" :series="series1" />
        <VueApexCharts type="line" height=350 :options="chartOptionsLine2" :series="series2" />
        <VueApexCharts type="area" height=350 :options="chartOptionsArea" :series="series3" /> -->
    
        <div class="col-lg-6 col-12">
            <div class="charts mb-3 p-3">
                <VueApexCharts type=area height=250 :options="chartOptionsArea" :series="wave_height" />
            </div>

            <div class="charts mb-3 p-3">
                <VueApexCharts type=line height=250 :options="chartOptionsLine3" :series="temp"/>
            </div>
        </div>
         
        <div class="col-lg-6 col-12">
            <div class="charts mb-3 p-3">
                <VueApexCharts type=area height=250 :options="chartOptionsLine2" :series="wind_speed" />
            </div>

            <div class="charts mb-3 p-3">
                <VueApexCharts type=area height=250 :options="chartOptionsLine1" :series="sea_water_speed"/>
            </div>
        </div>
        

       
    
    </div>      
</template>

<script>

import VueApexCharts from 'vue-apexcharts'
import apexcharts from 'apexcharts'
import moment from 'moment'

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
        // intersect: true,
        // shared: false,
        enabled:true,
        followCursor: true,
        theme: 'dark',
        x: {
          show: true,
          formatter: function(value, timestamp, index) {
                return moment(new Date(value)).utc().format("MMM-DD HH:00z")
            }
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
        clipMarkers: true,
        row: {
            colors: ['#fff', '#f2f2f2']
          }
      },
      yaxis: {
        tickAmount: 4,
        labels: {
            minWidth: 0,
            maxWidth: 100,
        }
      },
      xaxis: {
        type: 'datetime',
        labels:{
            formatter: function(value, timestamp, index) {
                return moment(new Date(value)).format("MMM DD, YYYY")
            }
        },
        tooltip: {
            enabled: false,
            formatter: function(value, timestamp, index) {
                return moment(new Date(value)).utc().format("MMM-DD HH:00z")
            }
        },
    }
}

export default {
    name: "sync-linechart",
    props : [
        "wave_height",
        "wind_speed",
        "sea_water_speed",
        "label_sea_dir",
        "label_wind_dir",
        "temp"
    ],
    components: {
        VueApexCharts,
    },
    created () {
        // console.log(this.label_wind_dir)
    },
    data () {
        return {
            chartOptionsLine1: {
                labels: this.label_sea_dir,
                chart: {
                    id: '1',
                    group: 'metOcean',
                    events: {
                        dataPointSelection: function(event, chartContext, config) {
                            console.log(chartContext, config);
                        }
                    }
                },
                colors: ['#00E396'],
                title: {
                        text: 'Surface Sea Water Speed',
                        align: 'left',
                        style: {
                            fontSize:  '16px',
                            color:  '#263238'
                        },
                    },

                yaxis: {
                    title: {
                        text: '[ meters / second ]'
                        },
                    min: 0,
                    max: 0.1,
                    // labels:{
                    //     formatter: function(val) {
                    //         return val.toFixed(2) + " m/s";
                    //     }
                    // }
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
                labels: this.label_wind_dir,
                chart: {
                    id: '2',
                    group: 'metOcean',
                    events: {
                        dataPointSelection: function(event, chartContext, config) {
                            console.log(event);
                        }
                    }
                },
                colors: ['#546E7A'],
                title: {
                        text: 'Wind Speed at 10m Above Ground Level',
                        align: 'left',
                        style: {
                            fontSize:  '16px',
                            color:  '#263238'
                        },
                    },
                yaxis: {
                    title: {
                        text: '[ meters / second ]'
                        },
                    min: 0,
                    max: 20,
                    // labels:{
                    //     formatter: function(val) {
                    //         return val.toFixed(2) + " m/s";
                    //     }
                    // }
                    },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: 0,
                    offsetX: 0
                }
            },
            chartOptionsLine3: {
                labels: this.temp,
                chart: {
                    id: '3',
                    group: 'metOcean',
                    events: {
                        dataPointSelection: function(event, chartContext, config) {
                            console.log(event);
                        }
                    }
                },
                colors: ['#FFA500'],
                title: {
                        text: 'Air Temperature [ 2m ]',
                        align: 'left',
                        style: {
                            fontSize:  '16px',
                            color:  '#263238'
                        },
                    },
                yaxis: {
                    title: {
                        text: '[ Kelvin ]'
                        },
                    min: 278,
                    max: 284,
                    // labels:{
                    //     formatter: function(val) {
                    //         return val.toFixed(2) + " K";
                    //     }
                    // }
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
                    id: '4',
                    group: 'metOcean',
                    events: {
                        dataPointSelection: function(event, chartContext, config) {
                            console.log(event);
                        }
                    }
                },
                title: {
                        text: 'Sea Surface Wave Height',
                        align: 'left',
                        style: {
                            fontSize:  '16px',
                            color:  '#263238'
                        },
                    },
                colors: ['#008FFB', '#FF0000'],
                yaxis: {
                    title: {
                        text: '[ meters ]'
                        },
                    min: 0,
                    max: 12,
                    // labels:{
                    //     formatter: function(val) {
                    //         return val.toFixed(2)+ " m";
                    //     }
                    // }
                    // tooltip:{
                    //     formatter: function(val) {
                    //         return val.toFixed(2)+ " m";
                    //     }
                    // }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -5,
                    offsetX: 0
                },
            }
        }
    },
    methods : {

    }
}
</script>

<style>
.charts {
    background: #fff;
    border-radius: .5rem;
    box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
}
</style>

