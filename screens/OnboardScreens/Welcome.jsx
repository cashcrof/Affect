import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome({setPage}) {

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={require('../../assets/affect.png')}/>
            <View style={styles.textContainer}>
                <Text style={styles.title}>welcome to affect</Text>
                <Text style={styles.sub}>your minimal mood diary and self-care companion</Text>
            </View>
            <Button text="Get Started" setPage={setPage} nextPage="Log"/>
        </SafeAreaView>
    )
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
    }
});