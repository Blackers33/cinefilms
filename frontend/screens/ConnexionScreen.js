import ConnexionComponent from "../components/ConnexionComponent/ConnexionComponent";
    import {
        StyleSheet,
        KeyboardAvoidingView,
        SafeAreaView,
        Platform,
        View,
      } from "react-native";
  import { useState } from "react";

  export default function ConnexionScreen() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "padding"}
      >
        <SafeAreaView>
          <View>
            <ConnexionComponent />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1E1C1A",
      alignItems: "center",
      justifyContent: "center",
    },
  })