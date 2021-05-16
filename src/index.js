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
let city = response.data.name;
let cityElement = document.querySelector(`#city`);
let weatherCondition = response.data.weather[0].description;
let weatherConditionElement = document.querySelector(`#weather-description`);
let humidity = response.data.main.humidity;
let humidityElement = document.querySelector(`#humidity`);
let wind = response.data.wind.speed;
let windElement = document.querySelector(`#wind`);
let temperature = response.data.main.temp;
let temperatureElement = document.querySelector(`#temperature`);
let icon = response.data.weather[0].icon;
let iconElement = document.querySelector(`#temperature-icon`);
let dateElement = document.querySelector(`#date`);

celciusValue = response.data.main.temp;

cityElement.innerHTML = city;
weatherConditionElement.innerHTML = weatherCondition;
humidityElement.innerHTML = `${humidity}%`;
windElement.innerHTML = `${wind}km/h`;
temperatureElement.innerHTML = Math.round(temperature);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
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

function showPosition(position){
 let latitude = position.coords.latitude;
 let longitude = position.coords.longitude;
 let units = `metric`; 
 let apiKey = `bf2c0ac77d7ed4ba5477597b0389d74a`;
 let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`
 let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
 axios.get(apiUrl).then(displayWeather);
}

navigator.geolocation.getCurrentPosition(showPosition);

function displayFahrenheit(event){
event.preventDefault();
celciusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let temperatureElement = document.querySelector(`#temperature`);
let fahrenheitValue = (celciusValue * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitValue);
}

function displayCelcius(event){
event.preventDefault();
celciusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
let temperatureElement = document.querySelector(`#temperature`);
temperatureElement.innerHTML = Math.round(celciusValue);
}

let celciusValue = null;

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener(`click`, displayFahrenheit);

let celciusLink = document.querySelector(`#celcius-link`);
celciusLink.addEventListener(`click`, displayCelcius);