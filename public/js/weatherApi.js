// ANCHOR -- GetWeather --
export const getWeather = async (
  _apiRoot,
  _city,
  _country,
  _state,
  _units,
  _apiKey
) => {
  try {
    // Retrieve weather data based on input parameters
    const data = await axios.get(
      `${_apiRoot}?q=${_city},${_country},${_state}&units=${_units}&appid=${_apiKey}`
    );
    // Destructure data to get stuff you need
    console.log(data);
    const { temp, temp_min, temp_max } = data.data.main;
    console.log({ temp }, { temp_min }, { temp_max });
    const { description, icon } = data.data.weather[0];
    console.log({ description }, { icon });
    // return { description, icon, temp, temp_min, temp_max };
    return "we did it!";

    // Error handling
  } catch (err) {
    if (err) console.log(err);
  }
};
