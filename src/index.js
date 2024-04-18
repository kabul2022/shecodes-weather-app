function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
   let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML= Math.round(temperature);

  
}


function searchCity(city) {
  let apikey = "bb01a8cf18ea9o4532af5fe21atc5f3a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}


function hanndleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  
  
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",hanndleSearch);

searchCity("Kabul");
