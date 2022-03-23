let queryString = document.location.search
let queryStringSplit = queryString.split('&')
let latitude = queryStringSplit[0].split('=')
let longitude = queryStringSplit[1].split('=')

const astroApiSecret = '6f14831c8a735ba5d7c78419de6f4bd9a270586412858868719ccdb6c3ddf7f6f70d3f443c9b23b35acecacdadd9f74cefc634489ee774930c3150d63b1116b8ffd176c694ec0c8c9288fb86cd4c9fa84c3a7cf78d1f501292fe3eb8113b32dc19816d4f77e35c4977b00a527d9bc829'
const astroApiId = '1ef02872-a5fd-4790-bebe-b572308c9bb6'
const hash = btoa(`${astroApiId}:${astroApiSecret}`);

let startDate = moment().format("YYYY-MM-DD, 00:00:00")
let endDate = moment().add(3, 'days').format("YYYY-MM-DD, 23:59:59")
let fromDate = moment(startDate).format('YYYY-MM-DD')
let titleDate = moment(startDate).format('dddd, MMM Do YYYY')
let toDate = moment(endDate).format("YYYY-MM-DD")
let time = moment(startDate).format('HH:mm:ss')
let titleTime = moment(startDate).format('LT')
document.querySelector('#currentDay').textContent = `${titleDate}, ${titleTime}`
let forecasting = document.querySelector("#3dayForcast")
let weathDate = 0
let weathTime = moment(startDate).format('H')


// random lat and long to use in the location
const generateWeather =()=>{
//** start of get weather function
var weatherAPIKEY =  '27bbc4e6b84a47d1b13160933221101' ;

// this parameter will change, depending to input from user 
// var weatherLOCNUM = '30.542747,-97.550011' ;
var weatherLOCNUM;

// save a copy of the data received from API call
var weatherDATA;

// function will add latitude and longitude parameters in one single string
function getWeatherParam (){
  var lat = latitude[1].toString();
  var lon = longitude[1].toString();

  weatherLOCNUM = lat.concat(",",lon);
}

// Get weather function 
// will grab weather information from API based on weatherLOCNUM
// data responds in current, forecast , location
function getWeather () {
  // get latitude and longitude in one string
  getWeatherParam();

  //start fetch
    fetch('https://api.weatherapi.com/v1/forecast.json?key=' + weatherAPIKEY + '&q=' + weatherLOCNUM + '&days=3')
    
      .then(function(response){
        if (response.ok){

          response.json()
            .then(function(data) {
              // save data to global parameter to use in display function
              weatherDATA = data;
            console.log(weatherDATA)
              // moon phases, sunrise, susnset by day
            //   console.log("Moon Phase " + data.forecast.forecastday[0].astro.moon_phase);
            //   console.log("Moonrise time "+ data.forecast.forecastday[0].astro.moonrise);
            //   console.log("Moonset time " + data.forecast.forecastday[0].astro.moonset);
            //   console.log("Sunrise time " + data.forecast.forecastday[0].astro.sunrise);
            //   console.log("Sunset time " + data.forecast.forecastday[0].astro.sunset);
              
              // display weather on results page
              weatherDATAdisplay();
          });
        } else {
        //   console.log("error");
        }
      })
} 
// end of getWeather

getWeather(); 


// these variables will change depeending on user input/slider
var weatherDAY = weathDate; //present = 0, one day in future = 1, two day in future =2
var weatherTIME = weathTime; // military time 0 - 23

// global parameters used on weather display
var Wind = "Wind: ";
var Humidity = "Humidity: ";
var Rain = "Chance of Rain: ";
var sckyCondition = "SKY Condition: ";
var mph = " mph";
var persentageIcon = "%";
var icon = "https:";

var weatherDisplay = document.querySelector('.weather');
weatherDisplay.innerHTML = ''
var iconEl = document.createElement('img');
var projectRow = document.createElement('ul');
var TemperatureEl = document.createElement('li');
var TemperatureEl2 = document.createElement('li');
var WindEl = document.createElement('li');
var RainEl = document.createElement('li');
var HumidityEl = document.createElement('li');
var skyConditionEl = document.createElement('li');

// function will Display weather on results page
// needs the parameters of date and time to pull data from the weatherDATA
// weatherDAY , weatherTIME
function weatherDATAdisplay (){
  var weatherE1;
 
//   console.log("weatherDATA ");
//   console.log(weatherDATA);

  // display icon
  weatherE1 = weatherDATA.forecast.forecastday[weatherDAY].hour[weatherTIME].condition.icon;
  iconEl.src = icon + weatherE1;

  // display temperature
  weatherE1 = weatherDATA.forecast.forecastday[weatherDAY].hour[weatherTIME].temp_f;
  TemperatureEl.textContent = weatherE1;
  TemperatureEl2.textContent = "Temperature";

  // display wind speed
  weatherE1 = weatherDATA.forecast.forecastday[weatherDAY].hour[weatherTIME].wind_mph;
  WindEl.textContent = Wind + weatherE1 + mph;

  // display humidity
  weatherE1 = weatherDATA.forecast.forecastday[weatherDAY].hour[weatherTIME].humidity;
  HumidityEl.textContent = Humidity + weatherE1 + persentageIcon;

  // display precipitation percentage
  weatherE1 = weatherDATA.forecast.forecastday[weatherDAY].hour[weatherTIME].chance_of_rain;
  RainEl.textContent = Rain + weatherE1 + persentageIcon;

  // display skycondition
  weatherE1 = weatherDATA.forecast.forecastday[weatherDAY].hour[weatherTIME].condition.text;
  skyConditionEl.textContent = sckyCondition + weatherE1;

  populateBanner(weatherE1); // sends weather conditions to results banner

  // append to list
  projectRow.append(
      TemperatureEl,
      TemperatureEl2,
      WindEl,
      HumidityEl,
      RainEl,
      skyConditionEl);

  // append list to the results page
  weatherDisplay.append(iconEl,projectRow);
  weathersetAtributes();
}
// end of weatherDATAdisplay
function weatherforecastDisplay(){
    for(var i = 0; i< weatherDATA.forecast.forecastday.length; i++){
        
    }
}
function weathersetAtributes(){
  // set weather atributes
    iconEl.setAttribute("style", "width:100% ");
    TemperatureEl.setAttribute("style", "font-size: 40px; font-weight: bold");
    TemperatureEl2.setAttribute("style", "font-size: 18px; font-weight: bold");
    projectRow.setAttribute("style", "font-size: 12px");
}
// end of weather atributes

// banner loudly declares if planets are visible or not, depending on sky conditions
function populateBanner(conditions) {
  var conditions = conditions.toLowerCase();
  var bannerHeader = document.querySelector(".bannerText");
  var visibilityEl = document.querySelector(".visibility");
//   console.log("weather conditions: " + conditions);

  if (conditions == "sunny" || conditions == "clear") {
    // display "all-clear" banner
    bannerHeader.textContent = "All clear! The following planets are visible:";
    visibilityEl.style.backgroundColor = "blue";
  } else if (conditions.includes("patchy") || conditions.includes("partly")) {
    // display "possible" banner
    bannerHeader.textContent = "Sky conditions are spotty, but the following planets may be visible:";
    visibilityEl.style.backgroundColor = "purple";
  } else {
    // display "no visibility banner"
    bannerHeader.textContent = "Sky conditions are poor. The following planets cannot be seen:"
    visibilityEl.style.backgroundColor = "red";
  }
}
}


const timeChange = document.querySelector('#timeChange')
timeChange.addEventListener('input',(e)=>{
  
  time = moment(fromDate).add(e.target.value, 'hours').format('HH:mm:ss')
  titleTime = moment(fromDate).add(e.target.value, 'hours').format('LT')
  weathTime = moment(fromDate).add(e.target.value, 'hours').format('H')

  if(e.target.value === '24'){
    startDate= moment().add(1, 'days').format("YYYY-MM-DD, 00:00:00")
    weathDate = 1
  }
  if(e.target.value === '48'){
    startDate= moment().add(2, 'days').format("YYYY-MM-DD, 00:00:00")
    weathDate = 2
  }

  if(e.target.value ==='47'){
    startDate = moment().add(1, 'day').format("YYYY-MM-DD, 00:00:00")
    weathDate = 1
  }
  if(e.target.value ==='23'){
    startDate = moment().format("YYYY-MM-DD, 00:00:00")
    weathDate = 0
  }

  if(e.target.value === '72'){
    startDate= moment().add(3, 'days').format("YYYY-MM-DD, 00:00:00")
  }


  titleDate = moment(startDate).format('dddd, MMM Do YYYY')
  document.querySelector('#currentDay').textContent = `${titleDate}, ${titleTime}`

  
  getPlanetInfo()
  generateWeather()
})
generateWeather()


