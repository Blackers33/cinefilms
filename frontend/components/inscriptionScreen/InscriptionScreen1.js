import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import TextInput from "../common/TextInput";

function InscriptionScreen1({ handleNext}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handlecommencebuton = () => {
    if (EMAIL_REGEX.test(email)) {
      
      handleNext();
    } else {
      setEmailError(true);
    }
  };

  return (
    <View>
      <Text style={styles.titrelogo}>Bienvenue sur Cinefilm ! 🎬✨</Text>
      <Text style={styles.titrecontenu}>
        Retrouvez les meilleurs films, événements et échanges entre passionnés
        de cinéma. Rejoignez la communauté et vivez votre passion à fond !{"\n"}
        🍿 Bon divertissement !
      </Text>
      <View>
        <Text style={styles.Input}>Username</Text>

        <TextInput
          onChangeText={(value) => setUsername(value)}
          value={username}
          placeholder="Enter your username"
        ></TextInput>
      </View>
      <View>
        <Text style={styles.Input}>Email</Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          value={email}
          placeholder="Enter your email"
        ></TextInput>
      </View>
      <View>
        <Text style={styles.Input}>Email</Text>
        <TextInput
          onChangeText={(value) => setPassword(value)}
          value={password}
          placeholder="Choose your password"
          secureTextEntry={true}
          autoCorrect={false}
          textContentType="password"
        ></TextInput>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.bouton}
        onPress={()=>handlecommencebuton()}
      >
        <Text style={styles.text}> Start </Text>
      </TouchableOpacity>
      {emailError && <Text style={styles.text}>Invalid email address</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  titrelogo: {
    color: "#c94106",
    fontSize: 35,
  },
  titrecontenu: {
    color: "#c94106",
  },
  champInput: {
    borderWidth: 2,
    borderColor: "#C94106",
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  Input: {
    padding: 12,
    fontSize: 16,
    color: "#C94106",
  },
  gradient: {
    padding: 2, // Léger padding pour bien voir le border color
    borderRadius: 100,
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

export default InscriptionScreen1;
