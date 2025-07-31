// pages/InputScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InputScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    birthPlace: "",
    interests: "",
    dislikes: "",
    gfName: "",
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleStart = () => {
    if (!formData.firstName || !formData.gfName) return;
    navigation.navigate("Chat", { profile: formData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={{ opacity: fadeAnim, width: "100%" }}>
            <Text style={styles.title}>Tell us about yourself 💬</Text>

            <Input
              icon="person-outline"
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(val) => handleChange("firstName", val)}
            />
            <Input
              icon="person-outline"
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(val) => handleChange("lastName", val)}
            />
            <Input
              icon="calendar-outline"
              placeholder="Age"
              keyboardType="number-pad"
              value={formData.age}
              onChangeText={(val) => handleChange("age", val)}
            />
            <Input
              icon="location-outline"
              placeholder="Birth Place"
              value={formData.birthPlace}
              onChangeText={(val) => handleChange("birthPlace", val)}
            />
            <Input
              icon="heart-outline"
              placeholder="Interests"
              value={formData.interests}
              onChangeText={(val) => handleChange("interests", val)}
              multiline
            />
            <Input
              icon="close-circle-outline"
              placeholder="Dislikes"
              value={formData.dislikes}
              onChangeText={(val) => handleChange("dislikes", val)}
              multiline
            />
            <Input
              icon="female-outline"
              placeholder="AI Girlfriend's Name"
              value={formData.gfName}
              onChangeText={(val) => handleChange("gfName", val)}
            />

            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.buttonText}>Start Chatting 💖</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Input = ({ icon, ...props }) => (
  <View style={styles.inputContainer}>
    <Ionicons name={icon} size={20} color="#ff69b4" style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholderTextColor="#aaa"
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 24,
    paddingBottom: 60,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ff69b4",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ffb6c1",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    marginBottom: 12,
    backgroundColor: "#fff0f5",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ff69b4",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignSelf: "center",
    elevation: 3,
    shadowColor: "#ff69b4",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});

