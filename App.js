import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


import LoginPage from "./views/login";
import RegisterPage from "./views/register";
import MainPage from "./views/main";
import UpdatePage from "./views/update";
import ReadPage from "./views/read";
import DeletePage from "./views/delete";
import CreatePage from "./views/create";

export default function App() {
  const Stack = createStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="Update" component={UpdatePage} />
        <Stack.Screen name="Read" component={ReadPage} />
        <Stack.Screen name="Delete" component={DeletePage} />
        <Stack.Screen name="Create" component={CreatePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
