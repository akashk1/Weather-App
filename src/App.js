import Cards from "./components/Cards/Cards";
import Search from "./components/Search/Search";
import React, { useState } from "react";
import classes from "./App.module.css";
const App = (props) => {
  const [location, setLocation] = useState("Kanpur");
  let cards = null;
  const getLocationData = (locationData) => {
    if (locationData.length === 0) setLocation("Kanpur");
    else setLocation(locationData);
    cards = <Cards location={locationData}>{props.children}</Cards>;
  };

  if (location.length !== 0) {
    cards = <Cards location={location}>{props.children}</Cards>;
  }
  return (
    <div className={classes.App}>
      <Search getLocation={getLocationData} />
      <div>{cards}</div>
    </div>
  );
};

export default App;
