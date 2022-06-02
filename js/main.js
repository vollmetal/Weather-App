const API_KEY = 'ea11892ad831104dd20d5b343eb9c88c'
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

const cityInputText = document.getElementById('cityInputText')
const searchButton = document.getElementById('searchButton')
const weatherDisplay = document.getElementById('weatherDisplay')

const tempMeasurementDisplay = document.getElementById('tempMeasurementDisplay')
const fahrenheitSetting = document.getElementById('fahrenheitSetting')
const celsiusSetting = document.getElementById('celsiusSetting')

const tempMeasurements = ['F', 'C']

let currentTempMeasurement = 0
let currentPosition

function displayWeather(inputWeather, displayElement) {
    let newDisplay = `<h1>${inputWeather.name}, ${inputWeather.sys.country}</h1>
    <h3>Current temperature: ${inputWeather.main.temp} ${tempMeasurements[currentTempMeasurement]}</h3>
    <h3>Minimum temperature: ${inputWeather.main.temp_min} ${tempMeasurements[currentTempMeasurement]}</h3>
    <h3>Maximum temperature: ${inputWeather.main.temp_max} ${tempMeasurements[currentTempMeasurement]}</h3>
    <h4>Current weather is: ${inputWeather.weather[0].description}</h4>`
    displayElement.innerHTML = newDisplay
}

function getWeather (weatherLocation, displayCallback) {
    let tempMeasurementScale = ''
    if(currentTempMeasurement == 0)
    {
        tempMeasurementScale = 'imperial'
    }
    else
    {
        tempMeasurementScale = 'metric'
    }
    let completeURL = `${API_URL}${weatherLocation}&units=${tempMeasurementScale}&appid=${API_KEY}`
    fetch(completeURL)
    .then(function(result) {
        console.log(result)
        return result.json()
    })
    .then(function(weatherResults) {
        console.log(weatherResults)
        displayCallback(weatherResults, weatherDisplay)
    })
    .catch(function(error) {
        console.log(error)
    })
}

searchButton.addEventListener ('click', function () {
    getWeather(`?q=${cityInputText.value}`, displayWeather)
})

fahrenheitSetting.addEventListener('click', function() {
    currentTempMeasurement = 0
    tempMeasurementDisplay.innerHTML = 'Current temperature in Fahrenheit'
})

celsiusSetting.addEventListener('click', function() {
    currentTempMeasurement = 1
    tempMeasurementDisplay.innerHTML = 'Current temperature in Celsius'
})

if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        currentPosition =  position.coords
        getWeather(`?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}`, displayWeather)
    })
    console.log(currentPosition)
  } else {
    console.log('No Geolocation')
    getWeather('?q=London', displayWeather)
  }

