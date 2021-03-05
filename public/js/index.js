// ANCHOR -- Imports --
import { getWeather } from "./weatherApi";

// Set Weather Variables
const apiRoot = "https://api.openweathermap.org/data/2.5/weather";
const city = "Contoocook";
const country = "us";
const state = "nh";
const units = "imperial";
const apiKey = "7bafe28bd609d8d1a3c696e86cbb332f";

// Call getWeather
const weather = getWeather(apiRoot, city, country, state, units, apiKey);
console.log(weather);
console.log("whats up");
