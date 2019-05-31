import React from "react";
import axios from "axios";

function zeroPad(n) {
  return n < 10 ? '0' + n : String(n);
}

function capitalizar(string) {
  return string[0].toUpperCase() + string.substring(1);
}

class Current extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.info !== undefined) {
      const info = this.props.info;
      // Esto borra todos los espacios blancos de cityCode.
      console.log(info.data);
      const sunset = new Date(info.data.sys.sunset * 1000);
      const sunrise = new Date(info.data.sys.sunrise * 1000);

      return (
        <div className='current'>
          <h1>{info.city} ({info.country})</h1>
          <div>
            Temperatura: {info.data.main.temp} °C <br />
            {capitalizar(info.data.weather[0].description)} <br />
            Presión: {info.data.main.pressure / 1000} mbar <br />
            Humedad: {info.data.main.humidity} % <br />
            Temperatura Mínima: {info.data.main.temp_min} °C <br />
            Temperatura Máxima: {info.data.main.temp_max} °C <br />
            Salida del sol: {zeroPad(sunrise.getHours())}:{zeroPad(sunrise.getMinutes())} hs <br />
            Puesta del sol: {zeroPad(sunset.getHours())}:{zeroPad(sunset.getMinutes())} hs <br />
            Viento: {info.data.wind.speed} m/s <br />

          </div>
        </div>
      );
    }
    return <div className='current'>Ingresá el código de una ciudad.</div>;
  }
}

export default Current;

