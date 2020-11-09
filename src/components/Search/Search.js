import React, { useState } from "react";
import axios from "axios";
import classes from "./Search.module.css";
const Search = (props) => {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const onSubmit = () => {
    props.getLocation(location);
  };

  const autoComplete = (event) => {
    setLocation(event.target.value);
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };

    const url = `https://api.weatherapi.com/v1/search.json?key=79c671e674f44ff6823173038200610&q=${event.target.value}`;
    axios
      .get(url, { headers: headers })
      .then((jsonData) => setSuggestions(jsonData.data))
      .catch((err) => console.log(err));
  };
  let suggestionOptions = suggestions.map((data) => {
    return <option key={data.id} value={data.name}></option>;
  });
  const btn = [classes.btn].join(" ");
  return (
    <div className={classes.container}>
      <div className={classes.Search}>
        <input
          className={classes.input}
          autoComplete="off"
          list="suggestions"
          value={location}
          type="text"
          onChange={(event) => {
            autoComplete(event);
          }}
          onSubmit={onSubmit}
        />
        <datalist className={classes.datalist} id="suggestions">
          {suggestionOptions}
        </datalist>
      </div>
      <div>
        <button className={btn} type="submit" onClick={onSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};
export default Search;
