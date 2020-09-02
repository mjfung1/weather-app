const key = 'NihuSR8lby2VMupERIxezrl5VPRl2mVK';


// get weather information
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];


};


// get city information
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    // fetches data for API & convert to json
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};


// testing
// getCity('caracas').then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// }).catch(err => console.log(err));

// getWeather('329260');