import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Dimensions,
	Text,
	Touchable,
	Pressable,
	TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Reflection({ reflection, onChangeReflection }) {
	const [showJournal, setShowJournal] = useState(false);

	return (
		<>
			{!showJournal ? (
				<View style={styles.container}>
					<Text>Would you like to write a journal reflection?</Text>
					<Ionicons name="book" />
					<Text>Reflections can help you better understand your mood.</Text>
					<Pressable onPress={() => setShowJournal(true)}>
						<Text>Yes, I'd like to reflect</Text>
					</Pressable>
					<Pressable>
						<Text>No, I'm done</Text>
					</Pressable>
				</View>
			) : (
				<View>
					<Text>Add a reflection</Text>
					<TextInput
						value={reflection}
						onChangeText={(reflection) => onChangeReflection(reflection)}
						placeholder="Begin your reflection"
					/>
				</View>
			)}
		</>
	);
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
