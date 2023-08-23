import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text, Touchable, TouchableOpacity, TextInput} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Reflection({reflection, setPage, setReflection, addNewEntry}) {

    const [showJournal, setShowJournal] = useState(false);

    return (
        <>
        {!showJournal ? (
            <View style={styles.container}>
                <Text>Would you like to write a journal reflection?</Text>
                <Ionicons name="book"/>
                <Text>Reflections can help you better understand your mood.</Text>
                <TouchableOpacity onPress={()=> setShowJournal(true)}>
                    <Text>Yes, I'd like to reflect</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>No, I'm done</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View>
                <Text>Add a reflection</Text>
                <TextInput 
                value={reflection}
                onChangeText={(reflection) => setReflection(reflection)}
                placeholder="Begin your reflection"
                />
                <TouchableOpacity onPress={()=>addNewEntry}>
                    Done
                </TouchableOpacity>
            </View>
        )}
        </>
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