import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { fetchWeather, Day } from '../util/requests';
import { useInterval } from '../util/hooks';
import * as _ from 'lodash';

const ONE_MINUTE = 60000;

const Weather = (): JSX.Element => {
  const [weather, setWeather] = useState<Day[]>([]);

  const fetchData = async () => {
    const weatherData = await fetchWeather();
    const firstThree = _.take(weatherData.properties.periods, 2);
    setWeather(firstThree);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useInterval(() => {
    fetchData();
  }, ONE_MINUTE * 30);

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
          {day.temperature && (
            <Text style={styles.weatherText}>
              {day.temperature} - {day.shortForecast}
            </Text>
          )}
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
