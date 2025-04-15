import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { LinearGradient, Stop } from "react-native-svg";

export default function StatsScreen() {
  const db = useSQLiteContext();
  const [entries, setEntries] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [mode, setMode] = useState("");
  const [show, setShow] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(
    new Date().setDate(endDate.getDate() - 7),
  );

  function formatDate(date) {
    console.log(date);
    try {
      return date.toISOString().slice(0, 19).replace("T", " ");
    } catch {
      console.log(date);
    }
  }

  useEffect(() => {
    async function setup() {
      const moodEntries = await db.getAllAsync(
        `SELECT date, emoji, mood, mood_name, rating FROM mood_entries LEFT JOIN moods on mood_entries.mood = moods.id WHERE date BETWEEN ? AND ?;`,
        [formatDate(startDate), formatDate(endDate)],
      );
      console.log(moodEntries);
      setEntries(moodEntries);
    }

    setup();
  }, [startDate, endDate]);

  useEffect(() => {
    const formattedLineData = [];
    entries.forEach((entry) => {
      formattedLineData.push({
        value: entry.rating,
        label: new Date(entry.date).toLocaleDateString("en-US"),
        dataPointText: entry.mood_name,
      });
    });

    setLineData(formattedLineData);
  }, [entries]);

  const onChange = (event, selectedDate) => {
    if (mode == "start") {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
    setShow(false);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const showStartPicker = () => {
    showMode("start");
  };

  const showEndPicker = () => {
    showMode("end");
  };

  return (
    <View style={styles.container}>
      <Text>Stats Screen</Text>
      <Button onPress={showStartPicker} title="Start date" />
      <Button onPress={showEndPicker} title="End Date" />
      {show && (
        <RNDateTimePicker
          value={mode == "start" ? startDate : endDate}
          mode="date"
          onChange={onChange}
        />
      )}
      <LineChart
        data={lineData}
        spacing={50}
        thickness={4}
        curved
        yAxisOffset={-1}
        hideYAxisText
        hideRules
        showVerticalLines
        animateOnDataChange
        lineGradient
        lineGradientId="ggrd" // same as the id passed in <LinearGradient> below
        lineGradientComponent={() => {
          return (
            <LinearGradient id="ggrd" x1="0" y1="0" x2="0" y2="1">
              {/* 0: "#F94144", 1: "#F3722C", 2: "#F9C74F", 3: "#90BE6D", 4:
              "#43AA8B", */}
              <Stop offset="0" stopColor={"#43AA8B"} />
              <Stop offset="0.25" stopColor={"#90BE6D"} />
              <Stop offset="0.5" stopColor={"#F9C74F"} />
              <Stop offset="0.75" stopColor={"#F3722C"} />
              <Stop offset="1" stopColor={"#F94144"} />
            </LinearGradient>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  text: {
    color: "#232F3B",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
});
