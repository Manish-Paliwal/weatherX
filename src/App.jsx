import React, { useEffect, useRef, useState } from "react";
import searchIcon from "./assets/search.png";
import clearImg from "./assets/clear.png";
import windImg from "./assets/wind.png";
import humidityImg from "./assets/humidity.png";
import cloudImg from "./assets/cloud.png";
import drizzleImg from "./assets/drizzle.png";
import rainImg from "./assets/rain.png";
import snowImg from "./assets/snow.png";
import bg_clearImg from "./assets/bg_clear.jpg";
import bg_cloudImg from "./assets/bg_cloud.jpg";
import bg_rainImg from "./assets/bg_rain.jpg";
import bg_drizzleImg from "./assets/bg_drizzle.jpg";
import bg_snowImg from "./assets/bg_snow.jpg";
import bg_brokencloudImg from "./assets/bg_broken_cloud.jpg";
import axios from "axios";

export default function App() {
  let inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allIcon = {
    "01d": clearImg,
    "01n": clearImg,
    "02d": cloudImg,
    "02n": cloudImg,
    "03d": cloudImg,
    "03n": cloudImg,
    "04d": cloudImg,
    "04n": cloudImg,
    "09d": drizzleImg,
    "09n": drizzleImg,
    "10d": rainImg, 
    "10n": rainImg,
    "11d": rainImg,
    "11n": rainImg,
    "13d": snowImg,
    "13n": snowImg,
  };

  const allBGImg = {
    "01d": bg_clearImg,
    "01n": bg_clearImg,
    "02d": bg_cloudImg,
    "02n": bg_cloudImg,
    "03d": bg_cloudImg,
    "03n": bg_cloudImg,
    // "04d": bg_brokencloudImg,
    // "04n": bg_brokencloudImg,
    "04d": bg_cloudImg,
    "04n": bg_cloudImg,
    "09d": bg_drizzleImg,
    "09n": bg_drizzleImg,
    "10d": bg_rainImg,
    "10n": bg_rainImg,
    "11d": bg_rainImg,
    "11n": bg_rainImg,
    "13d": bg_snowImg,
    "13n": bg_snowImg,
  };

  const handleClick = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APIKEY}&units=metric`;
      let res = await axios(url);
      let data = res.data;
      console.log(data);

      let imgIcon = allIcon[data.weather[0].icon] || clearImg;
      let bgImg = allBGImg[data.weather[0].icon] || bg_clearImg;

      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: imgIcon,
        bgImg: bgImg,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleClick("Delhi");
  }, []);

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center px-4 sm:px-0"
      style={{ backgroundImage: `url(${weatherData?.bgImg || bg_clearImg})` }}
    >
      {/* Main Card with Glassmorphism */}
      <div className="p-6 sm:p-10 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 w-full max-w-md sm:max-w-lg">
        {/* Search Bar */}
        <div className="flex bg-amber-50 rounded-full shadow-lg">
          <input
            type="text"
            placeholder="Search city"
            className="flex-grow outline-none px-3 py-2 rounded-l-full text-lg"
            ref={inputRef}
          />
          <img
            src={searchIcon}
            onClick={() => handleClick(inputRef.current.value)}
            className="bg-cyan-400 p-2 h-12 w-12 rounded-r-full hover:cursor-pointer hover:bg-cyan-600"
          />
        </div>

        {/* Weather Icon with Animation */}
        <div className="flex justify-center my-5 animate-bounce">
          <img
            src={weatherData?.icon || clearImg}
            className="h-24 sm:h-32 w-24 sm:w-32"
          />
        </div>

        {/* Temperature & Location */}
        <div className="text-slate-900 text-center">
          <p className="text-6xl sm:text-7xl font-bold">
            {weatherData?.temperature || "--"}
            <span className="align-super text-3xl sm:text-4xl">°C</span>
          </p>
          <p className="text-3xl sm:text-4xl font-semibold">
            {weatherData?.location || "Loading..."}
          </p>
        </div>

        {/* Humidity & Wind Speed */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-between p-4 mt-6 bg-cyan-100/50 shadow-lg rounded-lg text-slate-800 font-semibold text-xl sm:text-2xl">
          <div className="flex gap-2 items-center">
            <img
              src={humidityImg}
              className="w-10 h-10 bg-gray-800 p-2 rounded-md"
            />
            <span>
              {weatherData?.humidity || "--"}% <br />
              Humidity
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <img
              src={windImg}
              className="w-10 h-10 bg-cyan-400 p-2 rounded-md"
            />
            <span>
              {weatherData?.windspeed || "--"} Km/h <br />
              Wind Speed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
