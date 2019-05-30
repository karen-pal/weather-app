import React from "react";

class Instagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: props.user, content: 'Cargando...'};

    fetch(`https://www.instagram.com/${this.state.user}/?__a=1`)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        // No cambia nada
        this.setState({content: "Cargado!"});
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        {this.state.content}
      </div>
    );
  }
}

export default Instagram;
