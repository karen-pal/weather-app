import React from "react";
import axios from "axios";
           //<SearchBar />
           //<Current />
           //<Forecast />

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { cityNamesInputs: '' };
		/*axios.get('/city.list.json').then(response => {
			for (const { name, country } of response.data) {
				const option = document.createElement('option');
				option.value = `${name}, ${country}`;
				this.refs.datalist.appendChild(option);
			}
		});*/
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
