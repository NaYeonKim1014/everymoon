import {StatusBar} from 'expo-status-bar'
import {StyleSheet, Text, View} from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Agree from './src/Pages/Agree'
import Welcome from './src/Pages/Welcome'
import Main from './src/Pages/Main'
import Calendar from './src/Pages/Calendar'
import New from './src/Pages/New'
import ChangeDate from './src/Pages/ChangeDate'
import ChangePick from './src/Pages/ChangePick'
import Birth from './src/Pages/Birth'
import Before from './src/Pages/Before'
import Finished from './src/Pages/Finished'
import Last from './src/Pages/Last'
import Recent from './src/Pages/Recent'
import Remember from './src/Pages/Remember'

SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()

export default function App() {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hideAsync()
        }, 2000)
    }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Agree" component={Agree} />
                <Stack.Screen name="Start" component={Welcome} />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Calendar" component={Calendar} />
                <Stack.Screen name="New" component={New} />
                <Stack.Screen name="ChangeDate" component={ChangeDate} />
                <Stack.Screen name="ChangePick" component={ChangePick} />
                <Stack.Screen name="Birth" component={Birth} />
                <Stack.Screen name="Before" component={Before} />
                <Stack.Screen name="Finished" component={Finished} />
                <Stack.Screen name="Last" component={Last} />
                <Stack.Screen name="Recent" component={Recent} />
                <Stack.Screen name="Remember" component={Remember} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
