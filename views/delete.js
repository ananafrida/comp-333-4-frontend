import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function Delete({ navigation }) {
  // Accessing the route parameters
  const route = useRoute();

  // Function to handle the deletion of a song
  const handleDelete = async () => {
    try {
      // Extracting the songId from route params
      const { songId } = route.params || {};

      // Checking if songId is missing in route params
      if (!songId) {
        console.error("SongId is missing in route params");
        return;
      }

      // Send a delete request to the server
      const response = await fetch("http://172.21.229.212/index.php/music/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: songId,
        }),
      });

      const data = await response.json();

      // Check the response and handle accordingly
      if (data.success) {
        // Song deleted successfully
        // Navigate back to the "Main" screen
        navigation.navigate("Main", { username: route.params?.username });
      } else {
        // Deletion failed, handle error
        console.error("Deletion failed:", data.error);
        // You may want to show an error message to the user
      }
    } catch (error) {
      // Log and display an error message if there's an issue with the deletion process
      console.error("Error deleting song:", error);
      Alert.alert("Deletion Failed", "Something went wrong. Please try again later.");
    }
  };

  // Function to handle canceling the deletion
  const handleCancelDelete = () => {
    // Navigate back to the "Main" screen
    navigation.navigate("Main", { username: route.params?.username });
  };

  // Effect to display a confirmation dialog when the component mounts
  useEffect(() => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this song?",
      [
        {
          text: "Cancel",
          onPress: handleCancelDelete,
          style: "cancel",
        },
        { text: "Delete", onPress: handleDelete },
      ],
      { cancelable: false }
    );
  }, []); // Empty dependency array to run this effect only once

  // Render the component
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loading...</Text>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#E0A3F0",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});
