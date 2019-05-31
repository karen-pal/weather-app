import React from "react";
import Current from "./Current.jsx";
import Forecast from "./Forecast.jsx";
import axios from "axios";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading_current: false, loading_forecast: false };

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
    if (this.lastCityCode !== this.props.cityCode) {
      this.lastCityCode = this.props.cityCode;
      this.setState({ loading_current: true, loading_forecast: true });

      const cityCode = this.props.cityCode.replace(/\s+/g, '');
      const city = cityCode.replace(/,.*$/, '');
      const country = cityCode.replace(/^.*,/, '').toUpperCase();

      // Petición para Current
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${this.appId}&units=metric&lang=es`)
      .then(response => {
        this.setState({
          info_current: { city, country, data: response.data },
          loading_current: false
        });
      })
      .catch(err => {
        console.assert(err.message === "Request failed with status code 404");
        console.log(err);
      });

      // Petición para Forecast
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${this.appId}&units=metric&lang=es`)
      .then(response => {
        //console.log(response.data)
        this.setState({
          info_forecast: { city, country, data: response.data },
          loading_forecast: false
        });
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  render() {
    if (this.state.loading_current || this.state.loading_forecast) {
      return (
        <div className='weather-container weather-loading'>
          [Inserte imágen de carga]
        </div>
      );
    }

    return (
      <div className='weather-container'>
        <Current info={this.state.info_current} forecast={this.state.info_forecast} />
        <Forecast info={this.state.info_forecast} />
      </div>
    );
  }
}

export default Weather
