import React, { useEffect, useState } from 'react';
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

const one = require('./assets/DB_D011_C009_4K_SDR_HEVC.mov');
const two = require('./assets/LA_A006_C008_4K_SDR_HEVC.mov');

const App = (): JSX.Element => {
  useEffect(() => {
    // fs read dir or somthing
    const getFileNames = async () => {
      setVideos([one, two]);
    };
    getFileNames();
  }, []);

  const [currentVideo, setCurrentVideo] = useState(0);
  const [videos, setVideos] = useState([one, two]);
  const [isPaused, setIsPaused] = useState(false);

  const myTVEventHandler = (event: RemoteEvent) => {
    switch (event.eventType) {
      case EVENT.Select: {
        setIsPaused(!isPaused);
        break;
      }
      case EVENT.Left: {
        setCurrentVideo(0);
        break;
      }
      case EVENT.Right: {
        setCurrentVideo(1);
        break;
      }
    }
    console.log(event);
  };
  useTVEventHandler(myTVEventHandler);

  const onEnd = () => {
    setCurrentVideo(currentVideo === videos.length - 1 ? 0 : currentVideo + 1);
    console.log(' new current video : ', currentVideo);
  };

  const onLoad = (x: any) => {
    console.log(x);
  };

  return (
    <>
      <Video
        rate={2}
        onLoad={onLoad}
        source={videos[currentVideo]}
        paused={isPaused}
        onEnd={onEnd}
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
    backgroundColor: 'black',
  },
  overlay: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
  },
});
