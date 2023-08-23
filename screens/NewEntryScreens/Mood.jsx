import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions, Text, Image, TouchableOpacity} from "react-native";
import moods from "../../moods.json"



export default function Mood({mood, setMood, setPage}) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>How are you feeling?</Text>
            <View style={styles.container}>
                {moods.map((mood, i) => {
                    const imagePath = '../../assets/moods/' + mood.mood_image;
                    console.log(imagePath);
                    return (
                        <TouchableOpacity style={styles.textContainer} key={i} onPress={setMood(mood)}>
                            <Image source={{uri: imagePath}} />
                            <Text style={styles.label}>{mood.mood_name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <TouchableOpacity onPress={useEffect(() => {setPage("Factors")})}>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

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
