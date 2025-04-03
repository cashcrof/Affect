import React from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Reflection({
	reflection,
	showJournal,
	onChangeReflection,
}) {
	return (
		<>
			{!showJournal ? (
				<View style={styles.container}>
					<Text style={styles.text}>
						Would you like to write a journal reflection?{" "}
					</Text>
					<Ionicons size={100} name="book" />
					<Text style={styles.subtitleText}>
						Reflections can help you better understand your mood.
					</Text>
				</View>
			) : (
				<View style={styles.reflectionContainer}>
					<Text style={styles.text}>Add a reflection</Text>
					<View style={{ height: "60%" }}>
						<TextInput
							style={styles.reflection}
							multiline
							numberOfLines={10}
							value={reflection}
							onChangeText={(reflection) => onChangeReflection(reflection)}
							placeholder="Begin your reflection"
						/>
					</View>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexWrap: "wrap",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-around",
		height: "75%",
	},
	text: {
		color: "#232F3B",
		fontSize: 30,
		fontWeight: "light",
		fontFamily: "Avenir",
		textAlign: "center",
	},
	textContainer: {
		width: "25%",
		height: "25%",
		alignItems: "center",
		justifyContent: "center",
	},
	wrapper: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
	},
	label: {
		color: "#232F3B",
		fontSize: 15,
		fontWeight: "light",
		fontFamily: "Avenir",
		textAlign: "center",
	},
	emoji: {
		fontSize: 50,
	},
	buttonText: {
		color: "#232F3B",
		fontWeight: "bold",
		fontFamily: "Avenir",
		fontSize: 20,
		textAlign: "center",
	},
	reflectionContainer: {
		height: "50%",
		width: "100%",
		flex: true,
		gap: "10%",
	},
	reflection: {
		fontSize: 18,
	},
});
