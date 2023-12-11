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

//Fetch Weather data
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

    const weather = new Weather('ffe1a143b6990927809bed7b8012bcb2'); // Replace with your API key
    weather.getWeather(city)
        .then(data => {
            if (data.cod !== 200) {
                displayError(data.message);
            } else {
                displayWeatherData(data);
            }
        })
        .catch(() => {
            displayError('An error occurred while fetching data.');
        });
});

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

function displayError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    document.getElementById('weather-form').after(errorDiv);
}

function clearError() {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearWeatherInfo() {
    document.getElementById('weather-result').innerHTML = '';
}