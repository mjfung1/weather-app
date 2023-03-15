// use app.js for DOM manipulation
// use forecast.js for API interaction

const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    if (!data) return;
    
    // destructure properties => refactored from above
    const {cityDets, weather} = data;

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    // same as ternary above

    time.setAttribute('src', timeSrc);



    // remove the d-none class if present
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }

}


const updateCity = async (city) => {
    
    
    try {
        const cityDets = await getCity(city);
    
        const weather = await getWeather(cityDets.Key);
    
        return { cityDets, weather };

    } catch (err) {
        console.log({err});
    }

};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);

});

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem("city"))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
} else {

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
    getLocation()
}



async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
}


async function showPosition(position) {
    
    try {
        const {latitude, longitude} = position.coords;
        const key = 'NihuSR8lby2VMupERIxezrl5VPRl2mVK';
        const base = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search"
        const query = `?apikey=${key}&q=${latitude + "," + longitude}&language=en-us&details=false&toplevel=false`;
    
        const response = await fetch(base + query, {mode:"no-cors"});
        const data = await response.json();
    
        updateCity(data.Key)
            .then(data => updateUI(data))
            .catch(err => console.log(err));
    
        // set local storage
        localStorage.setItem('city', data.Key);

    }catch (err) {
        console.log({err});
    }
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})