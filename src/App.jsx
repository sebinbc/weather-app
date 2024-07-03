import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");

  const fetchData = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(cityName);
      setWeatherData(data);
      setCityName("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name..."
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyDown={fetchData}
      />
      {weatherData && (
        <div>
          <h2>
            {weatherData.location.name}, {weatherData.location.region},{" "}
            {weatherData.location.country}
          </h2>
          <p> {weatherData.current.temp_c} °C</p>
        </div>
      )}
    </div>
  );
};

export default App;
