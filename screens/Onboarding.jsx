import React, { useRef, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Button from "../components/Button";
import Welcome from "./OnboardScreens/Welcome";
import Log from "./OnboardScreens/Log";
import Trends from "./OnboardScreens/Trends";
import Time from "./OnboardScreens/Time";
import Go from "./OnboardScreens/Go";

const { width, height } = Dimensions.get("window");

export default function Onboarding({ setOnboarded }) {
  const [page, setPage] = useState("Welcome");

  return (
    <View style={styles.container}>
      <SwiperFlatList
        showPagination={true}
        data={[{ key: page }]}
        renderItem={({ item }) => {
          if (item.key === "Welcome") {
            return <Welcome setPage={setPage} />;
          } else if (item.key === "Log") {
            return <Log setPage={setPage} />;
          } else if (item.key === "Trends") {
            return <Trends setPage={setPage} />;
          } else if (item.key === "Time") {
            return <Time setPage={setPage} />;
          } else if (item.key === "Go") {
            return <Go setOnboarded={setOnboarded} />;
          }
        }}
        // ref={(ref) => {this.flatListRef = ref;}}
      />
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
