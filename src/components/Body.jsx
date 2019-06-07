import React from "react";
import Instagram from "./Instagram.jsx";
import SearchBar from "./SearchBar.jsx";
import Weather from "./Weather.jsx";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cityCode: localStorage.getItem("cityCode") || undefined };
  }

  render() {
    return (
      <div className="body">
        El tiempo...
        <SearchBar
          value={this.state.cityCode}
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
//           <Instagram user="kardaver" />

export default Body;
