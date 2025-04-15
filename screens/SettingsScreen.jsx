import { View, Text, Pressable } from "react-native";
import StorageComponent from "../components/Storage";
import { useSQLiteContext } from "expo-sqlite";

export default function SettingsScreen() {
  const db = useSQLiteContext();
  const clearStorage = async () => {
    try {
      const result = await db.runAsync("DELETE FROM mood_entries", {
        $value: "aaa",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Text>Settings Screen</Text>
      <Pressable onPress={() => clearStorage()}>
        <Text style={{ fontSize: 50, margin: 50 }}>Clear</Text>
      </Pressable>
    </View>
  );
}
