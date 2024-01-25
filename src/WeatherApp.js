import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css";
function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const Weathercard = ({ title, data }) => {
    return (
      <div className="weather-card">
        <h3>{title}</h3>
        <p>{data}</p>
      </div>
    );
  };
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: "236233e528fc4f228e2164243242401",
            q: city,
          },
        }
      );
      console.log(response.data); // Log the entire response
      setWeatherData(response.data);
    } catch (error) {
      alert("Failed to fetch weather data");
      console.error("Failed to fetch weather data:", error);
      setError("Failed to fetch weather data");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="searchBar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter City and Search"
      />
      <button onClick={fetchData}>Search</button>
      </div>
      <div className="weather-display">
        {loading && <p>Loading data...</p>}
        {error && <p>{error}</p>}
        {!loading && weatherData && (
          <div className="weather-cards">
            <Weathercard
              title="Temperature:"
              data={`${weatherData.current.temp_c}°C`}
            />
            <Weathercard
              title="Humidity:"
              data={`${weatherData.current.humidity}%`}
            />
            <Weathercard
              title="Condition:"
              data={`${weatherData.current.condition.text}`}
            />
            <Weathercard
              title="Speed:"
              data={`${weatherData.current.wind_kph} kph`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;