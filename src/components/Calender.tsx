import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fetchCalendarEvents, CalendarEvent } from '../util/requests';
import moment from 'moment';
import { useInterval } from '../util/hooks';

const ONE_MINUTE = 60000;

const Calender = (): JSX.Element => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const getEvents = async () => {
    const calendarEvents = await fetchCalendarEvents();
    const today = moment().utc(true).format().split('T')[0];
    const todaysEvents = calendarEvents.filter((event) => event.date === today);
    setEvents(todaysEvents);
  };

  useEffect(() => {
    getEvents();
  }, []);

  useInterval(() => {
    getEvents();
  }, ONE_MINUTE * 30);

  return (
    <View style={styles.container}>
      {events.map((event: CalendarEvent, index: number) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventText}>{event.name}</Text>
          {event.start && <Text style={styles.eventText}>{event.start}</Text>}
          {event.start && <Text style={styles.eventText}>-</Text>}
          {event.end && <Text style={styles.eventText}>{event.end}</Text>}
        </View>
      ))}
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  container: {},
  eventContainer: {
    flexDirection: 'row',
  },
  eventText: {
    fontSize: 25,
    padding: 5,
    color: 'white',
  },
});
