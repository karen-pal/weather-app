import React from "react";
import PropTypes from "prop-types";

function WeatherAttributes({ label, value, unit }) {
  return (
    <div>
      <span className="label">{label}</span>{" "}
      <span className="value">{value}</span>
      <span className="unit">{unit}</span>
    </div>
  );
}
WeatherAttributes.defaultProps = {
  label: "",
  value: "",
  unit: ""
};
WeatherAttributes.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  unit: PropTypes.string
};

export default WeatherAttributes;
