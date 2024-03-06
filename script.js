
var myapikey = "f09a8b987378f5c12242add6b4dd73f6243f9a8b";
var locationinput = $("#location");
var searchbtn = $("#search");
var pollutant1 = $("#pol1");
var pollutant2 = $("#pol2");
var pollutant3 = $("#pol3");

// Event listener for search button click
searchbtn.on("click", function() {
    var location = locationinput.val();
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
        element.text(pollutantKey + " Data Not Available");
    }
}