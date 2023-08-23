import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function HomeScreen({navigation}) {
    const [entries, setEntries] = useState([]);

    useEffect(()=> {
        async function getEntries() {
            try{
                const currentEntries = await AsyncStorage.getItem('@entries');
                setEntries(JSON.parse(currentEntries));
            }
            catch(error) {
                console.log(error);
                setEntries([]);
            }
        }
    }, [])
    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    )
}