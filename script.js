var apiKey = "&appid=af1540a845cf5edb12fcfb5013428dbd";
var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=";
var uvAPI = "https://api.openweathermap.org/data/2.5/uvi?";
var unitsEl = "&units=imperial";
var cityTempEl = document.getElementById("city-temp");
var humidityEl = document.getElementById("city-humidity");
var windSpeedEl = document.getElementById("city-wind-speed");
var uvIndexEl = document.getElementById("city-uv-index");
var submit = document.getElementById("submit");
var input = document.getElementById("inputCity");
var savedCities = document.getElementById("past-cities");

var citiesEl = [];

//stores the cities in the cities array

function saveCities() {
  localStorage.setItem("city", JSON.stringify(citiesEl));
  console.log(saveCities);
}

// this function will grab the info needed to search for temp, humidity, wind speed, and uv index
function searchCity(city) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=";

  queryURL = queryURL + city + apiKey + unitsEl;
  console.log(queryURL);
  // this will grab temperature and pass it to the html
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    cityTempEl.textContent = "Temperature: " + response.main.temp;
    console.log(cityTempEl);
  });

  // this will grab humidity and pass it to the html
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    humidityEl.textContent = "Humidity: " + response.main.humidity;
    console.log(humidityEl);
  });

  // this will grab wind speed and pass it to the html
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    windSpeedEl.textContent = "Wind Speed: " + response.wind.speed;
    console.log(windSpeedEl);
  });

  // this will grab uv index and pass it to the html
  var lat = response.coord.lat;
  var lon = response.coord.lon;
  uvAPI = uvAPI + "lat=" + lat + "&lon=" + lon + apiKey;

  $.ajax({
    url: uvAPI,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    uvIndexEl.textContent = "UV Index: " + response;
    console.log(uvIndexEl);
  });
}

// UVQueryURL = UVQueryURL + city + apiKey + latEl + lonEl + countEl;
// console.log(UVQueryURL);
// $.ajax({
//   url: UVQueryURL,
//   method: "GET",
// }).then(function (response) {
//   console.log(response);
//   uvIndexEl.textContent = "UV Index: " + response;
//   console.log(uvIndexEl);
// });

//   function createList() {
//     var li = $("<li>" + city.toUpperCase() + "</li>");
//     var savedCity = localStorage.getItem("city");
//     li.textContent = savedCity;
//     savedCities.append(li);
//   }

//     createList();
//     console.log(createList);

//     localStorage.setItem("city", JSON.stringify(city));
//     console.log(localStorage);
//   }

//event listeners
$(submit).click(function () {
  console.log($(input).val());
  searchCity($(input).val());
});
