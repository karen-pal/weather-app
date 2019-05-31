import React from "react";
import Instagram from "./Instagram.jsx"
import SearchBar from "./SearchBar.jsx"
           //<SearchBar />
           //<Current />
           //<Forecast />

function Body() {
  return <article>
           El tiempo...
           <SearchBar />
           <Instagram user="kardaver" />
         </article>;
}

export default Body;
