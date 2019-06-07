import React from "react";

function WeatherAttributes({ label, value, unit }) {
  return (
  	<div className={label.toLowerCase().replace(/ /g, "-")}>
		  <span className="label">{label}</span>{" "}
		  <span className="value">{value}</span>
		  <span className="unit">{unit}</span>
		</div>
  );
}

export default WeatherAttributes;
