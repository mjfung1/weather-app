const key = 'NihuSR8lby2VMupERIxezrl5VPRl2mVK';


// get weather information
const getWeather = async (id) => {
    
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`
    
    try {
        const response = await fetch(base + query);
        const data = await response.json();
        
        return data[0];

    } catch (err) {
        console.log({err})
    }

};

// http://dataservice.accuweather.com/locations/v1/cities/search?apikey=NihuSR8lby2VMupERIxezrl5VPRl2mVK&q=bronx
// get city information
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    // fetches data for API & convert to json
    
    try {
        const response = await fetch(base + query);
        const data = await response.json();

        return data[0];
        
    } catch (err) {
        console.log({err});
    }

};

