import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({
    current: {
      temperature: 0,
      weather_icons: [''],
      wind_speed: 0,
      wind_dir: '',
    },
  });

  useEffect(() => {
    console.log('effect');
    const api_key = process.env.REACT_APP_API_KEY;
    const city = capital;

    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
      .then((res) => {
        setWeather(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [capital]);

  const { temperature, weather_icons, wind_speed, wind_dir } = weather.current;
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>temperature: {temperature} Celsius</div>
      <div>
        <img src={weather_icons[0]} alt={''} />
      </div>
      <div>
        wind: {wind_speed} kmph direction {wind_dir}
      </div>
    </div>
  );
};

export default Weather;
