import React from "react";
import { useState, useEffect } from "react";

import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 


export default function Read ({ navigation }) {
  const route = useRoute();

  const [username, setUsername] = useState(route.params?.username);
  const [artist, setArtist] = useState(route.params?.artist);
  const [song, setSong] = useState(route.params?.song);
  const [rating, setRating] = useState(route.params?.rating);
  const [songUser, setSongUser] = useState(route.params?.songUser);

  useEffect(() => {
    setUsername(route.params?.username);
  }, [route.params?.username]);

  useEffect(() => {
    setArtist(route.params?.artist);
  }, [route.params?.artist]);

  useEffect(() => {
    setSong(route.params?.song);
  }, [route.params?.song]);

  useEffect(() => {
    setRating(route.params?.rating);
  }, [route.params?.rating]);

  useEffect(() => {
    setSongUser(route.params?.songUser);
  }, [route.params?.songUser]);

  return (
    <View style={styles.container}>
        <Text style={styles.info}>Logged in as {username}</Text>
        <Text style={styles.title}>Username</Text>
        <Text style={styles.info}>{songUser}</Text>
        <Text style={styles.title}>artist</Text>
        <Text style={styles.info}>{artist}</Text>
        <Text style={styles.title}>song</Text>
        <Text style={styles.info}>{song}</Text>
        <Text style={styles.title}>rating</Text>
        <View style={styles.star}>
        {Array.from({ length: rating }, (_, index) => (
          <AntDesign key={index} name="star" size={24} color="yellow" />
        ))}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#91cdeb",
        alignItems: "left",
        justifyContent: "top",
      },
  title: {
    marginTop: 40,
    fontWeight: "bold",
    fontSize: 40,
    marginLeft: 30
  },
  info: {
    fontSize: 25,
    marginTop: 5,
    marginLeft: 30

  },
  star : {
    flex: 1,
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 10

  }
});
