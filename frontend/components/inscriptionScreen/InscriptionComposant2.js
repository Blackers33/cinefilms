import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useState } from "react";
import TextInput from "../common/TextInput";

function InscriptionScreen2({ handleNext,name,setName, age, setAge, city, setCity, genre, setGenre,}) {

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>AVATAR</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.Input}>Name</Text>

          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="Enter your name"
          ></TextInput>
        </View>
        <View>
          <Text style={styles.Input}>Age</Text>

          <TextInput
            onChangeText={setAge}
            value={age}
            placeholder="Enter your age"
          ></TextInput>
        </View>
        <View>
          <Text style={styles.Input}>City</Text>

          <TextInput
            onChangeText={setCity}
            value={city}
            placeholder="Enter your city"
          ></TextInput>
        </View>
        <View>
          <Text style={styles.Input}>Genre</Text>

          <TextInput
            onChangeText={setGenre}
            value={genre}
            placeholder="Enter your genre"
          ></TextInput>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.bouton}
          onPress={handleNext}
        >
          <Text style={styles.text}>Suivant </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    width: 380,
    marginTop: 50,
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
    marginTop: 50,
  },
  avatarText: {
    fontSize: 25,
    fontWeight: "bold",
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
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InscriptionScreen2;
