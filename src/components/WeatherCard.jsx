import React from "react";
import WeatherAttributes from "./WeatherAttributes.jsx";

function zeroPad(n) {
  return n < 10 ? "0" + n : String(n);
}

function capitalizar(string) {
  return string[0].toUpperCase() + string.substring(1);
}

function getHHMMFromTime(time) {
  return zeroPad(time.getHours()) + ":" + zeroPad(time.getMinutes());
}

function WeatherCard({ selectedDay, selectedHour, current, forecast, dailyForecast, city, country }) {
  let info;

  // Mostrar la información de AHORA
  if (selectedDay === 0 && selectedHour === 0) {
    info = current;
    // Mostrar la información de un momento FUTURO.
  } else {
    const forecastList = forecast.list;
    const now = new Date();

    for (let item of forecastList) {
      const then = new Date(item.dt * 1000);
      if (then.getDay() === (now.getDay() + selectedDay) % 7) {
        if (then.getHours() === selectedHour * 3) {
          info = item;
          break;
        }
      }
    }

    if (info === undefined) {
      console.error({
        forecast,
        selectedDay,
        selectedHour,
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

  const dayInfo = dailyForecast[selectedDay];

  let sunset = "";
  let sunrise = "";

  if (info.sys.sunset !== undefined) {
    const sunsetTime = new Date(info.sys.sunset * 1000);
    sunset = (
      <WeatherAttributes 
        label="Puesta del sol:" 
        value={getHHMMFromTime(sunsetTime)} 
        unit="hs"
      />
    );
  }

  if (info.sys.sunrise !== undefined) {
    const sunriseTime = new Date(info.sys.sunrise * 1000);
    sunrise = (
      <WeatherAttributes 
        label="Salida del sol:" 
        value={getHHMMFromTime(sunriseTime)} 
        unit="hs"
      />
    );
  }

  return (
    <div
      className={`weather-card weather-card-${info.weather[0].main.toLowerCase()}`}
    >
      <h1>
        {city} ({country})
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

export default WeatherCard;
