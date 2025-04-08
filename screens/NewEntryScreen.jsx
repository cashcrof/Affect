import React, { use, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import Mood from "./NewEntryScreens/Mood";
import Factors from "./NewEntryScreens/Factors";
import Reflection from "./NewEntryScreens/Reflection";
import StorageComponent from "../components/Storage";
import { useSQLiteContext } from "expo-sqlite";

export default function NewEntryScreen({ navigation }) {
  const db = useSQLiteContext();
  const [mood, setMood] = useState(0);
  const date = new Date();
  const [factors, setFactors] = useState(new Array());
  const [reflection, setReflection] = useState("");
  const [page, setPage] = useState("Mood");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showJournal, setShowJournal] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IonIcon
          name="close-outline"
          size={25}
          color="#475F69"
          style={{ padding: 10 }}
          onPress={() => {
            clearCurrent();
            navigation.goBack();
          }}
        />
      ),
    });
  }, []);

  // const addNewEntry = async () => {
  // 	let id = date.toUTCString();
  // 	try {
  // 		const newEntry = {
  // 			mood: mood,
  // 			date: date,
  // 			factors: factors,
  // 			reflection: reflection,
  // 		};

  // 		StorageComponent.save({
  // 			key: "moodEntry",
  // 			id: id,
  // 			data: newEntry,
  // 			expires: null,
  // 		});
  // 		clearCurrent();
  // 		navigation.navigate("Home");
  // 	} catch (error) {
  // 		console.log(error);
  // 		clearCurrent();
  // 		navigation.navigate("Home", { error: error });
  // 	}
  // };

  const addNewEntry = async () => {
    let id = date.toUTCString();
    try {
      const result = await db.runAsync(
        "INSERT INTO mood_entries (mood, factors, reflection) VALUES (?, ?, ?)",
        mood,
        JSON.stringify(factors),
        reflection,
      );
      console.log(result.lastInsertRowId, result.changes);
      clearCurrent();
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      clearCurrent();
      navigation.navigate("Home", { error: error });
    }
  };

  const onChangeMood = (moodId) => {
    setMood(moodId);
  };

  const onChangeFactors = (newFactor) => {
    if (!factors.includes(newFactor)) {
      const newFactors = [...factors, newFactor];
      console.log("newFactors: " + newFactors);
      setFactors(newFactors);
    } else if (factors.includes(newFactor)) {
      const index = factors.indexOf(newFactor);
      const newFactors = factors.slice();
      newFactors.splice(index, 1);
      setFactors(newFactors);
    }
  };

  const onChangeReflection = (newReflection) => {
    setReflection(newReflection);
  };

  const onSetShowJournal = () => {
    setShowJournal(!showJournal);
  };

  const clearCurrent = () => {
    setPage("Mood");
    setMood(0);
    setFactors(new Array());
    setReflection("");
    setShowJournal(false);
  };

  useEffect(() => {
    if (
      (page === "Mood" && mood) ||
      (page === "Factors" && factors.length) ||
      (page === "Reflection" && (!showJournal || reflection.length > 0))
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [mood, factors, reflection, page]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          {page === "Mood" && <Mood mood={mood} onChangeMood={onChangeMood} />}
          {page === "Factors" && (
            <Factors factors={factors} onChangeFactors={onChangeFactors} />
          )}
          {page === "Reflection" && (
            <Reflection
              reflection={reflection}
              showJournal={showJournal}
              onChangeReflection={onChangeReflection}
              onSetShowJournal={onSetShowJournal}
            />
          )}
          {!showJournal && (
            <Pressable
              style={[
                styles.button,
                { backgroundColor: buttonDisabled ? "lightgrey" : "#232F3B" },
              ]}
              disabled={buttonDisabled}
              onPress={() => {
                if (page === "Mood") {
                  setPage("Factors");
                  setButtonDisabled(true);
                } else if (page === "Factors") {
                  setPage("Reflection");
                  setButtonDisabled(true);
                } else if (page === "Reflection" && !showJournal) {
                  setShowJournal(true);
                } else {
                  addNewEntry();
                }
              }}
            >
              <Text style={[styles.buttonText]}>
                {page === "Reflection" ? "Yes, I'd like to reflect" : "Next"}
              </Text>
            </Pressable>
          )}

          {page === "Reflection" && (
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor:
                    reflection.length && showJournal ? "#232F3B" : "lightgrey",
                },
              ]}
              onPress={() => addNewEntry()}
            >
              <Text style={[styles.buttonText]}>
                {!showJournal ? "No, I'm done" : "Done"}
              </Text>
            </Pressable>
          )}

          <Pressable
            style={{ marginTop: 20, marginBottom: 50 }}
            disabled={page === "Mood"}
            onPress={() => {
              if (page === "Reflection") {
                if (!showJournal) {
                  setPage("Factors");
                } else {
                  setShowJournal(false);
                }
              } else {
                setPage("Mood");
              }
            }}
          >
            {page != "Mood" && (
              <Text style={{ color: "#232F3B", fontSize: 15 }}>Back</Text>
            )}
          </Pressable>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingTop: "10%",
    paddingHorizontal: "5%",
    overflow: "hidden",
  },
  text: {
    color: "#232F3B",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  button: {
    borderRadius: 50, // Rounded border
    paddingHorizontal: 30, // Horizontal padding
    paddingVertical: 15, // Vertical padding
    width: "60%",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 15,
  },
});
