// gets day from date time
const getDayFromDate = (dateTime) => {
    const date = new Date(dateTime * 1000);
    const day = date.toLocaleDateString("en-US", {
        weekday: "long",
    });
    return day;
};

// gets current weather for a given location
const displayWeather = async () => {
    const weatherInfo = document.querySelector("#weather-info");
    const forecast = document.querySelector("#forecast-info");
    const weatherIcon = document.querySelector("#weather-icon");
    const weatherURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=16.77&lon=3.00&units=metric&appid=2cc7435751795782f887644cfbc2f0d0";
    const forecastURL =
        "https://api.openweathermap.org/data/2.5/forecast?lat=16.77&lon=3.00&units=metric&appid=2cc7435751795782f887644cfbc2f0d0";

    try {
        // fetch weather data from weather API
        const response = await fetch(weatherURL);
        if (!response.ok) {
            throw new Error("Could not fetch weather data");
        }
        const data = await response.json();

        // fetch forecast data from weather API
        const forecastResponse = await fetch(forecastURL);
        if (!forecastResponse.ok) {
            throw new Error("Could not fetch forecast data");
        }
        const forecastData = await forecastResponse.json();
        
        // extract relevant data from the response
        const icon = data.weather[0].icon;
        const temperature = data.main.temp.toFixed(0);
        const description =
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1);
        const high = data.main.temp_max.toFixed(0);
        const low = data.main.temp_min.toFixed(0);
        const humidity = data.main.humidity;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
        );
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        // extract the daily forecast data after every 8th entry
        let dailyForecastData = [];
        for (let i = 0; i < forecastData.list.length; i += 8) {
            dailyForecastData.push(forecastData.list[i]);
        }
        const tomorrowTemp = dailyForecastData[1].main.temp.toFixed(0);
        const dayAfterTomorrowTemp = dailyForecastData[2].main.temp.toFixed(0);
        // get day from date time for forecasted data
        const tomorrow = getDayFromDate(dailyForecastData[1].dt);
        const dayAfterTomorrow = getDayFromDate(dailyForecastData[2].dt);
        
        // assign the weather and forecast data to the HTML elements
        weatherIcon.setAttribute(
            "src",
            `https://openweathermap.org/img/w/${icon}.png`
        );
        weatherInfo.innerHTML = `<p>${temperature}°C</p>
        <p>${description}</p>
        <p>High: ${high}°</p>
        <p>Low: ${low}°</p>
        <p>Humidity: ${humidity}%</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>`;
        
        forecast.innerHTML = `<p>Today: <span>${temperature}°C</span></p>
        <p>${tomorrow}: <span>${tomorrowTemp}°C</span></p>
        <p>${dayAfterTomorrow}: <span>${dayAfterTomorrowTemp}°C</span></p>`;
    } catch (error) {
        console.log("Error fetching weather data:", error);
        return;
    }
};

export default displayWeather;
