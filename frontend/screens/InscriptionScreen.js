import InscriptionScreen1 from "../components/inscriptionScreen/InscriptionComposant1";
import InscriptionScreen2 from "../components/inscriptionScreen/InscriptionComposant2";
import InscriptionScreen3 from "../components/inscriptionScreen/InscriptionComposant3";
import {
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  View,
} from "react-native";
import { useState } from "react";

export default function InscriptionScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [genre, setGenre] = useState("");
  const [genrefilm, setGenrefilm] = useState([]);
  const [recherchefilm, setRecherchefilm] = useState([]);
  const [biography, setBiography] = useState("");
  const [filmInput, setFilmInput] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handlecommencerbuton = () => {
    setCurrentStep(2);
  };

  const handlesuivantbuton = () => {
    setCurrentStep(3);
  };

  const handlefinirbuton = () => {
    console.log("Inscription terminée");

  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "padding"}
    >
      <SafeAreaView>
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
              name={name}
              setName={setName}
              age={age}
              setAge={setAge}
              city={city}
              setCity={setCity}
              genre={genre}
              setGenre={setGenre}
            />
          </View>
        )}
        {currentStep === 3 && (
          <View>
            <InscriptionScreen3
            genrefilm={genrefilm} 
            setGenrefilm={setGenrefilm}
            recherchefilm={recherchefilm}
            setRecherchefilm={setRecherchefilm}
            biography={biography}
            setBiography={setBiography}
            filmInput={filmInput}
            setFilmInput={setFilmInput}
            handleinscriptionbuton={handlefinirbuton}/>
          </View>
        )}
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
  },
});
