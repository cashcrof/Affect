import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Trends({setPage}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Track your trends over time and learn about your lifestyle triggers</Text>
                <Image style={styles.image} source={require('../../assets/splash.png')}/>
                <Text style={styles.sub}>no ads</Text>
                <Text style={styles.sub}>no fees</Text>
                <Text style={styles.sub}>no problem</Text>
            </View>
            <Button text="Next" setPage={setPage} nextPage="Time"/>
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
        padding: 0,
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
    }
});