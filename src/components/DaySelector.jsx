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
    const this_day = now.getDay();
    
    for (let i = 0; i < 7; i++) {
      const day = (this_day + i) % 7;
      
      dayButtons.push(
        <button
          onClick={this.buttonHandler(i)}
          key={i}
          className={i === selected ? 'selected' : ''}
        >
          {this.getDayName(day)}
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
