'use client';

export default function ForecastList({ forecast }) {
  if (!forecast || !forecast.forecasts || forecast.forecasts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Forecast</h3>
        <p className="text-gray-500">No forecast data available</p>
      </div>
    );
  }

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.forecasts.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{getWeatherIcon(item.condition)}</span>
              <div>
                <p className="font-semibold text-gray-800">
                  {formatDate(item.date)}
                </p>
                <p className="text-sm text-gray-600">{item.condition}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-primary-600">
                {item.maxTemp}°C
              </p>
              <p className="text-sm text-gray-500">{item.minTemp}°C</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

