loadBruneiWeather();

function loadBruneiWeather() {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id=1820818&units=metric&appid=1afbd3c3959958d8362d9691ff2b2fd4', true);

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            //console.log('Status:', this.status);
            //console.log('Headers:', this.getAllResponseHeaders());
            //console.log('Body:', this.responseText);

            var data = JSON.parse(this.responseText);
            document.getElementById("bruneiTemp").innerHTML = data.main.temp + "&#8451;";
            document.getElementById("bruneiHum").innerHTML = data.main.humidity + "%";
        }
    };
    request.send();
}

var autoRefresh2 = setInterval(
    function () {
        $('#bruneiTemp').html(loadBruneiWeather());
    }, 5000);
