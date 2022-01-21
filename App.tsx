import React from 'react';

import TVTabBar from './src/components/TVTabBar';
import VideoPlayer from './src/screens/VideoPlayer';
import Weather from './src/components/Weather';
import Calender from './src/components/Calender';

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
      value: <Calender />,
    },
  ];

  return <TVTabBar tabs={tabs} defaultTabKey="Test3" />;
};

export default App;
