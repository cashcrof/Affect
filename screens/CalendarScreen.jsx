import React from "react";
import { StyleSheet, View, Dimensions, Text} from "react-native";

export default function CalendarScreen() {
    return (
        <View style={styles.container}>
            <Text>Calendar Screen</Text>
        </View>
    )
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

