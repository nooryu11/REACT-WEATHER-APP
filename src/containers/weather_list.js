import React , {Component} from 'react'
import _ from 'lodash'
import we from './w.js'
import {connect} from 'react-redux'
import GoogleMap from '../components/google_map'

import {Sparklines,SparklinesLine,SparklinesReferenceLine} from 'react-sparklines'
export  class WeatherList extends Component{


  renderWeather(cityData){

  const mytemp = cityData.list.map(weather=> weather)
  console.log(mytemp)
var current = "wi wi-owm-"+we(mytemp[0].weather[0].description)
var current2="wi wi-owm-"+we(mytemp[1].weather[0].description)
var current3="wi wi-owm-"+we(mytemp[2].weather[0].description)
var current4="wi wi-owm-"+we(mytemp[3].weather[0].description)



    const temps = cityData.list.map(weather=> weather.main.temp)
    const pressure = cityData.list.map(weather=> weather.main.pressure)
    const humidities = cityData.list.map(weather=> weather.main.humidity)
    const {lon,lat} = cityData.city.coord;

    console.log(temps)
    function average(data){
      return  _.round(_.sum(data)/data.length)
    }

    return (

      <tr key={cityData.city.name}>
      <td>  <GoogleMap lon={lon} lat={lat} /></td>
      <td>
      <Sparklines height={120} width={180} data={temps} >
      <SparklinesLine color="black" />
         <SparklinesReferenceLine type="avg" />
      </Sparklines>
      <div>{Math.round(average(temps)-273.15)}&nbsp;<i className="wi wi-celsius"></i> &nbsp;<i className={current}></i>&nbsp;&nbsp;{mytemp[0].weather[0].description}</div>
      </td>
      <td>
      <Sparklines height={120} width={180} data={pressure}>
      <SparklinesLine color="orange" />
       <SparklinesReferenceLine type="avg" />
      </Sparklines>
        <div>{average(pressure)}&nbsp;hPa</div>
      </td>
      <td>
      <Sparklines height={120} width={180} data={humidities}>
      <SparklinesLine color="blue" />
       <SparklinesReferenceLine type="avg" />
      <div>{average(humidities)}&nbsp;%</div>
      </Sparklines>
      </td>
      <td>
      <div>
      {Math.round(mytemp[1].main.temp-273.15)}<i className="wi wi-celsius"></i>&nbsp;   <i className={current2}></i>&nbsp; {mytemp[1].weather[0].description}
      <hr></hr>

      <p>{Math.round(mytemp[2].main.temp-273.15)}<i className="wi wi-celsius"></i>&nbsp; <i className={current3}></i>&nbsp; {mytemp[2].weather[0].description}</p>
          <hr></hr>
      <p>{Math.round(mytemp[3].main.temp-273.15)}<i className="wi wi-celsius"></i>&nbsp;  <i className={current4}></i>&nbsp; {mytemp[3].weather[0].description}</p>
          <hr></hr>
</div>
      </td>

      </tr>
    )
  }
  render(){
    return (
      <table className="table table-hover">
      <thead>
      <tr>

          <th>City</th>
        <th>Temperature(°C)</th>
        <th>Pressure (hPa)</th>
        <th>Humidity (%)</th>
        <th>Every 3 hours </th>

        </tr>
        </thead>
      <tbody>
      {this.props.weather.map(this.renderWeather)}
      </tbody>
      </table>
    )


  }
}
function mapStateToProps({weather}){
  return {weather}
}
export default connect(mapStateToProps)(WeatherList)
