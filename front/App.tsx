import {  useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./pages/HomeScreen";
import DetailsScreen from "./pages/DetailsScreen";
import OnboardScreen from "./pages/OnboardScreen";

import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View } from "react-native";
SplashScreen.preventAutoHideAsync();

console.log(View.prototype);

const Stack = createNativeStackNavigator();


export default function App() {

   let [onBoard,setonBoard]=useState(true)

  useEffect(() => {
    async function prepare() {
      try {
        
        
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
    const Onboard=await AsyncStorage.getItem(`onboarding`);
    if(Onboard){setonBoard(false)}
    
      } catch (e) {
        console.warn(e);
      } 
    }

    prepare();
  }, []);

  
  return (
    <NavigationContainer>
      <Stack.Navigator
        
        screenOptions={{ headerShown: false }}
      >
        {onBoard&&(<Stack.Screen name="onboard" component={OnboardScreen} />)}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
