import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import { useState } from "react";
import { useSelector } from 'react-redux';
import Avatar from "../common/Avatar";

export default function EditProfilComponent ({
 handleNext,
  age,
  setAge,
  city,
  setCity,
  genre,
  setGenre,
}) {
    const [userData, setUserData] = useState('')
    const user = useSelector((state) => state.user.value);

    fetch(process.env.EXPO_PUBLIC_IP_ADDRESS + "/users/profil" + user.token, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				age: age,
				city: city,
				genre: genre,
			}),
		})
			.then((response) => response.json())
			.then((data) => setUserData(userData));
    
    

  return (
    <View style={styles.container} >
      <Avatar size={100} />
      <View style={styles.inputContainer}>     
        <View>
          <Text style={styles.Input}>Age</Text>

          <TextInput
            onChangeText={setAge}
            value={age}
            placeholder={`${userData.age}`}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.Input}>Votre localisation </Text>

          <TextInput
            onChangeText={setCity}
            value={city}
            placeholder={`${userData.city}`}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.Input}>Genre</Text>

          <TextInput
            onChangeText={setGenre}
            value={genre}
            placeholder={`${userData.genre}`}
          ></TextInput>
        </View>
        <View style={styles.button}>
          <Button text="Scène suivante🎬" onPress={handleNext} />
        </View>
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
      paddingTop: 50,
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    
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
    padding: 12,
    fontSize: 16,
    color: "#C94106",
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
    marginBottom: 30,
  },
  avatarText: {
    fontSize: 25,
    fontWeight: "bold",
  },

  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginTop: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
