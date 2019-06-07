import React from "react";
import PropTypes from "prop-types";

function zeroPad(n) {
  return n < 10 ? `0${n}` : String(n);
}

class HourSelector extends React.Component {
  constructor(props) {
    super(props);
    this.buttonHandler = hour => _ => {
      const { onChange } = this.props;
      onChange(hour);
    };
  }

  render() {
    const { selectedDay, selectedHour } = this.props;
    const now = new Date();
    const offset = selectedDay === 0 ? Math.ceil((now.getHours() + 1) / 3) : 0;
    // Es un error mostrar el botón de las 21:00 si son las 21:20.
    const hourButtons = [];

    for (let i = offset; i < 8; i += 1) {
      hourButtons.push(
        <button
          type="submit"
          onClick={this.buttonHandler(i)}
          key={i}
          className={selectedHour === i ? "selected" : ""}
        >
          {zeroPad(i * 3)}
          :00
        </button>
      );
    }

    if (selectedDay === 0) {
      hourButtons.unshift(
        <button
          type="submit"
          onClick={this.buttonHandler(0)}
          key={0}
          className={selectedHour === 0 ? "selected" : ""}
        >
          Ahora
        </button>
      );
    }

    return <div className="hour-selector">{hourButtons}</div>;
  }
}

HourSelector.defaultProps = {
  onChange: _ => 0,
  selectedDay: 0,
  selectedHour: 0
};
HourSelector.propTypes = {
  onChange: PropTypes.func,
  selectedDay: PropTypes.number,
  selectedHour: PropTypes.number
};
export default HourSelector;
