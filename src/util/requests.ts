import axios from 'axios';
import { apiKey, calendarId } from '../../secrets.json';

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
  return result.data;
};

export interface CalendarEvent {
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
}

export const fetchCalendarEvents = async (): Promise<CalendarEvent[]> => {
  const response = await axios.get(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`,
  );
  return response.data.items;
};
