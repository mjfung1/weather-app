const key = 'NihuSR8lby2VMupERIxezrl5VPRl2mVK';

const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    // fetches data for API & convert to json
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};

getCity('new york')
    .then(data => console.log(data))
    .catch(err => console.log(err));