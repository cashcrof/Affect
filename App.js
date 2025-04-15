import { StatusBar } from "expo-status-bar";
import { StyleSheet, Pressable, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback, useEffect, Suspense } from "react";
import Onboarding from "./screens/Onboarding";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StatsScreen from "./screens/StatsScreen";
import CalendarScreen from "./screens/CalendarScreen";
import NewEntryScreen from "./screens/NewEntryScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";

const Tab = createBottomTabNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);

  const MyTheme = {
    dark: false,
    colors: {
      primary: "rgb(35, 47, 59)",
      background: "rgb(242, 242, 242)",
      card: "rgb(255, 255, 255)",
      text: "rgb(28, 28, 30)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
    },
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        const data = await AsyncStorage.getItem("@onboarded");
        if (data) {
          setOnboarded(true);
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
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
    <SQLiteProvider
      databaseName={"affect.db"}
      options={{ enableChangeListener: true }}
      onInit={migrateDbIfNeeded}
    >
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme} onReady={onLayoutRootView}>
          {!onboarded ? (
            <Onboarding setOnboarded={setOnboarded} />
          ) : (
            <>
              <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                  tabBarShowLabel: false,
                  headerTitleStyle: { color: "transparent" },
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Home") {
                      iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Stats") {
                      iconName = focused ? "analytics" : "analytics-outline";
                    } else if (route.name === "Add") {
                      iconName = focused ? "add-circle" : "add-circle-outline";
                    } else if (route.name === "Calendar") {
                      iconName = focused ? "calendar" : "calendar-outline";
                    } else if (route.name === "Settings") {
                      iconName = focused ? "settings" : "settings-outline";
                    }
                    return (
                      <Ionicons name={iconName} size={size} color={color} />
                    );
                  },
                })}
              >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Stats" component={StatsScreen} />
                <Tab.Screen
                  name="New Entry"
                  component={NewEntryScreen}
                  options={({ navigation }) => ({
                    tabBarButton: (props) => (
                      <Pressable
                        style={styles.add}
                        onPress={() => navigation.navigate("New Entry")}
                      >
                        <Ionicons
                          style={styles.plusSign}
                          name="add-circle"
                          size={70}
                          color={"#475F69"}
                        />
                      </Pressable>
                    ),
                  })}
                />
                <Tab.Screen name="Calendar" component={CalendarScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>
              <StatusBar style="auto" />
            </>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}

async function migrateDbIfNeeded(db) {
  const DATABASE_VERSION = 1;
  let { currentDbVersion } = await db.getFirstAsync("PRAGMA user_version");

  console.log("db version" + currentDbVersion);
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (!currentDbVersion) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      DROP TABLE IF EXISTS moods;
      DROP TABLE IF EXISTS factors;
      DROP TABLE IF EXISTS mood_entries;
      CREATE TABLE IF NOT EXISTS moods (id INTEGER PRIMARY KEY NOT NULL, mood_name TEXT NOT NULL, emoji INTEGER NOT NULL, rating INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS factors (id INTEGER PRIMARY KEY NOT NULL, factor_name TEXT NOT NULL, emoji INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS mood_entries (id INTEGER PRIMARY KEY NOT NULL, date TIMESTAMP NOT NULL DEFAULT current_timestamp, mood INT REFERENCES mood(id), factors TEXT NOT NULL, reflection TEXT);
    `);
    const moodInsertStatement = await db.prepareAsync(
      "INSERT INTO moods(mood_name, emoji, rating) VALUES ($moodName, $emoji, $rating)",
    );
    const factorInsertStatement = await db.prepareAsync(
      "INSERT INTO factors (factor_name, emoji) VALUES ($factorName, $emoji)",
    );
    try {
      let result = await moodInsertStatement.executeAsync({
        $moodName: "happy",
        $emoji: "0x1F600",
        $rating: 4
      });
      result = await moodInsertStatement.executeAsync({
        $moodName: "sad",
        $emoji: "0x1F622",
        $rating: 0
      });
      result = await moodInsertStatement.executeAsync({
        $moodName: "angry",
        $emoji: "0x1F621",
        $rating: 0
      });
      result = await moodInsertStatement.executeAsync({
        $moodName: "calm",
        $emoji: "0x1F610",
        $rating: 3
      });
      result = await moodInsertStatement.executeAsync({
        $moodName: "excited",
        $emoji: "0x1F929",
        $rating: 4
      });
      result = await moodInsertStatement.executeAsync({
        $moodName: "anxious",
        $emoji: "0x1F628",
        $rating: 1
      });
      result = await moodInsertStatement.executeAsync({
        $moodName: "okay",
        $emoji: "0x1FAE4",
        $rating: 2
      });
      result = await moodInsertStatement.executeAsync({
        $moodName: "bored",
        $emoji: "0x1F971",
        $rating: 2
      });
      result = await moodInsertStatement.executeAsync({
        $moodName: "tired",
        $emoji: "0x1F634",
        $rating: 1
      });
      result = await moodInsertStatement.executeAsync({
        $moodName: "overwhelmed",
        $emoji: "0x1fae0",
        $rating: 1
      });
      result = await moodInsertStatement.executeAsync({
        $moodName: "stressed",
        $emoji: "0x1F4A8",
        $rating: 0
      });
      result = await moodInsertStatement.executeAsync({
        $moodName: "lonely",
        $emoji: "0x1F972",
        $rating: 1
      });
    } finally {
      await moodInsertStatement.finalizeAsync();
    }
    try {
      let result = await factorInsertStatement.executeAsync({
        $factorName: "leisure",
        $emoji: "0x1F9D8",
      });
      result = await factorInsertStatement.executeAsync({
        $factorName: "social",
        $emoji: "0x1F465",
      });
      result = await factorInsertStatement.executeAsync({
        $factorName: "relationship",
        $emoji: "0x2764",
      });
      result = await factorInsertStatement.executeAsync({
        $factorName: "sex",
        $emoji: "0x1F4A6",
      });
      result = await factorInsertStatement.executeAsync({
        $factorName: "money",
        $emoji: "0x1F4B5",
      });
      result = await factorInsertStatement.executeAsync({
        $factorName: "exercise",
        $emoji: "0x1F3C3",
      });
      result = await factorInsertStatement.executeAsync({
        $factorName: "health",
        $emoji: "0x1FA7A",
      });
      result = await factorInsertStatement.executeAsync({
        $factorName: "sleep",
        $emoji: "0x1F4A4",
      });
      result = await factorInsertStatement.executeAsync({
        $factorName: "screen time",
        $emoji: "0x1F4F1",
      });
      result = await factorInsertStatement.executeAsync({
        $factorName: "food",
        $emoji: "0x1F354",
      });
      result = await factorInsertStatement.executeAsync({
        $factorName: "alcohol",
        $emoji: "0x1F378",
      });
      result = await factorInsertStatement.executeAsync({
        $factorName: "drugs",
        $emoji: "0x1F48A",
      });
      result = await factorInsertStatement.executeAsync({
        $factorName: "work",
        $emoji: "0x1F4BC",
      });
    } finally {
      await factorInsertStatement.finalizeAsync();
    }
    currentDbVersion = 1;
  }

  await db.execAsync(`INSERT INTO mood_entries(date, mood, factors, reflection) VALUES ("2025-04-02 19:56:32", 1, '[{"id":2,"factor_name":"social","emoji":"0x1F465"},{"id":6,"factor_name":"exercise","emoji":"0x1F3C3"},{"id":7,"factor_name":"health","emoji":"0x1FA7A"},{"id":12,"factor_name":"drugs","emoji":"0x1F48A"}]', "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");`);
  await db.execAsync(`INSERT INTO mood_entries(date, mood, factors, reflection) VALUES ("2025-04-04 19:56:32", 2, '[{"id":2,"factor_name":"social","emoji":"0x1F465"},{"id":6,"factor_name":"exercise","emoji":"0x1F3C3"},{"id":7,"factor_name":"health","emoji":"0x1FA7A"},{"id":12,"factor_name":"drugs","emoji":"0x1F48A"}]', "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");`);
  await db.execAsync(`INSERT INTO mood_entries(date, mood, factors, reflection) VALUES ("2025-04-06 19:56:32", 3, '[{"id":2,"factor_name":"social","emoji":"0x1F465"},{"id":6,"factor_name":"exercise","emoji":"0x1F3C3"},{"id":7,"factor_name":"health","emoji":"0x1FA7A"},{"id":12,"factor_name":"drugs","emoji":"0x1F48A"}]', "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");`);
  await db.execAsync(`INSERT INTO mood_entries(date, mood, factors, reflection) VALUES ("2025-04-08 19:56:32", 4, '[{"id":2,"factor_name":"social","emoji":"0x1F465"},{"id":6,"factor_name":"exercise","emoji":"0x1F3C3"},{"id":7,"factor_name":"health","emoji":"0x1FA7A"},{"id":12,"factor_name":"drugs","emoji":"0x1F48A"}]', "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");`);
  await db.execAsync(`INSERT INTO mood_entries(date, mood, factors, reflection) VALUES ("2025-04-09 19:56:32", 5, '[{"id":2,"factor_name":"social","emoji":"0x1F465"},{"id":6,"factor_name":"exercise","emoji":"0x1F3C3"},{"id":7,"factor_name":"health","emoji":"0x1FA7A"},{"id":12,"factor_name":"drugs","emoji":"0x1F48A"}]', "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");`);
  await db.execAsync(`INSERT INTO mood_entries(date, mood, factors, reflection) VALUES ("2025-04-10 19:56:32", 6, '[{"id":2,"factor_name":"social","emoji":"0x1F465"},{"id":6,"factor_name":"exercise","emoji":"0x1F3C3"},{"id":7,"factor_name":"health","emoji":"0x1FA7A"},{"id":12,"factor_name":"drugs","emoji":"0x1F48A"}]', "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");`);
  await db.execAsync(`INSERT INTO mood_entries(date, mood, factors, reflection) VALUES ("2025-04-11 19:56:32", 7, '[{"id":2,"factor_name":"social","emoji":"0x1F465"},{"id":6,"factor_name":"exercise","emoji":"0x1F3C3"},{"id":7,"factor_name":"health","emoji":"0x1FA7A"},{"id":12,"factor_name":"drugs","emoji":"0x1F48A"}]', "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");`);
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  plusSign: {
    position: "absolute",
  },
});
