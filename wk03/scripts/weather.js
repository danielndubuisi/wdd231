const currentTemparature = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&&units=metric&appid=2cc7435751795782f887644cfbc2f0d0";

const apiFetch = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(await response.text());
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
};

console.log(currentTemparature, weatherIcon, captionDesc);

const displayResults = async () => {
    const data = await apiFetch();
    if (data) {
        const temp = data.main.temp.toFixed(2);
        const icon = data.weather[0].icon;
        const description = data.weather[0].description;        

        // set values
        currentTemparature.textContent = `${temp}°C`;
        weatherIcon.setAttribute(
            "src",
            `https://openweathermap.org/img/w/${icon}.png`
        );
        weatherIcon.setAttribute("alt", "weather icon");
        captionDesc.textContent = description
    }
};

displayResults();
