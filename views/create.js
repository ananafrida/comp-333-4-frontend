import { StatusBar } from "expo-status-bar";
import React, { useState , useEffect } from "react";
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


export default function Create ({ navigation }) {
  const route = useRoute();

  const [username, setUsername] = useState(route.params?.username);

  useEffect(() => {
    setUsername(route.params?.username);
  }, [route.params?.username]);

  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [rating, setRating] = useState("");

  const onCreate = () => {

    // Validate rating: must be between 1 and 5
    const isValidRating = /^[1-5]$/.test(rating);

    if (!isValidRating) {
      // Display an error message or take appropriate action for an invalid rating
      Alert.alert("Invalid rating.", " Please enter a number between 1 and 5.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      return;
    }

    axios
      .post(
        "http://172.21.229.212/index.php/music/create",
        {artist: artist, song: song, rating: rating},
        { withCredentials: true }
      )
      .then((response) => {
            if (response.data.success) {
              navigation.reset({
                index: 0,
                routes: [
                  { name: "Main", params: { username: username } },
                ],
              });
            }
            else {
                Alert.alert("Create Failed", response.data.message, [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                  ]);
            }
          })
          .catch((error) => {
            Alert.alert("Create Failed", error, [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
          });
  }

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
      <Text style={styles.header}>Create!</Text>
      <KeyboardAwareScrollView>
        <TextInput
          value={username}
          style={styles.no_input}
          editable={false}
        />
        <TextInput
          placeholder="Artist"
          onChangeText={setArtist}
          value={artist}
          style={styles.input}
        />
        <TextInput
          placeholder="Song"
          onChangeText={setSong}
          value={song}
          style={styles.input}
        />        
        <View style={styles.starContainer}>{renderStars()}</View>
        <View style={styles.button}></View>
        <Button title="Submit" onPress={onCreate} style={styles.button} />
        <View style={styles.button}></View>
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
  