import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <Text>Stats Screen</Text>
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
