import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import Mood from "./NewEntryScreens/Mood";
import Factors from "./NewEntryScreens/Factors";
import Reflection from "./NewEntryScreens/Reflection";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewEntryScreen({navigation}) {
    const [mood, setMood] = useState(0);
    const [date, setDate] = useState(new Date());
    const [factors, setFactors] = useState([]);
    const [reflection, setReflection] = useState("");
    const [page, setPage] = useState("Mood");

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <IonIcon name="ios-arrow-back" size={30} color="#232F3B" onPress={() => navigation.goBack()} />
            ),
        });
    }, []);

    const addNewEntry = async() => {
        const newEntry = {
            mood: mood,
            date: date,
            factors: factors,
            reflection: reflection
        }

        const currentEntriesJSON = await AsyncStorage.getItem('@entries');
        const currentEntries = currentEntriesJSON ? JSON.parse(currentEntriesJSON) : [];

        try{
            const updatedEntries = [...currentEntries, newEntry];
            await AsyncStorage.setItem(`@entries`, JSON.stringify(updatedEntries)).finally(()=> navigation.navigate("Home"))
        } catch(e) {
            console.log(e);
            navigation.navigate("Home", {error: e});
        }

    }


    return (
        <View style={styles.container}>
            {page === "Mood" && <Mood mood={mood} setMood={setMood} setPage={setPage} />}
            {page === "Factors" && <Factors factors={factors} setFactors={setFactors} setPage={setPage} />}
            {page === "Reflection" && <Reflection reflection={reflection} setReflection={setReflection} setPage={setPage} addNewEntry={addNewEntry}/>}
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
