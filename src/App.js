import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [cityNameHandeler, setCityNameHandeler] = useState("");
  const [cityData, setCityData] = useState();

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameHandeler}&units=metric&appid=4b923446b3b4b6a8d90a9575e2dfa3b2`;

  const setWeather = (e) => {
    e.preventDefault();
    axios.get(URL).then((response) => setCityData(response.data));
    setCityNameHandeler("");
  };

  return (
    <div className="app">
      <form className="search" onSubmit={setWeather}>
        <input
          className="search__input"
          type="text"
          placeholder="Search city name..."
          value={cityNameHandeler}
          onChange={(e) => setCityNameHandeler(e.target.value)}
        ></input>
        <button className="search__btn" type="submit">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
          </svg>
        </button>
      </form>
      
      {cityData ? (
        <div className="weather">
          <h3 className="city">Weather in {cityData.name} </h3>
          <div className="temp-img">
            <h3 className="temp">{Math.floor(cityData.main?.temp)} °C</h3>
            <img
              src={` https://openweathermap.org/img/wn/${cityData.weather?.[0].icon}.png`}
              className="icon"
            ></img>
          </div>
          <div className="weather-info">
            <div className="desc">{cityData.weather?.[0].description}</div>
            <div className="humidity">Humidity: {cityData.main?.humidity}%</div>
            <div className="speed">
              Wind speed: {Math.floor(cityData.wind?.speed)} km/h
            </div>
          </div>
        </div>
      ) : (
        "Enter a city name"
      )}
    </div>
  );
}
