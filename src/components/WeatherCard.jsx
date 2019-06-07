import React from "react";
import axios from "axios";
import WeatherAttributes from "./WeatherAttributes.jsx"
function zeroPad(n) {
  return n < 10 ? "0" + n : String(n);
}

function capitalizar(string) {
  return string[0].toUpperCase() + string.substring(1);
}

function getHHMMFromTime(time) {
  return zeroPad(time.getHours()) + ":" + zeroPad(time.getMinutes());
}

class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let info;

    const { selected_day, selected_hour } = this.props;

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

      if (info === undefined) {
        console.error({
          forecast,
          selected_day,
          selected_hour,
          message: "No hay info para el dia y la hora actual."
        });
        return (
          <div className="weather-card error">
            <h1>Ups!</h1>
            <p>
              No hay información de clima para el día y la hora seleccionados.{" "}
              Intentalo nuevamente.
            </p>
          </div>
        );
      }
    }

    const dayInfo = this.props.dailyForecast[this.props.selected_day];

    let sunset = "",
      sunrise = "";

    if (info.sys.sunset !== undefined) {
      const sunset_time = new Date(info.sys.sunset * 1000);
      sunset = (
        <WeatherAttributes 
          label="Puesta del sol" 
          value={getHHMMFromTime(sunset_time)} 
          unit="hs"
        />
      );
    }

    if (info.sys.sunrise !== undefined) {
      const sunrise_time = new Date(info.sys.sunrise * 1000);
      sunrise = (
        <WeatherAttributes 
          label="Salida del sol" 
          value={getHHMMFromTime(sunrise_time)} 
          unit="hs"
        />
      );
    }

    return (
      <div
        className={`weather-card weather-card-${info.weather[0].main.toLowerCase()}`}
      >
        <h1>
          {this.props.city} ({this.props.country})
        </h1>
        <div className="weather-info-container">
          <WeatherAttributes 
            label="Temp:" 
            value={info.main.temp} 
            unit="°C"
          />
          <WeatherAttributes 
            label="Min:" 
            value={dayInfo.min} 
            unit="°C"
          />
          <WeatherAttributes 
            label="Max:" 
            value={dayInfo.max} 
            unit="°C"
          />
          <WeatherAttributes 
            label="Viento:" 
            value={info.wind.speed} 
            unit="m/s"
          />
          <WeatherAttributes 
            label="Presión:" 
            value={(info.main.pressure / 1000).toFixed(3)} 
            unit="mbar"
          />
          <WeatherAttributes 
            label="Humedad:" 
            value={info.main.humidity} 
            unit="%"
          />
          {sunrise}
          {sunset}
        </div>
        <div className="description">
          {capitalizar(info.weather[0].description)}
        </div>
      </div>
    );
  }
}

export default WeatherCard;
