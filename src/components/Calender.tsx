import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fetchCalendarEvents } from '../util/requests';

const Calender = (): JSX.Element => {
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    const getEvents = async () => {
      const z = await fetchCalendarEvents();
      console.log(z[0]);
    };
    getEvents();
  }, []);

  return (
    <View style={styles.container}>
      {events.map((event: any) => (
        <Text>{JSON.stringify(event)}</Text>
      ))}
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  container: {},
});
