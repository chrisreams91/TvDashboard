import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { fetchWeather, Day } from '../util/requests';
import * as _ from 'lodash';

const Weather = (): JSX.Element => {
  const [weather, setWeather] = useState<Day[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await fetchWeather();
      const firstThree = _.take(weatherData.properties.periods, 2);
      setWeather(firstThree);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {weather.map((day) => (
        <View key={day.startTime} style={styles.dayContainer}>
          <Image
            source={{
              uri: day.icon,
            }}
            style={styles.weatherImage}
          />
          <Text style={styles.dayText}>{day.name}</Text>
          <Text style={styles.weatherText}>
            {day.temperature} - {day.shortForecast}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  dayContainer: {
    padding: 15,
  },
  dayText: {
    paddingTop: 10,

    alignSelf: 'center',
    color: 'white',
    paddingBottom: 10,
    fontSize: 20,
  },
  weatherText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
  },
  weatherImage: {
    alignSelf: 'center',
    padding: 20,
    width: 50,
    height: 50,
  },
});
