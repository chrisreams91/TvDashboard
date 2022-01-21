import React, { useState } from 'react';
import { TabBarIOS } from 'react-native';

// type Tab = {
//   key: string,
//   name: string,
//   value: Component,
// };

// type Props = {
//    barColor: string,
//    textColor: string,
//    selectedTextColor: string,
//    tabs: Tab[],
//    defaultTabKey?: string,
// };

const TVTabBar = (props) => {
  const [selectedTabKey, setSelectedTabKey] = useState(
    props.defaultTabKey || props.tabs[0].key,
  );

  const updateTab = (newTabKey) => {
    if (selectedTabKey !== newTabKey) {
      setSelectedTabKey(newTabKey);
    }
  };

  return (
    <TabBarIOS
      unselectedTintColor="black"
      tintColor="white"
      barTintColor="#bec2bf">
      {props.tabs.map((t) => (
        <TabBarIOS.Item
          title={t.name}
          key={t.key}
          selected={selectedTabKey === t.key}
          onPress={() => updateTab(t.key)}>
          {t.value}
        </TabBarIOS.Item>
      ))}
    </TabBarIOS>
  );
};

export default TVTabBar;
