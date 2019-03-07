loadJson();

function loadJson() {

    var flag = 0;
    var request = new XMLHttpRequest();

    //check if isHardware connected true or false
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.responseText == 'false') {
            console.log('Status:', this.status);
            console.log('Ready State:', this.readyState);
            console.log('isConnected:', this.responseText);
            console.log('flag :', flag);

            getElementSetValue("isHardwareConnected", this.responseText);
            getElementSetValue("statusCode", " ");
            getElementSetValue("appName", " ");
            flag = 0;
        }
        else if (this.readyState === 4 && this.responseText == 'true') {
            console.log('flag :', flag);
            flag = 1;
        }

        //the flag signifies whether the hardware is active or not
        if (flag == 1) {
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log('Status:', this.status);
                    console.log('Ready State:', this.readyState);

                    //converting json to js objects
                    var data = JSON.parse(this.responseText);
                    getElementSetValue("isHardwareConnected", true);
                    getElementSetValue("statusCode", this.status);
                    getElementSetValue("appName", data.name);

                    //data for temperature
                    getElementSetValue("tempPinNumber", data.widgets[0].pinType + " " + data.widgets[0].pin);
                    getElementSetValue("tempSensorName", data.widgets[0].label);

                    //animation every 5 sec for temp change
                    if (document.getElementById("tempUpdate").innerHTML != data.widgets[0].value + "C") {
                        $("#tempUpdate").fadeOut(function () {
                            $(this).text(data.widgets[0].value + "C").fadeIn();
                        });
                    }
                    else {
                        document.getElementById("tempUpdate").innerHTML = data.widgets[0].value + "C";
                    }

                    //alert box temperature show and hide animation
                    if (data.widgets[0].value >= 30) {
                        $("#aboveTemp").fadeIn();
                        document.getElementById("belowTemp").style.display = "none";
                    }
                    else if (data.widgets[0].value <= 30) {
                        $("#belowTemp").fadeIn();
                        document.getElementById("aboveTemp").style.display = "none";
                    }

                    //data for humidity
                    document.getElementById("humPinNumber").innerHTML = data.widgets[1].pinType + " " + data.widgets[1].pin;
                    document.getElementById("humSensorName").innerHTML = data.widgets[1].label;

                    //animation every 5 sec for temp change
                    if (document.getElementById("humUpdate").innerHTML != data.widgets[1].value + "%") {
                        $("#humUpdate").fadeOut(function () {
                            $(this).text(data.widgets[1].value + "%").fadeIn();
                        });
                    }
                    else {
                        document.getElementById("tempUpdate").innerHTML = data.widgets[1].value + "%";
                    }
                    
                    //alert box humidity show and hide animation
                    if (data.widgets[1].value >= 50) {
                        $("#aboveHum").fadeIn();
                        document.getElementById("belowHum").style.display = "none";
                    }
                    else if (data.widgets[1].value <= 50) {
                        $("#belowHum").fadeIn();
                        document.getElementById("aboveHum").style.display = "none";
                    }

                    //data for pressure
                    document.getElementById("pressPinNum").innerHTML = data.widgets[2].pinType + " " + data.widgets[2].pin;
                    document.getElementById("pressSensorName").innerHTML = data.widgets[2].label;
                    document.getElementById("pressUpdate").innerHTML = data.widgets[2].value + "%";
                    if (data.widgets[2].value >= 1100) {
                        $("#abovePress").fadeIn();
                        document.getElementById("belowPress").style.display = "none";
                    }
                    else if (data.widgets[2].value <= 1100) {
                        $("#belowPress").fadeIn();
                        document.getElementById("abovePress").style.display = "none";
                    }

                    //data for altitude
                    document.getElementById("altPinNum").innerHTML = data.widgets[6].pinType + " " + data.widgets[6].pin;
                    document.getElementById("altSensorName").innerHTML = data.widgets[6].label + " (m)";
                    document.getElementById("altUpdate").innerHTML = data.widgets[6].value + "m";
                    if (data.widgets[6].value >= 100) {
                        $("#aboveAlt").fadeIn();
                        document.getElementById("belowAlt").style.display = "none";
                    }
                    else if (data.widgets[6].value <= 50) {
                        $("#belowAlt").fadeIn();
                        document.getElementById("aboveAlt").style.display = "none";
                    }
                }
            }
            request.open('GET', 'http://blynk-cloud.com/494dbf1d62524d75bd3af014ebffe155/project', true);
            request.send();
        }
    }
    request.open('GET', 'http://blynk-cloud.com/494dbf1d62524d75bd3af014ebffe155/isHardwareConnected', true);
    request.send();
};

var autoRefresh = setInterval(
    function () {
        $('#tempUpdate').html(loadJson());
    }, 5000);

