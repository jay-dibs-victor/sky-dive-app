import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchLocation, setLocation, fetchWeather } from '../redux/actions/weatherActions';
import { Search, MapPin } from 'lucide-react';

class WeatherSearch extends Component {
  state = {
    query: '',
    showResults: false
  };

  handleSearch = (e) => {
    this.setState({ query: e.target.value, showResults: true });
    if (e.target.value.length > 2) {
      this.props.searchLocation(e.target.value);
    }
  };

  handleSelect = (location) => {
    this.props.setLocation({
      name: location.name,
      lat: location.latitude,
      lon: location.longitude,
      country: location.country
    });
    this.setState({ query: '', showResults: false });
    this.props.fetchWeather(location.latitude, location.longitude);
  };

  render() {
    const { searchResults } = this.props;
    const { query, showResults } = this.state;

    return (
      <div className="relative w-full max-w-md mx-auto z-50">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 rounded-full py-3 px-12 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            placeholder="Search city..."
            value={query}
            onChange={this.handleSearch}
            onBlur={() => setTimeout(() => this.setState({ showResults: false }), 200)}
          />
          <Search className="absolute left-4 top-3.5 text-white/70" size={20} />
        </div>

        {showResults && searchResults.length > 0 && query.length > 2 && (
          <div className="absolute w-full mt-2 bg-white rounded-xl shadow-2xl overflow-hidden text-slate-800 border border-slate-100">
            {searchResults.map((result, idx) => (
              <div
                key={idx}
                className="flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-slate-100 last:border-0"
                onClick={() => this.handleSelect(result)}
              >
                <MapPin size={16} className="text-blue-500 mr-3" />
                <div>
                  <div className="font-semibold">{result.name}</div>
                  <div className="text-xs text-slate-500">{result.admin1 ? `${result.admin1}, ` : ''}{result.country}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResults: state.weather.searchResults
});

const mapDispatchToProps = {
  searchLocation,
  setLocation,
  fetchWeather
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherSearch);
