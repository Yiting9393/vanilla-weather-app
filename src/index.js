let city = `London`;
let units = `metric`;
let apiKey = `bf2c0ac77d7ed4ba5477597b0389d74a`;
let apiEndPoint = `api.openweathermap.org/data/2.5/weather?q=`;
let apiUrl = `http://${apiEndPoint}${city}&units=${units}&appid=${apiKey}`;
console.log(apiUrl);
