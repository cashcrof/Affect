import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useState } from "react";

export default function TimelineTile({ props, toggleReflection }) {
	const [expanded, setExpanded] = useState(false);
	const [factors, setFactors] = useState(props.factors.slice(0, 3));

	const toggleExpanded = (val) => {
		setFactors(val ? props.factors : props.factors.slice(0, 3));
		setExpanded(val);
	};

	const formattedDate = new Date(props.date).toLocaleDateString("en-us", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	const formattedTime = new Date(props.date).toLocaleTimeString("en-us", {
		hour: "2-digit",
		minute: "2-digit",
	});
	return (
		<Pressable style={styles.tileBg} onPress={() => toggleExpanded(!expanded)}>
			<View style={styles.emojiContainer}>
				<Text style={styles.emoji}>
					{String.fromCodePoint(props.mood.mood_image)}
				</Text>
			</View>

			<View>
				<Text style={styles.dateText}>{formattedDate}</Text>
				<Text style={styles.dateText}>{formattedTime}</Text>
				<Text style={styles.moodText}>{props.mood.mood_name}</Text>
				<View style={styles.factorsContainer}>
					{factors.map((factor, i) => {
						return (
							<View key={i} style={styles.factor}>
								<Text style={{ fontSize: 35 }}>
									{String.fromCodePoint(factor.icon)}
								</Text>
							</View>
						);
					})}
				</View>
				{expanded && props.reflection && (
					<Pressable
						style={styles.reflectionButton}
						onPress={() => toggleReflection(props.date)}
					>
						<Text style={{ fontSize: 20, color: "grey" }}>view reflection</Text>
					</Pressable>
				)}
			</View>
			<IonIcon
				style={{
					textAlign: "left",
					color: expanded ? "#232F3B" : "grey",
					marginLeft: 15,
				}}
				size={30}
				name={expanded ? "caret-up-outline" : "caret-down-outline"}
			/>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	tileBg: {
		backgroundColor: "lightgrey",
		marginVertical: 20,
		borderRadius: 30,
		display: "flex",
		flexDirection: "row",
		padding: 10,
		maxWidth: "100%",
	},
	emojiContainer: {
		alignContent: "center",
		textAlign: "center",
		paddingHorizontal: 10,
	},
	emoji: {
		fontSize: 100,
	},
	dateText: {
		color: "grey",
		fontSize: 15,
		fontWeight: "light",
		fontFamily: "Avenir",
	},
	moodText: {
		color: "#232F3B",
		fontSize: 30,
		fontWeight: "light",
		fontFamily: "Avenir",
	},
	factorsContainer: {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
		width: 190,
		gap: "5",
	},
	reflectionButton: {
		marginVertical: 20,
	},
	reflectionContainer: {
		paddingVertical: 20,
		height: "100%",
	},
	reflectionText: {
		color: "#232F3B",
		fontSize: 20,
		fontWeight: "light",
		fontFamily: "Avenir",
	},
});
