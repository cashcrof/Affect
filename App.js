import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useCallback, useEffect } from 'react';
import Onboarding from './screens/Onboarding';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatsScreen from './screens/StatsScreen';
import CalendarScreen from './screens/CalendarScreen';
import NewEntryScreen from './screens/NewEntryScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [entries, setEntries] = useState(false)

  const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(35, 47, 59)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        const data = await AsyncStorage.getItem('@onboarded');
        if (data) {
          setOnboarded(true);
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme} onReady={onLayoutRootView}>
        {!onboarded ?  <Onboarding setOnboarded={setOnboarded} /> :
        <>
          <Tab.Navigator initialRouteName='Home' screenOptions={({route}) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home-outline';
              } else if (route.name === 'Stats') {
                iconName = focused ? 'ios-analytics' : 'ios-analytics-outline';
              } else if (route.name === 'Add') {
                iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
              } else if (route.name === 'Calendar') {
                iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-settings' : 'ios-settings-outline';
              }
              return <Ionicons name={iconName} size={size} color={color}/>;
            }
          })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name = "Stats" component={StatsScreen}/>
            <Tab.Screen name = "Add" component={NewEntryScreen} options={({navigation}) => ({
              tabBarButton: (props) => (
                  <TouchableOpacity style={styles.add} onPress={()=> navigation.navigate('Add')}>
                    <Ionicons style={styles.plusSign} name="ios-add" size={50} color={"white"}/>
                  </TouchableOpacity>
              )
            })}/>
            <Tab.Screen name="Calendar" component={CalendarScreen}/>
            <Tab.Screen name = "Settings" component={SettingsScreen}/>
          </Tab.Navigator>
          <StatusBar style="auto" />
        </>
        }
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    backgroundColor: '#475F69',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusSign: {
    position: 'absolute',
    top: "5%",
    left: "10%",
  },
});
