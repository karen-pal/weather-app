import React from "react";
import Current from "./Current.jsx";
import Forecast from "./Forecast.jsx";
import axios from "axios";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, info: undefined };

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
      this.setState({ loading: true });

      const cityCode = this.props.cityCode.replace(/\s+/g, ''); // TEMPORAL.



      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityCode}&appid=${this.appId}`)
      .then(response => {
        this.setState({
          info: {
            cityCode,
            weather: response.data.main
          }, loading: false });
      })
      .catch(err => {
        console.assert(err.message === "Request failed with status code 404");
        console.log(err);
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <div className='weather'>Cargando...</div>;
    }

    return (
      <div className='weather'>
        <Current info={this.state.info} />
        <Forecast info={this.state.info} />
      </div>
    );
  }
}

export default Weather
