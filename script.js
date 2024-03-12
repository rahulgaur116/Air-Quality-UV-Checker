// Air Quality and Pollution API//
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
// Update pollutant1 marker position and color
function updatePollutant1Marker(pollutant1Value) {
    var marker = document.getElementById("pollutant1-marker");
    var barWidth = document.querySelector(".pollutant-bar").clientWidth;
    
    // Calculate the position of the marker based on the pollutant1 value
    var markerPosition = (pollutant1Value / 10) * barWidth; // Adjust the division factor based on your scale
    
    // Update marker position
    marker.style.left = markerPosition + "px";
    
    // Update marker color based on pollutant1 value
    if (pollutant1Value < 50) {
        marker.style.backgroundColor = "#00e400"; // Good (Green)
    } else if (pollutant1Value < 100) {
        marker.style.backgroundColor = "#ff9900"; // Moderate (Yellow)
    } else if (pollutant1Value < 150) {
        marker.style.backgroundColor = "#ff0000"; // Unhealthy for Sensitive Groups (Orange)
    } else if (pollutant1Value < 200) {
        marker.style.backgroundColor = "#99004d"; // Unhealthy (Purple)
    } else {
        marker.style.backgroundColor = "#7e0023"; // Very Unhealthy (Maroon)
    }
}

// Call the function to update pollutant1 marker based on the value
updatePollutant1Marker(pollutant1); // Example value, you can pass the actual pollutant1 

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
