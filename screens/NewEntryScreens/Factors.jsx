import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import factorObjects from "../../data/factors.json";
import { Pressable } from "react-native";

export default function Mood({ factors, onChangeFactors }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        What factors contributed to your mood today?
      </Text>
      <View style={styles.container}>
        {factorObjects.map((factor, i) => {
          return (
            <Pressable
              style={[
                styles.textContainer,
                {
                  backgroundColor: factors.includes(factor)
                    ? "lightgrey"
                    : "transparent",
                },
              ]}
              key={i}
              onPress={() => onChangeFactors(factor)}
            >
              <Text style={styles.emoji}>
                {String.fromCodePoint(factor.icon)}
              </Text>
              <Text style={styles.label}>{factor.factor_name}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#232F3B",
    fontSize: 30,
    fontWeight: "light",
    fontFamily: "Avenir",
    textAlign: "center",
  },
  textContainer: {
    width: "25%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    color: "#232F3B",
    fontSize: 15,
    fontWeight: "light",
    fontFamily: "Avenir",
    textAlign: "center",
  },
  emoji: {
    fontSize: 50,
  },
  buttonText: {
    color: "#232F3B",
    fontWeight: "bold",
    fontFamily: "Avenir",
    fontSize: 20,
    textAlign: "center",
  },
});
