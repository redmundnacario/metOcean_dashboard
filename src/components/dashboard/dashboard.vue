<template>
    <div id="dashboard">
        <h1>Dashboard</h1>
        <div></div>
    </div>
</template>

<script>
// import _ from 'lodash'
// import { DataFrame } from 'pandas-js';
import { preprocessData } from "@/assets/js/preprocess.js"

import _data_json_ from "@/assets/data/data.json"
import _data_csv_ from "@/assets/data/data.csv"

export default {
    name : 'dashboard',
    data () {
        return {
            data_json: _data_json_,
            data_csv: _data_csv_
        }
    },
    created () {
        var result = preprocessData(this.data_csv, this.data_json)
        console.log(result)
    
    },
    methods :{
        
    }
}
</script>

<style>

</style>


