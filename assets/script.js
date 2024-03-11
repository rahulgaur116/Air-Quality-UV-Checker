var apiKey = "1b18ce13c84e21faafb19c931bb29331";
var currentUvindex = $("#uv-Index");
var locationInput = $("#location");
var cloudsIndex = $("#clouds-Index");
var maxTemp = $("#max-temp");
var city = "";

$("#search").on("click", function() {
    var location = locationInput.val();
    console.log(location);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        currentUvindex.text(data.main.currentUvindex); // Access the temperature from the response data
        cloudsIndex.text(data.clouds.all); // Access the cloud coverage from the response data
        maxTemp.text(data.main.temp_max + " F ");
        
    }) 

    .catch(function(error) {
        console.log("Error fetching data:", error);
    });
});

function UVIndex(ln,lt){
    //lets build the url for uvindex.
    var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;
    $.ajax({
            url:uvqURL,
            method:"GET"
            }).then(function(response){
                $(currentUvindex).html(response.value);
            });
}