import React from 'react';
import { Text, View } from 'react-native';

import TVTabBar from './src/components/TVTabBar';
import VideoPlayer from './src/screens/VideoPlayer';
import Weather from './src/components/Weather';

const App = () => {
  const tabs = [
    {
      key: 'Test1',
      name: 'fuck',
      value: <Weather />,
    },
    {
      key: 'Test2',
      name: 'shit',
      value: <VideoPlayer />,
    },
    {
      key: 'Test3',
      name: 'bitch',
      value: (
        <View>
          <Text>bitch</Text>
        </View>
      ),
    },
  ];

  return <TVTabBar tabs={tabs} defaultTabKey="Test2" />;
};

export default App;
