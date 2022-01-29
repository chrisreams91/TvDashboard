import axios from 'axios';
import { apiKey, calendarId } from '../../secrets.json';
import moment from 'moment';

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

export interface CalendarEventResponse {
  summary: string;
  start: { dateTime: string; date: string };
  end: { dateTime: string; date: string };
}

export interface CalendarEvent {
  name: string;
  date: string;
  start: string | undefined;
  end: string | undefined;
}

export const fetchCalendarEvents = async (): Promise<CalendarEvent[]> => {
  const response = await axios.get(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`,
  );

  const { items } = response.data;

  const transformed = items.map((item: CalendarEventResponse) => {
    const date = item.start.dateTime?.split('T')[0] || item.start.date;
    const start =
      item.start.dateTime && moment(item.start.dateTime).format('hA');
    const end = item.end.dateTime && moment(item.end.dateTime).format('hA');

    return {
      name: item.summary,
      date,
      start,
      end,
    };
  });

  return transformed;
};
