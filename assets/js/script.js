// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
        //Parse JSON data to pick the relavent pieces out and place them on the page
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
        //Use an if function to determine the numeral that is received and apply a class corresponding to that number
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
        //Have the LI act as clickable search items to get JSON data

// 7ff4f4e0e52e504f768e877c74b9eab4 - API KEY

// city.name - city
//
var date = moment().format("MM/D/YYYY")
var searchFieldEl = document.querySelector("#searchField");
var searchBtn = document.querySelector("#searchBtn");
var listCont = document.querySelector("#prevSearch");
var cityName = document.querySelector("#cityName");
var curTemp = document.querySelector("#curTemp")

var fetchWeather = function(city) {
    if(city === "") {
        alert("Please enter a city!")
        return;
    }
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7ff4f4e0e52e504f768e877c74b9eab4").then( function(response) {
        response.json().then(function (data) {
            showCurWeather(data)
        })
    })
};

var showCurWeather = function (data) { 
    var actTemp = data.main.temp
    var tempSplit = actTemp.split(".")[1]
    cityName.textContent = data.name + " " + date + " " + data.weather[0].icon 
    
    curTemp.textContent = "Temperature: " + tempSplit
}

var gatherCity = function() {
    var citySelection = searchField.value.trim();
    buildList(citySelection);
    fetchWeather(citySelection);
};

var buildList = function(city) {
    if(city === "") {
        return;
    }
    var searchTerm = city
    var addCard = document.createElement("div");
    var listItem = document.createElement("li");
    var cityText = document.createElement("p");

    cityText.textContent = searchTerm
    addCard.classList.add("card");

    listItem.appendChild(cityText);
    addCard.appendChild(listItem);
    listCont.appendChild(addCard);
};

searchBtn.addEventListener("click", gatherCity)
