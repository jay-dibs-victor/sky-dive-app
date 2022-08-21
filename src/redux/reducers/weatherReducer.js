const initialState = {
  currentWeather: null,
  forecast: [],
  location: { name: 'London', lat: 51.5074, lon: -0.1278 },
  loading: false,
  error: null,
  searchResults: []
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_WEATHER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_WEATHER_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        currentWeather: action.payload.current,
        forecast: action.payload.daily 
      };
    case 'FETCH_WEATHER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SEARCH_LOCATION_SUCCESS':
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

export default weatherReducer;
