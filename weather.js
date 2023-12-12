class Weather {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async getWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
}

// Fetch Weather data
document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();

    clearWeatherInfo();
    clearError();

    if (!city || !/^[a-zA-Z\s,]+$/.test(city)) {
        displayError('Please enter a valid city name.');
        return;
    }

    const weather = new Weather('Replace with your API key'); // Replace with your API key
    weather.getWeather(city)
        .then(data => {
            if (data.cod !== 200) {
                displayError(data.message);
            } else {
                displayWeatherData(data);
                // Store the entered city in local storage
                storeCityName(city);
            }
        })
        .catch(() => {
            displayError('An error occurred while fetching data.');
        });
});

// Display weather data on the page
function displayWeatherData(data) {
    const resultDiv = document.getElementById('weather-result');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    resultDiv.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}

// Display error message on the page
function displayError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    document.getElementById('weather-form').after(errorDiv);
}

// Clear error message from the page
function clearError() {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Store the last entered city in local storage
function storeCityName(city) {
    localStorage.setItem('lastCity', city);
}

// Retrieve the last entered city from local storage
function getLastCity() {
    return localStorage.getItem('lastCity');
}

// Use getLastCity() to prepopulate the input field
const cityInput = document.getElementById('city-input');
cityInput.value = getLastCity();

function clearWeatherInfo() {
    document.getElementById('weather-result').innerHTML = '';
}