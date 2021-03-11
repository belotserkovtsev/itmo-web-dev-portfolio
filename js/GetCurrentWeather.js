let request = new XMLHttpRequest()

let weatherHere = document.getElementById("weatherHereBlock")

let loadingHereBigBlock = document.getElementById("loadingBigBlock")
let loadingHere = document.getElementById("loadingHere")
let errorHere = document.getElementById("errorHere")

let weatherHereCity = document.getElementById("weatherHereCity")
let weatherHereTemp = document.getElementById("weatherHereTemp")

let weatherHereWind = document.getElementById("weatherHereWind")
let weatherHereVisibility = document.getElementById("weatherHereVisibility")
let weatherHerePressure = document.getElementById("weatherHerePressure")
let weatherHereHumidity = document.getElementById("weatherHereHumidity")
let weatherHereCoord = document.getElementById("weatherHereCoord")

let latestPosition = null

let geolocation = navigator.geolocation

geolocation.getCurrentPosition(position => {
  getDataForCoords(position)
})

//Methods
function reloadWeather() {
  if (latestPosition !== null) {
    getDataForCoords(latestPosition)
  }
}

function getDataForCoords(position) {
  request.open('GET',
                `https://community-open-weather-map.p.rapidapi.com/weather` +
                `?lat=${position.coords.latitude}` +
                `&lon=${position.coords.longitude}&units=metric`,
                true)
  request.setRequestHeader('x-rapidapi-key', '6612892f6emsh30a0f24ef412cd4p124235jsnf129c5108087')
  request.send()
  latestPosition = position
}

function setData(data) {
  weatherHereCity.textContent = data.name
  weatherHereTemp.textContent = data.main.temp + " °C"

  weatherHereWind.textContent = data.wind.speed + " km/h"
  weatherHereVisibility.textContent = data.visibility + " m"
  weatherHerePressure.textContent = data.main.pressure + " bar"
  weatherHereHumidity.textContent = data.main.humidity + " %"
  weatherHereCoord.textContent = data.coord.lon + ', ' + data.coord.lat
}

// Default request
request.open('GET', 'https://community-open-weather-map.p.rapidapi.com/weather?q=Moscow&units=metric', true)
request.setRequestHeader('x-rapidapi-key', '6612892f6emsh30a0f24ef412cd4p124235jsnf129c5108087')

request.onload = function () {
  let data = JSON.parse(this.response)

  if (request.status == 200) {
    setData(data)
    loadingHereBigBlock.style = 'display: none;'
    weatherHere.style = ' '
  } else {
    loadingHere.style = 'display: none;'
    errorHere.style = ' '
    errorHere.textContent = 'Error ' + request.status
  }
}

request.onloadstart = function () {
  weatherHere.style = 'display: none;'
  loadingHereBigBlock.style = ' '
  errorHere.style = 'display: none;'
  loadingHere.style = ' '
}

request.send()
