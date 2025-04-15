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
import { getCalendarDateString } from "react-native-calendars/src/services";

export default function CalendarScreen() {
  const db = useSQLiteContext();
  const [entries, setEntries] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [activeEntry, setActiveEntry] = useState(
    entries.filter(
      (entry) =>
        getCalendarDateString(entry.date) == getCalendarDateString(new Date()),
    )[0],
  );
  const [activeDate, setActiveDate] = useState(
    getCalendarDateString(new Date()),
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
      const moodEntries = await db.getAllAsync(
        `SELECT * FROM mood_entries LEFT JOIN moods on mood_entries.mood = moods.id;`,
      );
      setEntries(moodEntries);
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

  const openDateEntry = (date) => {
    const newActiveEntry = entries.filter((entry) => {
      const entryDate = getCalendarDateString(new Date(entry.date));
      return entryDate === date.dateString;
    })[0];

    console.log(newActiveEntry);

    if (newActiveEntry) {
      setActiveEntry(newActiveEntry);
    } else {
      setActiveDate(date.dateString);
      setActiveEntry(null);
    }
  };

  function formatDateEntry(entry) {
    const ratingColors = {
      0: "#F94144",
      1: "#F3722C",
      2: "#F9C74F",
      3: "#90BE6D",
      4: "#43AA8B",
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
        onDayPress={(date) => openDateEntry(date)}
        markingType={"custom"}
        markedDates={markedDateObjects}
      />
      <Text style={styles.text}>
        {activeEntry ? getCalendarDateString(activeEntry.date) : activeDate}
      </Text>
      <Text style={styles.text}>
        {activeEntry ? activeEntry.mood_name : "no mood entry"}
      </Text>
      <Text style={styles.text}>
        {activeEntry && String.fromCodePoint(activeEntry && activeEntry.emoji)}
      </Text>
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
    fontSize: 20,
    fontWeight: "thin",
    fontFamily: "Avenir",
  },
  calendar: {
    width: 350,
    height: 400,
  },
});
