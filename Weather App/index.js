const searchInput = document.querySelector('.search-input')
const form = document.querySelector('.form-container')
const tempValue = document.querySelector('.temperature-value')
const cityValue = document.querySelector('.city-value')
const i = document.querySelector('.weather-icon')
const conditionText = document.querySelector('.condition-text')
const errormessage = document.querySelector('.error')
const container = document.querySelector('.container')
const forecastTempDay1 = document.querySelector('.max-min-temp1');
const forecastTempDay2 = document.querySelector('.max-min-temp2');
const forecastTempDay3 = document.querySelector('.max-min-temp3');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const value = e.target[0].value;
    const apiKey = "7594f7e0356b4abab36132201231208"
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${value}&days=3&aqi=no&alerts=no`
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => getTemp(data))
    .catch(e=>{
        errormessage.textContent = "There must be something please try again later / Make sure you typed the name of the city or the country correctly"
        console.log(e)
    })
    searchInput.value = "";
})
function getTemp(infos){
    conditionText.textContent = infos.current.condition.text
    const temperature = infos.current.temp_c
    const city = infos.location.name
    console.log(infos);
    //All forecast script

    const maxTemp1 = infos.forecast.forecastday[0].day.maxtemp_c
    const minTemp1 = infos.forecast.forecastday[0].day.mintemp_c
    forecastTempDay1.textContent = `${maxTemp1} - ${minTemp1}`
    const ic1 = infos.forecast.forecastday[0].day.condition.icon
    i.setAttribute('src',`https:${ic1}`)
    const maxTemp2 = infos.forecast.forecastday[1].day.maxtemp_c
    const minTemp2 = infos.forecast.forecastday[1].day.mintemp_c
    forecastTempDay2.textContent = `${maxTemp2} - ${minTemp2}`
    const ic2 = infos.forecast.forecastday[1].day.condition.icon
    i.setAttribute('src',`https:${ic2}`)
    const maxTemp3 = infos.forecast.forecastday[2].day.maxtemp_c
    const minTemp3 = infos.forecast.forecastday[2].day.mintemp_c
    forecastTempDay3.textContent = `${maxTemp3} - ${minTemp3}`
    const ic3 = infos.forecast.forecastday[2].day.condition.icon
    i.setAttribute('src',`https:${ic3}`)

    tempValue.textContent = `${temperature}°`
    cityValue.textContent = city;
    const isDay = infos.current.is_day;
    if(isDay===0){
        document.body.classList.add('night-time')
        document.body.classList.remove('day-time')
    }else{
        document.body.classList.add('day-time')
        document.body.classList.remove('night-time')  
    }
    
}
