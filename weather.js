let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".Weather_temperature");
let w_icon = document.querySelector(".weather_icon i");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

// to get actual Country NAME 
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], {type: 'region'}).of(code);
};

const API_KEY = '05f1b77d21f9f0f35083401550a1ca22';

const getWeatherData = async (lat, lon) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
        const res = await fetch(weatherURL);
        const data = await res.json();

        const {main, name, weather, wind, sys, dt} = data;

        // Update DOM elements
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        w_temperature.innerHTML = `${main.temp.toFixed(1)}°C`;
        w_forecast.innerHTML = weather[0].main;
        w_icon.className = `fa-solid ${getWeatherIcon(weather[0].id)}`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed(1)}°C`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed(1)}°C`;
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        cityName.innerHTML = "Failed to load weather data";
    }
};


const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return 'fa-bolt';
    if (weatherId >= 300 && weatherId < 400) return 'fa-cloud-rain';
    if (weatherId >= 500 && weatherId < 600) return 'fa-cloud-showers-heavy';
    if (weatherId >= 600 && weatherId < 700) return 'fa-snowflake';
    if (weatherId >= 700 && weatherId < 800) return 'fa-smog';
    if (weatherId === 800) return 'fa-sun';
    return 'fa-cloud';
};

document.addEventListener("DOMContentLoaded", () => {
    // Get user's location or use default
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeatherData(position.coords.latitude, position.coords.longitude);
            },
            () => {
                // Fallback to default location if geolocation fails
                getWeatherData(18.5204, 73.8567); // Pune coordinates
            }
        );
    } else {
        // Use default location if geolocation not supported
        getWeatherData(18.5204, 73.8567);
    }
});



