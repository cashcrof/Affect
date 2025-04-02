import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import Mood from "./NewEntryScreens/Mood";
import Factors from "./NewEntryScreens/Factors";
import Reflection from "./NewEntryScreens/Reflection";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewEntryScreen({ navigation }) {
	const [mood, setMood] = useState(0);
	const [date, setDate] = useState(new Date());
	const [factors, setFactors] = useState([]);
	const [reflection, setReflection] = useState("");
	const [page, setPage] = useState("Mood");

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<IonIcon
					name="arrow-back"
					size={25}
					color="#475F69"
					style={{ padding: 10 }}
					onPress={() => navigation.goBack()}
				/>
			),
		});
	}, []);

	const addNewEntry = async () => {
		const newEntry = {
			mood: mood,
			date: date,
			factors: factors,
			reflection: reflection,
		};

		const currentEntriesJSON = await AsyncStorage.getItem("@entries");
		const currentEntries = currentEntriesJSON
			? JSON.parse(currentEntriesJSON)
			: [];

		try {
			const updatedEntries = [...currentEntries, newEntry];
			await AsyncStorage.setItem(
				`@entries`,
				JSON.stringify(updatedEntries)
			).finally(() => navigation.navigate("Home"));
		} catch (e) {
			console.log(e);
			navigation.navigate("Home", { error: e });
		}
	};

	const onChangeMood = (moodData) => {
		setMood(moodData);
	};

	const onChangeFactors = (newFactor) => {
		if (!factors.includes(newFactor)) {
			setFactors([...factors, newFactor]);
		} else {
			const index = factors.indexOf(newFactor);
			setFactors(factors.splice(index, 1));
		}
	};

	const onChangeReflection = (newReflection) => {
		setReflection(newReflection);
	};

	return (
		<View style={styles.container}>
			{page === "Mood" && <Mood mood={mood} onChangeMood={onChangeMood} />}
			{page === "Factors" && (
				<Factors factors={factors} onChangeFactors={onChangeFactors} />
			)}
			{page === "Reflection" && (
				<Reflection
					reflection={reflection}
					onChangeReflection={onChangeReflection}
				/>
			)}
			<Pressable
				style={styles.button}
				onPress={() => {
					if (page === "Mood") {
						setPage("Factors");
					} else if (page === "Factors") {
						setPage("Reflection");
					} else {
						addNewEntry();
					}
				}}
			>
				<Text style={styles.buttonText}>
					{page === "Reflection" ? "Save" : "Next"}
				</Text>
			</Pressable>
		</View>
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
