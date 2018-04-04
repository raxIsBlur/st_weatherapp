import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Chart } from '../components/Chart'
import GoogleMap from '../components/GoogleMap'

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name
    const temps = cityData.list.map(weather => weather.main.temp)
    const humidities = cityData.list.map(weather => weather.main.humidity)
    const pressures = cityData.list.map(weather => weather.main.pressure)
    const {lon, lat} = cityData.city.coord;
    return ( 
      <tr key={name}>
        <td>{<GoogleMap lon={lon} lat={lat}/>}</td>
        <td>
          <Chart color="red" data={temps} units="K"/>
        </td>
        <td>
          <Chart color="green" data={pressures} units="hPa"/>
        </td>
        <td>
          <Chart color="blue" data={humidities} units="%"/>
        </td>
      </tr>
    )
  }

  

  render() {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature (K)</th>
              <th>Pressure (hPa)</th>
              <th>Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.weather.map(this.renderWeather)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps({ weather }) {
  return { weather }
}

export default connect(mapStateToProps)(WeatherList)