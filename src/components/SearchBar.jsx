import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  // realizamos el pedido aquí ya que necesitamos
  // asegurarnos que el <datalist> ya esté creado
  componentDidMount() {
    axios.get("/city.list.json").then(response => {
      let options = "";
      for (const { name, country } of response.data) {
        options += `<option value='${name}, ${country}'>`;
      }

      this.refs.datalist.innerHTML = options;
    });
  }

  render() {
    const { onSubmit, value } = this.props;
    return (
      <form
        className="search-bar"
        onSubmit={event => {
          event.preventDefault();
          onSubmit(this.refs.input.value);
        }}
      >
        <label htmlFor="buscar-ciudad">Buscar ciudad:</label>
        <br />
        <input
          id="buscar-ciudad"
          type="search"
          ref="input"
          list="city-names"
          defaultValue={value || ""}
        />
        <br />
        <input type="submit" value="Buscar" />
        <datalist id="city-names" ref="datalist"></datalist>
      </form>
    );
  }
}
SearchBar.defaultProps = {
  onSubmit: () => 0,
  value: ""
};
SearchBar.propTypes = {
  onSubmit: PropTypes.func,
  value: PropTypes.string
};

export default SearchBar;
