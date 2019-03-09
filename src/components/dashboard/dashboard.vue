<template>
     <div id="dashboard" class="container-fluid">
        <!-- <h1>Dashboard</h1> -->
        <!-- <button class="btn-success">Hello</button> -->
        <div class="row">
            <div class="col-8">
                <linechart_group :series1="wave_height" :series2="wind_speed" :series3="sea_water_speed" />
            </div>

            <!-- <div class="col-6">
                <linechart_group :series1="wave_height" :series2="wind_speed" :series3="sea_water_speed" />
            </div> -->
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import { preprocessData } from "@/assets/js/preprocess.js"
// Read data
import _data_json_ from "@/assets/data/data.json"
import _data_csv_ from "@/assets/data/data.csv"
// Load components
import linechart_group from "@/components/linechart/linechart"


export default {
    name : 'dashboard',
    components :{
        linechart_group
    },
    data () {
        return {
            data_json: _data_json_,
            data_csv: _data_csv_,
            sea_water_speed:null,
            wind_speed: null,
            wave_height: null
        }
    },
    created () {
        var result = preprocessData(this.data_csv, this.data_json)
        console.log(_.keys(result))
        // console.log(_.zip(_.values(result["unix_datetime"]), _.values(result["surface_sea_water_speed"])))
        this.sea_water_speed = [
            {
            name:"surface_sea_water_speed",
            data:
            _.zip(_.values(result["unix_datetime"]), _.values(result["surface_sea_water_speed"]))
            }
        ]

        this.wind_speed = [
            {
            name:"wind_speed_at_10m_above_ground_level",
            data:
            _.zip(_.values(result["unix_datetime"]), _.values(result["wind_speed_at_10m_above_ground_level"]))
            }
        ]
        
        this.wave_height = [
            {
            name:"Significant Wave Height",
            data:
            _.zip(_.values(result["unix_datetime"]), _.values(result["sea_surface_wave_significant_height"]))
            },
            {
            name:"Maximum Wave Height",
            data:
            _.zip(_.values(result["unix_datetime"]), _.values(result["sea_surface_wave_maximum_height"]))
            },
        ]

    
    },
    methods :{
        
    }
}
</script>

<style>

</style>


