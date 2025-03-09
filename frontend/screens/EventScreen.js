import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import UserTopSection from "../components/common/UserTopSection";
import Event from "../components/EventsComponent/Event";
import Inputstyled from "../components/common/TextInput";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../components/common/Button";

const mockUser = {
  _id: "67ca1d44bfc125477ece24ce",
  username: "Lou",
  password: "$2b$10$nPPlMDeI.NFKkZCh7Bs0e.WYyIVs3rwj6D6i.yCXlIWWXt3T8SDB6",
  email: "Lou@gmail.com",
  token: "_ZpeuBlpvOL6Qd1yLwyg50_GhAxA-cMl",
  friends: [],
  favGenres: ["447277", "812"],
  favMovies: ["Action", "Adventure"],
  __v: 0,
  age: 25,
  avatar:
    "https://image.noelshack.com/fichiers/2015/12/1426650974-quiz-les-personnages-de-tintin-5472.jpeg",
  biography: "je ne suis pas un robot",
  genre: "Homme",
  location: {
    name: "Paris",
    latitude: 48.859,
    longitude: 2.347,
  },
};

export default function EventScreen({ navigation }) {
  const user = mockUser; //useSelector((state) => state.user.value);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "padding"}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/backgroundGradient.png")}
        >
          <View style={styles.userTopContainer}>
            <UserTopSection user={user} />
          </View>
          <View style={styles.reseachcontainer}>
            <View style={styles.reseachInput}>
              <Inputstyled></Inputstyled>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <FontAwesome name="search" size={25} color="#ec6e5b" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.eventscontainer}>
            <Event></Event>
          </View>
          </ScrollView>
          <View style={styles.buttoncreationEvent}>
            <Button text="Créer un évènement"></Button>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#000000",
    justifyContent: "space-between",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  userTopContainer: {
    marginTop: 30,
    width: "100%",
  },

  reseachcontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 20,
    padding: 10,
    paddingRight: 20,
  },
  reseachInput: {
    width: "80%",
  },
  scrollContainer: {
    flexGrow: 1, 
    padding: 20,
  },
  eventscontainer:{

  },
  buttoncreationEvent: {
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
  },
});
