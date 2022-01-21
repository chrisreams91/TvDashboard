import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Calender = (): JSX.Element => {
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    const getEvents = async () => {};

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
