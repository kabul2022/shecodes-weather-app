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
       iconElement.innerHTML=`<img src="${response.data.condition.icon_url}"
        class="weather-app-icon"/>`
      
       
timeElement.innerHTML= formatDate(date);

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  getForecast(response.data.city);
  
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


function getForecast(city) {
  let apikey ="bb01a8cf18ea9o4532af5fe21atc5f3a";
  let apiUrl =`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {


  let forecastHTML = "";
  response.data.daily.forEach(function (day,index) {
    if(index < 5);
    forecastHTML += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        
        <img src ="${day.condition.icon_url}" class="weather-forecast-icon"/>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
          
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",hanndleSearch);

searchCity("Kabul");

