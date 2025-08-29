import { View, Text, Button,StatusBar } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen() {
  const navigation = useNavigation<any>();
  useEffect(()=>{
    const view=async()=>{
      const d=await AsyncStorage.getItem(`onboarding`);
      console.log(d);
    }
    view();

  },[])

  return (
    <View  className="flex-1 items-center justify-center"   >
      
     <Text className="text-white text-2xl font-bold mt-6 bg-black ">Home Screenn</Text>

    </View>
  );
}