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
  value: 0,
  unit: ""
};
WeatherAttributes.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string
};

export default WeatherAttributes;
