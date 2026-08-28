document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault()

    const cityName = document.querySelector('#city_name').value

    if(!cityName){
        document.querySelector("#weather").classList.remove('show')
        alert('Voce precisa digitar uma cidade...')

        return
    }
    const apiKey = 'e58c6877562f66cf491aa86545ca13d5'
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl)
    const json = await results.json()

    if(json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity

        })

        updateBackground(json.timezone, json.name)

    } else {
        document.querySelector("#weather").classList.remove('show')

        showAlert(`Não foi possível localizar essa cidade...
            
            <img src='src/images/404.svg'/>
            `)
    }


})

function showInfo(json) {
    showAlert('')

    document.querySelector("#weather").classList.add('show')

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`

    document.querySelector('#temp_description').innerHTML = `${json.description}`
    document.querySelector('#temp_img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg
}

const apiKey = 'e58c6877562f66cf491aa86545ca13d5'

function getHourCity(timezoneOffsetSeconds) {
    const dataLocal = new Date()
    const utcActualMs = dataLocal.getTime() + (dataLocal.getTimezoneOffset() * 60000)
    const dataCityMs = utcActualMs + (timezoneOffsetSeconds * 1000)
    const dataCity = new Date(dataCityMs)

    return dataCity.getUTCHours()
}

function updateBackground(timeZoneAPI, cityName) {
    const cityHour = getHourCity(timeZoneAPI)
    console.log(`Agora são aproximadamente ${cityHour} horas em ${encodeURI(cityName)}.`)

    const siteBody = document.querySelector('#backgroundImg')
    const tempBody = document.querySelector('#temp')

    if (cityHour >= 6 && cityHour < 12) {
        siteBody.setAttribute('src', 'src/images/day.png')
    } else if (cityHour >= 12 && cityHour < 18) {
        siteBody.setAttribute('src', 'src/images/afternoon.png')
    } else {
        siteBody.setAttribute('src', 'src/images/night.png')
    }

    if (cityHour >= 6 && cityHour < 12) {
        tempBody.style.background = "linear-gradient(90deg, #62c8cf, #46a7c5)"
    } else if (cityHour >= 12 && cityHour < 18) {
        tempBody.style.background = "linear-gradient(90deg, #9e3327, #cc9c33)"
    } else {
        tempBody.style.background = "linear-gradient(90deg, #290b30, #0f050c)"
    }

}

