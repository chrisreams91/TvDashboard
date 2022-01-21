import axios from 'axios';

export interface Day {
  number: 1;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: null;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

export interface WeatherResponse {
  properties: {
    periods: Day[];
  };
}

export const fetchWeather = async (): Promise<WeatherResponse> => {
  const result = await axios.get(
    'https://api.weather.gov/gridpoints/LSX/84,70/forecast',
  );

  console.log(result);
  return result.data;
};
