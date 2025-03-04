import ConnexionComponent from "../components/ConnexionComponent/ConnexionComponent";
    import {
        StyleSheet,
        KeyboardAvoidingView,
        SafeAreaView,
        Platform,
        View,
        ImageBackground,
      } from "react-native";
  import { useState } from "react";

  export default function ConnexionScreen() {
    return (
      <KeyboardAvoidingView
      
        style={styles.container}
        behavior={Platform.OS === "padding"}
      >
        <SafeAreaView>
          <ImageBackground source={require('../assets/wallpaper-cinefilm.jpg')} style={styles.backgroundImage}>
            <ConnexionComponent />
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
  })