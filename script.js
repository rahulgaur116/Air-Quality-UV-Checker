


var myapikey = "f09a8b987378f5c12242add6b4dd73f6243f9a8b";
var locationinput = $("#location");
var searchbtn = $("#search");
var aqi = $("#aqi");
var pm25 = $("#pm25");

// Event listener for search button click
searchbtn.on("click", function() {
    var location = locationinput.val();
    console.log(location)

    // Fetch current overall AQI data using Waqi API
    fetch(`https://api.waqi.info/feed/${location}/?token=${myapikey}`)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data);
        aqi.text(data.data.aqi);
    });
    
     // Fetch current PM25 data using Waqi API
     fetch(`https://api.waqi.info/feed/${location}/?token=${myapikey}`)
     .then(function(resp) {
         return resp.json();
     })
     .then(function(data) {
         console.log(data);
         pm25.text(data.data.iaqi.pm25.v);
     });
});

// Test //