import React from "react";

function WeatherAttributes({ label, value, unit }) {
  return (
  	<div>
	  <span className="label">{label}</span>{" "}
	  <span className="value">{value}</span>
	  <span className="unit">{unit}</span>
	</div>
  );
}

export default WeatherAttributes;
