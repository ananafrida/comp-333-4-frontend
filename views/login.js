import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegisterClick = () => {
    navigation.navigate("Register");
  };

  const onLogin = () => {
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login Page</Text>
      <KeyboardAwareScrollView>
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          style={styles.input}
        />
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
