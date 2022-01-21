import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fetchWeather, Day } from '../util/requests';
import * as _ from 'lodash';

const Weather = (): JSX.Element => {
  const [weather, setWeather] = useState<Day[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await fetchWeather();
      const firstThree = _.take(weatherData.properties.periods, 3);
      setWeather(firstThree);
    };
    fetchData();
  }, []);

  return (
    <>
      {weather.map((day) => (
        <View key={day.startTime} style={styles.container}>
          <Text>{day.name}</Text>
          <Text>{day.detailedForecast}</Text>
        </View>
      ))}
    </>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
