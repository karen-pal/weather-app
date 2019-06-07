import React from "react";
import SearchBar from "./SearchBar.jsx";
import Weather from "./Weather.jsx";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cityCode: localStorage.getItem("cityCode") || undefined };
  }

  render() {
    const { cityCode } = this.state;
    return (
      <div className="body">
        El tiempo...
        <SearchBar
          value={cityCode}
          onSubmit={value => {
            localStorage.setItem("cityCode", value);
            this.setState({ cityCode: value });
          }}
        />
        <Weather ref="weather" cityCode={this.state.cityCode} />
      </div>
    );
  }
}

export default Body;
