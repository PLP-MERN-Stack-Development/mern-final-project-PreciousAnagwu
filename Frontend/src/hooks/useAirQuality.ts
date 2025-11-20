import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface AirQualityData {
  aqi: number;
  city: string;
  country: string;
  pollutant: string;
  timestamp: string;
  category:
    | 'Good'
    | 'Moderate'
    | 'Unhealthy for Sensitive Groups'
    | 'Unhealthy'
    | 'Very Unhealthy'
    | 'Hazardous';
  color: string;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

export const useAirQuality = () => {
  const [data, setData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);

  const API_KEY = '010e0bd936d2a5603d2d20330048a881'; // Your OpenWeatherMap API key

  const getAQICategory = (aqi: number): AirQualityData['category'] => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getAQIColor = (aqi: number): string => {
    if (aqi <= 50) return 'hsl(var(--secondary))'; // Green
    if (aqi <= 100) return 'hsl(48, 96%, 53%)'; // Yellow
    if (aqi <= 150) return 'hsl(36, 100%, 50%)'; // Orange
    if (aqi <= 200) return 'hsl(0, 84%, 60%)'; // Red
    if (aqi <= 300) return 'hsl(280, 100%, 41%)'; // Purple
    return 'hsl(0, 0%, 30%)'; // Maroon
  };

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const result = await response.json();
      return {
        temperature: result.main.temp,
        humidity: result.main.humidity,
        windSpeed: result.wind.speed,
      };
    } catch {
      return { temperature: 24, humidity: 65, windSpeed: 12 }; // fallback
    }
  };

  const fetchAirQuality = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch Air Pollution (AQI)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch air quality data');

      const result = await response.json();

      if (!result.list || result.list.length === 0) {
        throw new Error('No AQI data available');
      }

      const owmData = result.list[0];
      const pm25 = owmData.components.pm2_5 || 10;
      const aqi = Math.round(pm25 * 2); // simplified AQI scale conversion

      // Fetch weather metrics
      const weatherData = await fetchWeather(lat, lon);

      const airQualityData: AirQualityData = {
        aqi,
        city: 'Nearby Area',
        country: 'Local',
        pollutant: 'PM2.5',
        timestamp: new Date().toISOString(),
        category: getAQICategory(aqi),
        color: getAQIColor(aqi),
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        windSpeed: weatherData.windSpeed,
      };

      setData(airQualityData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch air quality data';
      setError(errorMessage);
      toast.error(errorMessage);

      // Fallback to simulated data
      const simulatedAQI = 42;
      setData({
        aqi: simulatedAQI,
        city: 'Your Location',
        country: 'Local Area',
        pollutant: 'PM2.5',
        timestamp: new Date().toISOString(),
        category: getAQICategory(simulatedAQI),
        color: getAQIColor(simulatedAQI),
        temperature: 24,
        humidity: 65,
        windSpeed: 12,
      });
    } finally {
      setLoading(false);
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(newLocation);
        fetchAirQuality(newLocation.latitude, newLocation.longitude);
      },
      () => {
        toast.error('Unable to get your location. Using default location.');
        const defaultLocation = { latitude: 40.7128, longitude: -74.0060 };
        setLocation(defaultLocation);
        fetchAirQuality(defaultLocation.latitude, defaultLocation.longitude);
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return {
    data,
    loading,
    error,
    location,
    refetch: requestLocation,
  };
};
