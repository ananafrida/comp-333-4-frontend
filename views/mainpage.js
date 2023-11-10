import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function MainPage({ navigation }) {
  const route = useRoute();
  username = route.params.username;

  return (
    <View>
      <Text>Main Page</Text>
    </View>
  );
}
