import TextInput from "../common/TextInput";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import { useState } from "react";
  import Button from "../common/Button";

  function connexionScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
      <View style={styles.container}>
        <Text style={styles.titrelogo}>Bienvenue sur Cinefilm !</Text>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.Input}>Email</Text>
            <TextInput
              onChangeText={(value) => setEmail(value)}
              value={email}
              placeholder="Enter your email"
            ></TextInput>
          </View>
          <View>
            <Text style={styles.Input}>Password</Text>
            <TextInput
              onChangeText={(value) => setPassword(value)}
              value={password}
              placeholder="Enter your password"
            ></TextInput>
          </View>
          <View style={styles.buttonContainer} >
          <Button text="Connexion" />
          <Text style={styles.transitionText} >Pas encore inscrit ?</Text>
          <Button text="Inscrivez-vous" />
          </View>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    inputContainer: {
        width: 380,
        marginTop: 50,
      },
      Input: {
        padding: 12,
        fontSize: 16,
        color: "#C94106",
      },
      bouton: {
        backgroundColor: "#C94106",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
      },
      buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
      },
      titrelogo: {
        color: "#c94106",
        fontSize: 35,
      },
      transitionText: {
        color: "#c94106",
        fontSize: 20,
        marginTop: 50,
        textAlign: "center",
      },
      boutonInscription: {
        backgroundColor: "#C94106",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
      },
      container: {
        flex: 1,
        backgroundColor: "#1E1C1A",
        alignItems: "center",
        justifyContent: "center",
      },
      buttonContainer: {
        width: 380,
        marginTop: 10,
        alignItems: "center",
      },
  })


  export default connexionScreen;