import React from "react";
import axios from "axios";

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
    return (
      <form
        className="search-bar"
        onSubmit={event => {
          event.preventDefault();
          this.props.onSubmit(this.refs.input.value);
        }}
      >
        <label htmlFor="buscar-ciudad">Buscar ciudad:</label>
        <br />
        <input
          id="buscar-ciudad"
          type="search"
          ref="input"
          list="city-names"
          defaultValue={this.props.value || ""}
        />
        <br />
        <input type="submit" value="Buscar" />
        <datalist id="city-names" ref="datalist"></datalist>
      </form>
    );
  }
}

export default SearchBar;
