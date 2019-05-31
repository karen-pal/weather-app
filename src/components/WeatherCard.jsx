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
    let info;
    
    const {selected_day, selected_hour} = this.props;
    
    // Mostrar la información de AHORA
    if (selected_day === 0 && selected_hour === 0) {
      info = this.props.current;
    // Mostrar la información de un momento FUTURO.
    } else {
      const forecast = this.props.forecast.list;
      const now = new Date();
      
      for (let item of forecast) {        
        const then = new Date(item.dt * 1000);
        if (then.getDay() === (now.getDay() + selected_day) % 7) {
          if (then.getHours() === selected_hour * 3) {
            info = item;
            break;
          }
        }
      }
      console.assert(info);
    }
    
    const dayInfo = this.props.dailyForecast[this.props.selected_day];

    let sunset = '', sunrise = '';
    
    if (info.sys.sunset !== undefined) {
      const sunset_time = new Date(info.sys.sunset * 1000);
      sunset = <div className='sunset'>
        <span className='label'>Puesta del sol:</span>{' '}
        <span className='value'>{getHHMMFromTime(sunset_time)}</span>
        <span className='unit'>hs</span>
      </div>;
    }
    
    if (info.sys.sunrise !== undefined) {
      const sunrise_time = new Date(info.sys.sunrise * 1000);
      sunrise = <div className='sunrise'>
        <span className='label'>Salida del sol:</span>{' '}
        <span className='value'>{getHHMMFromTime(sunrise_time)}</span>
        <span className='unit'>hs</span>
      </div>;
    }
    
    return (
      <div className={`weather-card weather-card-${info.weather[0].main.toLowerCase()}`}>
        <h1>{this.props.city} ({this.props.country})</h1>
        <div className='weather-info-container'>
          <div className='temp'>
            <span className='label'>Temp:</span>{' '}
            <span className='value'>{info.main.temp}</span>
            <span className='unit'>°C</span>
          </div>
          <div className='min'>
            <span className='label'>Min:</span>{' '}
            <span className='value'>{dayInfo.min}</span>
            <span className='unit'>°C</span>
          </div>
          <div className='max'>
            <span className='label'>Max:</span>{' '}
            <span className='value'>{dayInfo.max}</span>
            <span className='unit'>°C</span>
          </div>
          <div className='wind'>
            <span className='label'>Viento:</span>{' '}
            <span className='value'>{info.wind.speed}</span>{' '}
            <span className='unit'>m/s</span>
          </div>
          <div className='pressure'>
            <span className='label'>Presión:</span>{' '}
            <span className='value'>{(info.main.pressure / 1000).toFixed(3)}</span>{' '}
            <span className='unit'>mbar</span>
          </div>
          <div className='humidity'>
            <span className='label'>Humedad:</span>{' '}
            <span className='value'>{info.main.humidity}</span>
            <span className='unit'>%</span>
          </div>
          {sunrise}
          {sunset}
        </div>
        <div className='description'>
          {capitalizar(info.weather[0].description)}
        </div>
      </div>
    );
  }
}

export default WeatherCard;

