package com.example.weatherapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;

@Service
public class WeatherService {
    
    @Value("${weather.api.key}")
    private String apiKey;
    
    @Value("${weather.api.base-url}")
    private String baseUrl;
    
    private final RestTemplate restTemplate;
    
    public WeatherService() {
        this.restTemplate = new RestTemplate();
    }
    
    public Map<String, Object> getCurrentWeather(String city) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/weather")
                .queryParam("q", city)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .toUriString();
        
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            Map<String, Object> weatherData = response.getBody();
            
            if (weatherData == null) {
                throw new RuntimeException("No weather data received");
            }
            
            Map<String, Object> main = (Map<String, Object>) weatherData.get("main");
            Map<String, Object> weather = ((List<Map<String, Object>>) weatherData.get("weather")).get(0);
            Map<String, Object> wind = (Map<String, Object>) weatherData.get("wind");
            
            Map<String, Object> result = new HashMap<>();
            result.put("city", weatherData.get("name"));
            result.put("temperature", main.get("temp"));
            result.put("feelsLike", main.get("feels_like"));
            result.put("humidity", main.get("humidity"));
            result.put("pressure", main.get("pressure"));
            result.put("windSpeed", wind.get("speed"));
            result.put("condition", weather.get("description"));
            
            return result;
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch weather data: " + e.getMessage());
        }
    }
    
    public Map<String, Object> getForecast(String city) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/forecast")
                .queryParam("q", city)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .toUriString();
        
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            Map<String, Object> forecastData = response.getBody();
            
            if (forecastData == null) {
                throw new RuntimeException("No forecast data received");
            }
            
            List<Map<String, Object>> list = (List<Map<String, Object>>) forecastData.get("list");
            List<Map<String, Object>> forecasts = new ArrayList<>();
            
            // Group by date and get daily max/min
            Map<String, Map<String, Object>> dailyData = new LinkedHashMap<>();
            
            for (Map<String, Object> item : list) {
                String date = ((String) item.get("dt_txt")).split(" ")[0];
                Map<String, Object> main = (Map<String, Object>) item.get("main");
                Map<String, Object> weather = ((List<Map<String, Object>>) item.get("weather")).get(0);
                
                if (!dailyData.containsKey(date)) {
                    Map<String, Object> dayData = new HashMap<>();
                    dayData.put("date", date);
                    dayData.put("maxTemp", main.get("temp_max"));
                    dayData.put("minTemp", main.get("temp_min"));
                    dayData.put("condition", weather.get("description"));
                    dailyData.put(date, dayData);
                } else {
                    Map<String, Object> dayData = dailyData.get(date);
                    double currentMax = ((Number) dayData.get("maxTemp")).doubleValue();
                    double currentMin = ((Number) dayData.get("minTemp")).doubleValue();
                    double newMax = ((Number) main.get("temp_max")).doubleValue();
                    double newMin = ((Number) main.get("temp_min")).doubleValue();
                    
                    if (newMax > currentMax) {
                        dayData.put("maxTemp", newMax);
                    }
                    if (newMin < currentMin) {
                        dayData.put("minTemp", newMin);
                    }
                }
            }
            
            forecasts.addAll(dailyData.values());
            
            Map<String, Object> result = new HashMap<>();
            result.put("city", forecastData.get("city"));
            result.put("forecasts", forecasts.subList(0, Math.min(5, forecasts.size())));
            
            return result;
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch forecast data: " + e.getMessage());
        }
    }
}

