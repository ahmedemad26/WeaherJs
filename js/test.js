
let day = document.querySelector("#day");
let dateName = document.querySelector("#date");
let monthDay = document.querySelector("#monthDay");
let Cuntry = document.querySelector("#Cuntry");
let temp = document.querySelector("#temp");
let imageDay = document.querySelector("#imageDay");
let feel = document.querySelector("#feel");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");
let direction = document.querySelector("#direction");


let search = document.querySelector("#search");



// ! Tomorrow Day

let tomorrowName = document.querySelector("#tomorrowName");
let tomorowImg = document.querySelector("#tomorowImg");
let towrrowDeg = document.querySelector("#towrrowDeg");
let towrrowTemp = document.querySelector("#towrrowTemp");
let towrrowHala = document.querySelector("#towrrowHala");
let tomorowDate = document.querySelector('#date-T');
// ~ After Day 

let afterName = document.querySelector("#afterName");
let afterImg = document.querySelector("#afterImg");
let afterDeg = document.querySelector("#afterDeg");
let afterTemp = document.querySelector("#afterTemp");
let afterHala = document.querySelector("#afterHala");





async function getWeather(cityName) {
    let weather =  await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4ff06884285e4c65a8d05442240607&q=${cityName}&days=3`);
    let weatherData = await weather.json() 
    console.log(weatherData);
    return weatherData;
}

function displayToday(data) {

    let todayDate = new Date();

    day.innerHTML = todayDate.toLocaleDateString('en-Us',{weekday:'long'})
    dateName.innerHTML = todayDate.getDate('')
    monthDay.innerHTML =todayDate.toLocaleDateString('en-Us',{month:'long'})
    Cuntry.innerHTML = data.location.name 
    temp.innerHTML = data.current.temp_c
    imageDay.setAttribute("src",data.current.condition.icon);
    feel.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    windSpeed.innerHTML = data.current.wind_kph+"Km"
    direction.innerHTML = data.current.wind_dir
}


function displayTomorrw(data) {

    let tomorowDay = new Date(data.forecast.forecastday[1].date);

    tomorrowName.innerHTML = tomorowDay.toLocaleDateString('en-Us',{weekday:'long'});
    tomorowImg.setAttribute("src",data.forecast.forecastday[1].day.condition.icon);
    towrrowDeg.innerHTML = data.forecast.forecastday[1].day.maxtemp_c
    towrrowTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c
    towrrowHala.innerHTML = data.forecast.forecastday[1].day.condition.text
}


function afterDay(data) {
    let afterDay = new Date(data.forecast.forecastday[2].date);

    afterName.innerHTML = afterDay.toLocaleDateString('en-Us',{weekday:'long'})

    afterImg.setAttribute("src",data.forecast.forecastday[2].day.condition.icon);
    afterDeg.innerHTML = data.forecast.forecastday[2].day.maxtemp_c
    afterTemp.innerHTML = data.forecast.forecastday[2].day.mintemp_c
    afterHala.innerHTML = data.forecast.forecastday[2].day.condition.text
}



async function StartWeather(city='Cairo') {
    let weatherData = await getWeather(city);
    if (!weatherData.error) {
        displayToday(weatherData);
        displayTomorrw(weatherData);
        afterDay(weatherData);
    }
    
}
StartWeather()


search.addEventListener("input",function(){
    StartWeather(search.value)
})