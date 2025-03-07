//@author : Charlie

import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions } from "react-native";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Avatar from "../common/Avatar";
import GradientBackground from "../common/GradientBackground";

export default function ProfilPageComponent () {
    const [userData, setUserData] = useState('')

    const user = useSelector((state) => state.user.value);


    useEffect(() => {
      fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/users/profil/${user.token}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => setUserData(data))
    }, []);
    

  return (
    <View style={styles.container} >
      <GradientBackground/>
     
      <View style={styles.avatar}>
      <Avatar uri={user.avatar} size={64} />
      </View>
      <Text style={styles.usernameStyle} >{`${userData.username}`}</Text>
    
      <View style={styles.inputContainer}> 
      <ScrollView
						contentContainerStyle={{ flexGrow: 1}}
						keyboardShouldPersistTaps='handled'
            style={styles.scrollViewStyle}
					>    
        <View style={styles.textContainer}>
          <Text style={styles.Input}>Age</Text>
          <Text  style={styles.text}>
          {`${userData.age}`} ans
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.Input}>Votre localisation </Text>

          <Text style={styles.text}>
            {`${userData.city}`}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.Input}>Genre</Text>

          <Text style={styles.text}>
            {`${userData.genre}`}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.Input}>Tes films favoris</Text>

          <Text style={styles.text}>
            {`${userData.recherchefilm}`}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.Input}>Tes genres favoris</Text>

          <Text style={styles.text}>
            {`${userData.genrefilm}`}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.Input}>Biographie</Text>

          <Text style={styles.text}>
            {`${userData.biography}`}
          </Text>
        </View>
        </ScrollView>
        </View>
        <View style={styles.editProfilButtonContainer} >
        <TouchableOpacity style={styles.editProfilButton} >
          <Text style={styles.editProfilText} >Éditer son profil</Text>
        </TouchableOpacity>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1C1A",
    alignItems: "center",
      justifyContent: "center",
      width: Dimensions.get("window").width,
  },
  inputContainer: {
    marginTop: 50,    
    paddingRight: 12,   
    height: 480,
    alignItems: "flex-start",
    width: "100%"
  },
  champInput: {
    borderWidth: 2,
    borderColor: "#C94106",
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 10,
    color: "#FFFFFF",
    width: "100%",
  },
  Input: {
    paddingLeft: 12,
    fontSize: 16,
    color: "#C94106",
    fontWeight: "bold",
  },
  
  text: {
    color: "white",
    fontSize: 16,
    paddingLeft: 15,
  },
  
  textContainer: {
  paddingBottom: 20,
  },
  editProfilText: {
    color: "white",
    fontSize: 20,
  },
  editProfilButton: {
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#c94106",
    height: 50
  },
  editProfilButtonContainer: {
    marginTop: 10,
    width: 380,
    alignItems: "center",
  },
  scrollview: {
  },
  usernameStyle: {

    fontSize: 22,
    color: "#C94106",
    fontWeight: "bold",
  },
});