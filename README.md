# Weather App

Search for a city to see the current weather from Visual Crossing. The app shows the temperature, what it feels like, the weather conditions, humidity, and wind speed.

## How to run

Open `index.html` in your browser, enter a city like `Białystok`, and click **Search**.

The app uses [Visual Crossing’s free weather API](https://www.visualcrossing.com/resources/documentation/weather-api/free-weather-api-no-key/). No API key or config file is needed.

## Validation and errors

- The search field is required. Before sending the request, I use `trim()` to remove spaces around the name and `encodeURIComponent()` to put names like `São Paulo` in the URL.
- If the API returns HTTP 400, the app shows "Location not found". For other errors, it shows "Something went wrong".
- When a search fails, the app hides the previous result so the old weather doesn't look like the answer to the new search.

## Design decision

I use `processWeather()` to turn the API response into a small object. For example, `currentConditions.feelslike` becomes `weather.feelsLike` in the UI. If I switch weather providers, I can update `getWeather()` to call the new API and `processWeather()` to map its fields.