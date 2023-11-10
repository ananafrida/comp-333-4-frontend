import React from "react";
import { useState, useEffect } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function MainPage({ navigation }) {
  const route = useRoute();
  const [username, setUsername] = useState(route.params?.username);

  useEffect(() => {
    // Update the username state when the route.params.username changes
    setUsername(route.params?.username);
  }, [route.params?.username]);

  console.log(username);

  return (
    <View>
      <Text>Main Page</Text>
      <Text>{username}</Text>
    </View>
  );
}
