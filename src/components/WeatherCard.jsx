import React from "react";
import axios from "axios";

function zeroPad(n) {
  return n < 10 ? '0' + n : String(n);
}

function capitalizar(string) {
  return string[0].toUpperCase() + string.substring(1);
}

function getHHMMFromTime(time) {
  return zeroPad(time.getHours()) + ':' + zeroPad(time.getMinutes());
}

class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.assert(this.props.current !== undefined && this.props.forecast !== undefined);
    
    const info = this.props.current;
    const sunset = new Date(info.data.sys.sunset * 1000);
    const sunrise = new Date(info.data.sys.sunrise * 1000);
    
    return (
      <div className={`weather-card weather-card-${info.data.weather[0].main.toLowerCase()}`}>
        <h1>{info.city} ({info.country})</h1>
        <div className='weather-info-container'>
          <div className='temp'>
            <span className='label'>Temp:</span>{' '}
            <span className='value'>{info.data.main.temp}</span>
            <span className='unit'>°C</span>
          </div>
          <div className='min'>
            <span className='label'>Min:</span>{' '}
            <span className='value'>{info.data.main.temp_min}</span>
            <span className='unit'>°C</span>
          </div>
          <div className='max'>
            <span className='label'>Max:</span>{' '}
            <span className='value'>{info.data.main.temp_max}</span>
            <span className='unit'>°C</span>
          </div>
          <div className='wind'>
            <span className='label'>Viento:</span>{' '}
            <span className='value'>{info.data.wind.speed}</span>{' '}
            <span className='unit'>m/s</span>
          </div>
          <div className='pressure'>
            <span className='label'>Presión:</span>{' '}
            <span className='value'>{info.data.main.pressure / 1000}</span>{' '}
            <span className='unit'>mbar</span>
          </div>
          <div className='humidity'>
            <span className='label'>Humedad:</span>{' '}
            <span className='value'>{info.data.main.humidity}</span>
            <span className='unit'>%</span>
          </div>
          <div className='sunrise'>
            <span className='label'>Salida del sol:</span>{' '}
            <span className='value'>{getHHMMFromTime(sunrise)}</span>
          </div>
          <div className='sunset'>
            <span className='label'>Puesta del sol:</span>{' '}
            <span className='value'>{getHHMMFromTime(sunset)}</span>
          </div>
        </div>
        <div className='description'>
          {capitalizar(info.data.weather[0].description)}
        </div>
      </div>
    );
  }
}

export default WeatherCard;

