'use client';

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return '☀️';
    } else if (conditionLower.includes('cloud')) {
      return '☁️';
    } else if (conditionLower.includes('rain')) {
      return '🌧️';
    } else if (conditionLower.includes('snow')) {
      return '❄️';
    } else if (conditionLower.includes('storm')) {
      return '⛈️';
    }
    return '🌤️';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center">
        <div className="text-6xl mb-4">{getWeatherIcon(weather.condition)}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {weather.city}
        </h2>
        <p className="text-gray-600 mb-4">{weather.condition}</p>
        <div className="text-5xl font-bold text-primary-600 mb-4">
          {weather.temperature}°C
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-600">Feels Like</p>
            <p className="text-xl font-semibold">{weather.feelsLike}°C</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="text-xl font-semibold">{weather.humidity}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="text-xl font-semibold">{weather.windSpeed} km/h</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Pressure</p>
            <p className="text-xl font-semibold">{weather.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

