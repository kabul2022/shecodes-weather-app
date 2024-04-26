function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
   let cityElement = document.querySelector("#city");
   let descriptionElement= document.querySelector("#description");
      let humidityElement= document.querySelector("#humidity");
      let windSpeedElement = document.querySelector("#wind-speed");
       let timeElement = document.querySelector("#time");
       let date = new Date(response.data.time*1000);

       let iconElement = document.querySelector("#icon");

      
      
timeElement.innerHTML= formatDate(date);

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  
}
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday","Monday","tuesday","Wednesday","Thursday","Friday","Saturday"];
     let day = days[date.getDay()];
     if (minutes < 10){
      minutes = `0${minutes}`;
     }
  
  return `${day} ${hours}:${minutes}`
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

function displayForecast() {
  
let forecast = document.querySelector("#forecast");
forecast.innerHTML =`
  <div class="weather-forecast-day">
            <div class="weather-forecast-date">Wed</div>
            <div class="weather-forecast-icon">🌤️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>15º</strong>
              </div>
              <div class="weather-forecast-temperature">9º</div>
              
            </div>
          </div>
        </div>`;

}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",hanndleSearch);

searchCity("Kabul");
