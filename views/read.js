import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 

export default function Read({ navigation }) {
  // Get route parameters
  const route = useRoute();

  // State variables for song details
  const [username, setUsername] = useState(route.params?.username);
  const [artist, setArtist] = useState(route.params?.artist);
  const [song, setSong] = useState(route.params?.song);
  const [rating, setRating] = useState(route.params?.rating);
  const [songUser, setSongUser] = useState(route.params?.songUser);

  // Update state when route params change
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
      {/* Display user information */}
      <Text style={styles.info}>Logged in as {username}</Text>

      {/* Display song user details */}
      <Text style={styles.title}>Username</Text>
      <Text style={styles.info}>{songUser}</Text>

      {/* Display artist details */}
      <Text style={styles.title}>Artist</Text>
      <Text style={styles.info}>{artist}</Text>

      {/* Display song details */}
      <Text style={styles.title}>Song</Text>
      <Text style={styles.info}>{song}</Text>

      {/* Display star rating */}
      <Text style={styles.title}>Rating</Text>
      <View style={styles.star}>
        {/* Use AntDesign icons to display star rating */}
        {Array.from({ length: rating }, (_, index) => (
          <AntDesign key={index} name="star" size={24} color="yellow" />
        ))}
      </View>
    </View>
  );
}

// Styles for the components
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
