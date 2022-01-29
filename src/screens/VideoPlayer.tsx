import React from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';
import Calender from '../components/Calender';
import Weather from '../components/Weather';

const VideoPlayer = (): JSX.Element => {
  const videoError = () => null;
  const onBuffer = () => null;

  return (
    <>
      <Video
        source={require('../../assets/DB_D011_C009_4K_SDR_HEVC.mov')}
        onBuffer={onBuffer}
        onError={videoError}
        style={styles.fullScreen}
      />
      <Weather />
      <Calender />
    </>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
