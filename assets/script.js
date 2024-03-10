
// var myUvKey = 
// var locationInput = $("#location");
// var searchbtn = $("#search");
// var presentDay = $("#city-one");

// searchbtn.on("click", function() {
//     var location = locationInput.val();

//     //fetch using API 
//     fetch("");
//     .then(function(resp) {
//         return resp.jason();
//     })
//     .then(function(data) {
//         console.log(data);
//         presentDay.html(${});

//     })

    
// }
var cityKey = []
var apiKey =  "1b18ce13c84e21faafb19c931bb29331"


fetch ("https://api.openweathermap.org/data/2.5/onecall?lat="${cityLat}"&lon="${cityLon}"&exclude=minutely,hourly,alerts&units=imperial&appid="${apiKey}")
.then(function(response){
    return response.json();

}).then (function(location){
    console.log(location);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)

    .then(function(response){

        return response.json();

    }).then (function(data) {
        console.log(data[0].UVIndex);
        console.log(data[0].UVIndexText);
    });

});
//Reference in class // 18-19


