import React from 'react';
import {Text, View} from 'react-native';
import TVTabBar from './TVTabBar';

const App = () => {
  const tabs = [
    {
      key: 'Test1',
      name: 'fuck',
      value: (
        <View>
          <Text>fuck</Text>
        </View>
      ),
    },
    {
      key: 'Test2',
      name: 'shit',
      value: (
        <View>
          <Text>shit</Text>
        </View>
      ),
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

  return <TVTabBar tabs={tabs} defaultTabKey="slideShow" />;
};

export default App;
