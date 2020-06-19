let temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector(".temperature span");

window.addEventListener('load', function() {    //Executes the unnamed function when the page loads
    //Defining Variables: Latitude, Longitude
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureDegree = document.querySelector(".temperature-degree");

    if (this.navigator.geolocation) {   //Inbuilt JS method
        this.navigator.geolocation.getCurrentPosition(position => {   //Assigning the variable position the function
            long = position.coords.longitude;   
            lat = position.coords.latitude;

           
            const api = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6636700e148979232873de9ccde2b8b7`;
            this.fetch(api)
            .then(response => {
                return response.json();
            })
            .then (data => {
                console.log(data);
                
                //Set DOM Elements from the API
                //Setting Temperature
                temperature = temperatureDegree.textContent = Math.floor(((data.main.temp - 273.15)*100)/100);
                temperatureDescription.textContent = data.weather[0]['description'];
                locationTimezone.textContent = data.name + ", " + data.sys.country;

                //Set Icon
                const dataWeather = data.weather[0];
                setIcons(dataWeather, document.querySelector(".icon"));
                
        });
        console.log(temperature);
            });
    }
    //temperature = 5;
     console.log(temperature);
   document.querySelector('.temperature-degree').addEventListener('click', celciusToFahrenheit(temperature));

    function setIcons (dataWeather, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = dataWeather['main'];
        skycons.play();   
        return skycons.set(iconID, Skycons.CLEAR_NIGHT);  //Hardcoded CLEAR_DAY Skycon
    }
});

//Converting Degree Formats onClick
function celciusToFahrenheit (tempInCelcius) {

    if (temperatureSpan.textContent === '°C') {
        let tempInFahrenheit = tempInCelcius.innerHTML * (9/5) + 32;
        document.querySelector('.temperature-degree').textContent = tempInFahrenheit;
        document.getElementById('unit').innerHTML = "F";
        
    } else {
        let tempInCelcius = (document.getElementById('temp').innerHTML - 32) * (5/9) ;
        document.querySelector('.temperature-degree').textContent = tempInCelcius;
        document.getElementById('unit').innerHTML = "°C";
        }
}
