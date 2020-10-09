
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
//Have the LI act as clickable search items to get JSON data

// 7ff4f4e0e52e504f768e877c74b9eab4 - API KEY

var date = moment().format("MM/D/YYYY")
var searchFieldEl = document.querySelector("#searchField");
var searchBtn = document.querySelector("#searchBtn");
var listCont = document.querySelector("#prevSearch");
var cityName = document.querySelector("#cityName");
var curTemp = document.querySelector("#curTemp");
var futureForEl = document.querySelector("#fiveDayFor");
var lat = ""
var lon = ""

var fetchWeather = function (city) {
    if (city === "") {
        alert("Please enter a city!")
        return;
    }
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7ff4f4e0e52e504f768e877c74b9eab4&units=imperial").then(function (response) {
        response.json().then(function (data) {
            showCurWeather(data)
            lat = data.coord.lat
            lon = data.coord.lon
            getFiveDay();
        })
    })
};

var getFiveDay = function () {
    return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=7ff4f4e0e52e504f768e877c74b9eab4&units=imperial")
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data)
                uvIndexTracker(data)
                futureForcast(data)
            })
        })
}

var showCurWeather = function (data) {
    var tempCont = document.createElement("div")
    tempCont.classList.add("container", "border", "currentTemp")
    var cityName = document.createElement("h2")
    var imgCont = document.createElement("img")
    var temp = document.createElement("p")
    var humidity = document.createElement("p")
    var windSpeed = document.createElement("p")

    imgCont.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    
    curTemp.appendChild(tempCont)
    tempCont.appendChild(cityName)
    cityName.appendChild(imgCont)
    tempCont.appendChild(temp)
    tempCont.appendChild(humidity)
    tempCont.appendChild(windSpeed)
    
    
    
    cityName.textContent = data.name + " (" + date + ") "
    temp.textContent = "Temperature: " + data.main.temp + "° F"
    humidity.textContent = "Humidity: " + data.main.humidity + "%"
    windSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH"
}

var uvIndexTracker = function (data) {
    var uvString = data.daily[0].uvi
    var uvPrint = document.createElement("p")
    uvPrint.classList.add("uvP")
    var curTempCont = document.querySelector(".currentTemp")
    curTempCont.appendChild(uvPrint)
    uvPrint.textContent = "UV Index: "
    var uvSpan = document.createElement("span")
    uvPrint.appendChild(uvSpan)
    uvSpan.textContent = " " + uvString + " "

    if (uvString < 3) {
        uvSpan.classList.add("rounded", "bg-success", "text-white", "p-1")
    } else if (uvString >= 3 && uvString < 6) {
        uvSpan.classList.add("rounded", "bg-warning", "p-1")
    } else if (uvString >= 5 && uvString < 8) {
        uvSpan.classList.add("rounded", "bg-orange", "text-white", "p-1") 
    } else if (uvString >= 8 && uvString < 11) {
        uvSpan.classList.add("rounded", "bg-danger", "text-white", "p-1")
    } else {
        uvSpan.classList.add("rounded", "bg-purple", "text-white", "p-1")
    }
};

var futureForcast = function (data) {
    var fiveDayHeader = document.createElement("h2")
    var cardCont = document.createElement("div")

    fiveDayHeader.classList.add("row")
    cardCont.classList.add("row", "justify-content-around")

    futureForEl.appendChild(fiveDayHeader)
    futureForEl.appendChild(cardCont)

    fiveDayHeader.textContent = "5-Day Forcast:"

    for(i = 1; i < 6; i++) {
        var cardCreate = document.createElement("div")
        var cardBody = document.createElement("div")
        var dateP = document.createElement("p")
        var iconImg = document.createElement("img")
        var tempP = document.createElement("p")
        var humidityP = document.createElement("p")

        cardCreate.classList.add("card", "bg-primary", "text-white")
        cardBody.classList.add("card-body")

        cardCont.appendChild(cardCreate)
        cardCreate.appendChild(cardBody)
        cardBody.appendChild(dateP)
        cardBody.appendChild(iconImg)
        cardBody.appendChild(tempP)
        cardBody.appendChild(humidityP)


        dateP.textContent = moment().add([i], "d").format("MM/D/YYYY")
        iconImg.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");
        tempP.textContent = "Temp: " + data.daily[i].temp.day + "° F"
        humidityP.textContent = "Humidity: " + data.daily[i].humidity + "%"
    }

}

var gatherCity = function () {
    var citySelection = searchField.value.trim();
    buildList(citySelection);
    fetchWeather(citySelection);
};

var buildList = function (city) {
    if (city === "") {
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
