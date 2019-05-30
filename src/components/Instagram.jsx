import React from "react";

class Instagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {image_src: undefined, user: props.user};

    fetch(`https://www.instagram.com/${props.user}/?__a=1`)
      .then(response => response.json())
      .then(json => {
        // Elegimos una imagen al azar entre las últimas.
        
        // posts es un arreglo con las 12 últimas imágenes del perfil.
        let posts = json.graphql.user.edge_owner_to_timeline_media.edges;
        let post = posts[Math.floor(Math.random() * posts.length)].node;
        
        //console.log(post);
        
        let caption = post.edge_media_to_caption.edges.length > 0 ?
                      post.edge_media_to_caption.edges[0].node.text :
                      ''; // WTF
        
        this.setState({
          // En thumbnail_resources hay versiones de la imágen en diferentes
          // tamaños. Elegimos la de 320 * 320 píxeles.
          image_code: post.shortcode,
          image_src: post.thumbnail_resources[2].src,
          image_alt: post.accessibility_caption,
          image_caption: caption
        });
      })
      .catch(err => {
        // En este caso preferimos fallar silenciosamente,
        // ya que es un componente puramente estético.
        this.setState({error: true});
        console.error(err);
      });
  }

  render() {
    if (this.state.error) {
      // Igual queremos el contenedor vacío,
      // para que ocupe el espacio y no rompa el diseño de la página.
      return (<div className='instagram-image instagram-image-error'></div>);
    }
    if (this.state.image_src !== undefined) {
      return (
        <figure className='instagram-image'>
          <a href={`https://www.instagram.com/p/${this.state.image_code}`}>
            <img src={this.state.image_src} alt={this.state.image_alt} />
          </a>
          <figcaption>
            <a href={`https://www.instagram.com/${this.state.user}/`}>@{this.state.user}</a>{" "}
            {this.state.image_caption}
          </figcaption>
        </figure>
      );
    }
    return (<div className='instagram-image'>Cargando...</div>);
  }
}

export default Instagram;
