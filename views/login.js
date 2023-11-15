// Import necessary dependencies
import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Create the functional component for LoginPage
export default function LoginPage({ navigation }) {
  // State variables for storing input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Function to handle navigation to the registration page
  const onRegisterClick = () => {
    navigation.navigate("Register");
  };

  // Function to handle user login
  const onLogin = () => {
    // Make a POST request to the server to perform login
    axios
      .post(
        "http://172.21.9.38/index.php/user/login",
        {
          username: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success) {
          // Successful login, set the user and navigate to the "Main" screen
          setUsername(response.data.username);
          navigation.replace("Main", { username: response.data.username });
        } else {
          // If login fails, show an error message
          Alert.alert("Login Failed", "Incorrect Username or Password", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      })
      .catch((error) => {
        // If an error occurs during the request, show an error message
        Alert.alert("Login Failed", error, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        // Handle login error, display an error message, etc.
      });
  };

  // Render the component
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login Page</Text>
      <KeyboardAwareScrollView>
        {/* Input for entering the username */}
        <TextInput
          placeholder="Username"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
        />
        {/* Input for entering the password */}
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          style={styles.input}
        />
        {/* Buttons for submitting the form and navigating to the registration page */}
        <View style={styles.button}></View>
        <Button title="Submit" onPress={onLogin} style={styles.button} />
        <View style={styles.button}></View>
        <Button
          title="Register"
          onPress={onRegisterClick}
          style={styles.button}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#E0A3F0", // Background color
  },
  header: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  linkText: {
    color: "#007bff", // Link color
    fontSize: 18,
  },
  input: {
    margin: 20,
    backgroundColor: "#ffffff",
    height: 50,
    width: 250,
    padding: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#000000",
  },
});
