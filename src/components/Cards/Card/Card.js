import classes from "./Card.module.css";
import axios from "axios";
import data from "../../../InitialData";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const Card = (props) => {
  const [optionValue, setOptionValue] = useState("temp_c");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [forecastData, setForecastData] = useState(data);
  const [weatherData, setWeatherData] = useState({});
  const op = {
    humidity: "Humidity",
    temp_c: "Temperature (C)",
    wind_kph: "Wind Speed (kph)",
  };
  const weatherOptionHandler = () => {
    let select = document.getElementById("select2");
    const value = select.options[select.selectedIndex].value;
    setOptionValue(value);
    const weather =
      forecastData.forecast.forecastday[select.selectedIndex].hour;
    let time = [];
    let Data = [];
    weather.forEach((data) => {
      time.push(data.time.substring(11));

      Data.push(data[value]);
    });
    let weatherData = {
      labels: time,

      datasets: [
        {
          label: `${op[value]} of ${forecastData.location.name}`,

          data: Data,
          backgroundColor: "#6dc5db",
        },
      ],
    };
    setWeatherData(weatherData);
  };
  const optionHandler = () => {
    let select = document.getElementById("select1");
    const weather =
      forecastData.forecast.forecastday[select.selectedIndex].hour;
    setSelectedIndex(select.selectedIndex);
    let time = [];
    let temperature = [];
    weather.forEach((data) => {
      time.push(data.time.substring(11));

      temperature.push(data[optionValue]);
    });
    let weatherData = {
      labels: time,

      datasets: [
        {
          label: `${op[optionValue]} of ${forecastData.location.name}`,

          data: temperature,
          backgroundColor: "#6dc5db",
        },
      ],
    };
    setWeatherData(weatherData);
  };
  useEffect(() => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=79c671e674f44ff6823173038200610&q=${props.location}&days=3`;
    axios
      .get(url)
      .then((jsonData) => {
        setForecastData(jsonData.data);
        const weather = jsonData.data.forecast.forecastday[selectedIndex].hour;
        let time = [];

        let temperature = [];

        weather.forEach((data) => {
          time.push(data.time.substring(11));

          temperature.push(data.temp_c);
        });
        let weatherData = {
          labels: time,

          datasets: [
            {
              label: `${op[optionValue]} of ${jsonData.data.location.name}`,

              data: temperature,
              backgroundColor: "#6dc5db",
            },
          ],
        };
        setWeatherData(weatherData);
      })

      .catch((err) => console.log(err));
  }, [props.location]);
  return (
    <React.Fragment>
      <div className={classes.Card}>
        <p>
          <strong>Location</strong>:- {forecastData.location.name}
        </p>
        <p>
          <strong>Region</strong>:-
          {forecastData.location.region.indexOf(",") === -1
            ? forecastData.location.region
            : forecastData.location.region.substring(
                0,
                forecastData.location.region.indexOf(",")
              )}
        </p>
        <p>
          <strong>Country</strong>:- {forecastData.location.country}
        </p>
        <p>
          <strong>Temperature(C)</strong>:- {forecastData.current.feelslike_c}{" "}
          &#8451;
        </p>
        <div className={classes.col2}>
          <p>
            <strong>Cloud</strong>:- {forecastData.current.cloud}{" "}
          </p>
          <p>
            <strong>Humidity</strong>:- {forecastData.current.humidity}{" "}
          </p>

          <p>
            <strong>Precipitation(in inch)</strong>:-
            {forecastData.current.precip_in}
          </p>
          <p>
            <strong>Wind Direction</strong>:-
            {forecastData.current.wind_dir}
          </p>
        </div>
        <p>
          <strong>Wind Speed</strong>:- {forecastData.current.wind_kph} km/hr
        </p>
        <p>
          <strong>Weather Condition</strong>:-
          {forecastData.current.condition.text}
        </p>
        <p>
          <strong>Latitude</strong>:- {forecastData.location.lat}
        </p>
        <p>
          <strong>Longitude</strong>:- {forecastData.location.lon}
        </p>

        <img
          className={classes.imageCenter}
          src={forecastData.current.condition.icon}
        />
      </div>
      <div className={classes.selectOption}>
        <select id="select1" onChange={optionHandler}>
          {forecastData.forecast.forecastday.map((data, index) => {
            return (
              <option key={index} value={index}>
                {data.date}
              </option>
            );
          })}
        </select>
      </div>
      <div className={classes.selectOption}>
        <select id="select2" onChange={weatherOptionHandler}>
          <option value="temp_c">Temperature</option>
          <option value="wind_kph">Wind Speed</option>
          <option value="humidity">Humidity</option>
        </select>
      </div>
      <div className={classes.chart}>
        <Bar data={weatherData} options={{ maintainAspectRatio: false }}></Bar>
      </div>
    </React.Fragment>
  );
};
export default Card;
