const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".form-container");
const tempValue = document.querySelector(".temperature-value");
const cityValue = document.querySelector(".city-value");
const i = document.querySelectorAll(".weather-icon");
const conditionText = document.querySelector(".condition-text");
const errormessage = document.querySelector(".error");
const container = document.querySelector(".container");
const forecastTempDay1 = document.querySelector(".max-min-temp1");
const forecastTempDay2 = document.querySelector(".max-min-temp2");
/* const forecastTempDay3 = document.querySelector(".max-min-temp3"); */
const forecastdays = document.querySelectorAll(".day");
// Fetching weather data from the API
form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".loader").style.display = "flex";
  // Getting the value from the search input
  const value = e.target[0].value;

  // API key and URL for fetching weather data
  const apiKey = "7594f7e0356b4abab36132201231208";
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${value}&days=4&aqi=no&alerts=no`;

  // Fetching weather data from the API
  fetch(apiUrl)
    .then((res) => {
      // Show the loader while waiting for the response
      return res.json();
    })
    .then((data) => {
      getTemp(data);
      errormessage.textContent = "";
      // Hide the loader after fetching data
      document.querySelector(".loader").style.display = "none";
    })
    .catch((e) => {
      // Handling errors and displaying an error message
      errormessage.textContent =
        "There must be something please try again later / Make sure you typed the name of the city or the country correctly";
      console.log(e);
      // Hide the loader in case of an error
      document.querySelector(".loader").style.display = "none";
    });

  // Clearing the search input
  searchInput.value = "";
});
function getTemp(infos) {
  // Updating current weather conditions
  conditionText.textContent = infos.current.condition.text;
  const temperature = infos.current.temp_c;
  const city = infos.location.name;

  // Updating weather icon and temperature values
  const ic1 = infos.forecast.forecastday[1].day.condition.icon;
  i[0].setAttribute("src", `https:${ic1}`);
  const ic2 = infos.forecast.forecastday[2].day.condition.icon;
  i[1].setAttribute("src", `https:${ic2}`);
  /*   const ic3 = infos.forecast.forecastday[3].day.condition.icon;
  i[2].setAttribute("src", `https:${ic3}`);
  console.log(infos); */

  // Updating forecast temperature and weather icons for day 1
  const maxTemp1 = infos.forecast.forecastday[1].day.maxtemp_c;
  const minTemp1 = infos.forecast.forecastday[1].day.mintemp_c;
  forecastTempDay1.textContent = `${maxTemp1} - ${minTemp1}`;

  // Updating forecast temperature and weather icons for day 2
  const maxTemp2 = infos.forecast.forecastday[2].day.maxtemp_c;
  const minTemp2 = infos.forecast.forecastday[2].day.mintemp_c;
  forecastTempDay2.textContent = `${maxTemp2} - ${minTemp2}`;

  // Updating forecast temperature and weather icons for day 3
  /*   const maxTemp3 = infos.forecast.forecastday[3].day.maxtemp_c;
  const minTemp3 = infos.forecast.forecastday[3].day.mintemp_c;
  forecastTempDay3.textContent = `${maxTemp3} - ${minTemp3}`; */

  // Updating temperature and city values
  tempValue.textContent = `${temperature}°`;
  cityValue.textContent = city;

  //Change the dates of the forecast
  const forecastday1 = new Date(infos.forecast.forecastday[1].date);
  forecastdays[0].textContent = forecastday1.toLocaleString("en-us", {
    weekday: "short",
  });
  const forecastday2 = new Date(infos.forecast.forecastday[2].date);
  forecastdays[1].textContent = forecastday2.toLocaleString("en-us", {
    weekday: "short",
  });
  /* const forecastday3 = new Date(infos.forecast.forecastday[3].date);
  forecastdays[2].textContent = forecastday3.toLocaleString("en-us", {
    weekday: "short",
  }); */

  // Changing the background based on day or night
  const isDay = infos.current.is_day;
  if (isDay === 0) {
    document.body.classList.add("night-time");
    document.body.classList.remove("day-time");
  } else {
    document.body.classList.add("day-time");
    document.body.classList.remove("night-time");
  }
}
