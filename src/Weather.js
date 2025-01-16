import axios from 'axios';
import React, { useState } from 'react';
import { BsFillCloudSunFill, BsFillMoonStarsFill } from 'react-icons/bs';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Dark mode toggle

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    setError(null);
    setWeather(null);
    if (!city.trim()) {
      setError('Please enter a city.');
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cce5efc77662d2d6967a182acc7afe15`
      );
      setWeather(response.data);
    } catch (error) {
      setError('City not found. Please try again.');
      console.error('Error fetching weather data:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="flex justify-between w-full p-4">
        <h1 className="text-3xl font-bold">Weather App</h1>
        <button
          onClick={toggleDarkMode}
          className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          {darkMode ? <BsFillCloudSunFill /> : <BsFillMoonStarsFill />}
          <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 mt-10">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={handleCityChange}
          className="border rounded-md p-2 w-64 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Get Weather
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {weather && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-gray-600 text-lg">Temperature: {weather.main.temp}°C</p>
          <p className="text-gray-600 text-lg">Feels Like: {weather.main.feels_like}°C</p>
          <p className="text-gray-600 text-lg">Humidity: {weather.main.humidity}%</p>
          <p className="text-gray-600 text-lg">Condition: {weather.weather[0].description}</p>
          <p className="text-gray-600 text-lg">Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
