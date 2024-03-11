var myapikey = "f09a8b987378f5c12242add6b4dd73f6243f9a8b";
var cityName = $("#location");
var searchbtn = $("#search");
var pollutant1 = $("#PM25");
var pollutant2 = $("#SO2");
var pollutant3 = $("#NO2");
searchbtn.on("click", function() {
    var location = cityName.val();
    console.log(location);
    currentWeatherSection(location);
});
// Event listener for search button click
searchbtn.on("click", function() {
    var location = cityName.val();
    console.log(location);
    // Fetch current overall AQI data using Waqi API
    fetch(`https://api.waqi.info/feed/${location}/?token=${myapikey}`)
    .then(function(resp) {
        if (!resp.ok) {
            throw new Error('Network response was not ok');
        }
        return resp.json();
    })
    .then(function(data) {
        console.log(data.data);
     // Check statement to look for the data using element name and see if it exists for current location
        if (data.data && data.data.iaqi) {
            displayPollutant("pm25", pollutant1, data.data.iaqi);
            displayPollutant("so2", pollutant2, data.data.iaqi);
            displayPollutant("no2", pollutant3, data.data.iaqi);
        }
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });
});
function displayPollutant(pollutantKey, element, iaqiData) {
    if (iaqiData[pollutantKey]) {
        element.text(iaqiData[pollutantKey].v);
    } else {
        element.text(pollutantKey + " Level not Detected");
    }
}
// UV Check and Cloud Cover //
var apiKey = "1b18ce13c84e21faafb19c931bb29331";
var currentUvindex = $("#uv-Index");
var cityName = $("#location");
var cloudsIndex = $("#clouds-Index");
var maxTemp = $("#max-temp");
var cityLat;
var cityLon;
var currentWeatherSection = function(cityName) {
    // get and use data from open weather current weather api end point
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            cityLon = response.coord.lon;
            cityLat = response.coord.lat;
            // Call the function to fetch detailed weather data here
            fetchWeatherData(cityLat, cityLon);
        });
};
var fetchWeatherData = function(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Network response was not okay");
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            currentUvindex.text(data.current.uvi);
            cloudsIndex.text(data.current.clouds);
            maxTemp.text(data.daily[0].temp.max + " F");
            var currentUvIndex = $("#current-uv-index");
            currentUvIndex.text("UV Index: " + data.current.uvi);
            var currentNumber = $("#current-number");
            currentNumber.text(data.current.uvi);
        })
        .catch(function(error) {
            console.log("Error fetching data:", error);
        });
};