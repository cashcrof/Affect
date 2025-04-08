import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import Button from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Go({ setOnboarded }) {
  const onDone = () => {
    setOnboarded(true);
    AsyncStorage.setItem("@onboarded", JSON.stringify(true));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../../assets/affect.png")} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>that's it!</Text>
        <Text style={styles.sub}>you're all set up. ready to start?</Text>
      </View>
      <Pressable style={styles.button} onPress={() => onDone()}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "90%",
  },
  title: {
    color: "#232F3B",
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    fontFamily: "Avenir",
  },
  sub: {
    color: "#232F3B",
    fontSize: 20,
    padding: 10,
    fontFamily: "Avenir",
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    textAlign: "center",
    fontFamily: "Avenir",
  },
  button: {
    borderRadius: 20, // Rounded border
    borderWidth: 2, // 2 point border widht
    backgroundColor: "#232F3B", // White colored border
    paddingHorizontal: 50, // Horizontal padding
    paddingVertical: 15, // Vertical padding
    width: 300,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Avenir",
    fontSize: 20,
    textAlign: "center",
  },
});
