import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from '../redux/actions/weatherActions';
import { Cloud, Sun, CloudRain, Wind, Droplets, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

class CurrentWeather extends Component {
  componentDidMount() {
    const { location } = this.props;
    this.props.fetchWeather(location.lat, location.lon);
  }

  getWeatherIcon = (code) => {
    if (code <= 3) return <Sun className="text-yellow-400 w-24 h-24 drop-shadow-lg" />;
    if (code <= 48) return <Cloud className="text-white w-24 h-24 drop-shadow-lg" />;
    return <CloudRain className="text-blue-300 w-24 h-24 drop-shadow-lg" />;
  };

  render() {
    const { currentWeather, location, loading } = this.props;

    if (loading || !currentWeather) return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-8 text-white mt-8 max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start text-white/80 mb-2">
              <MapPin size={20} className="mr-1" />
              <h2 className="text-xl font-medium tracking-wide">
                {location.name} {location.country ? `, ${location.country}` : ''}
              </h2>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
              {this.getWeatherIcon(currentWeather.weathercode)}
              <div>
                <h1 className="text-7xl font-bold tracking-tighter">
                  {Math.round(currentWeather.temperature)}°
                </h1>
                <p className="text-xl font-medium text-white/90 capitalize mt-1">
                  {currentWeather.weathercode <= 3 ? 'Clear / Partly Cloudy' : 'Precipitation'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 bg-black/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Wind className="text-blue-200" size={28} />
              <div>
                <p className="text-sm text-white/70 font-medium">Wind Speed</p>
                <p className="text-lg font-bold">{currentWeather.windspeed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="text-blue-200" size={28} />
              <div>
                <p className="text-sm text-white/70 font-medium">Direction</p>
                <p className="text-lg font-bold">{currentWeather.winddirection}°</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentWeather: state.weather.currentWeather,
  location: state.weather.location,
  loading: state.weather.loading
});

export default connect(mapStateToProps, { fetchWeather })(CurrentWeather);
