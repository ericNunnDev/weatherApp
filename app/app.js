"use strict";

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
    var cityName = (searchCity.value);
    if (cityName.trim().length == 0) {
        return alert('Please enter the name of a city.');
    }

    var http = new XMLHttpRequest();
    var apiKey = '746d39ead8a05e38fd22591b9d3ebdc7';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
    var method = 'GET';

    http.open(method, url);
    http.onreadystatechange = function () {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            updateWeather(weatherData);
        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Woops! Something went wrong!');
        }
    }
    http.send();
}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;

    weatherDescription.textContent = weatherData.description;

    weatherTemp.textContent = weatherData.temperature;

    weatherBox.style.display = 'block';
}
