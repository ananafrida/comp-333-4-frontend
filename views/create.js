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

    axios
      .post(
        "http://172.21.229.212/index.php/music/create",
        {artist: artist, song: song, rating: rating},
        { withCredentials: true }
      )
      .then((response) => {
            if (response.data.success) {
                navigation.goBack();
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
        <TextInput
        placeholder="Rating"
        onChangeText={setRating}
        value={rating}
        style={styles.input}
        />
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
  });
  
