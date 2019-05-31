import React from "react";
import axios from "axios";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, info: undefined };

    this.cityCode = undefined;
    this.appId = "450a05a5d3129eb605e57f58998e484d";
  }

  componentDidMount() {
    this.updateCity();
  }

  componentDidUpdate() {
    this.updateCity();
  }

  updateCity() {
    if (this.cityCode !== this.props.cityCode) {
      this.cityCode = this.props.cityCode;
      this.setState({ loading: true });

      const cityCode = this.cityCode.replace(/\s+/g, ''); // TEMPORAL.

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityCode}&appid=${this.appId}`)
      .then(response => {
        this.setState({ info: response.data.main, loading: false });
        console.log(response.data.main);
      })
      .catch(err => {
        console.assert(err.message === "Request failed with status code 404");
        console.log(err);
      });
      console.log('cityCode now is', this.props.cityCode);
    }
  }

  render() {
    if (this.state.loading) {
      return <div className="loading">Cargando...</div>
    }
    if (this.state.info !== undefined) {
      const info = this.state.info;
      // Esto borra todos los espacios blancos de cityCode.
      const cityCode = this.cityCode.replace(/\s+/g, '');
      const city = cityCode.replace(/,.*$/, '');
      const country = cityCode.replace(/^.*,/, '').toUpperCase();

      return (
        <div className="weather-content">
          <h1>{city} ({country})</h1>
          <div>
            Temperatura: {(info.temp - 273.15).toFixed(2)} °C <br />
            Presión: {info.pressure / 1000} mbar <br />
            Humedad: {info.humidity} %
          </div>
        </div>
      );
    }

    return (
      <div className="weather-content">
      Ingresa el nombre de una ciudad para ver el pronóstico.
      </div>
    );
  }
}

export default Weather
