// use app.js for DOM manipulation
// use forecast.js for API interaction

const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');


const updateUI = (data) => {
    
    // console.log(data)
    // const cityDets = data.cityDets;
    // const weather = data.weather;

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

    // remove the d-none class if present
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }

}


const updateCity = async (city) => {
    
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };

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
        .catch(err => console.log(err))

})