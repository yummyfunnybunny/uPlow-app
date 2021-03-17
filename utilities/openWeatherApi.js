// ANCHOR -- Require Modules --
// import axios from "axios";
const axios = require("axios");
const catchAsync = require("./catchAsync");

// ANCHOR -- GetWeather --
module.exports.getWeather = catchAsync(
  async (_apiRoot, _city, _units, _apiKey) => {
    try {
      // Retrieve weather data based on input parameters
      const data = await axios.get(
        `${_apiRoot}?q=${_city}&units=${_units}&appid=${_apiKey}`
      );
      // Destructure data to get stuff you need
      const { temp, temp_min, temp_max } = data.data.main;
      const { description, icon } = data.data.weather[0];
      console.log(
        { description },
        { icon },
        { temp },
        { temp_min },
        { temp_max }
      );
      return { description, icon, temp, temp_min, temp_max };

      // Error handling
    } catch (err) {
      if (err) console.log(err);
    }
  }
);

module.exports.getUnit = (_units) => {
  console.log(_units);
  return _units === "imperial" ? "F" : "C";
  // return _units === "F" ? "imperial" : "metric";
};

// export const renderWeatherData = (_weatherData, _units) => {
//   const { description, icon, temp, temp_max, temp_min } = _weatherData;
//   const weatherIcon = document.querySelector(".weather-icon img");
//   const weatherDescription = document.querySelector(".weather-description h3");
//   const weatherTempMax = document.querySelector(
//     ".weather-temp--max .temp-temp"
//   );
//   const weatherTempCur = document.querySelector(
//     ".weather-temp--cur .temp-temp"
//   );
//   const weatherTempMin = document.querySelector(
//     ".weather-temp--min .temp-temp"
//   );
//   weatherIcon.src = `/img/weather/${icon}.png`;
//   weatherDescription.innerText = `${description}`;
//   const unit = getUnit(_units);
//   weatherTempMax.innerText = `${Math.round(temp_max)}° ${unit}`;
//   weatherTempCur.innerText = `${Math.round(temp)}° ${unit}`;
//   weatherTempMin.innerText = `${Math.round(temp_min)}° ${unit}`;
// };
