import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css";
function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
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
    <div>
      <div className="weather-card">
        <h1>Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City and Search"
        />
        <button onClick={fetchData}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <h2>Temperature:</h2>
          <p>{weatherData.current.temp_c}°C</p>
          <h2>Humidity:</h2>
          <p> {weatherData.current.humidity}%</p>
          <h2>Condition:</h2>
          <p> {weatherData.current.condition.text}</p>
          <h2>Wind Speed: </h2>
          <p>{weatherData.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
