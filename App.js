/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddBook from './src/screens/AddBook';


const Stack = createStackNavigator();
function App(){
   console.log("run app");
   return (
      <View style = {{flex : 1}}>
      <NavigationContainer >
              <Stack.Navigator initialRouteName={"Welcome"} >
              <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/> 
              <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
              <Stack.Screen name="Register" component={RegisterScreen}  options={{ headerShown: false }}/>
              <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
              <Stack.Screen name="AddBook" component={AddBook}  options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </View>
   )
}
export default App;
 