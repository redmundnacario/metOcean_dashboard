<template>
     <div id="dashboard" class="container">
        <span><h1><img class="img-fluid logo" src="@/assets/images/MetService.png" alt=""> MetOcean Dashboard</h1></span>
        <!-- <button class="btn-success">Hello</button> -->
        <div class="col">
            
            <linechart_group 
                :wave_height="wave_height" 
                :wind_speed="wind_speed" 
                :sea_water_speed="sea_water_speed" 
                :label_sea_dir="sea_water_speed_dir"
                :label_wind_dir="wind_speed_dir"
                :temp="temp"
            />
    
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
            wave_height: null,
            sea_water_speed_dir: null,
            wind_speed_dir: null,
            temp: null
        }
    },
    created () {
        var result = preprocessData(this.data_csv, this.data_json)
        // console.log(_.keys(result))
        // console.log(_.zip(_.values(result["unix_datetime"]), _.values(result["surface_sea_water_speed"])))
        this.sea_water_speed = [
            {
            name:"surface_sea_water_speed",
            data:
                _.zip(_.values(result["unix_datetime"]), _.values(result["surface_sea_water_speed"]))
            }
        ]
        this.sea_water_speed_dir = _.values(result["sea_surface_wave_from_direction_cardinal_at_variance_spectral_density_maximum"])
        // console.log(this.sea_water_speed_dir)

        this.wind_speed = [
            {
            name:"wind_speed_at_10m_above_ground_level",
            data:
                _.zip(_.values(result["unix_datetime"]), _.values(result["wind_speed_at_10m_above_ground_level"]))
            }
        ]
        this.wind_speed_dir = _.values(result["wind_from_direction_cardinal_at_10m_above_ground_level"])
        // console.log(this.wind_speed_dir)
        
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
        this.temp = [
            {
            name: "Air Temperature [ 2m ]",
            data: 
                _.zip(_.values(result["unix_datetime"]), _.values(result["air_temperature_at_2m_above_ground_level"]))
            }
        ]
    
    },
    methods :{
        
    }
}
</script>

<style>
.logo {
    width:60px;
}
</style>


