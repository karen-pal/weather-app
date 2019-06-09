import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import WeatherCard from "./WeatherCard.jsx";
import DaySelector from "./DaySelector.jsx";
import HourSelector from "./HourSelector.jsx";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading_current: false,
      loading_forecast: false,
      selected_day: 0,
      selected_hour: 0,
      dailyForecast: []
    };

    this.lastCityCode = undefined;
    this.appId = "450a05a5d3129eb605e57f58998e484d";
  }

  componentDidMount() {
    this.updateCity();
  }

  componentDidUpdate() {
    this.updateCity();
  }

  updateCity() {
    const { lastCityCode } = this;
    const { cityCode } = this.props;
    if (lastCityCode !== cityCode) {
      this.lastCityCode = cityCode;
      this.setState({ loading_current: true, loading_forecast: true });
      const city = cityCode.replace(/,.*$/, "").trim();
      const country = cityCode
        .replace(/^.*,/, "")
        .toUpperCase()
        .trim();
      const apiUrl = `https://api.openweathermap.org/data/2.5/`;
      const params = `?q=${city},${country}&appid=${this.appId}&units=metric&lang=es`;

      // Petición para Current
      Promise.all([
        axios.get(`${apiUrl}weather${params}`),
        axios.get(`${apiUrl}forecast${params}`)
      ])
        .then(([weatherResponse, forecastResponse]) => {
          const dailyForecast = this.getDailyForecast(forecastResponse.data);

          this.setState({
            city,
            country,
            current: weatherResponse.data,
            loading_current: false,
            forecast: forecastResponse.data,
            loading_forecast: false,
            dailyForecast
          });
        })

        .catch(err => {
          console.assert(err.message === "Request failed with status code 404");
          console.log(err);
          alert("Locación inválida 😿 ");
          alert("No hay pronóstico disponible 😿 ");
        });
    }
  }

  //Calculamos los máximos y mínimos de cada día
  getDailyForecast(forecast) {
    const dailyForecast = [
      { min: Infinity, max: -Infinity, descr: "Clear" },
      { min: Infinity, max: -Infinity, descr: "Clear" },
      { min: Infinity, max: -Infinity, descr: "Clear" },
      { min: Infinity, max: -Infinity, descr: "Clear" },
      { min: Infinity, max: -Infinity, descr: "Clear" },
      { min: Infinity, max: -Infinity, descr: "Clear" }
    ];

    const now = new Date();
    const today = now.getDay();

    for (let item of forecast.list) {
      const then = new Date(item.dt * 1000);
      const day = (then.getDay() - today + 7) % 7;

      dailyForecast[day].min = Math.min(dailyForecast[day].min, item.main.temp);
      dailyForecast[day].max = Math.max(dailyForecast[day].max, item.main.temp);

      // Decidimos tomar la descripción del clima de las 15:00 como representativa.
      if (then.getHours() === 15) {
        dailyForecast[day].descr = item.weather[0].main;
      } else if (!dailyForecast[day].descr) {
        dailyForecast[day].descr = item.weather[0].main;
      }
    }

    return dailyForecast;
  }

  render() {
    if (this.state.loading_current || this.state.loading_forecast) {
      return (
        <div className="weather-container weather-container-loading">
          [Inserte imágen de carga]
        </div>
      );
    }

    if (!this.state.current || !this.state.forecast) {
      return <div className="weather-container weather-container-empty"></div>;
    }

    return (
      <div className="weather-container weather-container-loaded">
        <HourSelector
          selectedDay={this.state.selected_day}
          selectedHour={this.state.selected_hour}
          onChange={n => this.setState({ selected_hour: n })}
        />
        <WeatherCard
          selectedDay={this.state.selected_day}
          selectedHour={this.state.selected_hour}
          city={this.state.city}
          country={this.state.country}
          current={this.state.current}
          forecast={this.state.forecast}
          dailyForecast={this.state.dailyForecast}
        />
        <DaySelector
          forecast={this.state.forecast}
          selectedDay={this.state.selected_day}
          onSelect={n => {
            this.setState({
              selected_day: n,
              selected_hour: n === 0 ? 0 : this.state.selected_hour
            });
          }}
          dailyForecast={this.state.dailyForecast}
        />
      </div>
    );
  }
}
Weather.defaultProps = {
  cityCode: "Córdoba,ES",
  lastCityCode: "Córdoba,ES"
};
Weather.propTypes = {
  cityCode: PropTypes.string,
  lastCityCode: PropTypes.string
};

export default Weather;
