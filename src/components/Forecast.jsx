import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Cloud, Sun, CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';

class Forecast extends Component {
  getWeatherIcon = (code) => {
    if (code <= 3) return <Sun className="text-yellow-400 mx-auto drop-shadow" size={32} />;
    if (code <= 48) return <Cloud className="text-white mx-auto drop-shadow" size={32} />;
    return <CloudRain className="text-blue-300 mx-auto drop-shadow" size={32} />;
  };

  formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  render() {
    const { forecast, loading } = this.props;

    if (loading || !forecast || forecast.length === 0) return null;

    // Open-Meteo returns 7 days of forecast.
    const containerVariants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    };

    return (
      <div className="max-w-4xl mx-auto mt-8">
        <h3 className="text-white font-semibold text-xl mb-4 ml-2">7-Day Forecast</h3>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3"
        >
          {forecast.map((day, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-panel rounded-2xl p-4 text-center hover:bg-white/80 transition-colors"
            >
              <p className="text-sm font-medium text-slate-800 mb-3">{this.formatDate(day.time)}</p>
              <div className="my-3">
                {this.getWeatherIcon(day.weathercode)}
              </div>
              <div className="flex justify-center gap-3 mt-3">
                <span className="font-bold text-slate-900">{Math.round(day.maxTemp)}°</span>
                <span className="font-medium text-slate-500">{Math.round(day.minTemp)}°</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  forecast: state.weather.forecast,
  loading: state.weather.loading
});

export default connect(mapStateToProps)(Forecast);
