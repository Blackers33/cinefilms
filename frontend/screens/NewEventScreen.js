//Création du screen pour créer un nouvel évènement

import {
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  Platform
} from "react-native";
import Inputstyled from "../components/common/TextInput";
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import tmdbApiCall from "../components/HomeScreen/tmdbApiCall";

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

export default function NewEventScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [description, setDescription] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [movie, setMovie] = useState("");
  const [resultmovie, setResultmovie] = useState("");
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [tmdbidfilm, setTmdbidfilm] = useState("");

  const formatDateToFrench = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("fr-FR", {
      year: "numeric", // Année
      month: "numeric",
      day: "numeric", // Jour
    });
  };
  const handleDateSelect = (day) => {
    const formattedDate = formatDateToFrench(day.dateString);
    setSelectedDate(formattedDate);
    setShowCalendar(false); // Cache le calendrier après sélection
  };

  const handleAddMovie = async () => {
    if (!movie.trim()) return;

    try {
      const uri = `/search/movie?query=${encodeURIComponent(
        movie
      )}&language=fr-FR`;
      console.log(uri);
      const results = await tmdbApiCall(uri);

      if (results.length === 0) {
        setNoResultsFound(true);
        setResultmovie("");
        return;
      }

      setResultmovie(results[0]);
      setNoResultsFound(false);
      setTmdbidfilm(results[0].id);
    } catch (error) {
      console.error("Erreur lors de la recherche du film:", error);
      setNoResultsFound(true);
      setResultmovie("");
    }

    setMovie("");
  };

  const handleSubmitMessage = () => {
    fetch(process.env.EXPO_PUBLIC_IP_ADDRESS + "/events/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: place,
        description: description,
        title: title,
        user: mockUser.token, 
        tmbdId: tmdbidfilm, 
        date: selectedDate, 
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data);
          navigation.navigate("Events");
        } else {
          console.log("Erreur:", data.message); // Si `result` est faux, vous pouvez afficher un message d'erreur
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête:", error);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === "padding"}>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <Text style={styles.title}>Créer son évènement</Text>
          <View style={styles.container}>
            <View style={styles.infos}>
              <View style={styles.inputBubble}>
                <Inputstyled
                  placeholder="Titre de l'évènement"
                  placeholderTextColor="white"
                  onChangeText={(value) => setTitle(value)}
                  value={title}
                ></Inputstyled>
              </View>
              <View style={styles.inputBubble}>
                <Inputstyled
                  placeholder="Ajouter un lieu"
                  placeholderTextColor="white"
                  onChangeText={(value) => setPlace(value)}
                  value={place}
                ></Inputstyled>
              </View>
              <View style={styles.inputBubble}>
                <TouchableOpacity
                  onPress={() => setShowCalendar(!showCalendar)}
                >
                  <Inputstyled
                    placeholder="Sélectionner une date"
                    placeholderTextColor="white"
                    value={selectedDate}
                    editable={false}
                  />
                </TouchableOpacity>

                {showCalendar && (
                  <Calendar
                    style={styles.calendarcontainer}
                    onDayPress={handleDateSelect}
                    markedDates={{
                      [selectedDate]: { selected: true, selectedColor: "blue" },
                    }}
                    theme={{
                      backgroundColor: "black",
                      calendarBackground: "black",
                      selectedDayTextColor: "white",
                      dayTextColor: "white",
                      textDisabledColor: "gray",
                      dotColor: "white",
                      arrowColor: "white",
                      monthTextColor: "white",
                    }}
                  />
                )}
              </View>
            </View>

            <View>
              <View style={styles.inputBubble}>
                <Inputstyled
                  placeholder="Ajouter un film"
                  placeholderTextColor="white"
                  value={movie}
                  onChangeText={setMovie}
                  onSubmitEditing={handleAddMovie}
                ></Inputstyled>
              </View>
              {resultmovie && !noResultsFound && (
                <View style={styles.resultContainer}>
                  <Text style={styles.movieTitle}>{resultmovie.title}</Text>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${resultmovie.poster_path}`,
                    }}
                    style={styles.moviePoster}
                    resizeMode="contain"
                  />
                </View>
              )}

              {/* Affichage d'un message si aucun film n'est trouvé */}
              {noResultsFound && (
                <Text style={styles.errorMessage}>Aucun film trouvé</Text>
              )}
              <View style={styles.inputBubble}>
                <TextInput
                  style={styles.description}
                  placeholder="Description de l'évènement"
                  placeholderTextColor="white"
                  onChangeText={(value) => setDescription(value)}
                  value={description}
                ></TextInput>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleSubmitMessage()}
                style={styles.addEvent}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Créer</Text>
              </TouchableOpacity>

              {/* Permet de naviguer avec la page 'Events' */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Events")}
                style={styles.removeEvent}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "rgb(30.28.26)",
  },
  container: {
    flex: 1,
    backgroundColor: "rgb(30.28.26)",
  },
  title: {
    fontFamily: "Mulish",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginVertical: 10,
    marginTop: 30,
    fontWeight: 600,
  },

  image: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 100,
  },

  inputBubble: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },

  calendarcontainer: {
    height: "auto",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  addEvent: {
    backgroundColor: "rgb(201, 65, 6)",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  removeEvent: {
    backgroundColor: "rgb(164, 163, 163)",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Mulish",
  },

  description: {
    height: 100,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "rgb(30,28,26)",
    borderColor: "rgb(201,65,6)",
    marginTop: -20,
    marginBottom: -30,
    paddingTop: 10,
    color: "white",
    fontFamily: "Mulish",
  },
  resultContainer: {
    marginTop: 5,
    alignItems: "center",
    marginBottom:10,
  },
  movieTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  moviePoster: {
    width: 200,
    height: 300,
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
