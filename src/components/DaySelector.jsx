import React from "react";

class WeatherSelector extends React.Component {
  constructor(props) {
    super(props);
    
    this.buttonHandler = n => event => {
      this.props.onSelect(n);
    };
    
    this.getDayName = n => 'Dom,Lun,Mar,Mie,Jue,Vie,Sab'.split(',')[n];
  }

  render() {
    const dayButtons = [];
    const selected = this.props.selected_day;
    const now = new Date();
    const today = now.getDay();
    
    for (let i = 0; i < 5; i++) {
      const day = (today + i) % 7;
      
      dayButtons.push(
        <button
          onClick={this.buttonHandler(i)}
          key={i}
          className={
            (i === selected ? 'selected ' : '') +
            'day-' + this.props.dailyForecast[selected].descr.toLowerCase()
          }
        >
          {this.getDayName(day)}<br />
          {this.props.dailyForecast[selected].min}/
          {this.props.dailyForecast[selected].max}°C
        </button>
      );
    }
    
    return (
      <div className="day-selector">
        {dayButtons}
      </div>
    );
  }
}

export default WeatherSelector;
