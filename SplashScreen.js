// pages/SplashScreen.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();
  const logoAnim = React.useRef(new Animated.Value(0)).current;
  const buttonAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(logoAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();

    Animated.timing(buttonAnim, {
      toValue: 1,
      delay: 300,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/logo2.png")} // <-- Your logo file here
        style={[styles.logo, { transform: [{ scale: logoAnim }] }]}
        resizeMode="contain"
      />
      <Animated.View style={{ opacity: buttonAnim, transform: [{ scale: buttonAnim }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Input")}
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 60,
  },
  button: {
    backgroundColor: "#ff69b4",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    shadowColor: "#ff69b4",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
