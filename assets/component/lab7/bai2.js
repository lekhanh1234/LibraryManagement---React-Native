/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const Screen1 = () => (
  <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);

const Screen2 = () => (
  <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

const Bai2 = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'screen1', title: 'Screen 1' },
    { key: 'screen2', title: 'Screen 2' },
  ]);

  const renderScene = SceneMap({
    screen1: Screen1,
    screen2: Screen2,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'green' }}
      style={{ backgroundColor: 'blue' }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Bai2;
