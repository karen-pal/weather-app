import React from "react";
import PropTypes from "prop-types";

class DaySelector extends React.Component {
  constructor(props) {
    super(props);
    const { onSelect } = this.props;

    this.buttonHandler = n => event => {
      onSelect(n);
    };

    this.getDayName = n => "Dom,Lun,Mar,Mie,Jue,Vie,Sab".split(",")[n];
  }

  render() {
    const dayButtons = [];
    const { selectedDay, dailyForecast } = this.props;
    const now = new Date();
    const today = now.getDay();

    for (let i = 0; i < 5; i += 1) {
      const day = (today + i) % 7;

      dayButtons.push(
        <button
          onClick={this.buttonHandler(i)}
          key={i}
          className={
            (i === selectedDay ? "selected " : "") +
            "day-" +
            dailyForecast[i].descr.toLowerCase()
          }
        >
          {this.getDayName(day)}
          <br />
          {Math.round(dailyForecast[i].min)} /{" "}
          {Math.round(dailyForecast[i].max)}{" "}
          <span className="unit">°C</span>
        </button>
      );
    }

    return <div className="day-selector">{dayButtons}</div>;
  }
}
DaySelector.defaultProps = {
  selectedDay: 0,
  onSelect: () => 0,
  dailyForecast: []
};
DaySelector.propTypes = {
  selectedDay: PropTypes.number,
  onSelect: PropTypes.func,
  dailyForecast: PropTypes.instanceOf(Array)
};

export default DaySelector;
