import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import Calender from './src/components/Calender';
import Weather from './src/components/Weather';

const App = (): JSX.Element => {
  const videoError = () => null;
  const onBuffer = () => null;

  return (
    <>
      <Video
        source={require('./assets/DB_D011_C009_4K_SDR_HEVC.mov')}
        onBuffer={onBuffer}
        onError={videoError}
        style={styles.fullScreen}
      />
      <View style={styles.overlay}>
        <Weather />
        <Calender />
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
  },
});
