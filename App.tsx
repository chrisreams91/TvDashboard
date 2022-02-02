import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import Calender from './src/components/Calender';
import Weather from './src/components/Weather';
// this clearly exists /shrug
// @ts-ignore
import { useTVEventHandler } from 'react-native';

const vids = require('./assets');

enum EVENT {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
  Select = 'select',
}

interface RemoteEvent {
  eventType: EVENT;
}

const App = (): JSX.Element => {
  const [paused, setPaused] = useState(false);
  const [showOverLay, setShowOverlay] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videos, _] = useState(vids.default);
  const [videoPlayerInUse, setVideoPlayerInUser] = useState(0);

  const TVEventHandler = (event: RemoteEvent) => {
    switch (event.eventType) {
      case EVENT.Select: {
        setPaused(!paused);
        break;
      }
      case EVENT.Left: {
        const newVideo =
          currentVideo === 0 ? videos.length - 1 : currentVideo - 1;

        setCurrentVideo(newVideo);
        setVideoPlayerInUser(newVideo);
        setPaused(false);
        break;
      }
      case EVENT.Right: {
        const newVideo =
          currentVideo === videos.length - 1 ? 0 : currentVideo + 1;

        setCurrentVideo(newVideo);
        setVideoPlayerInUser(newVideo);
        setPaused(false);
        break;
      }
      case EVENT.Up: {
        setShowOverlay(false);
        break;
      }
      case EVENT.Down: {
        setShowOverlay(true);
        break;
      }
    }
  };

  useTVEventHandler(TVEventHandler);

  const onEnd = () => {
    const newVideo = currentVideo === videos.length - 1 ? 0 : currentVideo + 1;
    setCurrentVideo(newVideo);
    setVideoPlayerInUser(newVideo);
    setPaused(false);
  };

  return (
    <>
      {videos.map((video: any, index: number) => (
        <Video
          key={index}
          source={video}
          paused={videoPlayerInUse !== index || paused}
          onEnd={onEnd}
          repeat={true}
          style={videoPlayerInUse === index && styles.fullScreen}
        />
      ))}
      {showOverLay && (
        <View style={styles.overlay}>
          <Weather />
          <Calender />
        </View>
      )}
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
    backgroundColor: 'black',
  },
  overlay: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
  },
});
