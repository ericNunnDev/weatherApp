'use strict';

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    const cityName = (searchCity.value);
    if (cityName.trim().length == 0) {
        return alert('Please enter the name of a city.');
    }

    const http = new XMLHttpRequest();
    const apiKey = '746d39ead8a05e38fd22591b9d3ebdc7';
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
    const method = 'GET';

    http.open(method, url);
    http.onreadystatechange = () => {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            let data = JSON.parse(http.responseText);
            let weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            updateWeather(weatherData);
        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Woops! Something went wrong!');
        }
    }
    http.send();
}

const updateWeather = (weatherData) => {
    weatherCity.textContent = weatherData.cityName;

    weatherDescription.textContent = weatherData.description;

    weatherTemp.textContent = weatherData.temperature;

    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}
