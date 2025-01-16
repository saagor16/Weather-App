import axios from "axios";
import React, { useState, useEffect } from "react";
import iso from "iso-3166-1"; // Import the package
import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiThermometerExterior,
  WiCloud,
} from "react-icons/wi";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  // Function to get the current date and time
  const updateTime = () => {
    const now = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const date = now.toLocaleDateString("en-US", options);
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setCurrentTime(`${date} | ${time}`);
  };

  // Update time on mount and every minute
  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    setError(null);
    setWeather(null);
    if (!city.trim()) {
      setError("Please enter a city.");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cce5efc77662d2d6967a182acc7afe15`
      );
      setWeather(response.data);
    } catch (error) {
      setError("City not found. Please try again.");
      console.error("Error fetching weather data:", error);
    }
  };

  const getCountryName = (code) => {
    const country = iso.whereAlpha2(code); // Get full country name from code
    return country ? country.country : code;
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-900 p-4 sm:p-8 md:p-12">
      <h1 className="text-4xl font-bold mt-8 text-center">Weather App</h1>

      {/* Date and time centered in the middle for mobile */}
      <div className="flex items-center justify-center w-full mt-2 sm:mt-4">
        <p className="text-gray-500">{currentTime}</p> {/* Display date and time */}
      </div>

      <div className="flex flex-col items-center gap-4 mt-10">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={handleCityChange}
          className="border rounded-md p-2 w-full sm:w-64 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 shadow-md w-full sm:w-auto"
        >
          Get Weather
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {weather && (
        <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-lg max-w-full sm:max-w-md text-center mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800">
            <WiDaySunny className="inline text-yellow-500" /> {weather.name},{" "}
            {getCountryName(weather.sys.country)} {/* Convert country code to full name */}
          </h2>
          <div className="mt-4 text-gray-600 text-lg space-y-2">
            <p>
              <WiThermometerExterior className="inline text-blue-500" />{" "}
              Temperature: {weather.main.temp}°C
            </p>
            <p>
              <WiThermometerExterior className="inline text-red-500" /> Feels
              Like: {weather.main.feels_like}°C
            </p>
            <p>
              <WiHumidity className="inline text-green-500" /> Humidity:{" "}
              {weather.main.humidity}%
            </p>
            <p>
              <WiCloud className="inline text-gray-500" /> Condition:{" "}
              {weather.weather[0].description}
            </p>
            <p>
              <WiStrongWind className="inline text-indigo-500" /> Wind Speed:{" "}
              {weather.wind.speed} m/s
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
