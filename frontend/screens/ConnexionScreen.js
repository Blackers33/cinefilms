import ConnexionComponent from "../components/ConnexionComponent/ConnexionComponent";
    import {
        StyleSheet,
        KeyboardAvoidingView,
        SafeAreaView,
        Platform,
        View,
        ImageBackground,
        Text
      } from "react-native";
  import { useState } from "react";
  import Button from "../components/common/Button";

  export default function ConnexionScreen({ navigation }) {
    
const handleConnexion = () => {
      fetch("http://10.9.0.150:3000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            navigation.navigate("HomeScreen", { token: data.token });
          } else {
            alert("Email ou mot de passe incorrect");
          }
        });
    }

    return (
      <KeyboardAvoidingView
      
        style={styles.container}
        behavior={Platform.OS === "padding"}
      >
        <SafeAreaView>
          <ImageBackground source={require('../assets/wallpaper-cinefilm.jpg')} style={styles.backgroundImage}>
            <ConnexionComponent />
            <View style={styles.buttonContainer} >
          <Button text="Connexion" onPress={() => handleConnexion()} />
          <Text style={styles.transitionText} >Pas encore inscrit ?</Text>
          <Button text="Inscrivez-vous" onPress={() => navigation.navigate("Inscription")} />
          </View>
          </ImageBackground>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: "#1E1C1A",
      alignItems: "center",
      justifyContent: "center",
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: "center",
      alignItems: "center",
    },
    transitionText: {
      color: "#c94106",
      fontSize: 20,
      marginTop: 80,
      textAlign: "center",
    },
    buttonContainer: {
      width: 380,
      marginTop: 10,
      alignItems: "center",
    },
  })