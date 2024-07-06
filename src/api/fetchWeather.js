import axios from 'axios';

const URL = 'http://api.weatherapi.com/v1/current.json';
const API_KEY = process.env.REACT_APP_API_KEY; // Use environment variable for API key

export const fetchWeather = async (cityName) => {
  const { data } = await axios.get(URL, {
    params: {
      q: cityName,
      key: API_KEY,
    },
  });

  return data;
};
