import React, { Component } from 'react';
import { CloudLightning } from 'lucide-react';
import WeatherSearch from './components/WeatherSearch';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';

class App extends Component {
  render() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-900 px-4 py-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        
        <header className="max-w-4xl mx-auto mb-10 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CloudLightning className="text-yellow-300" size={36} />
            <h1 className="text-4xl font-extrabold text-white tracking-tight">SkyCast</h1>
          </div>
          <p className="text-blue-100 font-medium text-lg">Your precision weather companion</p>
        </header>

        <main className="relative z-10">
          <WeatherSearch />
          <CurrentWeather />
          <Forecast />
        </main>
      </div>
    );
  }
}

export default App;
