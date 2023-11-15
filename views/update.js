import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Update({ navigation }) {
  const route = useRoute();

  // State variables for storing input values
  const [username, setUsername] = useState(route.params?.username);
  const [artist, setArtist] = useState(route.params?.artist);
  const [song, setSong] = useState(route.params?.song);
  const [rating, setRating] = useState(route.params?.rating);

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

  // Function to handle the update of the song
  const handleUpdate = async () => {
    const { songId } = route.params;

    // Validate rating: must be between 1 and 5
    const isValidRating = /^[1-5]$/.test(rating);

    if (!isValidRating) {
      // Display an error message or take appropriate action for an invalid rating
      console.error("Invalid rating. Please enter a number between 1 and 5.");
      return;
    }

    try {
      const { songId, username } = route.params || {};
      if (!songId) {
        console.error("SongId is missing in route params");
        return;
      }

      // Send updated song details to the server
      const response = await fetch("http://172.21.9.38/index.php/music/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: songId,
          artist,
          song,
          rating: parseInt(rating), // Convert rating back to integer
        }),
      });

      const data = await response.json();

      // Check the response and handle accordingly
      if (data.success) {
        // Song updated successfully
        // Navigate to the "Main" screen
        navigation.navigate("Main", { username: username });
      } else {
        // Update failed, handle error
        console.error("Update failed:", data.error);
        // You may want to show an error message to the user
      }
    } catch (error) {
      console.error("Error updating song:", error);
      // Handle error gracefully
      Alert.alert("Update Failed", "Something went wrong. Please try again later.");
    }
  };

  // Function to handle cancellation of the update
  const handleCancelUpdate = () => {
    // Navigate back to the "Main" screen
    navigation.navigate("Main", { username });
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Song</Text>
      <Text style={styles.header}>You're logged in as: {username}</Text>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={song}
        onChangeText={(text) => setSong(text)}
        placeholder={song} // Prefill old title as placeholder
      />
      <Text style={styles.label}>Artist:</Text>
      <TextInput
        style={styles.input}
        value={artist}
        onChangeText={(text) => setArtist(text)}
        placeholder={artist} // Prefill old artist as placeholder
      />
      <Text style={styles.label}>Rating:</Text>
      <View style={styles.starContainer}>{renderStars()}</View>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Song</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancelUpdate}>
        <Text style={styles.buttonText}>Cancel Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#E0A3F0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  updateButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
});


