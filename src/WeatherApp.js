import React, { useState } from 'react';
import axios from 'axios';
import "./WeatherApp.css";
function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: '236233e528fc4f228e2164243242401',
          q: city
        }
      });
      console.log(response.data); 
      setWeatherData(response.data);
    } catch (error) {
      alert('Failed to fetch weather data');
    }
    setLoading(false);
  };

  return (
    <div>
       <div className='container'> 
      <h1>Weather App</h1>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter City and Search'/>
      <button onClick={fetchData}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <h2>Temperature: {weatherData.current.temp_c}°C</h2>
          <h2>Humidity: {weatherData.current.humidity}%</h2>
          <h2>Condition: {weatherData.current.condition.text}</h2>
          <h2>Wind Speed: {weatherData.current.wind_kph} kph</h2>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;