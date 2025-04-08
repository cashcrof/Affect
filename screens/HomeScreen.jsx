import React from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import TimelineTile from "../components/TimelineTile";
import { useSQLiteContext } from "expo-sqlite";

export default function HomeScreen({ navigation }) {
  const db = useSQLiteContext();
  const [entries, setEntries] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [activeEntry, setActiveEntry] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleReflection = (id) => {
    console.log(id);
    const entry = entries.find((element) => element.id == id);
    if (entry) {
      const formattedDate = new Date(entry.date).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = new Date(entry.date).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setActiveEntry(entry);
      setFormattedDate(formattedDate + " " + formattedTime);
      setShowReflection(!showReflection);
    }
  };

  useEffect(() => {
    async function setup() {
      console.log("setup");
      const moodEntries = await db.getAllAsync(
        `SELECT * FROM mood_entries LEFT JOIN moods on mood_entries.mood = moods.id;`,
      );
      setEntries(moodEntries);
      console.log(moodEntries);
    }
    setup();
  }, [refreshing]);

  return !showReflection ? (
    <View style={{ backgroundColor: "white", padding: 20, height: "100%" }}>
      <Text style={styles.text}>your moods</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {entries.length > 0 ? (
          entries.map((entry, i) => {
            return (
              <TimelineTile
                key={i}
                props={entry}
                toggleReflection={toggleReflection}
              />
            );
          })
        ) : (
          <Text>No entries found</Text>
        )}
      </ScrollView>
    </View>
  ) : (
    <View style={styles.container}>
      <View
        style={{
          flex: true,
          flexWrap: true,
          width: "100%",
        }}
      >
        <View
          style={{
            flex: true,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.dateText}>
            {activeEntry && activeEntry.mood_name}
          </Text>
        </View>
        <View style={{ flex: true, flexDirection: "row" }}>
          {activeEntry &&
            JSON.parse(activeEntry.factors).map((factor, i) => {
              return (
                <View key={i} style={styles.factor}>
                  <Text style={{ fontSize: 20 }}>
                    {String.fromCodePoint(factor.emoji)}
                  </Text>
                </View>
              );
            })}
        </View>
        <ScrollView style={styles.reflectionContainer}>
          <Text style={styles.reflectionText}>
            {activeEntry && activeEntry.reflection}
          </Text>
        </ScrollView>
      </View>
      <Pressable
        style={styles.reflectionButton}
        onPress={() => {
          setShowReflection(false);
          setActiveEntry(null);
        }}
      >
        <Text style={{ fontSize: 20, color: "grey" }}>close reflection</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  text: {
    color: "#232F3B",
    fontSize: 30,
    fontWeight: "light",
    fontFamily: "Avenir",
  },
  emoji: {
    fontSize: 100,
  },
  dateText: {
    color: "grey",
    fontSize: 15,
    fontWeight: "light",
    fontFamily: "Avenir",
  },
  moodText: {
    color: "#232F3B",
    fontSize: 30,
    fontWeight: "light",
    fontFamily: "Avenir",
  },
  factorsContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: 190,
    gap: "5",
  },
  reflectionButton: {
    marginVertical: 20,
  },
  reflectionContainer: {
    paddingVertical: 20,
    height: "70%",
  },
  reflectionText: {
    color: "#232F3B",
    fontSize: 20,
    fontWeight: "light",
    fontFamily: "Avenir",
  },
});
