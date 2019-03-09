import _ from 'lodash'
import { DataFrame } from 'pandas-js';

export const degToDirection = function(deg){
    if (deg == null){
      return null
    }else if (deg>11.25 && deg<33.75){
      return "NNE";
    }else if (deg>33.75 && deg<56.25){
      return "ENE";
    }else if (deg>56.25 && deg<78.75){
      return "E";
    }else if (deg>78.75 && deg<101.25){
      return "ESE";
    }else if (deg>101.25 && deg<123.75){
      return "ESE";
    }else if (deg>123.75 && deg<146.25){
      return "SE";
    }else if (deg>146.25 && deg<168.75){
      return "SSE";
    }else if (deg>168.75 && deg<191.25){
      return "S";
    }else if (deg>191.25 && deg<213.75){
      return "SSW";
    }else if (deg>213.75 && deg<236.25){
      return "SW";
    }else if (deg>236.25 && deg<258.75){
      return "WSW";
    }else if (deg>258.75 && deg<281.25){
      return "W";
    }else if (deg>281.25 && deg<303.75){
      return "WNW";
    }else if (deg>303.75 && deg<326.25){
      return "NW";
    }else if (deg>326.25 && deg<348.75){
      return "NNW";
    }else{
      return "N"; 
    }
  }

export const kelvinToCelsius = function (kelvin) {
  return kelvin - 273.15
}

export const utcToUnix = function (utc) {
  return (new Date(utc)).getTime()
}

export const preprocessData = function(data_csv, data_json) {

  // Convert some pf the variables
  _.forEach(data_csv, function(element, i){
              
    element["unix_datetime"] = utcToUnix(element["datetime"])
    element["wind_from_direction_cardinal_at_10m_above_ground_level"] = degToDirection(element["wind_from_direction_at_10m_above_ground_level"])
    // console.log(element["wind_from_direction_at_10m_above_ground_level"])
    element["air_temperature_celsius_at_2m_above_ground_level"] = +kelvinToCelsius(element["air_temperature_at_2m_above_ground_level"]).toFixed(2)
    // console.log(element["air_temperature_at_2m_above_ground_level"])
  })

  // Convert some pf the variables
  var data_json_arr = []
  _.forEach(data_json, function(element, i) {
    // console.log(element,i)
    data_json_arr.push({
        datetime : i,
        unix_datetime : utcToUnix(i),
        sea_surface_wave_from_direction_at_variance_spectral_density_maximum : element["sea_surface_wave_from_direction_at_variance_spectral_density_maximum"],
        sea_surface_wave_from_direction_cardinal_at_variance_spectral_density_maximum : degToDirection(element["sea_surface_wave_from_direction_at_variance_spectral_density_maximum"]),
        surface_sea_water_speed : element["surface_sea_water_speed"],
        sea_surface_wave_maximum_height : element["sea_surface_wave_maximum_height"]
    })
  })

  // Convert object array into dataframes
  var df_json = new DataFrame(data_json_arr)
  var df_csv = new DataFrame(data_csv)
  // console.log(df_json.toString())

  // Merge the two dataframes
  var result = df_json.merge(df_csv,["unix_datetime"] , 'outer');
  // console.log(result.toString())
  result = result.to_json({orient: 'records'})
  // Sort array object by datetime
  result= _.sortBy(result, "unix_datetime")
  // console.log(result)

  // Replace undefined and "null" with null
  _.forEach(result, function(element, i ){
    _.forEach(element,function(value,j){
        if (value === undefined | value == "null"){
            element[j] = null
        }
        // if (i==0){
        //     console.log(value, j)
        // }
    })
  })

  result = new DataFrame(result)
  result = result.to_json()
  return result
}