// ANCHOR -- Require Modules --
const catchAsync = require("../Utilities/catchAsync");
const AppError = require("../Utilities/appError");
// const axios = require("axios");

// ANCHOR -- Get All Locations --
module.exports.getWeather = catchAsync(async (req, res, next) => {
  // 1) get openweather api url and key from config file
  const url = process.env.OPENWEATHER_URL;
  const apiKey = process.env.OPENWEATHER_KEY;

  // 1) return this data to the front end
  res.status(200).json({
    status: "Success",
    url: url,
    apiKey: apiKey,
  });
});
