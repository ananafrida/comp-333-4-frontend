import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation , useIsFocused} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function MainPage({ route }) {
  // State variables
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Fetch songs when the component mounts
    isFocused && query();
  }, [isFocused]);

  // Function to fetch songs
  const query = () => {
    fetch("http://172.21.9.38/index.php/music/list")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
      })
      .catch((error) => {
        console.error("Error fetching song list:", error);
        setError("Failed to fetch songs");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to handle update button press
  const handleUpdate = (songId) => {
    navigation.navigate("Update", { songId });
  };

// Function to handle delete button press
const handleDelete = (songId) => {
  navigation.navigate("Delete", { songId, username });
};

  // Function to handle view button press
  const handleRead = (songId, song, artist, rating) => {
    navigation.navigate("Read", { songId, song, artist, rating, username });
  };

  // Function to handle create button press
  const handleCreate = () => {
    navigation.navigate("Create", { username });
  };

  // Function to handle logout button press
  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Icon name="headphones" size={40} color="brown" style={styles.icon} />
        <Text style={styles.header}>Song Rater with Taylor Swift</Text>
      </View>
      {/* Additional Header Text */}
      <Text style={[styles.header, styles.customFont]}>
        Taylor Swift is the best!
      </Text>

      {/* Welcome Text */}
      <Text style={styles.header}>Welcome, {username}!</Text>

      {/* Loading/Error/FlatList Section */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.songItem}>
              <Text style={styles.songTitle}>{`${item.song}`}</Text>
              <Text>{`by ${item.artist}`}</Text>
              <Text>{`Rating: ${item.rating}`}</Text>
              {/* Update/Delete buttons */}
              {item.username === username && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleUpdate(item.id)}
                  >
                    <Icon name="pencil" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Icon name="trash" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
              {/* View button */}
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleRead(item.id, item.song, item.artist, item.rating)}
              >
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Create and Logout Buttons */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>Create a New Song</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

//styling section starts here
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
  songItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    position: "relative",
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  iconButton: {
    width: "48%",
    padding: 8,
    backgroundColor: "#007bff",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  viewButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#28a745",
    borderRadius: 4,
  },
  viewButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#dc3545",
    borderRadius: 4,
  },
  logoutButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  createButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#28a745",
    borderRadius: 4,
  },
  createButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  icon: {
    marginRight: 8,
  },
  customFont: {
    fontSize: 15, // Adjust the font size as needed
  },
});
