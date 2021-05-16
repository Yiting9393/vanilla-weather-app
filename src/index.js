function formatDate(timestamp) {
 let date = new Date(timestamp);   
 let hours = date.getHours();
 if (hours < 10) {
     hours = `0${hours}`;
 }
 let minutes = date.getMinutes();
 if (minutes < 10) {
     minutes = `0${minutes}`;
 }
 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 let day = days[date.getDay()];
 return `${day} ${hours}:${minutes}`;
}


function displayWeather(response){
    console.log(response.data);
let city = response.data.name;
let cityElement = document.querySelector(`#city`);
cityElement.innerHTML = city;
let weatherCondition = response.data.weather[0].description;
let weatherConditionElement = document.querySelector(`#weather-description`);
weatherConditionElement.innerHTML = weatherCondition;
let humidity = response.data.main.humidity;
let humidityElement = document.querySelector(`#humidity`);
humidityElement.innerHTML = `${humidity}%`;
let wind = response.data.wind.speed;
let windElement = document.querySelector(`#wind`);
windElement.innerHTML = `${wind}km/h`;
let temperature = response.data.main.temp;
let temperatureElement = document.querySelector(`#temperature`);
temperatureElement.innerHTML = Math.round(temperature);
let dateElement = document.querySelector(`#date`);
dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function importWeather(event){
    event.preventDefault();
let city = document.querySelector(`#search-city`);
let units = `metric`;
let apiKey = `bf2c0ac77d7ed4ba5477597b0389d74a`;
let apiEndPoint = `api.openweathermap.org/data/2.5/weather?q=`;
let apiUrl = `http://${apiEndPoint}${city.value}&units=${units}&appid=${apiKey}`;
axios.get(apiUrl).then(displayWeather);
}

let searchCity = document.querySelector(`.search-weather`);
searchCity.addEventListener(`submit`, importWeather);
