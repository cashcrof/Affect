import { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default class Button extends Component {
      render({ setPage } = this.props) {
    return (
      <TouchableOpacity onPress={() => setPage(this.props.nextPage)}>
        <View style={styles.button}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,         // Rounded border
    borderWidth: 2,           // 2 point border widht
    backgroundColor: '#232F3B',   // White colored border
    paddingHorizontal: 50,    // Horizontal padding
    paddingVertical: 15,      // Vertical padding
    width: 300,
  },
  // Button text
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
  },
});