import axios from 'axios';

export const fetchWeather = (lat, lon) => async (dispatch) => {
  dispatch({ type: 'FETCH_WEATHER_REQUEST' });
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
        daily: 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset',
        timezone: 'auto'
      }
    });

    const current = response.data.current_weather;
    const daily = response.data.daily.time.map((time, index) => ({
      time,
      maxTemp: response.data.daily.temperature_2m_max[index],
      minTemp: response.data.daily.temperature_2m_min[index],
      weathercode: response.data.daily.weathercode[index]
    }));

    dispatch({ 
      type: 'FETCH_WEATHER_SUCCESS', 
      payload: { current, daily } 
    });
  } catch (error) {
    dispatch({ type: 'FETCH_WEATHER_FAILURE', payload: 'Failed to fetch weather data' });
  }
};

export const searchLocation = (query) => async (dispatch) => {
  try {
    const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: query,
        count: 5,
        language: 'en',
        format: 'json'
      }
    });
    
    if (response.data.results) {
      dispatch({ type: 'SEARCH_LOCATION_SUCCESS', payload: response.data.results });
    }
  } catch (error) {
    console.error('Location search failed', error);
  }
};

export const setLocation = (location) => ({
  type: 'SET_LOCATION',
  payload: location
});
