//@author : Charlie

import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions } from "react-native";
import Button from "../common/Button";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { useSelector } from 'react-redux';
import Avatar from "../common/Avatar";
import { updateprofilUser } from '../../reducers/user';
import TextInput from "../common/TextInput";
import GradientBackground from "../common/GradientBackground";

export default function ProfilPageComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [age, setAge] = useState(user.age || "");
  const [city, setCity] = useState(user.city || "");
  const [genre, setGenre] = useState(user.genre || "");
  const [genrefilm, setGenrefilm] = useState(user.genrefilm || "");
  const [recherchefilm, setRecherchefilm] = useState(user.recherchefilm || "");
  const [biography, setBiography] = useState(user.biography || "");

  const handleConfirmation = () => {
    fetch(process.env.EXPO_PUBLIC_IP_ADDRESS + '/users/profil/' + user.token, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: age,
        city: city,
        genre: genre,
        genrefilm: genrefilm,
        recherchefilm: recherchefilm,
        biography: biography,
      })
    })
      .then(res => res.json())
      .then(data => dispatch(updateprofilUser(data)))
  }

  return (
    <View style={styles.container} >
      <GradientBackground />

      <View style={styles.avatar}>
        <Avatar uri={user.avatar} size={64} />
      </View>

      <View style={styles.inputContainer}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
          style={styles.scrollViewStyle}
        >
          <View style={styles.textContainer}>
            <Text style={styles.Input}>Age</Text>
            <TextInput  value={age}
              onChangeText={setAge} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.Input}>Votre localisation </Text>
            <TextInput value={city}
              onChangeText={setCity}/>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.Input}>Genre</Text>
            <TextInput  value={genre}
             onChangeText={setGenre}/>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.Input}>Tes films favoris</Text>
            <TextInput value={recherchefilm}
              onChangeText={setRecherchefilm}/>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.Input}>Tes genres favoris</Text>
            <TextInput value={genrefilm}
              onChangeText={setGenrefilm}/>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.Input}>Biographie</Text>
            <TextInput value={biography}
              onChangeText={setBiography}
              multiline={true}/>
          </View>

        </ScrollView>
      </View>
      <View style={styles.editProfilButtonContainer} >
        <TouchableOpacity style={styles.editProfilButton} onPress={() => handleConfirmation()} >
          <Text style={styles.editProfilText} >Confirmer</Text>
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
    width: Dimensions.get("window").width,
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
});