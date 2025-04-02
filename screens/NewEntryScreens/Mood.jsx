import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import moods from "../../moods.json";

export default function Mood({ mood, onChangeMood }) {
	return (
		<View styles={styles.wrapper}>
			<Text style={styles.text}>How are you feeling?</Text>
			<View style={styles.container}>
				{moods.map((moodData) => {
					return (
						<Pressable
							style={[
								styles.textContainer,
								{
									backgroundColor:
										moodData.id == mood.id ? "lightgrey" : "transparent",
								},
							]}
							key={moodData.id}
							onPress={() => {
								onChangeMood(moodData);
							}}
						>
							<Text style={styles.emoji}>
								{String.fromCodePoint(moodData.mood_image)}
							</Text>
							<Text style={styles.label}>{moodData.mood_name}</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexWrap: "wrap",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		margin: 20,
	},
	text: {
		color: "#232F3B",
		fontSize: 30,
		fontWeight: "light",
		fontFamily: "Avenir",
		textAlign: "center",
		margin: 10,
		paddingTop: "25%",
	},
	textContainer: {
		width: "25%",
		height: "25%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "",
	},
	wrapper: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
	},
	label: {
		color: "#232F3B",
		fontSize: 11,
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
});
