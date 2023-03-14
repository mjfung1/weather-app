const key = 'NihuSR8lby2VMupERIxezrl5VPRl2mVK';


// get weather information
const getWeather = async (id) => {
    
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`
    const response = await fetch(base + query);
    const data = await response.json();
    
    console.log("getweather", data[0])
    return data[0];


};

// http://dataservice.accuweather.com/locations/v1/cities/search?apikey=NihuSR8lby2VMupERIxezrl5VPRl2mVK
// get city information
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    // fetches data for API & convert to json
    
    try {
        const response = await fetch(base + query);
        const data = await response.json();
        console.log("from getcity", data[0]);
        return data[0];
        
    } catch (err) {
        console.log({err});
    }

};


// testing
// getCity('caracas').then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// }).catch(err => console.log(err));

// getWeather('329260');