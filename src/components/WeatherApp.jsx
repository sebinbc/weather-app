import React, { useState } from 'react';
import { fetchWeather } from '../api/fetchWeather';
import { useUnit } from '../context/UnitContext';

const WeatherApp = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const { unit, setUnit } = useUnit();

    const handleFetchWeather = async (cityName) => {
        setLoading(true);
        try {
            console.log(`Fetching weather for ${cityName} with unit ${unit}`);
            const data = await fetchWeather(cityName);
            console.log('API response:', data);
            setWeather(data);
            setRecentSearches([cityName, ...recentSearches.filter((c) => c !== cityName)]);
        } catch (error) {
            console.error('API request error:', error);
        }
        setLoading(false);
    };

    const handleSearch = () => {
        if (city) {
            handleFetchWeather(city);
        }
    };

    const toggleUnit = () => {
        setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    };

    return (
        <div>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={toggleUnit}>
                Toggle Unit ({unit === 'metric' ? 'Celsius' : 'Fahrenheit'})
            </button>
            {loading && <p className="loading">Loading...</p>}
            {weather && (
                <div className="weather-info">
                    <p>City: {weather.location.name}</p>
                    <p>Temperature: {unit === 'metric' ? weather.current.temp_c : weather.current.temp_f}° {unit === 'metric' ? 'C' : 'F'}</p>
                    {/* Display other weather data */}
                </div>
            )}
            <div className="recent-searches">
                <h3>Recent Searches</h3>
                <ul>
                    {recentSearches.map((search, index) => (
                        <li key={index} onClick={() => handleFetchWeather(search)}>
                            {search}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WeatherApp;
