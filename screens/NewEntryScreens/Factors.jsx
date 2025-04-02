import React from "react";
import { StyleSheet, View, Text } from "react-native";
import factorObjects from "../../factors.json";
import { Pressable } from "react-native";

export default function Mood({ factors, onChangeFactors }) {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.text}>
				What factors contributed to your mood today?
			</Text>
			<View style={styles.container}>
				{factorObjects.map((factor, i) => {
					return (
						<Pressable
							style={[
								styles.textContainer,
								{
									backgroundColor: factors.includes(factor)
										? "lightgrey"
										: "transparent",
								},
							]}
							key={i}
							onPress={() => onChangeFactors(factor)}
						>
							<Text style={styles.emoji}>
								{String.fromCodePoint(factor.icon)}
							</Text>
							<Text style={styles.label}>{factor.factor_name}</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
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
		height: "20%",
		alignItems: "center",
		justifyContent: "center",
	},
	wrapper: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	label: {
		color: "#232F3B",
		fontSize: 14,
		fontWeight: "light",
		fontFamily: "Avenir",
		textAlign: "center",
	},
	emoji: {
		fontSize: 50,
	},
});
