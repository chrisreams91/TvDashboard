import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import Calender from './src/components/Calender';
import Weather from './src/components/Weather';

// this clearly exists /shrug
// @ts-ignore
import { useTVEventHandler } from 'react-native';

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

// const one = require('./assets/DB_D001_C001_4K_SDR_HEVC.mov');
// const two = require('./assets/DB_D001_C005_4K_SDR_HEVC.mov');
const three = require('./assets/DB_D011_C009_4K_SDR_HEVC.mov');
const four = require('./assets/HK_B005_C011_4K_SDR_HEVC.mov');
const five = require('./assets/LA_A005_C009_4K_SDR_HEVC.mov');
// const six = require('./assets/LA_A006_C008_4K_SDR_HEVC.mov');
const seven = require('./assets/LA_A009_C009_4K_SDR_HEVC.mov');
// const eight = require('./assets/LW_L001_C006_4K_SDR_HEVC.mov');

const App = (): JSX.Element => {
  const [paused, setPaused] = useState(false);
  const [showOverLay, setShowOverlay] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videos, setVideos] = useState([
    // one,
    // two,
    three,
    four,
    five,
    // six,
    seven,
    // eight,
  ]);
  const [videoPlayerInUse, setVideoPlayerInUser] = useState(0);

  const TVEventHandler = (event: RemoteEvent) => {
    switch (event.eventType) {
      case EVENT.Select: {
        setPaused(!paused);
        // Add pausing later after dual video player figured out
        break;
      }
      case EVENT.Left: {
        const newVideo =
          currentVideo === 0 ? videos.length - 1 : currentVideo - 1;

        // refs[currentVideo].seek(0);
        setCurrentVideo(newVideo);
        setVideoPlayerInUser(newVideo);
        setPaused(false);
        break;
      }
      case EVENT.Right: {
        const newVideo =
          currentVideo === videos.length - 1 ? 0 : currentVideo + 1;

        // refs[currentVideo].seek(0);
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

  // const refs: Video[] = [];
  return (
    <>
      {videos.map((video: any, index: number) => {
        return (
          <Video
            key={index}
            // ref={(ref) => ref && refs.push(ref)}
            rate={2}
            source={video}
            paused={videoPlayerInUse !== index || paused}
            onEnd={onEnd}
            repeat={true}
            style={videoPlayerInUse === index && styles.fullScreen}
          />
        );
      })}
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
