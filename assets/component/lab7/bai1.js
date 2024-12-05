/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Screen1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen 1</Text>
    </View>
  );
};
const Screen2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen 2</Text>
    </View>
  );
};
const Bai1 = () => {
  return (
    
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Screen1" component={Screen1} />
        <Tab.Screen name="Screen2" component={Screen2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Bai1;
