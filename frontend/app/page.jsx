'use client';

import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import axios from 'axios';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWeather = async (cityName) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`/api/weather/current?city=${encodeURIComponent(cityName)}`),
        axios.get(`/api/weather/forecast?city=${encodeURIComponent(cityName)}`),
      ]);
      
      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchWeather(city);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>

      {weather && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <WeatherCard weather={weather} />
          </div>
          <div className="lg:col-span-2">
            {forecast && <ForecastList forecast={forecast} />}
          </div>
        </div>
      )}

      {!weather && !loading && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl mb-2">Welcome to Weather Platform</p>
          <p>Enter a city name above to get started</p>
        </div>
      )}
    </div>
  );
}

