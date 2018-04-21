

/*jslint devel: true */
/*eslint no-console: off */
/* bekomme: ort + anfangsdatum
    gebe: array mit temp und Luftfeuchtigkeit durchschnitt */
    
//REAL: http://api.openweathermap.org/data/2.5/weather?q=" + place + ",de&units=metric&APPID=1fe6fc2a2ec41d3904a2584726c8ce56

//TEST: "http://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1"

var WeatherService = (function(){

    var jason;
    var result  = {};

    var request = new XMLHttpRequest();
    
    // returns .temp and .humidity for the given place (string)
    var getWeatherData = function(place){
        request.open("GET", "http://192.168.178.110:3001/malte", false);
        request.send();
        jason = JSON.parse(request.responseText);

        result.temp = jason.main.temp;
        result.humidity = jason.main.humidity;
        
        return result;
    };

return {
    getWeatherData: getWeatherData
};
})();