import Button from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Log({ setPage }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Easily log your mood and track your daily activities
        </Text>
        <Image
          style={styles.image}
          source={require("../../assets/splash.png")}
        />
        <Text style={styles.sub}>
          check in quickly, or reflect in depth with optional written entries
        </Text>
      </View>
      <Button text="Next" setPage={setPage} nextPage="Trends" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "90%",
    width: "100%",
  },
  title: {
    color: "#232F3B",
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    fontFamily: "Avenir",
    textAlign: "center",
  },
  sub: {
    color: "#232F3B",
    fontSize: 20,
    padding: 10,
    fontFamily: "Avenir",
    textAlign: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Avenir",
    width: 350,
  },
});
