import React from "react";
import { StyleSheet, View, Dimensions, Text} from "react-native";
import factorObjects from '../../factors.json'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";

export default function Mood({factors, setFactors, setPage}) {
return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>How factors contributed to your mood today?</Text>
            <View style={styles.container}>
                {factorObjects.map((factor, i) => {
                    const imagePath = '../../assets/factors/' + factor.icon;
                    console.log(imagePath);
                    return (
                        <TouchableOpacity style={styles.textContainer} key={i} onPress={setFactors([...factors, factor])}>
                            <Image source={{uri: imagePath}} />
                            <Text style={styles.label}>{factorObjects.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <TouchableOpacity onPress={() => setPage("Reflection")}>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
)}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        flexWrap: "wrap",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: 10,
    },
    text: {
        color: "#232F3B",
        fontSize: 30,
        fontWeight: "light",
        fontFamily: "Avenir",
        textAlign: "center",
        margin: 10,
    },
    textContainer: {
        width: "25%",
        height: "25%",
        alignItems: "center",
        justifyContent: "center",
    },
    wrapper: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: 30,
    },
    label: {
        color: "#232F3B",
        fontSize: 11,
        fontWeight: "light",
        fontFamily: "Avenir",
        textAlign: "center",
    }
});
