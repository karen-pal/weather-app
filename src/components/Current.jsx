import React from "react";
import axios from "axios";

class Current extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.info !== undefined) {
      const info = this.props.info;
      // Esto borra todos los espacios blancos de cityCode.
      const cityCode = info.cityCode.replace(/\s+/g, '');
      const city = cityCode.replace(/,.*$/, '');
      const country = cityCode.replace(/^.*,/, '').toUpperCase();

      return (
        <div className='current'>
          <h1>{city} ({country})</h1>
          <div>
            Temperatura: {(info.weather.temp - 273.15).toFixed(2)} °C <br />
            Presión: {info.weather.pressure / 1000} mbar <br />
            Humedad: {info.weather.humidity} %
          </div>
        </div>
      );
    }
    return <div className='current'>Ingresá el código de una ciudad.</div>;
  }
}

export default Current;

