const form = document.querySelector("#search-form");
const search = document.querySelector("#search");
const message = document.querySelector("#message");
const locationEl = document.querySelector("#location");
const tempEl = document.querySelector("#temp");
const feelsLikeEl = document.querySelector("#feels-like");
const conditionsEl = document.querySelector("#conditions");
const humidityEl = document.querySelector("#humidity");
const windSpeedEl = document.querySelector("#wind-speed");
const weatherEl = document.querySelector("#location-weather");

function renderWeather(weather) {
  weatherEl.hidden = false;
  locationEl.textContent = weather.location;
  tempEl.textContent = `${weather.temp}°C`;
  feelsLikeEl.textContent = `${weather.feelsLike}°C`;
  conditionsEl.textContent = weather.conditions;
  humidityEl.textContent = `${weather.humidity}%`;
  windSpeedEl.textContent = `${weather.windSpeed} km/h`;
}
function processWeather(data) {
  return {
    location: data.resolvedAddress,
    temp: data.currentConditions.temp,
    feelsLike: data.currentConditions.feelslike,
    conditions: data.currentConditions.conditions,
    icon: data.currentConditions.icon,
    humidity: data.currentConditions.humidity,
    windSpeed: data.currentConditions.windspeed,
  };
}
async function getWeather(location) {
  const searchData = await getJson(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric`,
  );
  return processWeather(searchData);
}
async function handleSubmit(event) {
  event.preventDefault();
  message.textContent = "";
  const location = search.value.trim();
  try {
    const weatherData = await getWeather(location);
    renderWeather(weatherData);
  } catch (error) {
    weatherEl.hidden = true;
    if (error.status === 400) {
      message.textContent = "Location not found";
    } else {
      message.textContent = "Something went wrong";
    }
    console.error(error);
  }
}
async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(`HTTP status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  const data = await response.json();
  return data;
}

form.addEventListener("submit", handleSubmit);
