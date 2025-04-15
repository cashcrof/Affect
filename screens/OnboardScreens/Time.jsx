import Button from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, Pressable, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "../../components/Push";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Log({ setPage }) {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const [date, setDate] = useState(today);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token),
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onSetReminder = async () => {
    await schedulePushNotification(date).finally(
      () => console.log("Reminder set"),
      setPage("Go"),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>When would you like to log your mood?</Text>
        <DateTimePicker
          display="spinner"
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={false}
          onChange={onChange}
        />
      </View>
      <Pressable style={styles.button} onPress={() => onSetReminder()}>
        <Text style={styles.buttonText}>Set Reminder</Text>
      </Pressable>
      <Button text="Skip" setPage={setPage} nextPage="Go" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "90%",
    width: "100%",
  },
  title: {
    color: "#232F3B",
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    fontFamily: "Avenir",
    textAlign: "center",
  },
  sub: {
    color: "#232F3B",
    fontSize: 20,
    padding: 10,
    fontFamily: "Avenir",
    textAlign: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Avenir",
    width: 350,
  },
  button: {
    borderRadius: 20, // Rounded border
    borderWidth: 2, // 2 point border widht
    backgroundColor: "#232F3B", // White colored border
    paddingHorizontal: 50, // Horizontal padding
    paddingVertical: 15, // Vertical padding
    width: 300,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Avenir",
    fontSize: 20,
    textAlign: "center",
  },
});
