import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import { useState } from "react";
import { useSelector } from 'react-redux';

export default function ProfilPageComponent ({
  age,
  city,
  genre,
  genrefilm,
  recherchefilm,
  biography,
  filmInput,
}) {
    const [userData, setUserData] = useState('')

    const user = useSelector((state) => state.user.value);

    fetch(`http://10.9.0.150:3000/users/profil${user.token}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: age,
          city: city,
          genre: genre,
          genrefilm: genrefilm,
          recherchefilm: recherchefilm,
          biography: biography,
        }),
    })
    .then((response) => response.json())
    .then((data) => setUserData(userData));
    
    

  return (
    <View>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>AVATAR</Text>
      </View>
      <View style={styles.inputContainer}>     
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
          <Text style={styles.Input}>Tes genres favoris</Text>

          <Text style={styles.text}>
            {`${userData.genrefilm}`}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.Input}>Tes films favoris</Text>

          <Text style={styles.text}>
            {`${userData.recherchefilm}`}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.Input}>Biographie</Text>

          <Text style={styles.text}>
            {`${userData.biography}`}
          </Text>
        </View>
        <View style={styles.editProfilButtonContainer} >
        <TouchableOpacity style={styles.editProfilButton} >
          <Text style={styles.editProfilText} >Éditer son profil</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 380,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
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
  avatar: {
    borderColor: "pink",
    backgroundColor: "pink",
    borderWidth: 5,
    height: 120,
    width: 120,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    
    marginLeft: 150,
  },
  avatarText: {
    fontSize: 25,
    fontWeight: "bold",
  },

  text: {
    color: "black",
    fontSize: 16,
    paddingLeft: 15,
  },
  
  textContainer: {
  paddingBottom: 10,
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
    marginTop: 30,
    width: 380,
    alignItems: "center",
  },
});