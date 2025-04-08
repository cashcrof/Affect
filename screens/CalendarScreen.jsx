import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";

export default function CalendarScreen() {
  const db = useSQLiteContext();
  const [entries, setEntries] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [activeDate, setActiveDate] = useState(new Date());
  const [activeEntry, setActiveEntry] = useState(
    entries.filter((entry) => entry.date == activeDate),
  );
  const [markedDateObjects, setMarkedDateObjects] = useState(new Object());
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
  }, [month, refreshing]);

  useEffect(() => {
    const marked = {};
    const markedDates = entries.filter(
      (entry) => new Date(entry.date).getMonth() + 1 === month,
    );

    markedDates.forEach((entry) => {
      return Object.assign(marked, formatDateEntry(entry));
    });
    setMarkedDateObjects(marked);
  }, [entries]);

  useEffect(() => {
    const newActiveEntry = entries.filter((entry) => {
      new Date(entry.date) === activeDate;
    });

    setActiveEntry(newActiveEntry);
  }, [activeDate]);

  function formatDateEntry(entry) {
    const ratingColors = {
      0: "#393B57",
      1: "#9C495D",
      2: "#E2894D",
      3: "#EEBB79",
      4: "#F7E074",
    };
    return {
      [CalendarUtils.getCalendarDateString(entry.date)]: {
        customStyles: {
          container: {
            backgroundColor: ratingColors[entry.rating],
            elevation: 4,
          },
          text: {
            color: "white",
          },
        },
      },
    };
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.container}
    >
      <Calendar
        style={styles.calendar}
        maxDate={new Date().toDateString()}
        onMonthChange={(date) => setMonth(date.month)}
        onDayPress={(date) => setActiveDate(date)}
        markingType={"custom"}
        markedDates={markedDateObjects}
      />
      <Text>{activeEntry}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#232F3B",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  calendar: {
    width: 350,
    height: 500,
  },
});
