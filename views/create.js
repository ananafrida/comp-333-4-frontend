// Import necessary dependencies
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

// Create the functional component for Create
export default function Create({ navigation }) {
  // Retrieve parameters from the navigation route
  const route = useRoute();
  const [username, setUsername] = useState(route.params?.username);

  // Update the username state when route params change
  useEffect(() => {
    setUsername(route.params?.username);
  }, [route.params?.username]);

  // State variables for storing input values
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [rating, setRating] = useState("");

  // Function to handle the creation of a new song
  const onCreate = () => {
    // Validate rating: must be between 1 and 5
    const isValidRating = /^[1-5]$/.test(rating);

    if (!isValidRating) {
      // Display an error message for an invalid rating
      Alert.alert("Invalid rating.", " Please enter a number between 1 and 5.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      return;
    }

    // Make a POST request to the server to create a new song
    axios
      .post(
        "http://172.21.9.38/index.php/music/create",
        { artist: artist, song: song, rating: rating },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success) {
          // If creation is successful, navigate to the "Main" screen
          navigation.reset({
            index: 0,
            routes: [{ name: "Main", params: { username: username } }],
          });
        } else {
          // If creation fails, show an error message
          Alert.alert("Create Failed", response.data.message, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      })
      .catch((error) => {
        // If an error occurs during the request, show an error message
        Alert.alert("Create Failed", error, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
  };

  // Function to handle star press
  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  // Function to render stars
  const renderStars = () => {
    const starIcons = [];

    for (let i = 1; i <= 5; i++) {
      starIcons.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          <Icon name={i <= rating ? "star" : "star-o"} size={30} color="orange" />
        </TouchableOpacity>
      );
    }

    return starIcons;
  };

  // Render the component
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create!</Text>
      <KeyboardAwareScrollView>
        {/* Input for displaying the username (not editable) */}
        <TextInput
          value={username}
          style={styles.no_input}
          editable={false}
        />
        {/* Input for entering the artist name */}
        <TextInput
          placeholder="Artist"
          onChangeText={setArtist}
          value={artist}
          style={styles.input}
        />
        {/* Input for entering the song title */}
        <TextInput
          placeholder="Song"
          onChangeText={setSong}
          value={song}
          style={styles.input}
        />
        {/* Container for displaying star icons */}
        <View style={styles.starContainer}>{renderStars()}</View>
        {/* Buttons for submitting the form */}
        <View style={styles.button}></View>
        <Button title="Submit" onPress={onCreate} style={styles.button} />
        <View style={styles.button}></View>
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
  no_input: {
    margin: 20,
    backgroundColor: "#b8b4b4",
    height: 50,
    width: 250,
    padding: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#000000",
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 16,
    margin: 20,
  },
});
