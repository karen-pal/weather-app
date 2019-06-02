import React from "react";
import axios from "axios";
           //<SearchBar />
           //<Current />
           //<Forecast />

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { cityNamesInputs: '' };
		axios.get('/city.list.json').then(response => {
			//let start = Date.now();
			let options = "";
			let currentOption = "";
			for (const { name, country } of response.data) {
				currentOption = `${name}, ${country}`;
				options = options + "<option value='"+currentOption+"'>";
			}

				if (this.refs.datalist) {
					this.refs.datalist.innerHTML= options;
				} else {
					// COMPLETAR: Cuando datalist es undefined no se hace nada!
				}
				//alert((Date.now() - start) / 1000);
		});
	}

	render() {
	  return (
	  	<form className="search-bar" onSubmit={event => {
	  			event.preventDefault();
	  			this.props.onSubmit(this.refs.input.value)
	  		}}>
			  <input type="text" ref="input" list="city-names" defaultValue={this.props.value || ''} />
			  <input type="submit" value="Buscar" />
				<datalist id="city-names" ref="datalist"></datalist>
	    </form>
	  );
	}

}

export default SearchBar;
