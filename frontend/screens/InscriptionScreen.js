import InscriptionScreen1 from "../components/inscriptionScreen/InscriptionComposant1";
import InscriptionScreen2 from "../components/inscriptionScreen/InscriptionComposant2";
import InscriptionScreen3 from "../components/inscriptionScreen/InscriptionComposant3";
import {
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateinscriptionUser, updateprofilUser } from "../reducers/user";

export default function InscriptionScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [genre, setGenre] = useState("");
  const [genrefilm, setGenrefilm] = useState([]);
  const [reseachfilm, setReseachfilm] = useState([]); //pour afficher les films recherchés
  const [favoritefilm, setFavoriteFilm] = useState([]);
  const [biography, setBiography] = useState("");
  const [filmInput, setFilmInput] = useState("");
  const [currentStep, setCurrentStep] = useState(1); //pour afficher les étapes de l'inscription
  const [bienvenue, setBienvenue] = useState(false); //pour afficher le message de bienvenue
  const [modalVisible, setModalVisible] = useState(false); //pour afficher la modal d'avatar
  const [avatar, setAvatar] = useState(""); //pour afficher l'avatar

  const dispatch = useDispatch(); //pour envoyer les données de l'utilisateur
  const user = useSelector((state) => state.user.value); //pour récupérer les données de l'utilisateur

  const handlecommencerbuton = () => {
    //pour passer à l'étape suivante
    setCurrentStep(2);
  };

  const handlesuivantbuton = () => {
    //pour passer à l'étape suivante
    setCurrentStep(3);
  };

  const handlefinirbuton = () => {
    // Fetch the location (latitude, longitude) using the city name
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
      .then((response) => response.json())
      .then((data) => {
        const firstCity = data.features[0];
        const locationData = {
          name: firstCity.properties.city,
          latitude: firstCity.geometry.coordinates[1],
          longitude: firstCity.geometry.coordinates[0],
        };
        // Now perform user signup
        fetch(process.env.EXPO_PUBLIC_IP_ADDRESS + "/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              // After successful signup, update the user profile with location
              dispatch(
                //pour envoyer les données de l'utilisateur
                updateinscriptionUser({
                  username: username,
                  email: email,
                  token: data.token,
                })
              );

              fetch(
                process.env.EXPO_PUBLIC_IP_ADDRESS +
                  "/users/profil/" +
                  data.token,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    age: age,
                    avatar: avatar, // ajouter la data avatar suite à la fonction avatar terminée
                    genre: genre,
                    location: locationData,
                    favMovies: favoritefilm,
                    favGenres: genrefilm,
                    biography: biography,
                  }),
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  if (data.result) {
                    dispatch(
                      updateprofilUser({
                        age: age,
                        avatar: avatar, //ajouter img avatar suite à la fonction img avatar
                        genre: genre,
                        location: locationData,
                        favMovies: favoritefilm,
                        favGenres: genrefilm,
                        biography: biography,
                      })
                    );

                    setBienvenue(true); // Successfully signed up and created the profile
                    setTimeout(() => {
                      navigation.navigate("TabNavigator");
                    }, 3000);
                  }
                })
                .catch((error) => {
                  console.error("Error updating user profile:", error);
                });
            }
          });
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "padding"}
    >
      <SafeAreaView
      >
        <ImageBackground
          source={require("../assets/backgroundGradient.png")}
          style={{
            resizeMode: "cover",
            height:"100%",
          }}
        >
          {currentStep === 1 && (
            <View>
              <InscriptionScreen1
                handleNext={handlecommencerbuton}
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            </View>
          )}
          {currentStep === 2 && (
            <View>
              <InscriptionScreen2
                handleNext={handlesuivantbuton}
                age={age}
                setAge={setAge}
                city={city}
                setCity={setCity}
                genre={genre}
                setGenre={setGenre}
                avatar={avatar}
                setAvatar={setAvatar}
                ModalVisible={modalVisible}
                SetmodalVisible={setModalVisible}
              />
            </View>
          )}
          {currentStep === 3 && (
            <View>
              <InscriptionScreen3
                genrefilm={genrefilm}
                setGenrefilm={setGenrefilm}
                reseachfilm={reseachfilm}
                setReseachfilm={setReseachfilm}
                biography={biography}
                setBiography={setBiography}
                filmInput={filmInput}
                setFilmInput={setFilmInput}
                handleinscriptionbuton={handlefinirbuton}
                favoritefilm={favoritefilm}
                setFavoriteFilm={setFavoriteFilm}
              />
            </View>
          )}
          {bienvenue && (
            <Text style={styles.text}>
              Votre inscription a été réussie. {user.username}, bienvenue sur
              Cinefilms ! 🎉
            </Text>
          )}
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1C1A",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bouton: {
    backgroundColor: "#C94106",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});
