const api ={
    key: '3b1111b30078451741d147ccef600736',
    base: 'https://api.openweathermap.org/data/2.5/',
    lang: 'pt_br',
}

const searchInput = document.querySelector('.search')
const btn = document.querySelector('.search-button');
const locale = document.querySelector('.locale');
const temperature = document.querySelector('.temperature')
const time = document.querySelector('.time')
const icon = document.querySelector('.icon')
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.wind-speed')

btn.addEventListener('click', e =>{
    searchResults(searchInput.value)
})

searchInput.addEventListener('keypress', enter)

function enter(event){
    key = event.keyCode
    if(key === 13){
        searchResults(searchInput.value)
    }
}



window.addEventListener('load', () => {
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(setPosition, showError)
    }
    else{
        alert('navegador não suporta geolocalização')
    }

    function setPosition(position){

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        coordRestuls(lat, lon)
        console.log(lat, lon)
    }

    function showError(e){
        alert(`erro: ${e.message}`)
    }
})


function coordRestuls(lat, long){
    fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&appid=${api.key}`)
    .then(response => {
        if(!response.ok){
            throw new Error(`http error: status ${response.status}`)
        }
        return response.json()
    })
    .catch(error => {
        alert(error)
    })
    .then(response =>{
        displayResults(response)
    });
}


function searchResults(city){

    fetch(`${api.base}weather?q=${city}&lang=${api.lang}&appid=${api.key}`)
    .then(response => {
        if(!response.ok){
            throw new Error(`http error: status ${response.status}`)
        }
        return response.json()
    })
    .catch(error => {
        alert('Cidade não encontrada, digite novamente')
    })
    .then(response =>{
        displayResults(response)
    });

}

function displayResults(weather){
    console.log(weather)


    // locale.innerHTML = `${weather.name}, ${weather.sys.country}`;
    // temperature.innerHTML = tempInCelsius + ' °C'

    let iconName = weather.weather[0].icon
    // console.log(icon)
    // time.innerHTML = weather.weather[0].description + `<img src="/images/${iconName}.png" >`
        let temp = Math.round(weather.main.temp)

        locale.innerHTML = weather.name + ', ' + weather.sys.country
        temperature.innerText = (temp - 273.15).toFixed(1) + ' °C';
        humidity.innerHTML = `Umidade: ${weather.main.humidity} %`
        windSpeed.innerHTML = `Vento: ${weather.wind.speed} km/h`
        
        time.innerHTML = weather.weather[0].description[0].toUpperCase() + weather.weather[0].description.substr(1) + `<img src=" http://openweathermap.org/img/wn/${iconName}@2x.png" width="50px">`
    

    const body = document.querySelector('body')

    

        if(!iconName.includes('n')){
            body.style.background = 'url(images/sun.png) no-repeat'
            body.style.backgroundPositionX = 'left'
            body.style.backgroundColor = "#42C2FF"
        }else{
            body.style.background = 'url(images/moon.png) no-repeat'
            body.style.backgroundPositionX = 'right'
            body.style.backgroundColor = "#712B75" 
        }
    

    console.log(weather.weather[0].value)
    
}


