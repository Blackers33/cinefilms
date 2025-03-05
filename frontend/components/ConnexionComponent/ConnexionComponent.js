import TextInput from "../common/TextInput";
import {
  ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import { useState } from "react";
  

  function connexionScreen({ email, setEmail, password, setPassword }) {
  


    return (
      
      <View style={styles.container} >
        <Text style={styles.titrelogo}>Bienvenue sur Cinefilm !</Text>
        <Text style={styles.titrecontenu}>
                Retrouvez les meilleurs films, événements et échanges entre passionnés
                de cinéma. Rejoignez la communauté et vivez votre passion à fond !{"\n"}
              </Text>
        <View style={styles.inputContainer}>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <Text style={styles.Input}>Email</Text>
            <TextInput
              onChangeText={setEmail}
              value={email}
              placeholder="Enter your email"
              keyboardType="email-address"
            ></TextInput>
          </View>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <Text style={styles.Input}>Password</Text>
            <TextInput
              onChangeText={setPassword}
              value={password}
              placeholder="Enter your password"
              secureTextEntry={true}
            ></TextInput>
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
        paddingLeft: 30,
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
        padding: 10,
        textAlign:
          "center",
      },
      transitionText: {
        color: "#c94106",
        fontSize: 20,
        marginTop: 80,
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
        backgroundColor: "#000000D9",
        alignItems: "center",
        justifyContent: "center",
      },
      buttonContainer: {
        width: 380,
        marginTop: 10,
        alignItems: "center",
      },
      ImageBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
      },
      titrecontenu: {
        color: "#c94106",
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: "center",
      },

  })


  export default connexionScreen;